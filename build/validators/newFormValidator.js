"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFormularioValidator = exports.toFormWithOnlyFlujoValidator = exports.typeNewEntry = void 0;
const types_1 = require("../types");
const parseFlujo = (flujoFromRequest) => {
    if (!isString(flujoFromRequest) || !isFlujo(flujoFromRequest) || isEmpty(flujoFromRequest)) {
        throw new Error('Incorrect flujo from request');
    }
    return flujoFromRequest;
};
const parseName = (nameFromRequest) => {
    if (!isString(nameFromRequest) || isEmpty(nameFromRequest)) {
        throw new Error('Incorrect name from request');
    }
    return nameFromRequest;
};
const parseDocumentoCifrado = (documentoCifradoFromRequest) => {
    if (!isString(documentoCifradoFromRequest) || isEmpty(documentoCifradoFromRequest)) {
        throw new Error('Incorrect documentoCifrado from request');
    }
    return documentoCifradoFromRequest;
};
const isString = (string) => {
    return typeof string === 'string';
};
const isEmpty = (string) => {
    return string.trim() === '';
};
const isFlujo = (param) => {
    return Object.values(types_1.Flujo).includes(param);
};
const typeNewEntry = (object) => {
    if (object.flujo == 'inicio') {
        return types_1.Flujo.Inicio;
    }
    if (object.flujo == 'formulario') {
        return types_1.Flujo.Formulario;
    }
    return types_1.Flujo.Inicio;
};
exports.typeNewEntry = typeNewEntry;
const toFormWithOnlyFlujoValidator = (object) => {
    const newForm = {
        flujo: parseFlujo(object.flujo)
    };
    return newForm;
};
exports.toFormWithOnlyFlujoValidator = toFormWithOnlyFlujoValidator;
const toFormularioValidator = (object) => {
    const newForm = {
        flujo: parseFlujo(object.flujo),
        name: parseName(object.name),
        documentoCifrado: parseDocumentoCifrado(object.documentoCifrado),
    };
    return newForm;
};
exports.toFormularioValidator = toFormularioValidator;
