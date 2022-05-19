require("dotenv").config();
// récupérer les chemins alias une fois le projet déployé
if (process.env.NODE_ENV === "production") {
  require("module-alias/register");
}
import express, { Application } from "express";
import helmet from "helmet";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import databaseManager from "./database";

import { socketIoServer } from "@utils/socketio"

// cache
declare global {
  var myCache: NodeCache;
}
import NodeCache from "node-cache";
import router from "./routes";
import { errorLogger, logger } from "@config/winston";

global.myCache = new NodeCache();

const app: Application = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(require("express-status-monitor")());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan("combined", { stream: logger.stream }));
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

// routes de l'api
app.use(router);


(async () => {
  // const mailer = new Mailer(null, null, null, null);
  try {
    // socket.io part
    socketIoServer(httpServer)

    httpServer.listen(PORT);
    console.log(`Serveur lancé sur le port ${PORT} - http://localhost:${PORT}/api/`);

    // CONNEXION NODEMAILER
    //const isConnected = await mailer.connect();
    // if (!isConnected) {
    //   throw new Error("Connexion avec Nodemailer impossible");
    // }
    console.log("Nodemailer connecté");

    // CONNEXION BASE DE DONNEES
    const dbConnected = await (await databaseManager.getManager()).connection.isConnected;

    if (!dbConnected) {
      throw new Error("Base de données non connectée");
    }
    // lancement des migrations
    // FIXME remettre runMigrations d'origine
    //await databaseManager.runMigrations();

    console.log("Base de données connectée");
  } catch (error) {
    errorLogger.error(`${error.status || 500} - [src/server] - ${error.message}`);
    console.log("error: ", error);
  }
  // fermeture de la connexion
  //mailer.close();
})();
