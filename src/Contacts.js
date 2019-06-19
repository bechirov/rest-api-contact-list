import React from "react";
import axios from "axios";
import {Link } from "react-router-dom";

export default class ContactList extends React.Component {

  render() {
    //console.log(this.state.contacts)
    return (
      <div>
        {this.props.contacts.map(person => (
          <div className="PersonContact" contact={person}>
              {console.log(person)}
            <div>
              <label className="propriete">Contact Name: </label>
              <label>{person.name}</label>
            </div>
            <div>
              <label className="propriete">Contact Phone: </label>
              <label>{person.telephone}</label>
            </div>
            <div>
              <label className="propriete">Contact Mail: </label>
              <label>{person.mail}</label>
            </div>
            <div>
              <Link to={`/modify_contact/${person._id}`}>
                <button className="button button1" onClick={()=>this.props.getPerson(person)}>Edit </button>
              </Link>
              <button
                className="button button1"
                onClick={() => {
                  this.props.deleteContact(person._id);
                  console.log(person._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
