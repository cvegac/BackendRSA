"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const encript_routes_1 = __importDefault(require("./routes/encript.routes"));
const encrypt_service_1 = require("./api/modules/encript/encrypt.service");
// Swagger
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions_1 = require("./swaggerOptions");
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions_1.options);
(0, encrypt_service_1.generateRSAKeys)()
    .then(() => { console.log("keys generated"); })
    .catch((error) => { console.error("error: " + error); });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
app.use(express_1.default.json());
app.set("port", (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000);
// Routes
app.use(encript_routes_1.default);
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
exports.default = app;
