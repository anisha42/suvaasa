import React, {useState} from 'react';
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
                <div className="image_detail_container">
                        <Box className="image__container">
                            <img src={item.img} style={{width:"90%", alignSelf:"center", height:"85%", paddingTop:"5%"}}/>
                        </Box>
                        <Box className="details__container"
                             style={{fontFamily: "Morganite",
                                 fontWeight: "bold"}}>
                            <Box id="name" style={{
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
                </div>
                <div>
                    <div className="description_heading"
                    >
                        GARDENING
                    </div>
                    <div style={{textAlign: "center",
                        fontSize: "17px",
                        color: "grey",
                        padding:"0 8% 0 8%"
                    }}>
                        The name peperomia might not roll off your tongue, but you could get lost in this wonderful genus of tropical plants. The name peperomia might not roll off your tongue, but you could get lost in this wonderful genus of tropical plants.

                    </div>
                    <br/><br/>
                </div>
            </div>
        </div>
    );
}

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