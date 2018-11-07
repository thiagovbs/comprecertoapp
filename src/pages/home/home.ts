import { Component } from '@angular/core';
import { NavController, IonicPage,  } from 'ionic-angular';
import { CategoriaService } from '../../services/categoria.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categorias:Array<any>= [];

  constructor(public navCtrl: NavController, public categoriaService:CategoriaService) {
  }

  ionViewDidLoad() {

     this.categoriaService.findAll()
    .subscribe(response =>{
      console.log(response);
    },
    error =>{
      console.log(error);
    }) 

    //this.categorias = this.categoriaService.getAll()
    
  }

  onSubCategoria(item){
    this.navCtrl.push("SubcategoriaPage");
  }

  
  onSearch(){
    this.navCtrl.push('PesquisaPage')
  }

}
