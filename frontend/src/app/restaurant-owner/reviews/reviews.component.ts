import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { OwnerService } from '../../shared/services/owner.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  constructor(private ownerService: OwnerService, private cookieService: CookieService) { }
  reviews;
  errorReviews;

  getReviews(id: number) {
    this.ownerService.getReviews(id).subscribe((result) => {
      this.reviews = result;
      console.log(result);
    }, error => {
      this.errorReviews = error.error.error;
      console.log(error);
    });
  }

  ngOnInit() {
    this.getReviews(Number(this.cookieService.get('restoID')));
  }

}
