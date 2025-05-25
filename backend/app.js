import createErrors from "http-errors";
import express from "express";
import colors from "colors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import usersRouter from "./routes/users.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import emailRouter from "./routes/send-email.routes.js";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(["*"]));

// route level middleware
app.use("/api/users", usersRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/send-email", emailRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createErrors(404));
});

app.listen(PORT, () => {
  console.log(`App listen on http://localhost:${PORT}`.bgCyan.white);
});
