import React,{Component} from 'react';

export default class Header extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        //show header in all web pages
        return (
        
        <nav className="navbar header">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <div className="header-logo">
                            <img src={require('../assets/images/logo.png')} />
                        </div>
                        <label className="header-title">
                            Performance Review
                        </label>
                    </div>
                    <a href="/">Logout</a>
                </div>
            </nav>);
    }
}