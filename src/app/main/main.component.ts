import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  selectedId: '';
  constructor(
    private dataService: EmployeeService
  ) { }

  ngOnInit(): void {
  }

  setId(event) {
    this.selectedId = event;
    const employee = {
      employeId: event
    };
    this.dataService.setData(employee);
  }

  empformevent(event) {
    const employee = {
      employeId: event
    };
    this.dataService.setData(employee);
  }
}
