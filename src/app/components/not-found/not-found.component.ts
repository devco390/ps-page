import {
  Component,
  OnInit,
  Inject,
  Optional,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformServer } from '@angular/common';
import { RESPONSE, REQUEST } from '@nguniversal/express-engine/tokens';
import { Request, Response } from 'express';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  constructor(
    @Optional() @Inject(REQUEST) private request: Request,
    @Optional() @Inject(RESPONSE) private response: Response,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.response.status(404);
    }
  }
}
