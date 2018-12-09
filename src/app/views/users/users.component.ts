import { Component, OnInit, Renderer } from '@angular/core';
import { CrudService } from './../../shared/service/crud.service';
import { environment } from './../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  public users;
  constructor(
    public renderer: Renderer,
    public service: CrudService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ordering: false,
      ajax: (dataTablesParameters: any, callback) => {

        this.service.post('admin/users/list', dataTablesParameters).subscribe(res => {
          this.users = res['result']['data'];
          console.log('users===>',this.users);
          callback({
            recordsTotal: res['result']['recordsTotal'],
            recordsFiltered: res['result']['recordsTotal'],
            data: this.users
          });
        })
      },
      columns: [
        {
          title: 'Image', 
          render: function (data: any, type: any, full: any) {
            return "<image src=\'" + environment.apiUrl + "upload/profile/" + full.profile_image + "\'/ class='profile-image' onerror='this.onerror=null;this.src=\"assets/default/user.png\"' height='50px' width='50px'>"
          }
        },
        {
          title: 'Name',
          name: 'name',
          render: function (data: any, type: any, full: any) {
            return "<span class='text-capitalize'>" + full.name + "</span>";
          }
        },
        {
          title: 'Email',
          name:'email',
          render: function (data: any, type: any, full: any) {
            return "<span>" + full.email + "</span>";
          }
        },
        {
          title: 'Phone Number',
          name: 'phone',
          render: function (data: any, type: any, full: any) {
            var phone = full.phone ? full.phone : '-';
            return "<span>" + phone  + "</span>";
          }
        },
        {
          title: 'City',
          name:'city',
          render: function (data: any, type: any, full: any) {
            let city = full.city ? full.city : '-';
            return "<span>" + city  + "</span>";
          }
        },
        {
          title: 'Type',
          name:'type',
          render: function (data: any, type: any, full: any) {
            if(full['type']== 'customer'){
              return "<span class='badge badge-success'>"+full['type']+"</span>";
            } else if(full['type']== 'spiri') {
              return "<span class='badge badge-warning'>"+full['type']+"</span>";
            }
          }
        },
        {
          title: 'Created',
          render: function (data: any, type: any, full: any) {
            var date = new Date(full.createdAt);
            console.log('date', date.toLocaleString());
            return "<span>" + date.toLocaleString() + "</span>";
          }
        },
        {
          title: 'Action',
          render: function (data: any, type: any, full: any) {
            return "<button class='btn-sm btn-success' title='view Details' view=" + full['_id'] + "><i class='fa fa-eye' view=" + full['_id'] + "></i></button>";
          }
        }
      ]
    };
  }

  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.hasAttribute("view")) {
        this.router.navigate(["/users/" + event.target.getAttribute("view")+"/info"]);
      }
    });
  }

}
