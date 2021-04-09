import React from "react";
import Header from "./Header";
import PendingFeedback from "./PendingFeedback";
import { Alert } from "react-bootstrap";
//This Compoennt get rendered when user logs into the applicaton
export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      currentEmployee: {},
      pendingFeedbackEmployees: [],
      error: "",
    };
  }

  //fetch particular employee once compoennt get rendered
  componentDidMount() {
    this.fetchEmployees();
  }

  //used to fetch of employee whenver new data get added to particular employee
  fetchEmployees = () => {
    let { error } = this.state;
    fetch("http://localhost:9000/employees", { method: "get" })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          error = res.error;
        } else if (res.employees) {
          error = "";
          let currentEmployee = res.employees.filter(
            (item) => item.userId === this.props.match.params.userId
          )[0];
          let pendingFeedbackEmployees = res.employees.filter((employee) => {
            let reviewerList = employee.reviewer.map((item) => item.reviewerId);
            return (
              employee.userId !== currentEmployee.userId &&
              reviewerList.includes(currentEmployee.userId)
            );
          });
          this.setState({
            pendingFeedbackEmployees,
            employees: res.employees,
            currentEmployee,
          });
        }
        this.setState({
          error
        });
      });
  };

  //to submit review of particular employee given by User
  submitReview = (userId, assigneeId, review) => {
    fetch(
      `http://localhost:9000/submitReview?userId=${userId}&assigneeId=${assigneeId}&review=${review}`,
      { method: "get" }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.fetchEmployees();
        }
      });
  };

  render() {
    let { currentEmployee, employees, pendingFeedbackEmployees,error } = this.state;
    return (
      <div className="body-container">
        <Header />

        <div className="feedback-header">
          <label>Hello {this.props.match.params.userId}</label>
        </div>

        {error && (
          <Alert variant="danger">This is a alert—check it out!</Alert>
        )}
        <PendingFeedback
          pendingFeedbackEmployees={pendingFeedbackEmployees}
          currentEmployee={currentEmployee}
          employees={employees}
          fetchEmployees={this.fetchEmployees}
          submitReview={this.submitReview}
        />
      </div>
    );
  }
}
