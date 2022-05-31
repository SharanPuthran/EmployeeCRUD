import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { EmployeeDeleteComponent } from '../employee-delete/employee-delete.component';
import { EmployeeSearchComponent } from '../employee-search/employee-search.component';

export interface empData {
  id: any;
  company: any;
  dob: any;
  email: any;
  fullName: any;
  gender: any;
  phone: any;
  position: any;
}
const emp_data: empData[] = [];

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'company', 'dob', 'email', 'fullName', 'gender', 'phone', 'position', 'actions'];
  dataSource: MatTableDataSource<empData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: any;
  
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  data = [];

  constructor(private empSer: EmployeeService, public dialog: MatDialog) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(emp_data);
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  addEmployee(): void {
    this.dialog.open(EmployeeDialogComponent, {
      width: '500px',
    });
  }

  getEmployees(): void {
    this.empSer.getAllEmployees()
      .subscribe({
        next: (emp) => {
          this.dataSource = emp;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    });
  }

  deleteEmp(id:number, _name: string){
    const dialogRef = this.dialog.open(EmployeeDeleteComponent, {
      width: '500px',
      data: {id: id, name: _name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getEmployees();
        this.table?.renderRows();
      }
    });
  }

  searchEmp(){
    const dialogRef = this.dialog.open(EmployeeSearchComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
       return;
      }
    });
  }

  editEmp(id:number){
    this.empSer.getAnEmployeebyID(id)
      .subscribe({
        next: (emp) => {
          const editDialogRef = this.dialog.open(EmployeeDialogComponent, {
            width: '500px',
            data: {company: emp.company, dob: emp.dob, email: emp.email, fullName: emp.fullName, gender: emp.gender, id: emp.id, phone: emp.phone, position: emp.position}
          });
          editDialogRef.afterClosed().subscribe(result => {
            if(result){
              this.getEmployees();
              this.table?.renderRows();
            }
          });
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}