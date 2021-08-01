import React, {useEffect, useState} from 'react';
import '../Styles/ProductDetails.css';
import {Box} from "grommet";
import {useLocation, useHistory} from "react-router-dom";
import {addToCart, setProduct} from "../redux";
import {connect} from "react-redux";
function ProductDetails({user, setProduct}){

    const location= useLocation();
    const history= useHistory()
    const [quantity, setQuantity]= useState(1);
    const item= location.state.item;

    const handleQuickBuy= ()=>{
        if(user) {
            setProduct([{...item, quantity}]);
            history.push('/checkout');
        }else{
            history.push({pathname:'/login', state: {path: '/explore'}});
        }
    }

    return(
        <div className='productList'>
            <div className='title_container'><p style={{marginTop: "5%"}}><small>$</small>{item.price}</p></div>
            <div className='product__card'>
                <Box width="80%" background="white"
                     style={{borderRadius:" 10px 10px",
                         boxShadow: "-5px -7px 28px 0px rgba(0,0,0,0.39)"}}
                >
                    <Box className="product__details"
                         style={{display: "flex",
                             flexDirection: "row"}}
                    >
                        <Box className="image__container" style={{width:"600px"}}>
                            <Box style={{
                                height:"600px",
                                borderRadius:" 10px 10px",
                                boxShadow: "-5px -7px 28px 0px gray"}}>
                                <img src={item.img}/>
                                {/*<img src={pic}/>*/}
                            </Box>
                            <br/>
                            <p style={{textAlign: "center",
                                fontSize: "40px",
                                fontWeight: "bold",
                                marginBottom: "3px",
                                color: "black"}}
                            >
                                GARDENING
                            </p>
                            <p style={{textAlign: "center",
                                fontSize: "20px",
                                color: "grey"
                            }}>
                                The name peperomia might not roll off your tongue, but you could get lost in this wonderful genus of tropical plants.
                            </p>
                        </Box>
                        <Box className="details__container"
                             style={{fontFamily: "Morganite",
                                 fontWeight: "bold"}}>
                            <Box style={{fontSize: "90px",
                                margin: "40px"}}
                            >{item.name}</Box>
                            <h3 style={{fontSize: "25px",
                                marginTop: "0px"}}
                            >In Stock
                                <br/><br/><br/>
                                Quantity
                            </h3>
                            <div className="button__container">
                                <button className="button" onClick={()=> quantity>1?setQuantity(quantity-1):setQuantity(quantity)}>-</button>
                                <button className="quantity">{quantity}</button>
                                <button className="button" onClick={()=> setQuantity(quantity+1)}>+</button>
                            </div>
                            <div className="action__container">
                                <button className="button" style={{backgroundColor: "bisque",}}>
                                    ADD TO CART</button>
                                <button className="button" style={{backgroundColor: "black",
                                    color: "white"}} onClick={handleQuickBuy}>QUICK BUY</button>
                            </div>
                        </Box>
                    </Box>
                </Box>
            </div>
        </div>

    );
}

//export default ProductDetails;
const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProduct: (product) => dispatch(setProduct(product))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetails);