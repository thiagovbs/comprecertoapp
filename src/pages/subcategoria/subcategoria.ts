import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubCategoriaService } from '../../services/subcategorias.service';



@IonicPage()
@Component({
  selector: 'page-subcategoria',
  templateUrl: 'subcategoria.html',
})
export class SubcategoriaPage {

  categoriaNome:string

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private subcategoriaService:SubCategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaNome = this.navParams.get('catNome')

    this.subcategoriaService.findSubCategorias().subscribe( (response:any) =>{
      console.log(response);
    },error=>{})
  }

  
  onSearch(){
    this.navCtrl.push('PesquisaPage')
  }

}
