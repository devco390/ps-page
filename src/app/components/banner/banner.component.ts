import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ps-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  @Input() dataIp: any;
  tooltipText = 'Domicilio sin costo.';
  constructor() {}

  ngOnInit() {}
}
