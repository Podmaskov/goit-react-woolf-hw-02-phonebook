import React, { Component } from 'react';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { nanoid } from 'nanoid';

import styles from './styles.module.css';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  checkNameDuplicate = name => {
    return this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  addContact = event => {
    event.preventDefault();
    if (this.checkNameDuplicate(event.target.name.value)) {
      alert(`${event.target.name.value} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [
        {
          id: nanoid(),
          name: event.target.name.value,
          number: event.target.number.value,
        },
        ...prevState.contacts,
      ],
      name: '',
      number: '',
      filter: '',
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  render() {
    const filteredContacts = this.filteredContacts();
    return (
      <div className={styles['main-container']}>
        <h1>Phonebook</h1>
        <ContactForm
          name={this.state.name}
          number={this.state.number}
          onSubmit={this.addContact}
          onChange={this.handleInputChange}
        />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChange={this.handleInputChange} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
