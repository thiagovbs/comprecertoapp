import { NgModule } from '@angular/core';
import { BtnQntProdutoComponent } from './btn-qnt-produto/btn-qnt-produto';
import { SacolaItemComponent } from './sacola-item/sacola-item';
import { IonicModule } from 'ionic-angular';
import { ProdutoItemComponent } from './produto-item/produto-item';





@NgModule({
	declarations: [
		BtnQntProdutoComponent,
		SacolaItemComponent,
    ProdutoItemComponent,
    
		],
	imports: [
		IonicModule
	],
	exports:[
		BtnQntProdutoComponent,
		SacolaItemComponent,
    ProdutoItemComponent,
    
	]
})
export class ComponentsModule {}
