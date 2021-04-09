import React,{Component} from 'react';
import { Modal } from 'react-bootstrap';

//This component is used to show all employees in list form.
export default class Employees extends Component{
    constructor(props){
        super(props);
        this.state={
            name : '',
            showModal : false,
            showReviewModal: false,
            selEmployee: {},
            assigneeId: ''
        };
    }
        
    //used to change name of emmployee name
    changeName = (event) => {
        this.setState({
            name : event.target.value
        });
    }
    
    //to show add employee modal
    modalShow = () => {
        this.setState({
            showModal : true
        })
    }

     //to close add employee modal
    modalClose =() => {
        this.setState({
            showModal : false
        })
    }

     //to show assign reviewer modal
    reviewerModalShow = (event) => {
        let employee=this.props.employees[Number(event.target.getAttribute("data-val"))];
        this.setState({
            selEmployee: employee,
            showReviewModal : true
        });
    }

     //to close assign reviewer modal
    reviewerModalClose =() => {
        this.setState({
            showReviewModal : false
        });
    }

     //to call assign employee method from parent
    assignEmployee = () => {
        if(this.state.assigneeId!==""){
            this.props.assignEmployee(this.state.selEmployee.userId,this.state.assigneeId);
        }
        this.reviewerModalClose();
    }

    //will call addemployee method in parent
    addEmployee = () => {
        if(this.state.name!==""){
            this.props.addEmployee(this.state.name);
        }
        this.modalClose();
    }

    //to chnage assigneeId when Admin selects
    handleChange = (event) => {
        this.setState({
            assigneeId : event.target.value
        });
    }
    
    render(){
        let {showModal,showReviewModal,selEmployee}= this.state;
        return (<div className="list-container">
                    
                    <div className="list-container-header">
                         <label style={{textAlign :"center"}}>All Employees</label>
                         <button  type="button"  className="btn btn-primary btn-sm"
                            onClick={this.modalShow}
                        >Add New Employee</button>
                    </div>
                    {/* show all employees curretly we have  */}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">Index</th>
                            <th scope="col">Name</th>
                            <th scope="col">Performance Reviews</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               this.props.employees.map((employee,index)=>{
                                    return <tr key={"employee"+index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{employee.userId}</td>
                                        {/* show employees performance reviewe given by each reviwer */}
                                        <td>
                                            <ul>
                                                {
                                                    employee.reviewer.map(reviwer => {
                                                        return <li>
                                                            <label style={{fontWeight: '500'}}>{reviwer.reviewerId}</label> - {reviwer.review ? reviwer.review : 'No review yet'}
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </td>
                                        <td>
                                            {/* actions to assign reviwer or delete employee */}
                                        <button style={{marginRight: '16px'}} className="btn btn-primary btn-sm"
                                            data-val={index}
                                            onClick={this.reviewerModalShow}
                                        >Assign Reviewer</button>
                                        <button className="btn btn-primary btn-sm"
                                            data-val={index}
                                            onClick={this.props.removeEmployee}
                                        >Remove Employee</button>
                                        </td>
                                    </tr>
                               })
                            }
                        </tbody>
                    </table>

                            {/* Modal to open when admin clicks on add Employee button */}
                    <Modal show={showModal} onHide={this.modalClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Add Employee</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form>
                            <label className="title">Employee Name : </label>
                            <input type="text" className="form-control" value={this.state.name} onChange={this.changeName}/>
                        </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" class="btn btn-secondary"  onClick={this.modalClose}>Close</button>
                            <button type="button" class="btn btn-primary" onClick={this.addEmployee}>Add</button>
                        </Modal.Footer>
                    </Modal>

                    {/* Modal to open when admin clicks on Assign Reviwer button */}
                    <Modal show={showReviewModal} onHide={this.reviewerModalClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Assign Reviewer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form>
                            <label className="title">Select Reviewer</label>
                            <select className="form-control" value={this.state.assigneeId} onChange={this.handleChange}>
                                <option>Please Select</option>
                                {
                                    
                                    this.props.employees.filter(employee=>employee.userId !== selEmployee.userId).map(
                                        (reviewer, index) => {
                                            return <option value={reviewer.userId} key={"emp"+index}>
                                                {reviewer.userId}
                                            </option>
                                        })
                                }
                            </select>
                        </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" class="btn btn-secondary"  onClick={this.reviewerModalClose}>Close</button>
                            <button type="button" class="btn btn-primary" onClick={this.assignEmployee} >Assign</button>
                        </Modal.Footer>
                    </Modal>
        </div>);
    }
}
