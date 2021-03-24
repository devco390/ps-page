import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ps-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  mobile = '+57-311-4386970';
  phone = '+57-0317037907';
  lat = 4.6651519;
  lng = -74.058919;
  urlToRedirectGoogleMaps = `https://www.google.com/maps/place/Cra.+14+%23%2379-28,+Bogot%C3%A1/@${this.lat},${this.lng},17z/data=!3m1!4b1!4m5!3m4!1s0x8e3f9a5f748cde5f:0x76fcf58e20ef66b1!8m2!3d4.6651457!4d-74.0567303`;

  constructor() {}

  ngOnInit(): void {}
}
