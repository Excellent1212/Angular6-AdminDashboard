import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from './../../shared/shared.module'
import { InputSwitchModule } from 'primeng/inputswitch';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserInfoComponent } from './user-details/user-info/user-info.component';
import { GetUserByIdResolve } from './../../shared/resolve/getUserById';
import { UserServicesComponent } from './user-details/user-services/user-services.component';
import { UserBookingsComponent } from './user-details/user-bookings/user-bookings.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users'
    },
    children: [
      {
        path: '',
        component: UsersComponent,
        data: {
          title: ''
        },
      },
      {
        path: ':id',
        component: UserDetailsComponent,
        data: {
          title: 'User Details'
        },
        resolve: {
          user: GetUserByIdResolve
        },
        children: [
          {
            path: 'info',
            component: UserInfoComponent,
            data: {
              title: 'Info'
            },
            
          },
          {
            path: 'services',
            component: UserServicesComponent,
            data: {
              title: 'Services'
            },
          },
          {
            path: 'bookings',
            component: UserBookingsComponent,
            data: {
              title: 'Bookings'
            },
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    SharedModule,
    InputSwitchModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsersComponent, UserDetailsComponent, UserInfoComponent, UserServicesComponent, UserBookingsComponent]
})
export class UsersModule { }
