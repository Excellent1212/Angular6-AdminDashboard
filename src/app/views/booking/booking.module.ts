import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { DatePipe } from '@angular/common';
import { SharedModule } from './../../shared/shared.module'
import { BsDropdownModule } from 'ngx-bootstrap';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Booking'
    },
    children: [
      {
        path: '',
        component: BookingComponent,
        data: {
          title: ''
        },
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    SharedModule,
    BsDropdownModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BookingComponent],
  providers:[DatePipe]
})
export class BookingModule { }
