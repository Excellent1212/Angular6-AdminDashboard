import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { CrudService } from './../../shared/service/crud.service';
import { environment } from './../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2/dist/sweetalert2.js';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public categories;
  constructor(
    public renderer: Renderer,
    public service: CrudService,
    public router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ordering: false,
      ajax: (dataTablesParameters: any, callback) => {
        this.service.post('admin/category/list', dataTablesParameters).subscribe(res => {
          this.categories = res['result']['data'];
          callback({
            recordsTotal: res['result']['recordsTotal'],
            recordsFiltered: res['result']['recordsTotal'],
            data: this.categories
          });
        })
      },
      columns: [
        {
          title: 'Image',
          render: function (data: any, type: any, full: any) {
            return "<image src=\'" + environment.apiUrl + "upload/category/image/" + full.image + "\'/ class='category-image' onerror='this.onerror=null;this.src=\"assets/img/default/No_Image.png\"'>";
          }
        },
        {
          title: 'Icon',
          render: function (data: any, type: any, full: any) {
            return "<image src=\'" + environment.apiUrl + "upload/category/icon/" + full.icon + "\'/ class='category-image' onerror='this.onerror=null;this.src=\"assets/img/default/No_Image.png\"'>";
          }
        },
        {
          title: 'Name',
          name:'name',
          render: function (data: any, type: any, full: any) {
            return "<span class='text-capitalize'>" + full.name + "</span>";
          }
        },
        {
          title: 'Description',
          name:'description',
          render: function (data: any, type: any, full: any) {
            var desc = full.description ? full.description : '-'
            return "<span class='text-capitalize'>" + desc + "</span>";
          }
        },
        {
          title: 'Display',
          render: function (data: any, type: any, full: any) {
            var isdisplay = full.isDisplay ? 'Yes' : 'No';
            return "<span class='text-capitalize'>" + isdisplay + "</span>";
          }
        },
        {
          title: 'Action',
          render: function (data: any, type: any, full: any) {
            return "<button class='btn-sm btn-success mr-1' edit=" + full['_id'] + ">Edit</button>" +
              "<button class='btn-sm btn-success' del=" + full['_id'] + ">Delete</button>";
          }
        }
      ]
    };
  }

  render():void {
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

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.hasAttribute("edit")) {
        this.router.navigate(["/category/edit/" + event.target.getAttribute("edit")]);
      }

      if (event.target.hasAttribute("del")) {
        let categoryId = event.target.getAttribute("del");
        let status = true;
        const swalWithBootstrapButtons = swal.mixin({
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',
          buttonsStyling: false,
        })

        swalWithBootstrapButtons({
          title: 'Are you sure?',
          text: "Do you wont to delete?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            let formData: FormData = new FormData();
            formData.append('categoryId', categoryId);
            formData.append('isDelete', 'true');
            this.service.putFormData('admin/category', formData).subscribe(res => {
              this.render();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: "Category deleted successfully " });
            }, err => {
              var err_message = err.error.message;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: err_message });
            })
          } else {

          }
        })
      }
    });
  }
}
