import React from "react";

//Login component is used for login of the employee
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      error: "",
      userType: "",
    };
  }

  //used to chnage the user id when user write it in textbox
  changeUserId = (event) => {
    this.setState({
      userId: event.target.value,
    });
  };

  //to chnage user type
  onChangeValue = (event) => {
    this.setState({
      userType: event.target.value,
    });
  };

  //used to call when user click on login button and verify user by looking into backend
  login = () => {
    let { error, userType, userId } = this.state;

    //check user type if esist
    if (userType !== "") {
      //if Admin routes to admin page
      if (userType === "Admin") {
        if (userId) {
          this.props.history.push("/admin");
        } else {
          error = "No admin id entered";
        }
      } else {
        //if User verify if user exists or not
        fetch(`http://localhost:9000/verifyId?userId=${this.state.userId}`, {
          method: "get",
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
              error = res.error;
            } else if (res.employee) {
              error = "";
              this.props.history.push(`/users/${res.employee.userId}`);
            }
            this.setState({
              error
            });
          });
      }
    } else {
      error = "Please select user type";
    }
    this.setState({
      error,
    });
  };

  render() {
    //display login form
    return (
      <div className="body-container" style={{ paddingTop: "20px" }}>
        <div className="login-form">
          <div className="login-form-radio" onChange={this.onChangeValue}>
            <input
              type="radio"
              id="customRadioInline1"
              value="User"
              name="userType"
            />
            <label style={{ margin: "0 16px 0 8px" }}>User</label>

            <input
              type="radio"
              id="customRadioInline2"
              value="Admin"
              name="userType"
            />
            <label style={{ margin: "0 16px 0 8px" }}>Admin</label>
          </div>
          <label className="title">Usename : </label>
          <input
            type="text"
            value={this.state.userName}
            className="form-control"
            onBlur={this.changeUserId}
            name="userName"
            placeholder="User Name"
          />
          {this.state.error && (
            <label className="error-message">{this.state.error}</label>
          )}
          <input
            type="button"
            className="btn btn-primary custom-button"
            value="Login"
            onClick={this.login}
          />
        </div>
      </div>
    );
  }
}

export default Login;
