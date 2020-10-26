import { Component, OnInit } from '@angular/core';
import { externalLinks } from 'src/app/shared/constants/external-links';


interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'success',
  message: 'This is an success alert',
},
{
  type: 'info',
  message: 'This is an info alert',
},
{
  type: 'danger',
  message: 'This is a danger alert',
}];

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {


  alerts: Alert[];

  constructor() {
    this.reset();
   }

  ngOnInit() {
  }

  close (alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }

  private spotifyLink = externalLinks.spotifyUrl;

}
