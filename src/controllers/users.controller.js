import { getAllDocs, addDoc, updateDoc, softDeleteDoc } from "../services/collectionBaseWorker.js";
import { where } from "firebase/firestore";

export const addUser = async (req, res) => {
    const saved = await addDoc({
        collection: "usuarios",
        data: req.body
    })
    if (saved.error) {
        return res.status(400).json(saved);
    }
    return res.json(saved)
}

export const updateUser = async (req, res) => {
    const updated = await updateDoc({
        collection: "usuarios",
        data: req.body
    })
    if (updated.error) {
        return res.status(400).json(updated);
    }
    return res.json(updated)
}

export const getUserByEmail = async (req, res) => {
    const { email } = req.body
    const user = await getAllDocs({
        collection: "usuarios",
        queries: [
            where("email", "==", email)
        ],
        res
    })

    if (!user) return

    return res.json(user)
}

export const getUsers = async (req, res) => {
    const { estabelecimentoId } = req.body
    const users = await getAllDocs({
        collection: "usuarios",
        queries: [
            where("estabelecimentoId", "==", estabelecimentoId)
        ],
        res
    })

    if (!users) return

    return res.json(users)
}

export const getActiveUsersAppointmentAllowed = async (req, res) => {
    const { estabelecimentoId } = req.body
    const users = await getAllDocs({
        collection: "usuarios",
        queries: [
            where("estabelecimentoId", "==", estabelecimentoId),
            where("status", "==", "active"),
            where("isProvider", "==", "true")
        ],
        res
    })

    if (!users) return

    return res.json(users)
}

export const deleteUser = async (req, res) => {
    const { id } = req.body
    const deleted = await softDeleteDoc({
        collection: "usuarios",
        id: id
    })
    if (deleted.error) {
        return res.status(400).json(deleted);
    }
    return res.json(deleted)
}