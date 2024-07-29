import { Component, inject, Input, OnDestroy } from '@angular/core';
import {
  LeafletControlLayersConfig,
  LeafletModule,
} from '@bluehalo/ngx-leaflet';
import {
  Control,
  latLng,
  MapOptions,
  tileLayer,
  Map,
  LatLng,
  LeafletEvent,
  LocationEvent,
  polyline,
  Polyline,
  Layer,
} from 'leaflet';
import { Observable, Subscription, tap, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgxLeafletLocateModule } from '@runette/ngx-leaflet-locate';
import { ChannelRoute } from '@models/interfaces';
import { FindLineRoute } from '@models/interfaces/line-route';
import { MapService } from '@services/map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule, NgxLeafletLocateModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnDestroy {
  options: MapOptions = {
    layers: [
      tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        attribution: 'Google Maps',
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        maxNativeZoom: 20,
      }),
    ],
    zoom: 13,
    center: latLng(-17.779223, -63.18164),
    attributionControl: false,
    maxBoundsViscosity: 1.0,
    zoomAnimation: true,
  };

  baseLayers: {
    [name: string]: Layer;
  } = {
    'Google Maps': tileLayer(
      'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    ),
    'Google Satellite': tileLayer(
      'https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
      {
        maxZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    ),
    'Open Street Map': tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 20,
      }
    ),
  };

  myLocation?: LatLng;
  map!: Map;
  lineRoutesSelected: Polyline[] = [];

  constructor() {
    this.subscription = this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

  @Input() channelsRoutes: ChannelRoute[] = [];

  isSmallScreen = false;
  private subscription!: Subscription;
  breakpointObserver = inject(BreakpointObserver);
  locateOptions: Control.LocateOptions = {
    position: 'bottomright',
    strings: {
      title: 'Mostrar mi ubicación actual',
    },
    locateOptions: {
      enableHighAccuracy: true,
      watch: true,
    },
    keepCurrentZoomLevel: true,
    flyTo: true,
    cacheLocation: true,
  };

  mapService = inject(MapService);

  onMapReady(map: Map) {
    this.map = map;
    this.map.on('locatedeactivate', this._onLocateDeactivate.bind(this));
  }

  _onLocateDeactivate(_: LeafletEvent) {
    this.myLocation = undefined!;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  styleMap(): string {
    if (this.isSmallScreen) {
      return 'height: calc(100% - 155.43px); width: 100%';
    } else {
      return 'height: calc(100% - 139.58px); width: 100%;';
    }
  }

  _onNewLocation(event: LocationEvent) {
    this.myLocation = event.latlng;
  }

  createPolyline(channelRoute: ChannelRoute) {
    return polyline(
      channelRoute.geom.coordinates.map((coordinate: number[]) => {
        return [coordinate[1], coordinate[0]];
      }),
      {
        color: channelRoute.color,
        weight: 3,
      }
    );
  }

  lineSelected(findLineRoute: FindLineRoute): Observable<void> {
    this.lineRoutesSelected = [];
    return this.mapService.findLineRoutesByName(findLineRoute).pipe(
      tap((response) => {
        const coordinates = response.geom.coordinates.map((coordinate) =>
          latLng(coordinate[1], coordinate[0])
        );
        this.lineRoutesSelected.push(
          polyline(coordinates, {
            color: '#EE675C',
            weight: 3,
          })
        );
      }),
      map(() => undefined) // Transforma el resultado en un observable de tipo void
    );
  }
}
