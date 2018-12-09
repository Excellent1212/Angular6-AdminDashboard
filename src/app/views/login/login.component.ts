import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from './../../shared/service/crud.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public form: FormGroup;
  public formData: any;
  public alerts = [];
  public isFormSubmited;

  constructor(
    public fb: FormBuilder,
    public service: CrudService,
    public router: Router,
    private route: ActivatedRoute,
  ) {
    this.formData = {};
    this.form = this.fb.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    });
  }

  login(isvalid) {
    this.isFormSubmited = true;
    if (isvalid) {
      this.service.post('admin/login', this.formData).subscribe((res) => {
        this.isFormSubmited = false;
        this.formData = {};
        localStorage.setItem('admin',JSON.stringify(res['result']))
        localStorage.setItem('token',res['token'])
        this.router.navigate(['/dashboard']);
      }, (err) => {
        err = err.error
        this.alerts.push({ type: 'danger', msg: err['message'], 'timeout': 5000 })
      });
    }
  }

}
