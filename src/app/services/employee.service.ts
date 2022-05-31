import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'https://retoolapi.dev/DV6x5A/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  getAllEmployees(): Observable<any> {
    return this.httpClient.get(BASE_URL);
  }
  
  getNextPage(page:number, limit:number): Observable<any> {
    return this.httpClient.get(`${BASE_URL}?_page=${page}&_limit=${limit}`);
  }

  getAnEmployeebyID(_id:number):Observable<any>{
    return this.httpClient.get(`${BASE_URL}/${_id}`);
  }

  addNewEmployee(emp:object):Observable<any>{
    return this.httpClient.post(BASE_URL, emp);
  }

  updateEmployee(_id:number, _data:object):Observable<any>{
    return this.httpClient.put(`${BASE_URL}/${_id}`, _data);
  }

  deleteEmployee(_id:number):Observable<any>{
    return this.httpClient.delete(`${BASE_URL}/${_id}`);
  }

  searchEmployeeByName(name:string): Observable<any> {
    return this.httpClient.get(`${BASE_URL}?fullName=${name}`);
  }
}
