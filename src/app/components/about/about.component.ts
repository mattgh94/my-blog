import { Component, OnInit } from '@angular/core';

import { externalLinks } from 'src/app/shared/constants/external-links';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private linkedInLink = externalLinks.linkedInUrl;

}
