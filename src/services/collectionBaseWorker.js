import { db } from "./firebase.service.js";
import { Timestamp } from "firebase-admin/firestore";

// ======================================================================
// Convert values automatically (Date -> Timestamp, null -> null, etc)
// ======================================================================
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
export const getAllDocs = async ({ collection, queries }) => {
    console.log("getAllDocs called with:", { collection, queries });
    try {
        let ref = db.collection(collection);
        ref = applyQueries(ref, queries);

        const snapshot = await ref.get();

        return snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(item => item.isDeleted !== true);

    } catch (error) {
        console.error("getAllDocs error:", error);
        return [];
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
        const toSave = {};

        Object.keys(data).forEach(k => {
            toSave[k] = convertValue(data[k]);
        });

        const result = await db.collection(collection).add(toSave);

        return { id: result.id, ...toSave };

    } catch (error) {
        console.error("addDoc error:", error);
        throw error;
    }
};

// ======================================================================
// UPDATE DOC
// ======================================================================
export const updateDoc = async ({ collection, id, data }) => {
    try {
        const toUpdate = {};

        Object.keys(data).forEach(k => {
            toUpdate[k] = convertValue(data[k]);
        });

        await db.collection(collection).doc(id).update(toUpdate);

        return { id, ...toUpdate };

    } catch (error) {
        console.error("updateDoc error:", error);
        throw error;
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
        throw error;
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
        throw error;
    }
};
