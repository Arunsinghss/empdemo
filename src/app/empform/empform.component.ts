import { Component, OnInit, Output, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-empform',
  templateUrl: './empform.component.html',
  styleUrls: ['./empform.component.scss']
})
export class EmpformComponent implements OnInit {
  @Input() empId: Observable<{}>;
  @Output() empsubmitted = new EventEmitter();
  empform: FormGroup;
  isupdate = false;
  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createform();
    this.empService.data.subscribe((res: any) => {
      if (res.employeId) {
        this.getEmployeeDetail(res.employeId);
        this.isupdate = true;
      }
    });
  }

  ngOnInit() {
  }

  createform() {
    this.empform = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  getEmployeeDetail(id) {
    this.empId = id;
    this.empService.getEmployeeById(id).subscribe((data: any) => {
      this.empform.get('first_name').setValue(data.user.first_name);
      this.empform.get('last_name').setValue(data.user.last_name);
      this.empform.get('age').setValue(data.emp_age);
    });
  }

  addUpdateEmployee() {
    const params = this.empform.value;
    if (this.isupdate) {
      this.empService.updateEmployee(params, this.empId).subscribe((data: any) => {
        alert(data.message);
        this.empform.reset();
        this.empsubmitted.emit('updated');
        this.empService.setData({ list: true });
        this.isupdate = false;
      }, (error: HttpErrorResponse) => {
        alert('Something went wrong...');
      });
    } else {
      this.empService.addEmployee(params).subscribe((data: any) => {
        alert(data.message);
        this.empform.reset();
        this.empsubmitted.emit('added');
        this.empService.setData({ list: true });
      }, (error: HttpErrorResponse) => {
        alert('Something went wrong...');
      });
    }
  }
}
