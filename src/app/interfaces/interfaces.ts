export interface DatosConJwt {
    jwt: string;
} 


export interface Usuario{
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

