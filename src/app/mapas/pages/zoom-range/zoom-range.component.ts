import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .mapa-container {
      width: 100%;
      height: 100%;
    }
    .row {
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      width: 400px;
      z-index: 999;
    }
  `]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef; //#mapa

  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number,number] = [-70.270800, -18.019230];

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off( 'zoom', () => {} );
    this.mapa.off( 'zoomend', () => {} );
    this.mapa.off( 'move', () => {} );
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      // container: 'mapa', // container ID
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      //center: [-74.5, 40], // starting position [lng, lat]
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
      });

    this.mapa.on('zoom',(ev) =>{
      this.zoomLevel  = this.mapa.getZoom();
    });  

    this.mapa.on('zoomend',(ev) =>{
      // this.zoomLevel  = this.mapa.getZoom();
      if(this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18);
      }
    });  

    this.mapa.on('move',(event)=>{
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [ lng, lat ];
    });

  }

  zoomOut(){
    this.mapa.zoomOut();
    // this.zoomLevel = this.mapa.getZoom();
  }

  zoomInt(){
    this.mapa.zoomIn();
    // this.zoomLevel = this.mapa.getZoom();
  }

  zoomCambio(valor: string){
    this.mapa.zoomTo( Number(valor));
  }

}
