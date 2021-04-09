import React from "react";
import Employees from "./Employees";
import Header from "./Header";
import { Alert } from "react-bootstrap";
//This componentn get rendered when admin logs in into the system.
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      error: "",
    };
  }

  //this method called to fetch all employee when component get mounted.
  componentDidMount() {
    this.fetchEmployees();
  }

  //this method used to fetch all employee whenever there is any changes of data for any employee
  fetchEmployees = () => {
    let { error, employees } = this.state;
    fetch("http://localhost:9000/employees", { method: "get" })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          error = res.error;
        } else if (res.employees) {
          error = "";
          employees = res.employees;
        }
        this.setState({
          error,
          employees,
        });
      });
  };

  //this method will remove particular employee with userId from all employees.
  removeEmployee = (event) => {
    //get that particular employee which need to be deleted from all
    let employee = this.state.employees[
      Number(event.target.getAttribute("data-val"))
    ];
    this.fetchFromUrl(
      `http://localhost:9000/removeEmployee?userId=${employee.userId}`
    );
  };

  //this method will add new employee with given name
  addEmployee = (name) => {
    this.fetchFromUrl(`http://localhost:9000/addEmployee?userId=${name}`);
  };

  //this method will assign reviewer with assigneeId to user with userId
  assignEmployee = (userId, assigneeId) => {
    this.fetchFromUrl(
      `http://localhost:9000/assignEmployee?userId=${userId}&assigneeId=${assigneeId}`
    );
  };

  // this method is used to call api on requested url
  fetchFromUrl(url) {
    let { error } = this.state;
    fetch(url, { method: "get" })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          error = res.error;
        } else if (res.success) {
          error = "";
          this.fetchEmployees();
        }
        this.setState({
          error,
        });
      });
  }

  render() {
    let { employees,error } = this.state;
    return (
      <div className="body-container">
        <Header />

        {error && (
          <Alert variant="danger">This is a alert—check it out!</Alert>
        )}

        <Employees
          employees={employees}
          removeEmployee={this.removeEmployee}
          fetchEmployees={this.fetchEmployees}
          addEmployee={this.addEmployee}
          assignEmployee={this.assignEmployee}
        />
      </div>
    );
  }
}
