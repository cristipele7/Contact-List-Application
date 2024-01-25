import { useState } from 'react';
import { IContact } from '../interfaces/app.interface';
import Button from '@mui/material/Button';
import AddContact from './AddContact';
import DeleteIcon from '@mui/icons-material/Delete';

const ContactList = () => {
  const [contacts, setContacts] = useState<IContact[]>([])
  const [addContact, setAddContact] = useState<boolean>(false)

  const onAddContact = (newContact: IContact) => {
    if (newContact) {
      setContacts(oldContacts => [...oldContacts, newContact])
    }
  }

  const onDeleteContact = (deletedID: string) => {
    setContacts(oldContacts => oldContacts.filter((contact: IContact) => contact.id !== deletedID))
  }

  return (
    <div>
      <p style={{ textDecoration: 'underline' }}>Contact List</p>
      {contacts.map((contact) => (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <p>{contact.name} - {contact.phoneNumber}</p>
          <DeleteIcon style={{ color: 'red', marginLeft: 10, cursor: 'pointer' }} onClick={() => onDeleteContact(contact.id)} />
        </div>
      ))}
      <Button style={{ marginTop: 30 }} variant='contained' onClick={() => setAddContact(true)}>Add contact</Button>

      {addContact && <AddContact addContact={onAddContact} onClose={() => setAddContact(false)} />}
    </div>
  );
};

export default ContactList;
