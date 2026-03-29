import { getAllDocs, addDoc, updateDoc, softDeleteDoc } from "../services/collectionBaseWorker.js";
import { where } from "firebase/firestore";
import { startOfDay, endOfDay } from 'date-fns';

export const addService = async (req, res) => {
    console.log(req)
    console.log(req.body)
    console.log(res)
    const saved = await addDoc({
        collection: "servicos",
        data: req.body
    })
    if (saved.error) {
        return res.status(400).json(saved);
    }
    return res.json(saved)
}

export const updateService = async (req, res) => {
    const updated = await updateDoc({
        collection: "servicos",
        data: req.body
    })
    if (updated.error) {
        return res.status(400).json(updated);
    }
    return res.json(updated)
}

export const getServices = async (req, res) => {
    const { id } = req.body
    const services = await getAllDocs({
        collection: "servicos",
        queries: [
            where("estabelecimentoId", "==", id),
        ],
        res
    })

    if (!services) return

    return res.json(services)
}

export const deleteService = async (req, res) => {
    const { id } = req.body
    const deleted = await softDeleteDoc({
        collection: "servicos",
        id: id
    })
    if (deleted.error) {
        return res.status(400).json(deleted);
    }
    return res.json(deleted)
}