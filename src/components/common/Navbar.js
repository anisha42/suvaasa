import {auth, getCartItems, getName} from "../../firebase/firebase.utils";
import {connect} from "react-redux";
import {getCartLength} from "../../redux/Reducer";
import '../../Styles/Navbar.css'
import {Cart} from "grommet-icons";
import {Grommet} from "grommet";
import {useState} from "react";
import {Link, useHistory, useLocation} from 'react-router-dom';


const theme = {
    global: {
        colors: {
            icon: 'white',
        },
    }
}

function Navbar({cart}) {

    const [user, setUser] = useState(null);
    const [loginOpen, setLoginOpen] =useState(false);
    const location= useLocation();
    const handleAuthentication = (e) => {
        if (user) {
            auth.signOut();
        }
    }

    return(
        <div>
        <div className="navbar">
            <Link to="/" style={{textDecoration: "none"}}>
                <div className="logo">Suvaasa</div>
            </Link>
            <div className="nav_items">
                <Link to="/explore" style={{textDecoration: "none"}}>
                    <div className="nav_item">Explore</div>
                </Link>
                <div className="nav_item">Your Orders</div>
                <Link to={!user && {pathname: '/login', state: {path: location.pathname}}} style={{textDecoration: "none"}}>
                    <div className="nav_item" onClick={handleAuthentication}>{user ? 'Log Out' : 'Log In'}</div>
                </Link>
            </div>
            <Grommet theme={theme}>
                <Link to="/cart" style={{textDecoration: "none"}}>
                    <div className="cart_container"><Cart/><span style={{color: 'yellow'}}>{getCartLength(cart)}</span></div>
                </Link>
            </Grommet>
        </div>
</div>
)
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Navbar)