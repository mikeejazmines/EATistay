import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OwnerService } from '../../shared/services/owner.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  constructor(private ownerService: OwnerService, private route: ActivatedRoute, private cookieService: CookieService) { }
  reservations;
  resLength;
  id;
  activeReservation_date;
  activeReservation_custname;
  activeReservation_confirmation;
  activeReservationID;
  errorReservations;

  getReservations(id: number) {
    this.ownerService.getReservations(id).subscribe((result) => {
      this.reservations = result;
      console.log(result);
    }, error => {
      this.errorReservations = error.error.error;
      console.log(error);
    });
  }

  getReservation(reservation_id: number) {
    this.ownerService.getReservation(reservation_id).subscribe((result) => {
    this.activeReservation_date = result[0].reservation_date;
    this.activeReservation_custname = result[0].customer_name;
    if (result[0].confirmation) {
      this.activeReservation_confirmation = 'confirmed!';
    } else {
      this.activeReservation_confirmation = 'not confirmed!';
    }
    this.activeReservationID = reservation_id;
      console.log(result[0]);
    }, error => {
      console.log(error);
    });
  }

  confirm(resID: number) {
    this.ownerService.confirm(resID).subscribe((result) => {
      this.activeReservation_confirmation = 'confirmed!';
      this.getReservations(Number(this.cookieService.get('restoID')));
      console.log(result);
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getReservations(Number(this.cookieService.get('restoID')));
  }

}
