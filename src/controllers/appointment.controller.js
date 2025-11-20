import { getAllDocs } from "../services/collectionBaseWorker.js";
import { where } from "firebase/firestore";

export const getAppointmentsByDate = async (req, res) => {
    try {
        const { startDate, endDate, establishmentId } = req.query;

        if (!startDate || !endDate || !establishmentId) {
            return res.status(400).json({
                error: "startDate, endDate e establishmentId são obrigatórios"
            })
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

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
