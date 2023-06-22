export enum Flujo {
    Inicio = 'inicio',
    Formulario = 'formulario'
}

export interface Formulario {
    flujo: Flujo;
    name: string;
    documentoCifrado: string;
}

export type FormWithOnlyFlujo = Omit<Formulario, 'name' | 'documentoCifrado'>;

export enum Mensaje {
    OkMesaje = "¡DATOS RECIBIDOS!",
    BatMesaje = "¡DATOS INCORRECTOS!"
}

export interface Result {
    exitoso: boolean;
    mensaje: string;
}

