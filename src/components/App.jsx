import React, { Component } from 'react';
import { AddContactForm } from './Form/Form';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Title, TitleList } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = newContact => {
    const isAlready = this.state.contacts.find(
      contact => contact.name === newContact.name
    );

    if (isAlready) {
      alert(`${newContact.name} is already in contacts.`);
    } else
      this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          {
            id: nanoid(),
            ...newContact,
          },
        ],
      }));
  };

  handleDelete = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact => {
      const hasName = contact.name.toLowerCase().includes(filter.toLowerCase());

      return hasName;
    });
  };

  changeFilter = e => this.setState({ filter: e.target.value });

  render() {
    const filteredContacts = this.getVisibleContacts();

    return (
      <div>
        <Title>Phonebook</Title>
        <AddContactForm onAdd={this.addContact} />
        <TitleList>Contacts</TitleList>
        <Filter filter={this.state.filter} onChange={this.changeFilter} />
        <ContactList contacts={filteredContacts} onDelete={this.handleDelete} />
      </div>
    );
  }
}
