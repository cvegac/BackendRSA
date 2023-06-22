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
exports.decryptValue = exports.desencriptarValor = exports.encriptarValor = exports.getPrivateKey = exports.getPublicKey = exports.generateRSAKeys = void 0;
const node_jose_1 = require("node-jose");
const forge = __importStar(require("node-forge"));
let privateKey;
let publicKey;
const generateRSAKeys = () => __awaiter(void 0, void 0, void 0, function* () {
    const keystore = node_jose_1.JWK.createKeyStore();
    const key = yield keystore.generate('RSA', 2048, { alg: 'RSA-OAEP-256' });
    privateKey = yield node_jose_1.JWK.asKey(key.toJSON(true));
    publicKey = yield node_jose_1.JWK.asKey(key.toJSON());
});
exports.generateRSAKeys = generateRSAKeys;
const getPublicKey = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!publicKey) {
        yield (0, exports.generateRSAKeys)();
    }
    const publicKeyPem = forge.pki.publicKeyToPem(forge.pki.publicKeyFromPem(publicKey.toPEM(false)));
    return {
        publicKeyPem
    };
});
exports.getPublicKey = getPublicKey;
const getPrivateKey = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!privateKey) {
        yield (0, exports.generateRSAKeys)();
    }
    const privateKeyPem = forge.pki.privateKeyToPem(forge.pki.privateKeyFromPem(privateKey.toPEM(true)));
    return {
        privateKeyPem
    };
});
exports.getPrivateKey = getPrivateKey;
// Encripta un campo tipo String con RSA pasándole la clave pública
function encriptarValor(strPublicKey, valorCampo) {
    const publicKey = forge.pki.publicKeyFromPem(strPublicKey);
    const buffer = forge.util.createBuffer(valorCampo, 'utf8');
    const binaryString = buffer.getBytes();
    const encrypted = publicKey.encrypt(binaryString, 'RSA-OAEP', {
        md: forge.md.sha512.create(),
        mgf1: {
            md: forge.md.sha512.create()
        }
    });
    return forge.util.encode64(encrypted);
}
exports.encriptarValor = encriptarValor;
// Desencripta un valor encriptado con RSA utilizando la clave privada
function desencriptarValor(strPrivateKey, valorEncriptado) {
    const privateKey = forge.pki.privateKeyFromPem(strPrivateKey);
    const encryptedBytes = forge.util.decode64(valorEncriptado);
    const decrypted = privateKey.decrypt(encryptedBytes, 'RSA-OAEP', {
        md: forge.md.sha512.create(),
        mgf1: {
            md: forge.md.sha512.create()
        }
    });
    return forge.util.decodeUtf8(decrypted);
}
exports.desencriptarValor = desencriptarValor;
function decryptValue(encriptedValue) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { privateKeyPem } = yield (0, exports.getPrivateKey)();
            const decrypted = desencriptarValor(privateKeyPem, encriptedValue);
            console.log('Mensaje desencriptado:', decrypted);
        }
        catch (error) {
            console.log('Error in decript: ', error);
        }
    });
}
exports.decryptValue = decryptValue;
