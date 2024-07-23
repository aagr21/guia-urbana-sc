import { Component, inject, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
  isSmallScreen = false;
  breakpointObserver = inject(BreakpointObserver);
  private subscription!: Subscription;

  constructor(
  ) {
    this.subscription = this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
