import { Component, OnInit, Input } from '@angular/core';
import { data } from '../../data/data';

@Component({
  selector: 'ps-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() showAddress: boolean;

  landlinePhone = data.landlinePhone;
  mobile = data.phone;
  phoneShort = data.phoneShort;

  lat = 4.6651519;
  lng = -74.058919;
  urlToRedirectGoogleMaps = `https://maps.app.goo.gl/7AXKsv2ULACLTByU9`;

  constructor() {}

  ngOnInit(): void {}
}
