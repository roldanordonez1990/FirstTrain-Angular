export interface DatosConJwt {
    jwt: string;
} 

export interface Usuario{
    id_usuario: number;
    rol: number;
    nombre: string;
    apellidos: string;
    dni: string;
    email: string;
    telefono: string;
    direccion: string;
    edad: string;
    nivel: number;
    password: string;
    info: string;
   
}
export interface Nivel_Entrenamiento{

    idniveles: number;
    nivel_corto: string;
    descripcion_nivel: string;
}

export interface Reserva{

    id_hora: number[];
    activo: boolean;
}

export interface Mezcla{

    nombre: string;
    apellidos: string;
    horas: string;
    fecha: Date;
    id_reservas: number;
}

export interface Horario{

    id_horario: number;
    horas: string;
    id_actividad: number;
    disponible: boolean;
    sumaHoras : number;
}

