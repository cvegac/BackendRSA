import { Router } from "express";
import {
    getLlaves,
    postEscenario,
} from "../api/modules/encript/encrypt.controler";

const router = Router();


/**
 * @swagger
 * components:
 *  schemas:
 *    Formulario:
 *      type: object
 *      properties:
 *        flujo:
 *          type: string
 *          description: Actualy position of schema
 *        name:
 *          type: string
 *          description: The name of the user
 *        documentoCifrado:
 *          type: string
 *          description: The id of the document encripted
 *      required:
 *        - flujo
 *      example:
 *          flujo: "inicio"
 *          name: "Cristhian Vega"
 *          documentoCifrado: "UyDrs7bRhLMP4Bs73nWGD7/X6853bbduGH/PMtmwE05XPeB/93DvqSF5YPJtz6FBFLv6INkiSyb7OCye1QE4eFclDK/Ewo4eyH8hYmDbhjISmlPVlzWq2UfuDOJ7yAsPi1vyE9j9LpAi2B4/WSXN38oNFxsBhQM9Mmjr2o0A1Zua219pTmdp7sQSaOCBm9NRqlGJWuL9VdMHc92ClQhN+V+NphNzt7CexhMNO0bP6dDaFvyBbQTXQRkHzx6IZ4lYamKYBIt4nP3DmG5KtTydYw4w83rvtvETxPBOHU3B6hPsDl3SyOuI7ZS3ttITTnxuBvG/N2YuaTuLOJVAnBAGfw=="
 *    PublicKey:
 *      type: object
 *      properties:
 *        publicKey:
 *          type: string
 *          description: Auto - generated publicKey
 *      required:
 *        - publicKey
 *      example:
 *          publicKey: "-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyMax1djLtBFvkoHF1HhM\r\nKHqnWFBpaoNwk6fjoHS4zZUEcu8kfOiKAD2i6t3TvAS+RKsKSExO7R5Pipc0T8Ss\r\nvu5WK79NRctcqj0M7OqOeLbwaVIBiYCDwFXWdhYLa+SswSE54jJZ+GQpLNh+ZX0Z\r\niyDFPhAaWcruEo9+VRIAmef8OVKromAD41fXKdeiN/i8Rkv4p29cn0TMh7PXL7Lc\r\ntJt2i+lSXbA2VxBNlpBZZcThBh1ReX0h133xtXJf32TjgHTs1XlRHB9XD4d1HN1l\r\nOCJVVSzTCn6GSJkmn+9CUjs1+D16jOCMsrQUB49qGtj6ncVfJdWoqLGX4gqgTw0b\r\n/QIDAQAB\r\n-----END PUBLIC KEY-----"
 *          
 */

/**
 * @swagger
 * /llaves:
 *  get:
 *    summary: Returns a public key
 *    tags: [PublicKey]
 *    responses:
 *      200:
 *        description: the list of tasks
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              
 */
router.get('/llaves', getLlaves);

/**
 * @swagger
 * /escenario:
 *  post:
 *    summary: Control the flow of aplication and recive the Formulary
 *    tags: [Formulario]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Formulario'
 *    responses:
 *      200:
 *        description: the flow is recive or the response for the data
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Formulario'
 *      500:
 *        description: Some server error
 *              
 */
router.post('/escenario', postEscenario);

export default router;