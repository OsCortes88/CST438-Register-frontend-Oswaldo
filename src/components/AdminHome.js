import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import {SERVER_URL} from '../constants';
import EditStudent from './EditStudent';

const AdminHome = ()  => {

    const [students, setStudents] = useState([]);  // list of students
    const [message, setMessage] = useState(' ');  // status message
    const token = sessionStorage.getItem("jwt");
    useEffect(() => {
        // called once after intial render
        fetchStudents();
        }, [] )


    const fetchStudents = () => {
        console.log("fetchStudents");
        fetch(`${SERVER_URL}/student`, {
            headers: {'Authorization' : token}
        })
        .then((response) => { return response.json(); } )
        .then((data) => { setStudents(data); })
        .catch((err) =>  { 
            console.log("exception fetchStudents "+err);
            setMessage("Exception. "+err);
        } );
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
                headers: {'Authorization' : token}
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
                            headers: {'Authorization' : token}
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

    const headers = ['Name', 'Email', 'Status Code', 'Status', ' ', ' '];

    if (students.length === 0) {
      return (
          <div>
              <h3>No Students Registered</h3>
              <h4>{message}</h4>
              <AddStudent fetchStudents={fetchStudents} message={message} setMessage={setMessage}/>
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
                    <td><EditStudent fetchStudents={fetchStudents} student={row} message={message} setMessage={setMessage}/></td>
                    <td><button type="button" margin="auto" onClick={dropStudent}>Drop</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <AddStudent fetchStudents={fetchStudents} message={message} setMessage={setMessage}/>
      </div>
    )
  }       
}

export default AdminHome;