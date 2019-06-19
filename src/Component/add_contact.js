import React from "react";
import { Link } from "react-router-dom";
import ContactList from "../Contacts";

class Add_contact extends React.Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //       name:"",
  //       telephone:"",
  //       mail:""
  //   }
  //   }
  //   handlechange = (e) => {
  //     this.setState({
  //       [e.target.name]: e.target.value
  //     })
  //   } 

  render() {
    return (
      <div className="form_contact">
        <label>Contact Name </label>
        <input type="text" name="name" onChange={this.props.handlechange} value={this.props.name} />

        <label>Contact Phone </label>
        <input type="number" name="telephone" onChange={this.props.handlechange} value={this.props.telephone}/>

        <label>Contact Mail </label>
        <input type="text" name="mail" onChange={this.props.handlechange} value={this.props.mail}/>

        <Link to="/contacts">
          <button
            type="submit"
            onClick={() => {
              this.props.maj?
              this.props.updatecontact(this.props.id):this.props.newcontact();
              
            }}
          >
            { this.props.maj?
              "upadate contact":"add contact"}
          </button>
        </Link>
      </div>
    );
  }
}

export default Add_contact;
