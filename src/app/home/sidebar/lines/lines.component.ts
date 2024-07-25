import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { LineName } from "@models/interfaces";
import { MatCardModule } from "@angular/material/card";
import { TitleCasePipe } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { FindLineRoute } from "@models/interfaces/line-route";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-lines',
  standalone: true,
  imports: [
    MatCardModule,
    TitleCasePipe,
    MatButton,
    MatFormField,
    MatInput,
    FormsModule
  ],
  templateUrl: './lines.component.html',
  styleUrl: './lines.component.scss',
})
export class LinesComponent implements OnDestroy {
  isSmallScreen = false;
  private subscription!: Subscription;

  @Input() linesNames: LineName[] = [];
  @Input() result: LineName[] = [];
  @Output() lineSelected = new EventEmitter<FindLineRoute>();
  searchText: string = '';


  constructor(
    breakpointObserver: BreakpointObserver
  ) {
    this.subscription = breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
    ]).subscribe({
      next: result => {
        this.isSmallScreen = result.matches;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(searchText: string) {
    this.result = this.linesNames.filter((lineName) =>
      lineName.name!.includes(searchText.toUpperCase())
    );
  }

  onSearchText(searchText: string) {
    this.search(searchText);
  }

  onLineSelected(lineName: LineName, ground: string) {
    this.lineSelected.emit({ name: lineName.name!, ground });
  }
}
