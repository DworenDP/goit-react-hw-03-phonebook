import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    // name: '',
    // number: '',
  };

  

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const id = nanoid();
    const name = e.name;
    const number = e.number;
    const contactList = [...this.state.contacts];

    if (contactList.findIndex(contact => name === contact.name) !== -1) {
      toast.warn(`${name} is already in contacts.`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } else {
      contactList.push({ id, name, number });
    }
    this.setState({ contacts: contactList });
  };

  handleDelete = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== e),
    }));
  };

  getFilterContacts = () => {
    const filterContactsList = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });

    return filterContactsList;
  };

  render() {
    const { filter } = this.state;

    return (
      <div>
        <h1
          style={{
            fontSize: 'xx-large',
            textAlign: 'center',
            marginTop: '90px',
          }}
        >
          Phonebook
        </h1>
        <ContactForm handleSubmit={this.handleSubmit} />

        <h2
          style={{
            fontSize: 'x-large',
            textAlign: 'center',
            marginTop: '5px',
          }}
        >
          Contacts
        </h2>

        <Filter filter={filter} handleChange={this.handleChange} />

        <ContactList
          contacts={this.getFilterContacts()}
          handleDelete={this.handleDelete}
        />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
        />
      </div>
    );
  }
}
