import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';

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
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss']
})
export class EmployeeSearchComponent implements OnInit {

  emp_data: EmpDialogData[] = [];
  valueSelected = '';
  searchedEmp: any;

  constructor(public dialogRef: MatDialogRef<EmployeeSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmpDialogData, private empSer: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  onSelectChange(emp:any) {
    let selectedEmp = emp;
    this.empSer.searchEmployeeByName(selectedEmp)
    .subscribe({
      next: (emp) => {
        console.log(emp);
        this.searchedEmp = emp[0];
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
  });
  }


  loadEmployees(){
    this.empSer.getAllEmployees()
      .subscribe({
        next: (emp) => {
          this.emp_data = emp;
          console.log(this.emp_data);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    });
  }

}
