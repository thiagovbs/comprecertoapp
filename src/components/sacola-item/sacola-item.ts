import { Component } from '@angular/core';
import { SacolaService } from '../../services/sacola.service';

/**
 * Generated class for the SacolaItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sacola-item',
  templateUrl: 'sacola-item.html'
})
export class SacolaItemComponent {



  constructor(public sacolaService:SacolaService) {
  }

  AddItem(item){
    console.log(item);
    //this.sacolaService.aumentaQnt(item);
  }

}
