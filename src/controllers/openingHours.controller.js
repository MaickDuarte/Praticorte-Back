import { getAllDocs, addDoc, updateDoc } from "../services/collectionBaseWorker.js";
import { where } from "firebase/firestore";

export const addOpeningHours = async (req, res) => {
    const saved = await addDoc({
        collection: "openingHours",
        data: req.body
    });
    if (saved.error) {
        return res.status(400).json(saved);
    }
    return res.json(saved);
};

export const updateOpeningHours = async (req, res) => {
    const updated = await updateDoc({
        collection: "openingHours",
        data: req.body
    });
    if (updated.error) {
        return res.status(400).json(updated);
    }
    return res.json(updated);
};

export const getOpeningHours = async (req, res) => {
    const { estabelecimentoId } = req.body;

    const hours = await getAllDocs({
        collection: "openingHours",
        queries: [
            where("estabelecimentoId", "==", estabelecimentoId)
        ],
        res
    });

    if (!hours) return;
    return res.json(hours);
};

export const getOpeningHoursById = async (req, res) => {
    const { id } = req.body;

    const hours = await getAllDocs({
        collection: "openingHours",
        queries: [
            where("id", "==", id)
        ],
        res
    });

    if (!hours) return;
    return res.json(hours.length > 0 ? hours[0] : null);
};
