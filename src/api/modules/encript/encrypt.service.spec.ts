import { JWK } from 'node-jose';
import * as forge from 'node-forge';
import { desencriptarValor, encriptarValor, getPrivateKey, getPublicKey } from './encrypt.service';

describe('EncryptService', () => {
    let publicKey: any;
    let privateKey: any;

    beforeEach(async () => {
        const keystore = JWK.createKeyStore();
        const key = await keystore.generate('RSA', 2048, { alg: 'RSA-OAEP-256' });
        privateKey = await JWK.asKey(key.toJSON(true));
        publicKey = await JWK.asKey(key.toJSON());
    });

    it('should encrypt and decrypt a value', async () => {
        const message = 'Hello, World!';
        const publicKeyPem = forge.pki.publicKeyToPem(forge.pki.publicKeyFromPem(publicKey.toPEM(false)));
        const privateKeyPem = forge.pki.privateKeyToPem(forge.pki.privateKeyFromPem(privateKey.toPEM(true)));

        const encrypted = encriptarValor(publicKeyPem, message);
        const decrypted = desencriptarValor(privateKeyPem, encrypted);

        expect(decrypted).toBe(message);
    });

    it('should encrypt and decrypt a value using the service', async () => {
        const message = 'Hello, World!';
        const publicKeyPem = await getPublicKey();
        const privateKeyPem = await getPrivateKey();

        const encrypted = encriptarValor(publicKeyPem.publicKeyPem, message);
        const decrypted = desencriptarValor(privateKeyPem.privateKeyPem, encrypted);

        expect(decrypted).toBe(message);
    });

    describe('getPublicKey', () => {
        it('should generate RSA keys if public key is not available', async () => {
            const originalPublicKey = publicKey;
            publicKey = await getPublicKey();

            expect(publicKey).not.toBeNull();

            publicKey = originalPublicKey;
        });
    });

    describe('getPrivateKey', () => {
        it('should generate RSA keys if private key is not available', async () => {
            const originalPrivateKey = privateKey;
            privateKey = await getPrivateKey();

            expect(privateKey).not.toBeNull();

            privateKey = originalPrivateKey;
        });
    });
});
