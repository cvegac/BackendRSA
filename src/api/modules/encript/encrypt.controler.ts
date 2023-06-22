import { Handler } from "express";
import { decryptValue, getPublicKey } from './encrypt.service';
import { toFormWithOnlyFlujoValidator, toFormularioValidator, typeNewEntry } from '../../../validators/newForm.validator';
import { Flujo, FormWithOnlyFlujo, Formulario, Mensaje, Result } from "../../../types";

export const getLlaves: Handler = async (_req, res) => {
    try {
        const { publicKeyPem } = await getPublicKey();
        console.log(publicKeyPem);
        res.status(200).send({ "publicKey": publicKeyPem });
    } catch (error) {
        res.status(500).send('Error al obtener las claves RSA');
    }
};

export const postEscenario: Handler = async (req, res) => {
    try {
        const newtypeFormEntry = typeNewEntry(req.body);

        if (newtypeFormEntry == Flujo.Inicio) {
            toFormWithOnlyFlujoValidator(req.body);
            let formWithOnlyFlujo: FormWithOnlyFlujo = {
                flujo: Flujo.Formulario
            }
            console.log(formWithOnlyFlujo);
            res.json(formWithOnlyFlujo);
        } else if (newtypeFormEntry == Flujo.Formulario) {
            try {
                const formulario: Formulario = toFormularioValidator(req.body);
                console.log(formulario);
                decryptValue(formulario.documentoCifrado);
                const response: Result = {
                    exitoso: true,
                    mensaje: Mensaje.OkMesaje
                }
                res.json(response);
            } catch (error) {
                const response: Result = {
                    exitoso: false,
                    mensaje: Mensaje.BatMesaje
                }
                res.json(response);
            }
        } else {
            res.status(400).send('Error request invalid');
        }

    } catch (err) {
        res.status(400).send(err);
    }
};