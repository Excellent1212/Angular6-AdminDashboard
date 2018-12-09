import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommisionSettingsComponent } from './commision-settings.component';
import { MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [CommisionSettingsComponent],
  
})
export class CommisionSettingsModule { }
