import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap';
import { KeysPipe } from './pipes/keys.pipe';
@NgModule({
  imports: [
    CommonModule,
    AlertModule.forRoot()
  ],
  declarations: [KeysPipe], 
  exports: [CommonModule, HttpClientModule, AlertModule, FormsModule, RouterModule, ReactiveFormsModule,KeysPipe],
})
export class SharedModule { }
