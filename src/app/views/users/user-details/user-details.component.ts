import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CrudService } from './../../../shared/service/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataSharingService } from '../../../shared/service/data-sharing';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public page = 'info';
  public userId;
  public router;
  public user_type;
  constructor(
    public service: CrudService,
    public _router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private cd: ChangeDetectorRef,
    public dateShare: DataSharingService

  ) { }

  ngOnInit() {
    this.dateShare.currentPage.subscribe(page => {
      this.page = page[3];
      this.userId = page[2];
    });
    this.user_type = this.route.snapshot.data['user']['user'][0]['type'];
  }
}
