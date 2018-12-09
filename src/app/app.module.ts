import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlModule } from 'primeng/growl';
import { DataSharingService } from './shared/service/data-sharing';
import { MatDialogModule } from '@angular/material';
const APP_CONTAINERS = [
  DefaultLayoutComponent
];
import { GetCategoryByIdResolve } from './shared/resolve/getCategoryById';
import { GetUserByIdResolve } from './shared/resolve/getUserById';

const APP_RESOLVER = [
  GetCategoryByIdResolve,
  GetUserByIdResolve
];



import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/Intercepter/token.interceptor';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AlertModule } from 'ngx-bootstrap';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { SharedModule } from './shared/shared.module';
import { CrudService } from './shared/service/crud.service';
import { AuthGuard } from './shared/gard/auth-gard';
import { LoginGuard } from './shared/gard/Login-gard';
import { CommisionSettingsModule } from './shared/model-popup/commision-settings/commision-settings.module';
import { CommisionSettingsComponent } from './shared/model-popup/commision-settings/commision-settings.component';
@NgModule({
  imports: [
    CommisionSettingsModule,
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    BrowserAnimationsModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    ChartsModule,
    SharedModule,
    GrowlModule,
    MatDialogModule

  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    CrudService,
    DataSharingService,
    AuthGuard,
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    MessageService,
    ...APP_RESOLVER
  ],
  entryComponents: [CommisionSettingsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
