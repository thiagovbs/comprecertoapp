import { Injectable } from "@angular/core";

@Injectable()
export class SacolaService {

    items=[];

    constructor(){}


    aumentaQnt(item:any){
        item.quantidade = item.quantidade+1; 
    }

    diminuiQnt(item:any){
        item.quantidade = item.quantidade-1; 
       
    }

    total():number{
        return this.items.map(item => item.value())
                         .reduce((prev, value)=> prev+value, 0)
    }
}