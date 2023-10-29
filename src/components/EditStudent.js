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

// properties editStudent is required, function called when Edit clicked.
function EditStudent(props) { 

  const [open, setOpen] = useState(false);
  const [newStudent, setStudent] = useState(
      {
        student_id: props.student.studentId,
        name: props.student.name,
        email:props.student.email,
        status:props.student.status,
        statusCode: props.student.statusCode
      });
  const token = sessionStorage.getItem("jwt");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Save student and close modal form
  const handleEdit = (event) => {
      editStudent();
  }

  const handleChange = (event) => {
    if(event.target.value < 0) {
      alert("Invalid Status Code. Status code cannot be negative");
    } else {
      setStudent({...newStudent,  [event.target.name]:event.target.value})
    }
  }

  /*
  *  edit student
  */ 
  const  editStudent = () => {
    props.setMessage('');
    const row_id = props.student.studentId;
    console.log("edit student "+row_id);

    fetch(`${SERVER_URL}/student/${row_id}`,
        {
            method: 'PUT',
            headers: {'Authorization' : token, 'content-type':'application/json'}, 
            body: JSON.stringify(newStudent)
        })
    .then(res => {
        if (res.ok) {
            console.log("edit ok");
            props.setMessage("Student updated.");
            props.fetchStudents();
            handleClose();
        } else if (res.status === 400) {
          console.log("Cannot change to students email. It already exists");
          alert("Cannot change to students email. It already exists");
        } else {
            console.log("edit error");
            props.setMessage("Error editStudent. "+res.status);
        }
        })
    .catch( (err) => {
        console.log("exception editStudent "+err);
        props.setMessage("Exception. "+err);
      } );
  }

  return (
      <div>
        <Button id="editStudent" onClick={handleClickOpen}>
          Edit
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="newStudentName" defaultValue={props.student.name} autoFocus fullWidth label="Student Name" name="name" onChange={handleChange}/> 
            </DialogContent>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="newStudentEmail" defaultValue={props.student.email} fullWidth label="Student Email" name="email" onChange={handleChange}/> 
            </DialogContent>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="newStudentStatus" defaultValue={props.student.status} fullWidth label="Student Status" name="status" onChange={handleChange}/> 
            </DialogContent>
            <DialogContent  style={{paddingTop: 20}} >
              <Input type='number' defaultValue={props.student.statusCode} placeholder="Status Code" id="newStudentStatusCode" fullwidth="true" label="Student Status Code" name="statusCode" onChange={handleChange} />
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
  fetchStudents : PropTypes.func.isRequired,
}

export default EditStudent;