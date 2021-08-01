import React from "react";
import "../../Styles/Product.css";
import {Link, useHistory} from 'react-router-dom';
import {addToCart} from "../../redux";
import {connect} from "react-redux";

function Product({ item, addToCart }) {

    const history= useHistory();

    const handleAddButton=()=>{
        addToCart(item);
    }

    const handleImage= ()=>{
        history.push({
            pathname: "/productDetails",
            state: {
                item: item
            }
        })
    }

    return (

        <div className="product">
            {/*<div className="product__info">*/}
            {/*  <p>{item.name}</p>*/}
            {/*  <p className="product__price">*/}
            {/*    <small>$</small>*/}
            {/*    <strong>{item.price}</strong>*/}
            {/*  </p>*/}
            {/*</div>*/}
            {/*  <Link to={{*/}
            {/*      pathname:"/productDetails",*/}
            {/*      state: {*/}
            {/*          item: item*/}
            {/*      }*/}
            {/*  }}>*/}
            <img className="image" src={item.img} alt="" onClick={handleImage}/>
            {/*</Link>*/}
            <div className="product__info">
                <p className="product__name">{item.name}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{item.price}</strong>

                </p>
                <button style={{cursor: 'pointer'}} onClick={handleAddButton}>Add to Cart</button>
            </div>

            {/*<button>Add to Basket</button>*/}
        </div>


    );
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (item) => dispatch(addToCart(item))
    }
}

export default connect(null, mapDispatchToProps)(Product);
