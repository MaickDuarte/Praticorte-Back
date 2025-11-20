import { getAllDocs } from "../services/collectionBaseWorker.js";
import { where } from "firebase/firestore";

export const getAppointmentsByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const establishmentId = req.estabelecimentoId; // vindo do auth middleware

        if (!startDate || !endDate) {
            return res.status(400).json({ error: "startDate e endDate são obrigatórios" });
        }

        // Convertendo para Date
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Aqui usamos *exatamente* o mesmo formato que você usa no frontend
        const appointments = await getAllDocs({
            collection: "agendamentos",
            queries: [
                where("estabelecimentoId", "==", establishmentId),
                where("dateInfo.date", ">=", start),
                where("dateInfo.date", "<=", end)
            ]
        });

        return res.json(appointments);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar agendamentos" });
    }
};
