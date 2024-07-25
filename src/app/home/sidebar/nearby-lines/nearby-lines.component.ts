import { Component, Input } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { Marker } from "leaflet";

@Component({
  selector: 'app-nearby-lines',
  standalone: true,
    imports: [
        MatButton
    ],
  templateUrl: './nearby-lines.component.html',
  styleUrl: './nearby-lines.component.scss'
})
export class NearbyLinesComponent {
  @Input() myLocation!: Marker;
}
