import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from './../../../shared/service/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category-crud',
  templateUrl: './category-crud.component.html',
  styleUrls: ['./category-crud.component.scss']
})
export class CategoryCrudComponent implements OnInit {
  public form: FormGroup;
  public formData: any;
  public alerts = [];
  public isFormSubmited;
  public categoryId;
  public isEdit = false;
  constructor(
    public fb: FormBuilder,
    public service: CrudService,
    public router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private cd: ChangeDetectorRef
  ) {
    this.formData = {
      icon: FileList,
      image: FileList,
      isDisplay: false
    };
    this.route.params.subscribe((res) => {
      if (res['id']) {
        this.isEdit = true;
        this.categoryId = res['id'];
        setTimeout(()=>{
          let categories = this.route.snapshot.data['category']['categories'];
          this.formData = categories[0];
        },0)
      }
    });
  }

  submit(isvalid) {
    this.isFormSubmited = true;
    console.log("formData:", this.formData);
    if (isvalid) {
      let formData: FormData = new FormData();
      formData.append('categoryId', this.categoryId);
      formData.append('name', this.formData['name']);
      formData.append('description', this.formData['description']);
      if (this.formData['icon'] instanceof Object) {
        formData.append('icon', this.formData['icon'][0]);
      }
      if (this.formData['image'] instanceof Object) {
        formData.append('image', this.formData['image'][0]);
      }
      formData.append('isDisplay', this.formData['isDisplay']);
      if (this.categoryId) {
        this.service.putFormData('admin/category', formData).subscribe(res => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Updated Successfully' });
          this.router.navigate(['/category'])
        }, err => {

          var err_message = err.error.message;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err_message });
        })
      } else {
        this.service.postFormData('admin/category', formData).subscribe(res => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Inserted Successfully' });
          this.router.navigate(['/category'])
        }, err => {
          var err_message = err.message;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err_message });
        })
      }
    }
  }

  changeIcon(event: any) {
    this.formData.icon = event.target.files;
  }

  changeImage(event: any) {
    this.formData.image = event.target.files;
  }

  ngOnInit() {
    
    if (this.isEdit) {
      this.form = this.fb.group({
        'image_name': new FormControl(),
        'name': new FormControl('', Validators.required),
        'description': new FormControl('', Validators.required),
        'icon_name': new FormControl(),
        'isDisplay': new FormControl('', Validators.required),
      });
    } else {
      this.form = this.fb.group({
        'image_name': new FormControl('', Validators.required),
        'description': new FormControl('', Validators.required),
        'name': new FormControl('', Validators.required),
        'icon_name': new FormControl('', Validators.required),
        'isDisplay': new FormControl('', Validators.required),
      });
    }
    
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

}
