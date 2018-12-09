import { Component, OnInit, Renderer } from '@angular/core';
import { CrudService } from './../../../../shared/service/crud.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  public bookings;
  public userId;
  public userType;
  constructor(
    public renderer: Renderer,
    public service: CrudService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.userId = this.route.parent.snapshot.data['user']['user'][0]['_id'];
    this.userType = this.route.parent.snapshot.data['user']['user'][0]['type'];
   }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ordering: false,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['columns'][0]['isNumber'] = true;
        dataTablesParameters['columns'][3]['isNumber'] = true;
        dataTablesParameters.userId = this.userId;
        dataTablesParameters.userType = this.userType;
        console.log('dataTablesParameters',dataTablesParameters);
        this.service.post('admin/users/details/bookings', dataTablesParameters).subscribe(res => {
          this.bookings = res['result']['data'];
          console.log('result===>',this.bookings);
          callback({
            recordsTotal: res['result']['recordsTotal'],
            recordsFiltered: res['result']['recordsTotal'],
            data: this.bookings
          });
        })
      },
      columns: [
        {
          title: 'BookingId',
          name:'bookingId',
          render: function (data: any, type: any, full: any) {
            return "<span>" + full.bookingId + "</span>";
          }
        },
        {
          title: 'Payment',
          name:'payment_method',
          render: function (data: any, type: any, full: any) {
            if(full.payment_method == 'paypal'){
              return "<span class='badge badge-success'>" + full.payment_method + "</span>";
            }else if(full.payment_method =='stripe'){
              return "<span class='badge badge-warning'>" + full.payment_method + "</span>";
            }
          }
        },
        {
          title: 'Status',
          name:'status',
          render: function (data: any, type: any, full: any) {
              return "<span class='badge badge-info'>" + full.status + "</span>";
          }
        },
        {
          title: 'Booking Price',
          name:'booking_price',
          render: function (data: any, type: any, full: any) {
            return "<span>$" + full.booking_price + "</span>";
          }
        },
        {
          title: 'CreatedAt',
          render: function (data: any, type: any, full: any) {
            var date = new Date(full.createdAt);
            return "<span>" + date.toLocaleString() + "</span>";
          }
        }
      ]
    };
  }

  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {  
    });
  }

}
