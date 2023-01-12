import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifs } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[] = [];

  private apiKey:string = "QmWnpC2CeJXiAnrBoHnu74O2heezWpfK";
   private servicioUrl:string = "https://api.giphy.com/v1/gifs";
  public resultados:Gif[] =[];

  get historial(){
    return [...this._historial];
  }

  constructor(private http:HttpClient){

    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];
    this.resultados = JSON.parse(localStorage.getItem("resultado")!) || [];
    // if(localStorage.getItem("Historial")){
    //   this._historial = JSON.parse(localStorage.getItem("historial")!)
    // }

  }



  buscarGifs(query:string){

    query = query.toLocaleLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this.historial));
    }

    const params = new HttpParams()
                   .set('api_key', this.apiKey)
                   .set('limit', '10')
                   .set('q', query);

    this.http.get<SearchGifs>(`${this.servicioUrl}/search`, {params: params})
    .subscribe(resp => {
     // console.log(resp.data);
      this.resultados = resp.data
      localStorage.setItem('resultado', JSON.stringify(this.resultados));
    });

// fetch("https://api.giphy.com/v1/gifs/trending?api_key=QmWnpC2CeJXiAnrBoHnu74O2heezWpfK")
// .then(response => {
//   response.json().then(data => {
//     console.log(data);
//   })
// })
  }

}
