import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ps-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
  @Input() text: string;
  constructor() {}

  ngOnInit() {}
}
