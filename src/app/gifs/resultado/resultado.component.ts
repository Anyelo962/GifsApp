import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
})
export class ResultadoComponent {


  get resultados(){
    return this.gifs.resultados;
 }
  constructor(private gifs: GifsService){}



}
