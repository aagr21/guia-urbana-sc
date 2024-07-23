import { Component, EventEmitter, Output } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from "@angular/material/slide-toggle";

export enum ChannelOption {
  hide = 0,
  all = 1,
  primaries = 2,
  secondaries = 3,
}

@Component({
  selector: 'app-channels',
  standalone: true,
  imports: [
    MatSlideToggle
  ],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss'
})
export class ChannelsComponent {
  channelOptions = ChannelOption;
  selectedOption = ChannelOption.hide;
  @Output() closingSidebar = new EventEmitter<void>();
  @Output() selectedOptionChange = new EventEmitter<ChannelOption>();


  constructor() {
  }

  selectOption(event: MatSlideToggleChange, option: ChannelOption): void {
    if (this.selectedOption === option) {
      event.source.toggle();
      return;
    }
    this.selectedOption = option;
    this.selectedOptionChange.emit(option);
    setTimeout(() => {
      this.closingSidebar.emit();
    }, 350);
  }

}
