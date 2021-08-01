import React, {useState} from 'react';
import '../Styles/Login.css';
import icon from '../assets/google_icon.png';
import {Lock, Email} from '@material-ui/icons';
import {Image, Layer} from "grommet";
import {Link, useHistory, useLocation} from 'react-router-dom';
import { auth } from "../firebase/firebase.utils.js";
import { SignInWithGoogle } from '../firebase/firebase.utils';

function Login() {

    const [open, setOpen] = React.useState(true);
    const history= useHistory();
    const location= useLocation();
    const onClose = () => setOpen(undefined);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.replace(location.state.path);
            })
            .catch(error => alert(error.message))
    }
    console.log(open)
    return (
        // <grommet theme={theme}>
        <div className='login'>
            {/*{open && (<Layer position="center" onClickOutside= {()=> history.replace(location.state.path)} onEsc={onClose}>*/}
                <div className='login__container'>
                    <h1>Login Now</h1>

                    <form>
                        <div><Email style={{color: "grey", verticalAlign: "middle"}}/>
                            <input type='text' placeholder="Enter your email" onChange={e => setEmail(e.target.value)} required/></div>

                        <div><Lock style={{color: "grey", verticalAlign: "middle"}}/>
                            <input type='password' placeholder="Enter your password" onChange={e => setPassword(e.target.value)} required/></div>

                        <button type='submit' className='login__signInButton' onClick={logIn}>Submit</button>
                    </form>
                    <div className="google__icon" onClick={SignInWithGoogle}>or connect with <Image src={icon} style={{verticalAlign: "middle"}}/></div>
                    <h5>Don't have an account?</h5>
                    <Link to={{pathname:"/signup", state: {path: location.state.path}}}><button className='login__registerButton'>SignUp Now</button></Link>
                </div>
            {/*</Layer>)}*/}
        </div>
        // </grommet>
    )
}

export default Login
