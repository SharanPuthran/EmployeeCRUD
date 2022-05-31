import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.scss']
})
export class EmployeeDeleteComponent implements OnInit {
  emp: any;

  constructor(public dialogRef: MatDialogRef<EmployeeDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private empSer: EmployeeService) {
  }

  ngOnInit(): void {
    console.log(this.data)
    this.emp = this.data;
  }

  deleteEmp(){
    this.empSer.deleteEmployee(this.emp.id).subscribe({
        next: (res) => {
          console.log('Successfully deleted');
          this.dialogRef.close(true);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      });
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

}
