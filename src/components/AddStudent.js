import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NumberInput } from '@mui/base/Unstable_NumberInput/NumberInput';


// properties addCoure is required, function called when Add clicked.
function AddStudent(props) { 

  const [open, setOpen] = useState(false);
  const [student_name, setStudentName] = useState("");
  const [student_email, setStudentEmail] = useState("");
  const [student_status, setStudentStatus] = useState("");
  const [student_status_code, setStudentStatusCode] = useState(0);
 
  
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

// Save course and close modal form
  const handleAdd = () => {
      props.addStudent(student_name, student_email, student_status, student_status_code);
      handleClose();
  }

  return (
      <div>
        <Button id="addStudent" variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
          Add Student
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="studentName" autoFocus fullWidth label="Student Name" name="student_name" onChange={handleNameChange}  /> 
            </DialogContent>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="studentEmail" fullWidth label="Student Email" name="student_email" onChange={handleEmailChange}  /> 
            </DialogContent>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="studentStatus" fullWidth label="Student Status" name="student_status" onChange={handleStatusChange}  /> 
            </DialogContent>
            <DialogContent  style={{paddingTop: 20}} >
              {/* <TextField id="studentStatusCode" fullWidth label="Student Status Code" name="student_status_code" onChange={handleStatusCodeChange}  />  */}
              <NumberInput id="studentStatusCode" fullWidth label="Student Status Code" name="student_status_code" onChange={handleStatusCodeChange} />
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              <Button id="add" color="primary" onClick={handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>      
      </div>
  ); 
}

// required property:  addCourse is a function to call to perform the Add action
AddStudent.propTypes = {
  addStudent : PropTypes.func.isRequired
}

export default AddStudent;