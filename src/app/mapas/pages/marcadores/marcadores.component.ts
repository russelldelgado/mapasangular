import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';



interface MarcadorColor{
  color : string;
  marker? : mapboxgl.Marker;
  centro? : [number , number]; 
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
      height : 100%;
      width : 100%;}

      .list-group{
        position : fixed;
        right : 20px;
        z-index :99;
      }

      li{
        cursor : pointer;
      }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild("mapa") divMapa!: ElementRef;

  mapa! : mapboxgl.Map;
  zoom : number = 10;
  center : [number , number ] = [-3.7838413 ,37.7801164];

  marcadores : MarcadorColor[] = [];


  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
     container : this.divMapa.nativeElement,
     style: 'mapbox://styles/mapbox/streets-v11',
     center : this.center,
     zoom : this.zoom,
   });

   this.leerLocalStorage();

    //  const marcadorHtml : HTMLElement = document.createElement("div");
    //  marcadorHtml.innerHTML = "Russell jhoel delgado muñoz"
    // new mapboxgl.Marker({
    //   element : marcadorHtml
    // }).setLngLat(this.center).addTo(this.mapa);
}


agregarMarcador(){
  const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
  var marcador = new mapboxgl.Marker({draggable : true , color}).setLngLat(this.center).addTo(this.mapa);
  console.log("pulsando");
  this.marcadores.push({
    color,
    marker : marcador,
  });

  this.guardarEnLocalStorage();
}

irMarcador( marcador: MarcadorColor){
  console.log(`marcador ${ marcador.color }`);

  this.mapa.flyTo({center : marcador.marker!.getLngLat()})
  
}


guardarEnLocalStorage(){
  console.log("guardando en local storage");

  var latLngArr : MarcadorColor[] = [];

  this.marcadores.forEach(m => {

   const color : string = m.color;
   const {lng , lat} = m.marker?.getLngLat()!;

    latLngArr.push({
      color,
      centro :[lng , lat],
    })

  });

  localStorage.setItem('marcador' , JSON.stringify( latLngArr))

}


leerLocalStorage(){
  if(!localStorage.getItem('marcador')){
    return;
  }
  const marcadores : MarcadorColor[] =  JSON.parse( localStorage.getItem("marcador")! ) ;
  console.log(` leyendo de local storage ${ marcadores } `);

   marcadores.forEach(marc => {
    const newMarket =   new mapboxgl.Marker({draggable  :true , color : marc.color }).setLngLat(marc.centro!).addTo(this.mapa);
    this.marcadores.push({
      marker : newMarket,
      color : marc.color
    });
  });


}




}