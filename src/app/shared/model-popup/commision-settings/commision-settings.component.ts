import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataSharingService } from './../../service/data-sharing';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-commision-settings',
  templateUrl: './commision-settings.component.html',
  styleUrls: ['./commision-settings.component.scss']
})
export class CommisionSettingsComponent implements OnInit {
  public formData: any;
  public form: FormGroup;
  public isFormSubmited;
  constructor(
    public dialogRef: MatDialogRef<CommisionSettingsComponent>,
    public service: CrudService,
    public fb: FormBuilder,
    public datashare: DataSharingService,
    @Inject(MAT_DIALOG_DATA) public data

  ) {
    this.formData = {};
    this.form = this.fb.group({
      'commission': new FormControl('', Validators.required)
    });
   }

  onCancel() {
    this.dialogRef.close({ status: false });
  }

  onSubmit(isValid) {
    console.log("Here");
        this.dialogRef.close({ status: true });
  }


  ngOnInit() {
  }

}
