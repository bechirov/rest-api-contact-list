import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import ContactList from "./Contacts";
import axios from "axios";
import Add_contact from "./Component/add_contact";
//import Add_contact from './Component/add_contact'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      telephone: "",
      mail: "",
      ner: "",
      contacts: [],
      id:"",
      maj: true
    };
  }

  componentDidMount() {
    axios.get("/all_contacts").then(res => {
      this.setState({ contacts: res.data });
    });
  }
  getPerson = person => {
    this.setState({
      
      name: person.name,
      telephone: person.telephone,
      mail: person.mail,
      id:person._id
    });
  };
  handlechange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  newcontact = () => {
    this.setState({maj:false})
    axios
      .post("/add_contact", {
        name: this.state.name,
        telephone: this.state.telephone,
        mail: this.state.mail
      })
      .then(res => {
        axios.get("/all_contacts").then(res => {
          this.setState({ contacts: res.data });
        });
      });
  };
  updatecontact = (contactId) => {
    this.setState({maj:true})
   // const{match:{params}}=this.props;
    axios
      .put("/modify_contact/" + contactId, {
        name: this.state.name,
        telephone: this.state.telephone,
        mail: this.state.mail
      })
      .then(res => {
        axios.get("/all_contacts").then(res => {
          this.setState({ contacts: res.data });
        });
      });console.log("upadate cliqued")
  };

  deleteContact = contactId => {
    axios.delete("/delete_contact/" + contactId).then(res => {
      axios.get("/all_contacts").then(res => {
        this.setState({ contacts: res.data });
      });
    });
  };

  vidange = () => {
    this.setState({
      name: "",
      telephone: "",
      mail: "",
      id:"",
      maj: false
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1>Contact App</h1>
          <div className="menu">
            <Link to="/contacts">
              <button>Contact List</button>
            </Link>
            <Link to="/add_contact">
              <button onClick={this.vidange}>Add Contact</button>
            </Link>
            <h2>This is the Contact Page</h2>
          </div>
          <Route
            path="/(add_contact|modify_contact)/"
            render={() => (
              <Add_contact
                newcontact={this.newcontact}
                handlechange={this.handlechange}
                updatecontact={this.updatecontact}
                name={this.state.name}
                telephone={this.state.telephone}
                mail={this.state.mail}
                id={this.state.id}
                maj={this.state.maj}
              />
            )}
          />
          <Route
            path="/contacts"
            render={() => (
              <ContactList
                deleteContact={this.deleteContact}
                contacts={this.state.contacts}
                getPerson={this.getPerson}
              />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
