import { getAllDocs } from "../services/collectionBaseWorker.js";
import { where } from "firebase/firestore";
import { startOfDay, endOfDay } from 'date-fns';

export const getAppointmentByProviderAndDate = async (req, res) => {
    const { startDate, endDate, providerId } = req.body
    const appointments = await getAllDocs({
        collection: "agendamentos",
        queries: [
            where("provider.id", "==", providerId),
            where("dateInfo.date", ">=", startOfDay(new Date(startDate))),
            where("dateInfo.date", "<=", endOfDay(new Date(endDate)))
        ],
        res
    })

    if (!appointments) return

    return res.json(appointments)
}

export const getAppointmentsByDate = async (req, res) => {
    const { startDate, endDate, establishmentId } = req.body
    const appointments = await getAllDocs({
        collection: "agendamentos",
        queries: [
            where("estabelecimentoId", "==", establishmentId),
            where("dateInfo.date", ">=", startOfDay(new Date(startDate))),
            where("dateInfo.date", "<=", endOfDay(new Date(endDate)))
        ],
        res
    })

    if (!appointments) return

    return res.json(appointments)
}