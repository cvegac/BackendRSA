import { JWK } from 'node-jose';
import * as forge from 'node-forge';

let privateKey: any;
let publicKey: any;

export const generateRSAKeys = async () => {
    const keystore = JWK.createKeyStore();
    const key = await keystore.generate('RSA', 2048, { alg: 'RSA-OAEP-256' });

    privateKey = await JWK.asKey(key.toJSON(true));
    publicKey = await JWK.asKey(key.toJSON());
}

export const getPublicKey = async () => {
    if (!publicKey) {
        await generateRSAKeys();
    }

    const publicKeyPem = forge.pki.publicKeyToPem(forge.pki.publicKeyFromPem(publicKey.toPEM(false)));

    return {
        publicKeyPem
    };
}

export const getPrivateKey = async () => {
    if (!privateKey) {
        await generateRSAKeys();
    }

    const privateKeyPem = forge.pki.privateKeyToPem(forge.pki.privateKeyFromPem(privateKey.toPEM(true)));

    return {
        privateKeyPem
    };
}

// Encripta un campo tipo String con RSA pasándole la clave pública
export function encriptarValor(strPublicKey: string, valorCampo: string): string {
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

// Desencripta un valor encriptado con RSA utilizando la clave privada
export function desencriptarValor(strPrivateKey: string, valorEncriptado: string): string {
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

export async function decryptValue(encriptedValue: string): Promise<void> {
    try {

        const { privateKeyPem } = await getPrivateKey();

        const decrypted = desencriptarValor(privateKeyPem, encriptedValue);

        console.log('Mensaje desencriptado:', decrypted);
    } catch (error) {
        console.log('Error in decript: ', error);
    }
}
