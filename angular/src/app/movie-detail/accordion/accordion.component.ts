import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  animations: [
    trigger('openClose', [
      state('open', style({
        display: 'flex',
        visibility: 'visible'
      })),
      state('closed', style({
        display: 'none',
        visibility: 'collapse'
      })),
      transition('open => closed', [
        animate('300ms')
      ]),
      transition('closed => open', [
        animate('300ms')
      ]),
    ]),
    trigger('openCloseIcon', [
      state('open', style({
        transform: 'rotate(180deg)',
      })),
      state('closed', style({
        // transform: 'rotate(180deg)'
      })),
      transition('open => closed', [
        animate('300ms')
      ]),
      transition('closed => open', [
        animate('300ms')
      ]),
    ]),
  ],
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input() title: string;
  isOpen: boolean;

  constructor() {
    this.isOpen = false;
  }

  ngOnInit() {
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

}
