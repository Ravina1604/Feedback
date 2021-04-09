import React, { Component } from "react";
import { Modal } from "react-bootstrap";

//This component is used to show all pending Performance Review that require feedback
export default class PendingFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingFeedbackEmployees: [],
      review: "",
      showFeedbackForm: false,
      selEmployee: {},
    };
  }

  //used to open modal when user click on update Review button
  openFeedbackForm = (event) => {
    let employee = this.props.pendingFeedbackEmployees[
      Number(event.target.getAttribute("data-val"))
    ];
    this.setState({
      selEmployee: employee,
      showFeedbackForm: true,
    });
  };

  //to close Update review modal
  closeFeedbackForm = () => {
    this.setState({
      showFeedbackForm: false,
    });
  };

  //used to chnage the value of review textarea
  updateReview = (event) => {
    this.setState({
      review: event.target.value,
    });
  };

  //to call submitReview method from parent compoennt
  submitReview = () => {
    if (this.state.review !== "") {
      this.props.submitReview(
        this.state.selEmployee.userId,
        this.props.currentEmployee.userId,
        this.state.review
      );
    }
    this.closeFeedbackForm();
  };

  render() {
    let { showFeedbackForm, review } = this.state;
    let { pendingFeedbackEmployees } = this.props;
    return (
      <div className="list-container" style={{ height: "calc(100% - 152px)" }}>
        <div className="list-container-header">
          <label style={{ textAlign: "center" }}>
            List of Employees which requires your feedback
          </label>
        </div>
        {/* list of all employees to whom This particular user need to give review */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">UserName</th>
              <th scope="col">Performance Review</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingFeedbackEmployees.map((employee, index) => {
              return (
                <tr key={"employee" + index}>
                  <th scope="row">{index + 1}</th>
                  <td>{employee.userId}</td>
                  {/* Shows review given by you */}
                  <td>
                    {employee.reviewer.filter((item) => {
                      return (
                        item.reviewerId === this.props.currentEmployee.userId
                      );
                    })[0].review || "No review given yet"}
                  </td>
                  {/* shows button to update given review */}
                  <td>
                    <button
                      style={{ marginRight: "16px" }}
                      className="btn btn-primary btn-sm"
                      data-val={index}
                      onClick={this.openFeedbackForm}
                    >
                      Update Review
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Modal to show when User clicks on Update review button */}
        <Modal show={showFeedbackForm} onHide={this.closeFeedbackForm}>
          <Modal.Header closeButton>
            <Modal.Title>Update Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label className="title">Review</label>
              <input
                type="textarea"
                className="form-control"
                value={review}
                onChange={this.updateReview}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              class="btn btn-secondary"
              onClick={this.closeFeedbackForm}
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={this.submitReview}
            >
              Update
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
