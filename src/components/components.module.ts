import { NgModule } from '@angular/core';
import { BtnQntProdutoComponent } from './btn-qnt-produto/btn-qnt-produto';
import { SacolaItemComponent } from './sacola-item/sacola-item';
import { IonicModule } from 'ionic-angular';
import { ProdutoItemComponent } from './produto-item/produto-item';
import { PipesModule } from '../pipes/pipes.module';
import { WizardTipoRetiradaComponent } from './steps-pedido/wizard-tipo-retirada/wizard-tipo-retirada';
import { WizardTipoPagamentoComponent } from './steps-pedido/wizard-tipo-pagamento/wizard-tipo-pagamento';
import { WizardMsgStep_1Component } from './steps-pedido/wizard-msg-step-1/wizard-msg-step-1';
import { WizardPedidoFinalizadoComponent } from './steps-pedido/wizard-pedido-finalizado/wizard-pedido-finalizado';


@NgModule({
	declarations: [
		BtnQntProdutoComponent,
		SacolaItemComponent,
		ProdutoItemComponent,
		WizardTipoRetiradaComponent,
		WizardTipoPagamentoComponent,
		WizardMsgStep_1Component,
		WizardPedidoFinalizadoComponent
	],
	imports: [
		PipesModule,
		IonicModule,
	],
	exports: [
		BtnQntProdutoComponent,
		SacolaItemComponent,
		ProdutoItemComponent,
		WizardTipoRetiradaComponent,
		WizardTipoPagamentoComponent,
		WizardMsgStep_1Component,
		WizardPedidoFinalizadoComponent
	]
})
export class ComponentsModule { }
