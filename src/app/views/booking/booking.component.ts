import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CrudService } from './../../shared/service/crud.service';
import { environment } from './../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2/dist/sweetalert2.js';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public bookings;
  public url = environment.apiUrl + "upload/profile/";
  constructor(
    public renderer: Renderer,
    public service: CrudService,
    public router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) { }


  render(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  transformDate(date) {
    return this.datePipe.transform(date);
  }
  ngOnInit() {
    console.log("here");
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ordering: false,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['columns'][1]['isNumber'] = true;
        setTimeout(() => {
          this.service.post('admin/booking/list', dataTablesParameters).subscribe(res => {
            this.bookings = res['result']['data'];
            console.log(this.bookings);
            callback({
              recordsTotal: res['result']['recordsTotal'],
              recordsFiltered: res['result']['recordsTotal'],
              data: []
            });
          })
        }, 1000)
      },
      columns: [
        {
          data: 'Customer Image',
        },
        {
          data: 'Booking ID',
          name: 'bookingId',
        },
        {
          data: 'Customer Name',
          name: 'userId.name',
        },
        {
          data: 'Status',
          name: 'status',
        },
        {
          data: 'Booking Time',
        },
        {
          data: 'Service Provider',
          name: 'service_user.name',
        },
        {
          data: 'Actions',
        }
      ]
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ForceRefundEvent(id) {
    if (id) {
      let bookingId = id;
      const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })

      swalWithBootstrapButtons({
        title: 'Are you sure?',
        text: "Do you want to Refund?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.service.post('admin/booking/force_refund', { booking_id: bookingId }).subscribe(res => {
            this.render();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
          }, err => {
            var err_message = err.error.message;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err_message });
          })
        } else {

        }
      })
    }
  }

  MarkAsCompletesEvent(id) {
    if (id) {
      let bookingId = id;
      const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })

      swalWithBootstrapButtons({
        title: 'Are you sure?',
        text: "Do you want to mark as completed?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.service.put('admin/booking/mark_as_completed', { booking_id: bookingId }).subscribe(res => {
            this.render();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
          }, err => {
            var err_message = err.error.message;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err_message });
          })
        } else {

        }
      })
    }
  }

  CancelBookingEvent(id) {
    if (id) {
      let bookingId = id;
      const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })

      swalWithBootstrapButtons({
        title: 'Are you sure?',
        text: "Do you want to cancel booking?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.service.post('admin/booking/cancel_booking', { booking_id: bookingId }).subscribe(res => {
            this.render();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
          }, err => {
            var err_message = err.error.message;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err_message });
          })
        } else {

        }
      })
    }
  }

}
