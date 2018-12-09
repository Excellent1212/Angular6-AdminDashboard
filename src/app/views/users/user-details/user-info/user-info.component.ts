import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../../../shared/service/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../../environments/environment';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public userId;
  public user_details;
  public apiurl = environment.apiUrl;
  constructor(
    public service: CrudService,
    public router: Router,
    private route: ActivatedRoute
  ) {
      this.user_details = this.route.parent.snapshot.data['user']['user'][0];
  }

  ngOnInit() {
  }

}
