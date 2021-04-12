import { Curso } from "./Curso";
import { Materia } from "./Materia";
import { Profesor } from "./Profesor";

export class Asignatura{
    id!:number;
    materia!:String;
    profesor!:String;
    grado!:number;
    salon!:String;
    estudiante!:String;
}