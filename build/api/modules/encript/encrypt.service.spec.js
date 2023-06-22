"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const node_jose_1 = require("node-jose");
const forge = __importStar(require("node-forge"));
const encrypt_service_1 = require("./encrypt.service");
describe('EncryptService', () => {
    let publicKey;
    let privateKey;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const keystore = node_jose_1.JWK.createKeyStore();
        const key = yield keystore.generate('RSA', 2048, { alg: 'RSA-OAEP-256' });
        privateKey = yield node_jose_1.JWK.asKey(key.toJSON(true));
        publicKey = yield node_jose_1.JWK.asKey(key.toJSON());
    }));
    it('should encrypt and decrypt a value', () => __awaiter(void 0, void 0, void 0, function* () {
        const message = 'Hello, World!';
        const publicKeyPem = forge.pki.publicKeyToPem(forge.pki.publicKeyFromPem(publicKey.toPEM(false)));
        const privateKeyPem = forge.pki.privateKeyToPem(forge.pki.privateKeyFromPem(privateKey.toPEM(true)));
        const encrypted = (0, encrypt_service_1.encriptarValor)(publicKeyPem, message);
        const decrypted = (0, encrypt_service_1.desencriptarValor)(privateKeyPem, encrypted);
        expect(decrypted).toBe(message);
    }));
    it('should encrypt and decrypt a value using the service', () => __awaiter(void 0, void 0, void 0, function* () {
        const message = 'Hello, World!';
        const publicKeyPem = yield (0, encrypt_service_1.getPublicKey)();
        const privateKeyPem = yield (0, encrypt_service_1.getPrivateKey)();
        const encrypted = (0, encrypt_service_1.encriptarValor)(publicKeyPem.publicKeyPem, message);
        const decrypted = (0, encrypt_service_1.desencriptarValor)(privateKeyPem.privateKeyPem, encrypted);
        expect(decrypted).toBe(message);
    }));
    describe('getPublicKey', () => {
        it('should generate RSA keys if public key is not available', () => __awaiter(void 0, void 0, void 0, function* () {
            const originalPublicKey = publicKey;
            publicKey = yield (0, encrypt_service_1.getPublicKey)();
            expect(publicKey).not.toBeNull();
            publicKey = originalPublicKey;
        }));
    });
    describe('getPrivateKey', () => {
        it('should generate RSA keys if private key is not available', () => __awaiter(void 0, void 0, void 0, function* () {
            const originalPrivateKey = privateKey;
            privateKey = yield (0, encrypt_service_1.getPrivateKey)();
            expect(privateKey).not.toBeNull();
            privateKey = originalPrivateKey;
        }));
    });
});
