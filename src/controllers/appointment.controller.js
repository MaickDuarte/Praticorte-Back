import { getAllDocs } from "../services/collectionBaseWorker.js";
import { where } from "firebase/firestore";
import { startOfDay, endOfDay } from 'date-fns';

export const getAppointmentsByDate = async (req, res) => {
    const { startDate, endDate, establishmentId } = req.query
        const start = new Date(startDate);
        const end = new Date(endDate);
        const appointments = await getAllDocs({
            collection: "agendamentos",
            queries: [
                where("estabelecimentoId", "==", establishmentId),
                where("dateInfo.date", ">=", startOfDay(start)),
                where("dateInfo.date", "<=", endOfDay(end))
            ],
            res
        })

    if (!appointments) return

    return res.json(appointments)
}