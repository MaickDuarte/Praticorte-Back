import { getAllDocs, addDoc, updateDoc } from "../services/collectionBaseWorker.js";
import { where } from "firebase/firestore";

export const addEstablishment = async (req, res) => {
    const saved = await addDoc({
        collection: "estabelecimentos",
        data: req.body
    });
    if (saved.error) {
        return res.status(400).json(saved);
    }
    return res.json(saved);
};

export const updateEstablishment = async (req, res) => {
    const updated = await updateDoc({
        collection: "estabelecimentos",
        data: req.body
    });
    if (updated.error) {
        return res.status(400).json(updated);
    }
    return res.json(updated);
};

export const getEstablishmentById = async (req, res) => {
    const { id } = req.body;
    const establishments = await getAllDocs({
        collection: "estabelecimentos",
        queries: [
            where("id", "==", id)
        ],
        res
    });
    if (!establishments) return;
    return res.json(establishments.length > 0 ? establishments[0] : null);
};

export const getEstablishmentByUser = async (req, res) => {
    const { estabelecimentoId, id } = req.body;
    const searchId = estabelecimentoId || id;

    const establishments = await getAllDocs({
        collection: "estabelecimentos",
        queries: [
            where("id", "==", searchId)
        ],
        res
    });

    if (!establishments) return;
    return res.json(establishments.length > 0 ? establishments[0] : null);
};

export const getEstablishments = async (req, res) => {
    const establishments = await getAllDocs({
        collection: "estabelecimentos",
        queries: [],
        res
    });
    if (!establishments) return;
    return res.json(establishments);
};
