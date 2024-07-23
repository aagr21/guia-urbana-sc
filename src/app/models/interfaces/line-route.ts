export interface LineRoute {
  id: number;
  geom: Geom;
  name: string;
  ground: string;
  direction: string;
}

export interface Geom {
  type: string;
  coordinates: Array<[number, number]>;
}

export interface FindBestLineRoute {
  coordinates: Array<[number, number]>;
}

export interface FindLineRoute {
  name?: string;
  ground?: string;
}

export interface NearestLinesRoutes {
  coordinate: [number, number];
}

export interface PlaneTravel {
  myLocationCoordinate: [number, number];
  destinationCoordinate: [number, number];
}
