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
            <div className='title_container'></div>
            <div className='product__card'>
                <Box width="80%"
                     style={{borderRadius:" 10px 10px", backgroundColor:"white",
                         boxShadow: "-5px -7px 28px 0px rgba(0,0,0,0.39)", display: "flex",
                         flexDirection: "row", justifyContent:"space-around", paddingTop:"5%"}}
                >
                    {/*<Box className="product__details"*/}
                    {/*     style={{display: "flex",*/}
                    {/*         flexDirection: "row", backgroundColor:"pink", justifyContent:"space-around", margin:"0"}}*/}
                    {/*>*/}
                        <Box className="image__container" style={{width:"450px"}}>
                            <Box style={{
                                height:"500px",
                                borderRadius:" 10px 10px",
                                boxShadow: "-5px -7px 28px 0px gray",
                                }}>
                                <img src={item.img} style={{width:"90%", alignSelf:"center", height:"85%", paddingTop:"5%"}}/>
                                {/*<img src={pic}/>*/}
                            </Box>

                            <p style={{textAlign: "center",
                                fontSize: "32px",
                                fontWeight: "bold",
                                marginBottom: "3px",
                                color: "black"}}
                            >
                                GARDENING
                            </p>
                            <div style={{textAlign: "center",
                                fontSize: "17px",
                                color: "grey"
                            }}>
                                The name peperomia might not roll off your tongue, but you could get lost in this wonderful genus of tropical plants.
                            </div>
                            <br/><br/>
                        </Box>
                        <Box className="details__container"
                             style={{fontFamily: "Morganite",
                                 fontWeight: "bold"}}>
                            <Box style={{fontSize: "50px",
                                marginTop: "16%"}}
                            >{item.name}</Box><br/>
                            <Box style={{fontSize: "30px",
                                marginBottom: "25px"}}
                            >${item.price}</Box>
                            <h3 style={{fontSize: "25px",
                                marginTop: "0px", color:"green"}}
                            >In Stock
                                <br/><br/>
                                <span style={{color:"black"}}>Quantity</span>
                            </h3>
                            <div className="button__container">
                                <button className="button" onClick={()=> quantity>1?setQuantity(quantity-1):setQuantity(quantity)}>-</button>
                                <button className="quantity"><small>{quantity}</small></button>
                                <button className="button" onClick={()=> setQuantity(quantity+1)}>+</button>
                            </div>
                            <div className="action__container">
                                <button className="button" style={{backgroundColor: "bisque",}}>
                                    ADD TO CART</button>
                                <button className="button" style={{backgroundColor: "black",
                                    color: "white"}} onClick={handleQuickBuy}>QUICK BUY</button>
                            </div>
                        </Box>
                    {/*</Box>*/}
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