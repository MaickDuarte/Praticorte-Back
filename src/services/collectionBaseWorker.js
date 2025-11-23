import { db } from "./firebase.service.js";
import { v7 as uuidv7 } from "uuid";
import { Timestamp } from "firebase-admin/firestore";

// ======================================================================
// Convert values automatically (Date -> Timestamp, null -> null, etc)
// ======================================================================
function convertDatesToFirestoreDate(obj) {
  if (obj === null || obj === undefined) return obj;

  // Já é Firestore timestamp -> converte para Date
  if (isFirestoreTimestamp(obj)) {
    return new Date(obj.seconds * 1000 + obj.nanoseconds / 1e6);
  }

  // String ISO → Date
  if (typeof obj === "string" && isISODate(obj)) {
    return new Date(obj);
  }

  // Já é Date → mantém
  if (obj instanceof Date) {
    return obj;
  }

  // Array → recursivo
  if (Array.isArray(obj)) {
    return obj.map(val => convertDatesToFirestoreDate(val));
  }

  // Objeto → recursivo
  if (typeof obj === "object") {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = convertDatesToFirestoreDate(obj[key]);
    }
    return newObj;
  }

  return obj;
}

function isFirestoreTimestamp(obj) {
  return (
    obj &&
    typeof obj.seconds === "number" &&
    typeof obj.nanoseconds === "number"
  );
}

function isISODate(value) {
  const isoRegex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
  return isoRegex.test(value) && !isNaN(Date.parse(value));
}

const convertValue = (value) => {
    if (value instanceof Date) return Timestamp.fromDate(value);
    return value;
};
// ======================================================================
// Reuse Firestore Web "where()" objects (converted to Admin SDK format)
// ======================================================================
const applyQueries = (ref, queries) => {
    if (!queries || queries.length === 0) return ref;

    queries.forEach(q => {
        if (!q) return;

        // pega o caminho real do campo vindo do Web SDK:
        const field = q._field.canonicalString(); 
        const op = q._op;
        const value = convertValue(q._value);

        ref = ref.where(field, op, value);
    });

    return ref;
};

// ======================================================================
// GET ALL DOCUMENTS
// ======================================================================
export const getAllDocs = async ({ collection, queries, res }) => {
    if (!validateQueries(queries, res)) return;
    try {
        let ref = db.collection(collection);
        ref = applyQueries(ref, queries);

        const snapshot = await ref.get();

        return snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(item => item.isDeleted !== true);

    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar documentos" });
        return;
    }
};

// ======================================================================
// GET DOC BY ID
// ======================================================================
export const getDocById = async ({ collection, id }) => {
    try {
        const docRef = db.collection(collection).doc(id);
        const snapshot = await docRef.get();

        if (!snapshot.exists) return null;

        const data = snapshot.data();
        if (data.isDeleted) return null;

        return { id: snapshot.id, ...data };
    } catch (error) {
        console.error("getDocById error:", error);
        return null;
    }
};

// ======================================================================
// ADD DOC
// ======================================================================
export const addDoc = async ({ collection, data }) => {
    try {
        let toSave = { ...data };

        if (!toSave.estabelecimentoId) {
            return { error: "Campo obrigatório ausente: estabelecimentoId" };
        }

        if (!toSave.id) {
            toSave.id = uuidv7();
        }

        toSave.createdAt = new Date();
        toSave.updatedBy = null;
        toSave.isDeleted = false;

        // Aqui converte tudo para Date (Firestore salva como timestamp)
        toSave = convertDatesToFirestoreDate(toSave);

        const result = await db.collection(collection).doc(toSave.id).set(toSave);

        return { id: result.id, ...toSave };

    } catch (error) {
        console.log(error);
        return null;
    }
};

// ======================================================================
// UPDATE DOC
// ======================================================================
export const updateDoc = async ({ collection, data }) => {
    try {
        let toUpdate = { ...data };

        if (!toUpdate.id) {
            return { error: "Campo obrigatório para atualizar: id" };
        }
        const docId = toUpdate.id;
        
        toUpdate.updatedAt = new Date();
        toUpdate = convertDatesToFirestoreDate(toUpdate);

        await db.collection(collection).doc(docId).update(toUpdate);

        return { id: docId, ...toUpdate };

    } catch (error) {
        console.error("updateDoc error:", error);
        return { error: "Erro ao atualizar documento" };
    }
};

// ======================================================================
// SOFT DELETE (recommended)
// ======================================================================
export const softDeleteDoc = async ({ collection, id }) => {
    try {
        await db.collection(collection).doc(id).update({
            isDeleted: true,
            deletedAt: Timestamp.now(),
        });

        return true;
    } catch (error) {
        console.error("softDeleteDoc error:", error);
        return { error: "Erro ao deletar documento" };
    }
};

// ======================================================================
// HARD DELETE (delete from Firestore)
// ======================================================================
export const deleteDocHard = async ({ collection, id }) => {
    try {
        await db.collection(collection).doc(id).delete();
        return true;
    } catch (error) {
        console.error("deleteDocHard error:", error);
        return { error: "Erro ao deletar documento" };
    }
};

export function validateQueries(queries, res) {
    for (const q of queries) {

        if (!q) {
            res.status(400).json({
                error: `Uma das queries é null ou undefined`
            });
            return false;
        }
        const field = q._field?.segments?.join(".") || "campo_desconhecido";
        const operator = q._op || "operador_desconhecido";
        const value = q._value;

        if (value === undefined || value === null || value === "") {
            res.status(400).json({
                error: `A query "${field}" (${operator}) recebeu um valor inválido: ${value}`
            });
            return false;
        }

        if (Array.isArray(value) && value.length === 0) {
            res.status(400).json({
                error: `A query "${field}" (${operator}) recebeu um array vazio`
            });
            return false;
        }
    }

    return true;
}

