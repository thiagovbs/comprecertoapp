import { Component } from '@angular/core';

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
