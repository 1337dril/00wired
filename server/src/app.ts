import path from "path";
import express, { Application } from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import Controller from "./utils/interfaces/controller.interface";
import errorMiddleware from "./middleware/error.middleware";

class App {
  public express: Application;
  public port: number;
  public corsOptions: { origin: string; credentials?: boolean };

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;
    this.corsOptions = {
      origin: process.env.FRONTEND_URL || "http://localhost:5500",
    };

    this.initDBConnection();
    this.initMiddleware();
    this.initControllers(controllers);
    this.initErrorHandling();
  }
  private initMiddleware(): void {
    this.express.use(helmet());
    // this.express.use(cors(this.corsOptions));
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(cookieParser());
    this.express.use(compression());
  }
  private initControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
    this.express.use(express.static(path.join(__dirname, "build")));
    this.express.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "build", "index.html"));
    });
  }
  private initErrorHandling(): void {
    this.express.use(errorMiddleware);
  }
  private initDBConnection(): void {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) {
      process.exit(1);
    }
    mongoose.connect(MONGO_URI);

    mongoose.connection.on("connected", () => {
      console.log("DB connected on port", mongoose.connection.port);
    });
    mongoose.connection.on("disconnected", () => {
      console.log("DB disconnected");
    });
  }
}

export default App;
