"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const encryptService_1 = require("../services/encryptService");
const newFormValidator_1 = require("../validators/newFormValidator");
const types_1 = require("../types");
const router = express_1.default.Router();
router.get('/', (_req, _res) => {
});
router.get('/llaves', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { publicKeyPem } = yield (0, encryptService_1.getPublicKey)();
        console.log(publicKeyPem);
        res.status(200).send({ "publicKey": publicKeyPem });
    }
    catch (error) {
        res.status(500).send('Error al obtener las claves RSA');
    }
}));
router.post('/escenario', (req, res) => {
    try {
        const newtypeFormEntry = (0, newFormValidator_1.typeNewEntry)(req.body);
        if (newtypeFormEntry == types_1.Flujo.Inicio) {
            (0, newFormValidator_1.toFormWithOnlyFlujoValidator)(req.body);
            let formWithOnlyFlujo = {
                flujo: types_1.Flujo.Formulario
            };
            console.log(formWithOnlyFlujo);
            res.json(formWithOnlyFlujo);
        }
        else if (newtypeFormEntry == types_1.Flujo.Formulario) {
            try {
                const formulario = (0, newFormValidator_1.toFormularioValidator)(req.body);
                console.log(formulario);
                (0, encryptService_1.decryptValue)(formulario.documentoCifrado);
                const response = {
                    exitoso: true,
                    mensaje: types_1.Mensaje.OkMesaje
                };
                res.json(response);
            }
            catch (error) {
                const response = {
                    exitoso: false,
                    mensaje: types_1.Mensaje.BatMesaje
                };
                res.json(response);
            }
        }
        else {
            res.status(400).send('Error request invalid');
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.default = router;
