import { Component } from '@angular/core';

/**
 * Generated class for the AlcanceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'alcance',
  templateUrl: 'alcance.html'
})
export class AlcanceComponent {

  text: string;

  constructor() {
    console.log('Hello AlcanceComponent Component');
    this.text = 'Hello World';
  }

}
