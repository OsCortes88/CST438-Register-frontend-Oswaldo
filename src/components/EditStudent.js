import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NumberInput } from '@mui/base/Unstable_NumberInput/NumberInput';


// properties editStudent is required, function called when Edit clicked.
function EditStudent(props) { 

  const [open, setOpen] = useState(false);
  const [new_student_name, setStudentName] = useState("");
  const [new_student_email, setStudentEmail] = useState("");
  const [new_student_status, setStudentStatus] = useState("");
  const [new_student_status_code, setStudentStatusCode] = useState(0);
 
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event) => {
    setStudentName( event.target.value);
  }

  const handleEmailChange = (event) => {
    setStudentEmail( event.target.value);
  }

  const handleStatusChange = (event) => {
    setStudentStatus( event.target.value);
  }

  const handleStatusCodeChange = (event) => {
    setStudentStatusCode( event.target.value);
  }

// Save student and close modal form
  const handleEdit = (event) => {
      props.editStudent(new_student_name, new_student_email, new_student_status, new_student_status_code);
      handleClose();
  }

  return (
      <div>
        <Button id="editStudent" onClick={handleClickOpen}>
          Edit
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
                <input hidden='true' type='int'></input>
              <TextField id="newStudentName" hidden='true' autoFocus fullWidth label="Student Name" name="new_student_name" onChange={handleNameChange}  /> 
            </DialogContent>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="newStudentEmail" fullWidth label="Student Email" name="new_student_email" onChange={handleEmailChange}  /> 
            </DialogContent>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="newStudentStatus" value="yes" fullWidth label="Student Status" name="new_student_status" onChange={handleStatusChange}  /> 
            </DialogContent>
            <DialogContent  style={{paddingTop: 20}} >
              {/* <TextField id="studentStatusCode" fullWidth label="Student Status Code" name="student_status_code" onChange={handleStatusCodeChange}  />  */}
              <NumberInput id="newStudentStatusCode" fullWidth label="Student Status Code" name="new_student_status_code" onChange={handleStatusCodeChange} />
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              <Button id="saveChanges" color="primary" onClick={handleEdit}>Save</Button>
            </DialogActions>
          </Dialog>      
      </div>
  ); 
}

// required property:  editStudent is a function to call to perform the Edit action
EditStudent.propTypes = {
  editStudent : PropTypes.func.isRequired,
}

export default EditStudent;