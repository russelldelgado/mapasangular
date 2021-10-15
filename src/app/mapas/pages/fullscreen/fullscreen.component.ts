import { Component, OnInit } from '@angular/core';
//con esto le digo cogeme toda la libreria y me la vas a conocer como mapboxgl
//antes de hacer esto necesito hacer npm i --save-dev @types/mapbox-gl
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styles: [
    `
    #mapa{
      width : 100%;
      height: 100%;
    }
    `
  ]
})
export class FullscreenComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center : [ -3.7838413 , 37.7801164 ],
      zoom : 20,
      
    });
    
  }

   




}
