import express from 'express';
import cors from "cors";

import encriptRoutes from './routes/encript.routes';
import { generateRSAKeys } from './api/modules/encript/encrypt.service'

// Swagger
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "./swaggerOptions";

const specs = swaggerJsDoc(options);

generateRSAKeys()
    .then(() => { console.log("keys generated") })
    .catch((error) => { console.error("error: " + error) });

const app = express();

app.use(cors());
app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());

app.set("port", process.env.PORT ?? 3000);

// Routes
app.use(encriptRoutes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

export default app;