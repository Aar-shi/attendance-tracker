import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import classRoutes from "./routes/class.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";


const port = process.env.PORT || 3000

const app = express();

app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json({
    limit: '10mb'
}));
app.use(express.urlencoded({
    extended: true,
    limit: '10mb'
}))

app.use("/api/auth", authRoutes);
app.use("/api/class", classRoutes);
app.use("/api/attendance", attendanceRoutes);


app.listen(port, () => {
    console.log("server is running on port", port);
})