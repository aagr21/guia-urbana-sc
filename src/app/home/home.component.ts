import { Component, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MapComponent } from "./map/map.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { ChannelRoute } from "@models/interfaces";
import { FindLineRoute } from "@models/interfaces/line-route";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MapComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  channelsRoutes: ChannelRoute[] = [];
  @ViewChild('map') mapComponent!: MapComponent;
  @ViewChild('drawer') drawer!: MatDrawer;


  changeChannelsRoutes(channelsRoutes: ChannelRoute[]) {
    this.channelsRoutes = channelsRoutes;
  }

  _onLineSelected(findLineRoute: FindLineRoute) {
    this.mapComponent.lineSelected(findLineRoute).subscribe({
      next: () => {
        this.drawer.toggle();
      },
    });
  }
}
