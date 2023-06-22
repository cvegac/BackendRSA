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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEscenario = exports.getLlaves = void 0;
const encrypt_service_1 = require("./encrypt.service");
const newForm_validator_1 = require("../../../validators/newForm.validator");
const types_1 = require("../../../types");
const getLlaves = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { publicKeyPem } = yield (0, encrypt_service_1.getPublicKey)();
        console.log(publicKeyPem);
        res.status(200).send({ "publicKey": publicKeyPem });
    }
    catch (error) {
        res.status(500).send('Error al obtener las claves RSA');
    }
});
exports.getLlaves = getLlaves;
const postEscenario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newtypeFormEntry = (0, newForm_validator_1.typeNewEntry)(req.body);
        if (newtypeFormEntry == types_1.Flujo.Inicio) {
            (0, newForm_validator_1.toFormWithOnlyFlujoValidator)(req.body);
            let formWithOnlyFlujo = {
                flujo: types_1.Flujo.Formulario
            };
            console.log(formWithOnlyFlujo);
            res.json(formWithOnlyFlujo);
        }
        else if (newtypeFormEntry == types_1.Flujo.Formulario) {
            try {
                const formulario = (0, newForm_validator_1.toFormularioValidator)(req.body);
                console.log(formulario);
                (0, encrypt_service_1.decryptValue)(formulario.documentoCifrado);
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
exports.postEscenario = postEscenario;
