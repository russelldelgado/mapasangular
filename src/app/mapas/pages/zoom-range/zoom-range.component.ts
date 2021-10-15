import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container{
        height : 100%;
        width : 100%;      }

      .row{
        background-color : white;
        z-index : 9999999999;
        position : fixed;
        bottom : 50px;
        left:50px;
        padding : 10px;
        border-radius  : 10px;
        width : 400px;
      }

`

  ]
})
export class ZoomRangeComponent implements AfterViewInit , OnDestroy {


  @ViewChild("mapa") divMapa!: ElementRef;

  mapa! : mapboxgl.Map;
  zoom : number = 10;
  center : [number , number ] = [-3.7838413 ,37.7801164];


  // get getZoom(){
  //  return this.mapa?.getZoom();
  // }
//siempre que creemos algun tipo de evento tenemos que destruirlo al destruir el componente
  ngOnDestroy(): void {
    this.mapa.off('zoom' , ()=>{});
    this.mapa.off('zoomend' , ()=>{});
    this.mapa.off('move' , ()=>{});
  }

  ngAfterViewInit(): void {

     this.mapa = new mapboxgl.Map({
      container : this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center : this.center,
      zoom : this.zoom,

    });

    

    this.mapa.on("zoom", (evento) => {
      this.zoom = this.mapa.getZoom();
    });


    this.mapa.on("zoomend", (evento) => {

      if(this.mapa.getZoom() > 18){
       this.mapa.zoomTo(18)
      }
    });

    this.mapa.on("move" , (event) =>{

      var target  = event.target;

      const { lng ,  lat } = target.getCenter();

      this.center = [lat , lng];

    })

  }


  zoomOut(){
    this.mapa.zoomOut();
    this.zoom = this.mapa.getZoom();
  }



  zoomIn(){
    this.mapa.zoomIn();
    this.zoom = this.mapa.getZoom();

  }


  zoomCambiando(value : string){
    this.mapa.zoomTo(Number(value));
  }

}
