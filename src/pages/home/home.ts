import { Component } from '@angular/core';
import { NavController, IonicPage,  } from 'ionic-angular';
import { CategoriaService } from '../../services/categoria.service';
import { UsuarioService } from '../../services/usuario.service';
import { Categoria } from '../../models/categoria.model';
import { SupermercadoService } from '../../services/supermercado.service';
import { Supermercado } from '../../models/supermercado.model';
import { Observable } from 'rxjs';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categorias:Observable<Categoria[]>;
  mercados: Supermercado[];

  constructor(public navCtrl: NavController,
              private categoriaService:CategoriaService,
              private mercadoService:SupermercadoService) {
  }

  ionViewDidLoad() {

    //Carregando as Categorias
    this.categorias = this.categoriaService.categorias;

    //Carregando os Mercados
    this.mercadoService.findAll()
    .subscribe(response =>{
     this.mercados = response;
     
   }, erro =>{}) 

  }

  onSubCategoria(item:Categoria){
    this.navCtrl.push("SubcategoriaPage", {
      cat: item
    });
  }
  
  onSearch(){
    this.navCtrl.push('PesquisaPage')
  }

}
