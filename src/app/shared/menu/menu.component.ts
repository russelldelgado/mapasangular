import { Component} from '@angular/core';


interface MenuItem{
  ruta : string;
  name : string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  `
  li{
    cursor : pointer;
  }
  `
  ]
})
export class MenuComponent{

  menuItems : MenuItem[] = [
    {
      ruta : "/mapas/fullscreem",
      name : "fullscreem",
    },
    {
      ruta : "/mapas/zoom-range",
      name : "zoom range",
    },
    {
      ruta : "/mapas/marcadores",
      name : "marcadores",
    },
    {
      ruta : "/mapas/propiedades",
      name : "propiedades",
    },
    
]

}
