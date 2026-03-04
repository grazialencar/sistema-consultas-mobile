import { Especialidade } from "../types/especialidade"; 
export interface Medico{
    id: number;
    crm: String;
    especialidade: String;
    ativo: boolean
}