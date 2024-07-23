import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ChannelOption, ChannelsComponent } from "@home/sidebar/channels/channels.component";
import { MapService } from "@services/map.service";
import { ChannelRoute, LineName } from "@models/interfaces";
import { LinesComponent } from "@home/sidebar/lines/lines.component";
import { FindLineRoute } from "@models/interfaces/line-route";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ChannelsComponent,
    LinesComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  channelsRoutes: ChannelRoute[] = [];
  filterChannelsRoutes: ChannelRoute[] = [];
  linesNames: LineName[] = [];
  @Output() lineSelected = new EventEmitter<FindLineRoute>();

  ngOnInit(): void {
    this.mapService.findAllChannelsRoutes().subscribe({
      next: (data) => {
        this.channelsRoutes = data;
      },
    });
    this.mapService.findAllLinesNames().subscribe({
      next: (data) => {
        this.linesNames = data;
      },
    });
  }

  activeSection = 1;
  @Output() closingSidebar = new EventEmitter<void>();
  mapService = inject(MapService);
  @Output() changeChannelsRoutes = new EventEmitter<ChannelRoute[]>();


  setActiveSection(section: number) {
    if (this.activeSection === section) {
      this.closingSidebar.emit();
    }
    this.activeSection = section;
  }

  changeChannelsRoutesHandler(channelOption: ChannelOption) {
    switch (channelOption) {
      case ChannelOption.hide:
        this.filterChannelsRoutes = [];
        break;
      case ChannelOption.all:
        this.filterChannelsRoutes = this.channelsRoutes;
        break;
      case ChannelOption.primaries:
        this.filterChannelsRoutes = this.channelsRoutes.filter(route => route.isPrimary);
        break;
      case ChannelOption.secondaries:
        this.filterChannelsRoutes = this.channelsRoutes.filter(route => !route.isPrimary);
        break;
    }
    this.changeChannelsRoutes.emit(this.filterChannelsRoutes);
  }

  _onLineSelected(findLineRoute: FindLineRoute) {
    this.lineSelected.emit(findLineRoute);
  }
}
