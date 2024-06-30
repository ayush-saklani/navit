import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import mongosanitize from "express-mongo-sanitize";

dotenv.config({ path: "./.env" });

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json({ limit: "1MB" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(mongosanitize());
app.use(routes);

export { app };
