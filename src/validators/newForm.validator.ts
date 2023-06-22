import { Flujo, Formulario, FormWithOnlyFlujo } from "../types";

export const parseFlujo = (flujoFromRequest: any): Flujo => {
    if (!isString(flujoFromRequest) || !isFlujo(flujoFromRequest) || isEmpty(flujoFromRequest)) {
        throw new Error('Incorrect flujo from request');
    }
    return flujoFromRequest;
}

export const parseName = (nameFromRequest: any): string => {
    if (!isString(nameFromRequest) || isEmpty(nameFromRequest)) {
        throw new Error('Incorrect name from request');
    }
    return nameFromRequest;
}

export const parseDocumentoCifrado = (documentoCifradoFromRequest: any): string => {
    if (!isString(documentoCifradoFromRequest) || isEmpty(documentoCifradoFromRequest)) {
        throw new Error('Incorrect documentoCifrado from request');
    }
    return documentoCifradoFromRequest;
}

export const isString = (string: any): boolean => {
    return typeof string === 'string'
}

export const isEmpty = (string: any): boolean => {
    return string.trim() === '';
}

export const isFlujo = (param: any): boolean => {
    return Object.values(Flujo).includes(param);
}

export const typeNewEntry = (object: any): Flujo => {
    if (object.flujo == 'inicio') {
        return Flujo.Inicio;
    }
    if (object.flujo == 'formulario') {
        return Flujo.Formulario;
    }
    return Flujo.Inicio;
}

export const toFormWithOnlyFlujoValidator = (object: any): FormWithOnlyFlujo => {
    const newForm: FormWithOnlyFlujo = {
        flujo: parseFlujo(object.flujo)
    }
    return newForm
}

export const toFormularioValidator = (object: any): Formulario => {
    const newForm: Formulario = {
        flujo: parseFlujo(object.flujo),
        name: parseName(object.name),
        documentoCifrado: parseDocumentoCifrado(object.documentoCifrado),
    }
    return newForm
}