import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import {SERVER_URL} from '../constants';
import EditStudent from './EditStudent';

const AdminHome = ()  => {

    const [students, setStudents] = useState([]);  // list of students
    const [message, setMessage] = useState(' ');  // status message

    useEffect(() => {
        // called once after intial render
        fetchStudents();
        }, [] )


    const fetchStudents = () => {
		//TODO complete this method to fetch students and display list of students
      console.log("fetchStudents");
      fetch(`${SERVER_URL}/student`)
      .then((response) => { return response.json(); } )
      .then((data) => { setStudents(data); })
      .catch((err) =>  { 
          console.log("exception fetchStudents "+err);
          setMessage("Exception. "+err);
      } );
    }

    /*
    *  add student
    */ 
    const  addStudent = (student_name, student_email, student_status, student_status_code) => {
      setMessage('');
      console.log("start addStudent"); 
      fetch(`${SERVER_URL}/student/`,
      { 
          method: 'POST',
          headers: {'content-type':'application/json'}, 
          body: JSON.stringify(
            { 
              "name": String(student_name),
              "email": String(student_email),
              "statusCode": parseInt(student_status_code),
              "status": String(student_status)
            }
          )
      })
      .then(res => {
          if (res.ok) {
          console.log("addStudent ok");
          setMessage("Student added.");
          fetchStudents();
          } else {
          console.log('error addStudent ' + res.status);
          setMessage("Error. "+res.status);
          }})
      .catch(err => {
          console.error("exception addStudent "+ err);
          setMessage("Exception. "+err);
      })
    }

    /*
    *  edit student
    */ 
    const  editStudent = (event, new_student_name, new_student_email, new_student_status, new_student_status_code) => {
      setMessage('');
      const row_id = event.target.parentNode.parentNode.rowIndex - 1;
      console.log("edit student "+row_id);
      const student_id = students[row_id].studentId;
      
      if (window.confirm('Are you sure you want to drop the course?')) {
          fetch(`${SERVER_URL}/student/${student_id}`,
          {
              method: 'PUT',
              headers: {'content-type':'application/json'}, 
              body: JSON.stringify(
                { 
                  "name": String(new_student_name),
                  "email": String(new_student_email),
                  "statusCode": parseInt(new_student_status_code),
                  "status": String(new_student_status)
                }
              )
          }
          )
      .then(res => {
          if (res.ok) {
              console.log("edit ok");
              setMessage("Student updated.");
              fetchStudents();
          } else {
              console.log("edit error");
              setMessage("Error editStudent. "+res.status);
          }
          })
      .catch( (err) => {
          console.log("exception editStudent "+err);
          setMessage("Exception. "+err);
        } );
      }
    }

      /* 
      *   drop student
      */ 
      const dropStudent = (event) => {
        setMessage('');
        const row_id = event.target.parentNode.parentNode.rowIndex - 1;
        console.log("drop student "+row_id);
        const student_id = students[row_id].studentId;
        
        if (window.confirm('Are you sure you want to drop the student?')) {
            fetch(`${SERVER_URL}/student/${student_id}`,
            {
                method: 'DELETE',
            }
            )
        .then(res => {
            if (res.ok) {
                console.log("drop student ok");
                setMessage("Student dropped.");
                fetchStudents();
            } else {
                if(window.confirm('This student has enrollments. Are you REALLY sure you want to drop the student?'))
                {
                  fetch(`${SERVER_URL}/student/${student_id}/?FORCE=true`,
                      {
                          method: 'DELETE',
                      }
                  )
                  .then(res => {
                      if (res.ok) {
                          console.log("drop student ok");
                          setMessage("Student dropped.");
                          fetchStudents();
                      } else {
                          console.log("drop error");
                          setMessage("Error dropStudent. "+res.status);
                      }
                      })
                  .catch( (err) => {
                      console.log("exception dropStudent "+err);
                      setMessage("Exception. "+err);
                  } );
                }
                console.log("drop error");
                setMessage("Error dropStudent. "+res.status);
            }
            })
        .catch( (err) => {
            console.log("exception dropStudent "+err);
            setMessage("Exception. "+err);
         } );
        }
    } 

    const headers = ['Name', 'Email', 'Status', 'Status Code', ' ', ' '];

    if (students.length === 0) {
      return (
          <div>
              <h3>No Students Registered</h3>
              <h4>{message}</h4>
              <AddStudent addStudent={addStudent} />
          </div>
          );
    } else { 
      return (
      <div margin="auto" >
        <h3>Student List</h3>
        <table className="Center"> 
            <thead>
            <tr>
                {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
            </tr>
            </thead>
            <tbody>
            {students.map((row,idx) => (
                    <tr key={idx}>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.statusCode}</td>
                    <td>{row.status}</td>
                    <td><EditStudent editStudent={editStudent} /></td>
                    <td><button type="button" margin="auto" onClick={dropStudent}>Drop</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <AddStudent addStudent={addStudent} />
      </div>
    )
  }       
}

export default AdminHome;