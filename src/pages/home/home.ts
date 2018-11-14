import { Component } from '@angular/core';
import { NavController, IonicPage,  } from 'ionic-angular';
import { CategoriaService } from '../../services/categoria.service';
import { UsuarioService } from '../../services/usuario.service';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categorias:Array<any>= [];

  constructor(public navCtrl: NavController,
              private categoriaService:CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
     .subscribe(response =>{
      this.categorias = response;
    }, error=>{
      
    }) 
  }

  onSubCategoria(item){
    this.navCtrl.push("SubcategoriaPage");
  }

  
  onSearch(){
    this.navCtrl.push('PesquisaPage')
  }

}
