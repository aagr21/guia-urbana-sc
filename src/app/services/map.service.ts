import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment.prod";
import { ChannelRoute, LineName, LineRoute } from "@models/interfaces";
import { FindLineRoute } from "@models/interfaces/line-route";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  http = inject(HttpClient);

  findAllLinesNames() {
    return this.http.get<LineName[]>(`${environment.apiBaseUrl}/lines-names`);
  }

  findAllChannelsRoutes() {
    return this.http.get<ChannelRoute[]>(`${environment.apiBaseUrl}/channels-routes`);
  }

  findLineRoutesByName(findLineRoute: FindLineRoute) {
    return this.http.post<LineRoute>(`${environment.apiBaseUrl}/lines-routes/find-line-route`, findLineRoute);
  }
}
