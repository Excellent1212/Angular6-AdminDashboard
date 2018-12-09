import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/api';
import { MatDialog } from '@angular/material';
import { CommisionSettingsComponent } from './../../shared/model-popup/commision-settings/commision-settings.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public msgs: Message[] = [];
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,

  ) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  commisionModel() {
    const dialogRef = this.dialog.open(CommisionSettingsComponent, {
      width: '500px',
      data: {}
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
