import React, {useState} from 'react';
import '../Styles/Signup.css'
import {Person, Lock, Email} from '@material-ui/icons';
import {Image, Layer} from "grommet";
import icon from "../assets/google_icon.png";
import {Link, useHistory, useLocation} from 'react-router-dom';
import {auth, firestore, SignInWithGoogle} from "../firebase/firebase.utils.js";
import {createUserProfileDocument} from "../firebase/firebase.utils";
import {connect} from "react-redux";

function Signup({user, cart}) {

    const [open, setOpen] = React.useState(true);
    const history= useHistory();
    const location= useLocation();
    const onClose = () => setOpen(undefined);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    //console.log("auth", auth.user);
                    firestore
                        .collection('users')
                        .doc(auth.user?.uid)
                        .set({
                            displayName: displayName
                        })

                    history.replace(location.state.path);
                }
            })
            .catch(error => alert(error.message))

        //createUserProfileDocument({displayName, email, password});
    }

    return (
        <div className='signup'>
            {/*{open && (<Layer animation="fadeIn" position="center" onClickOutside= {()=> history.replace(location.state.path)} onEsc={onClose}>*/}

                <div className='signup__container'>
                    <h1>Welcome</h1>

                    <form>
                        <div><Person style={{color: "grey", verticalAlign: "middle"}}/>
                            <input type='text' placeholder="Name" onChange={e => setDisplayName(e.target.value)} required/></div>

                        <div><Email style={{color: "grey", verticalAlign: "middle"}}/>
                            <input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)} required/></div>

                        <div><Lock style={{color: "grey", verticalAlign: "middle"}}/>
                            <input type='password' placeholder="Set password" onChange={e => setPassword(e.target.value)} required/></div>

                        <button type='submit' className='signup__signUpButton' onClick={register}>Submit</button>
                    </form>

                    <div className="google__icon" onClick={SignInWithGoogle}>or connect with <Image src={icon} style={{verticalAlign: "middle"}}/></div>

                    <h5>Already have an account?</h5>
                    <Link to={{pathname:"/login", state: {path: location.state.path}}}><button className='signup__signInButton'>Login Now</button></Link>
                </div>
            {/*</Layer>)}*/}
        </div>
    )
}

//export default Signup
const mapStateToProps = state => {
    return {
        user: state.user,
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Signup)
