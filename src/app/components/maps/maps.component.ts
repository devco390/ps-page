import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ClusterStyle } from '@agm/js-marker-clusterer/services/google-clusterer-types';
import { mapStyles } from './styles';
import { AgmMap } from '@agm/core';

export interface Marker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  infoTitle?: string;
  icon?: string;
  status?: boolean;
}

@Component({
  selector: 'ps-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {
  styles = mapStyles;
  lat = 4.6651519;
  lng = -74.058919;
  zoom = 15;

  urlToRedirectGoogleMaps =
    'https://maps.app.goo.gl/7AXKsv2ULACLTByU9';
  @Input() clusterStyles: ClusterStyle[];
  @Input() markers: Marker[] = [];
  @ViewChild('agmMap', { static: false }) agmMap: AgmMap;
  imageUrl =
    'https://firebasestorage.googleapis.com/v0/b/printing-solutions-co.appspot.com/o/maps%2FpinMap.svg?alt=media&token=44d8bca8-e8be-49d3-a0eb-86c575d5d487';

  constructor() {}

  ngOnInit(): void {
    this.clusterStyles = [
      {
        textColor: '#FFFFFF',
        url: this.imageUrl,
        width: 54,
        height: 54,
        textSize: 18,
      },
    ];

    this.markers.push({
      id: '1',
      lat: this.lat,
      lng: this.lng,
      label: 'Mantenimiento y Venta de Suministros para Impresoras',
      infoTitle: 'Printing Solutions',
      icon: this.imageUrl,
      status: false,
    });
  }

  calculateCluster(markers) {
    return { text: `+${markers.length}`, index: 1 };
  }
  onMapLoad() {
    this.onTriggerResize();
  }

  onTriggerResize() {
    if (this.agmMap) {
      this.agmMap.triggerResize();
    }
  }
}
