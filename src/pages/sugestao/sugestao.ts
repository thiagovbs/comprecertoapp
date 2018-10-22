import { Component} from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-sugestao',
  templateUrl: 'sugestao.html',
})
export class SugestaoPage {
  
item:{expanded:boolean, text:string}=   {expanded:false, text:""};
item2:{expanded:boolean, text:string} = {expanded:false, text:""};
item3:{expanded:boolean, text:string} = {expanded:false, text:""};


onSearch(){
  this.navCtrl.push('PesquisaPage')
}


itemsExpandedHeight:number= 200;
  constructor(public navCtrl: NavController) {

    this.item ={expanded:false, text:"Qual mercado você gostaria de ver no Comprecerto?"};
    this.item2 ={expanded:false, text:"Indique uma cidade ou estado que os nossos serviços não estão disponíveis?"};
    this.item3 ={expanded:false, text:"Nos ajude a melhorar enviando sugestões ou informando problemas"};
/*     this.items =[
      {expanded:false, text:"por que o compre certo não é a maior plataforma de comida do mundo?"},
      { expanded:false, text:"indique uma cidade ou estado em que nossos serviços não estão disponiveis"},
    ] */
  }

  expandItem(item){
    item.expanded = !item.expanded;
  }
 
}
