import { Component, OnInit, Renderer } from '@angular/core';
import { CrudService } from './../../../../shared/service/crud.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.component.html',
  styleUrls: ['./user-services.component.scss']
})
export class UserServicesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  public services;
  public userId;
  constructor(
    public renderer: Renderer,
    public service: CrudService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe(res=>{
      this.userId= res['id'];
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ordering: false,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['columns'][2]['isNumber'] = true;
        dataTablesParameters['columns'][3]['isNumber'] = true;
        dataTablesParameters['columns'][4]['isNumber'] = true;
        dataTablesParameters.userId = this.userId;
        console.log('dataTablesParameters',dataTablesParameters);
        this.service.post('admin/users/details/service', dataTablesParameters).subscribe(res => {
          console.log('Services===>',res);
          this.services = res['result']['data'];
          
          callback({
            recordsTotal: res['result']['recordsTotal'],
            recordsFiltered: res['result']['recordsTotal'],
            data: this.services
          });
        })
      },
      columns: [
        {
          title: 'Name',
          name:'name',
          render: function (data: any, type: any, full: any) {
            return "<span class='text-capitalize'>" + full.name + "</span>";
          }
        },
        {
          title: 'Delivery',
          name:'delivery',
          render: function (data: any, type: any, full: any) {
            if(full.delivery == 'online'){
              return "<span class='badge badge-success'>" + full.delivery + "</span>";
            }else if(full.delivery =='offline'){
              return "<span class='badge badge-info'>" + full.delivery + "</span>";
            }
          }
        },
        {
          title: 'Price',
          name:'price',
          render: function (data: any, type: any, full: any) {
            return "<span>$" + full.price + "</span>";
          }
        },
        {
          title: 'Rating',
          name:'avg_rating',
          render: function (data: any, type: any, full: any) {
            if(full.avg_rating != undefined && full.avg_rating !=null){
              var c = full.avg_rating.toString().split("."); 
              if(c[1]!= null && c[1]!=undefined && c[1]>50){
                return "<span>" + ++c[0] + "</span>";
              }else if(c[1]!= null && c[1]!=undefined && c[1]<=50){
                return "<span>" + c[0]+ "</span>";
              } 
              else{
                return "<span>" + c[0]+ "</span>";
              } 
            } else{
              return "<span>0</span>";
            }
          }
        },
        {
          title: 'Reviews',
          name:'reviews.length',
          render: function (data: any, type: any, full: any) {
            return "<span>" + full.reviews.length + "</span>";
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
