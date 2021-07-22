import React, { Component } from "react";
import shortid from "shortid";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactItem from "./components/ContactItem/ContactItem";
import ContactsList from "./components/ContactsList/ContactsList";
import Filter from "./components/Filter/Filter";
import "./App.css";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  inputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = ({ name, number }) => {
    const { contacts } = this.state;

    const newContact = [
      {
        id: shortid.generate(),
        name: name,
        number: number,
      },
    ];

    contacts.some((item) => item.name === name)
      ? alert(`${name} is already in contacts`)
      : this.setState((prevState) => ({
          contacts: [...prevState.contacts, ...newContact],
        }));
  };

  filterChange = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  onDeleteClick = (targetId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((item) => item.id !== targetId),
    }));
  };

  render() {
    const filteredContacts = this.filterChange();

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm submit={this.handleSubmit} />

        <h2>Contacts</h2>
        <Filter value={this.filter} change={this.inputChange} />

        <ContactsList>
          <ContactItem
            list={filteredContacts}
            deleteItem={this.onDeleteClick}
          />
        </ContactsList>
      </div>
    );
  }
}

export default App;
