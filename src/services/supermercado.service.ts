import { Injectable } from "@angular/core";
import { SUPERMERCADOS } from "../models/supermercado.model";

@Injectable()
export class SupermercadoService{

    private supermercados:any =[]

    constructor(){
        this.supermercados = SUPERMERCADOS;
    }

    getAll() {
        return this.supermercados;
      }

    

}