import { db } from "../services/firebase.service.js";

export async function getAgendamentos(req, res) {
  try {
    const snapshot = await db.collection("agendamentos").get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    console.error("Erro getAgendamentos:", error);
    res.status(500).json({ error: error.message });
  }
}
