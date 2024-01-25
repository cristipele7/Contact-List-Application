import { useEffect, useState } from 'react';
import { IContact } from '../interfaces/app.interface';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import uuid from 'react-native-uuid';

interface AddContactProps {
  addContact: (newContact: IContact) => void
  onClose: () => void
}

const AddContact = (props: AddContactProps) => {
  const { addContact, onClose } = props

  const [newContactData, setNewContactData] = useState<IContact>({
    id: uuid.v4().toString(),
    name: "",
    phoneNumber: ""
  })
  const [disabled, setDisabled] = useState<boolean>(true)

  useEffect(() => {
    const disabledValue = !newContactData?.name || !newContactData?.phoneNumber
    setDisabled(disabledValue)
  }, [newContactData])

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add new contact</DialogTitle>
      <DialogContent style={{ minWidth: 500 }}>
        <DialogContentText style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            variant='outlined'
            margin="dense"
            label="Name*"
            value={newContactData?.name}
            onChange={(event) => {
              setNewContactData(oldContactData => ({
                ...oldContactData,
                name: event.target.value
              }))
            }}
          />
          <TextField
            type='number'
            variant='outlined'
            margin="dense"
            label="Phone number*"
            value={newContactData?.phoneNumber}
            onChange={(event) => {
              setNewContactData(oldContactData => ({
                ...oldContactData,
                phoneNumber: event.target.value
              }))
            }}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color='secondary'>
          Cancel
        </Button>
        <Button 
          onClick={() => {
            addContact(newContactData)
            onClose()
          }}
          disabled={disabled}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddContact;
