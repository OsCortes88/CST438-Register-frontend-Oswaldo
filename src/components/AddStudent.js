import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SERVER_URL } from '../constants';
import { Input } from '@mui/base';

// properties addCoure is required, function called when Add clicked.
function AddStudent(props) { 

  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState({student_id: 0, name:"", email:"", status:"", statusCode: 0});
  const token = sessionStorage.getItem("jwt");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.fetchStudents();
    setOpen(false);
  };

  const editChange = (event) => {
    if(event.target.value < 0) {
          alert("Invalid Status Code. " + student.statusCode + " cannot be negative");
    } else {
      setStudent({...student,  [event.target.name]:event.target.value})
    }
  }

  /*
  *  add student
  */ 
  const  addStudent = () => {
    props.setMessage('');
    console.log("start addStudent"); 
    fetch(`${SERVER_URL}/student/`,
    { 
        method: 'POST',
        headers: {
          'Authorization' : token, 
          'content-type':'application/json'
        }, 
        body: JSON.stringify(student)
    })
    .then(res => {
        if (res.ok) {
          console.log("addStudent ok");
          props.setMessage("Student added.");
          props.fetchStudents();
          handleClose();
        } else if (res.status === 406) {
          console.log("Invalid Email. A student with that email already exists");
          alert("Invalid Email. A student with that email already exists");
        } else {
        console.log('error addStudent ' + res.status);
        props.setMessage("Error. "+res.status);
        }})
    .catch(err => {
        console.error("exception addStudent "+ err);
        props.setMessage("Exception. "+err);
    })
  }

  // Save course and close modal form
  const handleAdd = () => {
      addStudent();
  }

  return (
      <div>
        <Button id="addStudent" variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
          Add Student
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="studentName" autoFocus fullWidth label="Student Name" name="name" onChange={editChange}  /> 
            </DialogContent>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="studentEmail" fullWidth label="Student Email" name="email" onChange={editChange}  /> 
            </DialogContent>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="studentStatus" fullWidth label="Student Status" name="status" onChange={editChange}  /> 
            </DialogContent>
            <DialogContent  style={{paddingTop: 20}} >
              <Input type='number' placeholder="Status Code" id="studentStatusCode" fullwidth='true' label="Student Status Code" name="statusCode" onChange={editChange} />
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
  fetchStudents : PropTypes.func.isRequired
}

export default AddStudent;