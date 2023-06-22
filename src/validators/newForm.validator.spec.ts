import { Flujo, } from "../types";
import { parseFlujo, parseName, parseDocumentoCifrado, isString, isEmpty, isFlujo, typeNewEntry } from "./newForm.validator";

describe('YourFile', () => {
    describe('parseFlujo', () => {
        it('should parse a valid flujo', () => {
            const flujoFromRequest = 'inicio';
            const result = parseFlujo(flujoFromRequest);
            expect(result).toBe(Flujo.Inicio);
        });

        it('should throw an error for an invalid flujo', () => {
            const flujoFromRequest = 'invalid';
            expect(() => parseFlujo(flujoFromRequest)).toThrowError('Incorrect flujo from request');
        });

        it('should throw an error for an empty flujo', () => {
            const flujoFromRequest = '';
            expect(() => parseFlujo(flujoFromRequest)).toThrowError('Incorrect flujo from request');
        });
    });

    describe('parseName', () => {
        it('should parse a valid name', () => {
            const nameFromRequest = 'John Doe';
            const result = parseName(nameFromRequest);
            expect(result).toBe(nameFromRequest);
        });

        it('should throw an error for an invalid name', () => {
            const nameFromRequest = 123;
            expect(() => parseName(nameFromRequest)).toThrowError('Incorrect name from request');
        });

        it('should throw an error for an empty name', () => {
            const nameFromRequest = '';
            expect(() => parseName(nameFromRequest)).toThrowError('Incorrect name from request');
        });
    });

    describe('parseDocumentoCifrado', () => {
        it('should parse a valid documentoCifrado', () => {
            const documentoCifradoFromRequest = 'encrypted value';
            const result = parseDocumentoCifrado(documentoCifradoFromRequest);
            expect(result).toBe(documentoCifradoFromRequest);
        });

        it('should throw an error for an invalid documentoCifrado', () => {
            const documentoCifradoFromRequest = 123;
            expect(() => parseDocumentoCifrado(documentoCifradoFromRequest)).toThrowError('Incorrect documentoCifrado from request');
        });

        it('should throw an error for an empty documentoCifrado', () => {
            const documentoCifradoFromRequest = '';
            expect(() => parseDocumentoCifrado(documentoCifradoFromRequest)).toThrowError('Incorrect documentoCifrado from request');
        });
    });

    describe('isString', () => {
        it('should return true for a string', () => {
            const string = 'Hello, World!';
            const result = isString(string);
            expect(result).toBe(true);
        });

        it('should return false for a non-string', () => {
            const number = 123;
            const result = isString(number);
            expect(result).toBe(false);
        });
    });

    describe('isEmpty', () => {
        it('should return true for an empty string', () => {
            const string = '';
            const result = isEmpty(string);
            expect(result).toBe(true);
        });

        it('should return false for a non-empty string', () => {
            const string = 'Hello, World!';
            const result = isEmpty(string);
            expect(result).toBe(false);
        });
    });

    describe('isFlujo', () => {
        it('should return true for a valid flujo', () => {
            const flujo = Flujo.Inicio;
            const result = isFlujo(flujo);
            expect(result).toBe(true);
        });

        it('should return false for an invalid flujo', () => {
            const flujo = 'invalid';
            const result = isFlujo(flujo);
            expect(result).toBe(false);
        });
    });

    describe('typeNewEntry', () => {
        it('should return Flujo.Inicio for flujo "inicio"', () => {
            const object = { flujo: 'inicio' };
            const result = typeNewEntry(object);
            expect(result).toBe(Flujo.Inicio);
        });

        it('should return Flujo.Formulario for flujo "formulario"', () => {
            const object = { flujo: 'formulario' };
            const result = typeNewEntry(object);
            expect(result).toBe(Flujo.Formulario);
        });

        it('should return Flujo.Inicio for an invalid flujo', () => {
            const object = { flujo: 'invalid' };
            const result = typeNewEntry(object);
            expect(result).toBe(Flujo.Inicio);
        });
    });

    // Add more tests for other functions and validators

});
