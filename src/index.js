import express from "express";
import cors from "cors";
import appointmentRoutes from "./routes/appointment.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("Praticorte Backend ON");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
