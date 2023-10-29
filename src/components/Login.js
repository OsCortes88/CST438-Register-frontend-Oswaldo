import React, {useState} from 'react';
// import Game from './Game';

import StudentHome from './StudentHome';
import ShowSchedule from './ShowSchedule';
import AdminHome from './AdminHome';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

function Login() {
    const[user, setUser] = useState({username:'', password:''});
    const[isAuthenticated, setAuth] = useState(false);
    const[userRole, setRole] = useState("");

    const onChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
    }

    const login = () => {
        fetch('http://localhost:8080/login', {
            method:'POST',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => { 
            const jwtToken = res.headers.get('Authorization');
            if (jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setRole(data);
            console.log(userRole);
         })
        .catch(err => console.log(err));
    }

    if (isAuthenticated) {
        // If it is a student show student home page
        if(userRole === 'STUDENT') {
            return (
                <div className="App">
                <h2>Registration Service</h2>
                    <BrowserRouter>
                    <div>
                        <Link to="/">Home</Link>{' '}
                        &nbsp;&nbsp;
                        <Switch>
                        <Route exact path="/" component={StudentHome} />
                        <Route path="/schedule" component={ShowSchedule} />
                        <Route render={ () => <h1>Page not found</h1>} />
                        </Switch>
                    </div>
                    </BrowserRouter>
                </div>
            );
        } else if (userRole === "ADMIN") { // if it is an admin show admin home page
            return (<AdminHome />);
        }
        return (
            <div className="App">
                <h2>Registration Service</h2>
                <table className="Center">
                    <tbody>
                        <tr><td>
                        <label htmlFor="username">UserName</label>
                        </td><td>
                        <input type="text" name="username" value={user.username} onChange={onChange} />
                        </td></tr>
                        <tr><td>
                        <label htmlFor="password">Password</label>
                        </td><td>
                        <input type="text" name="password" value={user.password} onChange={onChange} />
                        </td></tr>
                    </tbody>
                </table>
                
                <br/>
                <button id="submit" onClick={login}>Login</button>
            </div>
        );
        
        
    } else {
        return (
            <div className="App">
                <h2>Registration Service</h2>
                <table className="Center">
                    <tbody>
                        <tr><td>
                        <label htmlFor="username">UserName</label>
                        </td><td>
                        <input type="text" name="username" value={user.username} onChange={onChange} />
                        </td></tr>
                        <tr><td>
                        <label htmlFor="password">Password</label>
                        </td><td>
                        <input type="text" name="password" value={user.password} onChange={onChange} />
                        </td></tr>
                    </tbody>
                </table>
                
                <br/>
                <button id="submit" onClick={login}>Login</button>
            </div>
        );
    }
}
export default Login;