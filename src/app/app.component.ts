import { Component, ViewChild, OnInit } from '@angular/core';
import { Employee } from './Employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('employeeForm') form;
  title = 'Employee';
  lastSelected = false;
  lastSelectedIndex;
  // headers: any;
  
  positions = [
    'Production Manager',
    'Team Lead',
    'Senior Manager',
    'Product Owner',
    'Business Analyst',
    'Developer',
    'Tester',
    'Senior Developer'
  ];

  employees: Employee[] = [
    {
      "name": "Joe Doe",
      "address": "102 Albert st",
      "phone": "(123)-897-1245",
      "position": "Developer"
    },
    {
      "name": "Joe Doe",
      "address": "102 Albert st",
      "phone": "(123)-897-1245",
      "position": "Developer"
    },
    {
      "name": "Joe Doe",
      "address": "102 Albert st",
      "phone": "(123)-897-1245",
      "position": "Developer"
    }
  
  ];

  // employeeList: Employee[] = [];

  // constructor(private api: EmployeeService) {};

  // ngOnInit() {
  //   this.getEmployeesFromFile();
  // }

  // getEmployeesFromFile() {
  //   this.api.getEmployees()
  //     .subscribe(res => {
  //       const keys = res.headers.keys();
  //       this.headers = keys.map(key => `${key}: ${res.headers.get(key)}`);

  //       for (const d of res.body) {
  //         this.employeeList.push({
  //           name: d.name,
  //           address: d.address,
  //           phone: d.phone,
  //           position: d.position
  //         });
  //       }
  //       console.log(this.employeeList);
  //     })
  // }

  addEmployee() {
    this.form.reset();
    this.lastSelected = false;

  }


  onSaveEmployee(data) {
    let  newUser: Employee = {
      name: data.name,
      address: data.address,
      phone: data.phone,
      position: data.position
    };
    console.log(newUser);
    if (!this.employees.includes(newUser)) {
      console.log(this.employees);
    }
    
    if (this.lastSelected) {
      this.employees.splice(this.lastSelectedIndex, 1, newUser)
    } else {
      this.employees.push(newUser);
    }
    this.form.reset();
  }

  onViewEmployee(i) {
    const divs = document.getElementsByClassName('employee');
    if (this.lastSelected) {
      divs[this.lastSelectedIndex].classList.remove('active');
    }
    this.lastSelected = true;
    this.lastSelectedIndex = i;
    console.log(this.form);
    divs[i].classList.add('active');
    this.form.setValue({
      name: this.employees[i].name,
      address: this.employees[i].address,
      phone: this.employees[i].phone,
      position: this.employees[i].position
    });

  }

  onDeleteEmployee(idx) {
    this.employees.splice(idx, 1);
    if (this.lastSelectedIndex === idx) {
      this.form.reset();
      this.lastSelected = false;
      this.lastSelectedIndex = 0;
    }
  }
}
