"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFormularioValidator = exports.toFormWithOnlyFlujoValidator = exports.typeNewEntry = exports.isFlujo = exports.isEmpty = exports.isString = exports.parseDocumentoCifrado = exports.parseName = exports.parseFlujo = void 0;
const types_1 = require("../types");
const parseFlujo = (flujoFromRequest) => {
    if (!(0, exports.isString)(flujoFromRequest) || !(0, exports.isFlujo)(flujoFromRequest) || (0, exports.isEmpty)(flujoFromRequest)) {
        throw new Error('Incorrect flujo from request');
    }
    return flujoFromRequest;
};
exports.parseFlujo = parseFlujo;
const parseName = (nameFromRequest) => {
    if (!(0, exports.isString)(nameFromRequest) || (0, exports.isEmpty)(nameFromRequest)) {
        throw new Error('Incorrect name from request');
    }
    return nameFromRequest;
};
exports.parseName = parseName;
const parseDocumentoCifrado = (documentoCifradoFromRequest) => {
    if (!(0, exports.isString)(documentoCifradoFromRequest) || (0, exports.isEmpty)(documentoCifradoFromRequest)) {
        throw new Error('Incorrect documentoCifrado from request');
    }
    return documentoCifradoFromRequest;
};
exports.parseDocumentoCifrado = parseDocumentoCifrado;
const isString = (string) => {
    return typeof string === 'string';
};
exports.isString = isString;
const isEmpty = (string) => {
    return string.trim() === '';
};
exports.isEmpty = isEmpty;
const isFlujo = (param) => {
    return Object.values(types_1.Flujo).includes(param);
};
exports.isFlujo = isFlujo;
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
        flujo: (0, exports.parseFlujo)(object.flujo)
    };
    return newForm;
};
exports.toFormWithOnlyFlujoValidator = toFormWithOnlyFlujoValidator;
const toFormularioValidator = (object) => {
    const newForm = {
        flujo: (0, exports.parseFlujo)(object.flujo),
        name: (0, exports.parseName)(object.name),
        documentoCifrado: (0, exports.parseDocumentoCifrado)(object.documentoCifrado),
    };
    return newForm;
};
exports.toFormularioValidator = toFormularioValidator;
