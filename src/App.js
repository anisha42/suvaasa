import React, {useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase/firebase.utils.js";
import { connect } from 'react-redux';
import  {setUser} from "./redux";
import Navbar from "./components/common/Navbar";
import Explore from './components/Explore'
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProductDetails from "./components/ProductDetails";

function App({user, setUser}) {

  useEffect(() => {

    auth.onAuthStateChanged((authUser) => {

      console.log("User ", authUser);

      if (authUser) {
        setUser(authUser);
        console.log("user from state",user);

      } else {
        setUser(null);
        console.log("user from state",user);
      }
    });
  }, []);

  return (
    <Router>
      <div>
        <Navbar/>
        <Switch>
          <Route path="/home">
            {/*<TileProductExplore/>*/}
            {/*<ProductsSlide/>*/}
            {/*<Plants/>*/}
            {/*<TopCategory/>*/}
            {/*/!*<BestSeller/>*!/*/}
            {/*<ProductListButton/>*/}
            {/*<FooterBar/>*/}
          </Route>
          <Route path="/explore">
            {/*<ProductList/>*/}
            <Explore/>
            {/*<FooterBar/>*/}
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/cart">
            {/*<Cart/>*/}
            {/*<FooterBar/>*/}
          </Route>
          <Route path="/checkout">
            {/*<Checkout/>*/}
            {/*<FooterBar/>*/}
          </Route>
          <Route path="/payment">

          </Route>
          <Route path="/productDetails">
            <ProductDetails/>
            {/*<FooterBar/>*/}
          </Route>
          <Route path="/orders">
            {/*<InvoicePage/>*/}
            {/*<FooterBar/>*/}
          </Route>
          <Route exact path="/">
            {/*<LandingPage/>*/}
            {/*<FooterBar/>*/}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch(setUser(user))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

