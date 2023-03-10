import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  constructor(private _historial:GifsService){}

  get historial(){
    return this._historial.historial;
  }


  buscar(termino:string){
    return this._historial.buscarGifs(termino);
  }
  
}
