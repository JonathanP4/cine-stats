import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import searchRoutes from "./routes/search";
import trendingRoutes from "./routes/trending";
import detailsRoutes from "./routes/details";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/search", searchRoutes);
app.use("/trending", trendingRoutes);
app.use("/details", detailsRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
	console.log("⚡[Server]: listening on port " + PORT);
});
