import { Component } from '@angular/core';

/**
 * Generated class for the ProdutoItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'produto-item',
  templateUrl: 'produto-item.html'
})
export class ProdutoItemComponent {

  text: string;

  constructor() {
    console.log('Hello ProdutoItemComponent Component');
    this.text = 'Hello World';
  }

}
