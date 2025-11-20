import { db } from "../services/firebase.service.js";

export async function getAgendamentos(req, res) {
    try {
        const snapshot = await db.collection("agendamentos").get();

        const lista = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return res.json(lista);

    } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        return res.status(500).json({ error: "Erro ao buscar agendamentos" });
    }
}
