import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = environment.path;
  private ObserverId: BehaviorSubject<{}> = new BehaviorSubject<{}>({});
  public data = this.ObserverId.asObservable();
  constructor(
    private httpclient: HttpClient
  ) { }

  addEmployee(params) {
    return this.httpclient.post(this.baseUrl + 'employee/emp/', params);
  }

  updateEmployee(params, id) {
    return this.httpclient.patch(this.baseUrl + `employee/emp/${id}/`, params);
  }

  getAllEmployee() {
    return this.httpclient.get(this.baseUrl + 'employee/emp');
  }

  getEmployeeById(id) {
    return this.httpclient.get(this.baseUrl + 'employee/emp/' + id);
  }

  removeEmployee(params) {
    return this.httpclient.delete(this.baseUrl + 'employee/emp/' + params);
  }

  setData(data) {
    this.ObserverId.next(data);
  }

}
