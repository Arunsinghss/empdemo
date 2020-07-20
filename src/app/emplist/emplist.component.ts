import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-emplist',
  templateUrl: './emplist.component.html',
  styleUrls: ['./emplist.component.scss']
})
export class EmplistComponent implements OnInit {
  @Output() editEvent: EventEmitter<any> = new EventEmitter();
  emplist;
  constructor(
    private empService: EmployeeService,
  ) {

  }

  ngOnInit(): void {
    this.empService.data.subscribe((res: any) => {
      if (res.list) {
        this.getAllEmployee();
      } else {
        this.getAllEmployee();
      }
    });
  }

  editEmp(id) {
    this.editEvent.emit(id);
  }

  removeEmp(id) {
    if (confirm('Are You Sure?')) {
      this.empService.removeEmployee(id).subscribe((data: any) => {
        alert('Employee Deleted successfully...');
        this.getAllEmployee();
      }, (error: HttpErrorResponse) => {
        alert('Something went wrong...');
      });
    }
  }

  getAllEmployee() {
    this.empService.getAllEmployee().subscribe((data: any) => {
      this.emplist = data;
    });
  }
}
