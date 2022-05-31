import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeListComponent } from '../employee-list/employee-list.component';

export interface EmpDialogData {
  id: any;
  fullName: string;
  email: any;
  gender: any;
  dob: any;
  phone: any;
  company: any;
  position: any;
}

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent implements OnInit {

  myForm: FormGroup;
  gender = [
    {value: true , viewValue: 'Male'},
    {value: false , viewValue: 'Female'},
  ];
  empTitle = 'Add an Employee'

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<EmployeeListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmpDialogData, private empSer: EmployeeService) {

    this.myForm = fb.group({  
      'fullName' : ['', Validators.required],  
      'email' : ['', [Validators.required, Validators.email]],  
      'gender' : ['', [Validators.required]],
      'dob' : ['', Validators.required],  
      'phone':['', [Validators.required]],  
      'company':['', Validators.required],  
      'position':['',[Validators.required]],  
    });
  }

  ngOnInit(): void {
    console.log(this.data);
    if(this.data){
      this.empTitle = 'Edit an Employee';
      let currentDate = new Date(this.data.dob);
      this.myForm.setValue({
        fullName: this.data.fullName,
        email: this.data.email,
        gender: this.data.gender,
        dob: currentDate,
        phone: this.data.phone,
        company: this.data.company,
        position: this.data.position
     });
     console.log(this.myForm.value);
    }
  }
  
  submitForm(){
    this.myForm.value.dob = new Date(this.myForm.value.dob).toUTCString();
    if(this.data){
      this.empSer.updateEmployee(this.data.id, this.myForm.value).subscribe({
        next: (res) => {
          console.log('Successfully added', res);
          this.dialogRef.close(true);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      });
    } else {
      this.empSer.addNewEmployee(this.myForm.value).subscribe({
        next: (res) => {
          console.log('Successfully added', res);
          this.dialogRef.close(true);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      });
    }
   
  }

}
