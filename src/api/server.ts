import morgan from "morgan";
import cors from "cors";
import router from "./router";
import express from "express";
import { errorHandler, invalidPathHandler } from "./middleware/middleware";

const app = express();

app.use(morgan("dev")); // use morgan middleware globally
app.use(cors());

app.use(express.urlencoded({ extended: true })); // de/encodes url properly to help handle query strings

app.use(router);
app.use(invalidPathHandler);
app.use(errorHandler);

export default app;
