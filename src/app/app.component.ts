import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from '@angular/router';
import { DataSharingService } from './shared/service/data-sharing';
import { Location } from '@angular/common';


@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  public loading;
  public url;
  constructor(
    private router: Router, 
    private location: Location,
    private dataShare: DataSharingService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngAfterViewInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          // this.loading = true;
        } else if (
          event instanceof NavigationEnd || 
          event instanceof NavigationCancel
        ) {
          // this.loading = false;
          this.url = this.location.path().split('/');
          let pagename = this.url[this.url.length - 2];
          this.dataShare.changePages(this.url);
        } else if (event instanceof NavigationError) {
          this.loading = false;
          this.router.navigate(['/dashboard']);
          console.log("event:", event['error']['error']['error']['message']);
        }
      });
  }
}
