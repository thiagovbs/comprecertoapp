import { Component } from '@angular/core';
import { NavController, IonicPage,  } from 'ionic-angular';
import { CategoriaService } from '../../services/categoria.service';
import { UsuarioService } from '../../services/usuario.service';
import { Categoria } from '../../models/categoria.model';
import { SupermercadoService } from '../../services/supermercado.service';
import { Supermercado } from '../../models/supermercado.model';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categorias: Categoria[];
  mercados: Supermercado[];

  constructor(public navCtrl: NavController,
              private categoriaService:CategoriaService,
              private mercadoService:SupermercadoService) {
  }

  ionViewDidLoad() {

    //Carregando as Categorias
    this.categoriaService.findAll()
     .subscribe(response =>{
      this.categorias = response;
      
    }, error=>{})
    
    //Carregando os Mercados
    this.mercadoService.findAll()
    .subscribe(response =>{
     this.mercados = response;
     console.log(this.mercados);
   }, erro =>{}) 
  }

  onSubCategoria(item){
    this.navCtrl.push("SubcategoriaPage", {
      catNome: item.nome
    });
  }

  
  onSearch(){
    this.navCtrl.push('PesquisaPage')
  }

}
