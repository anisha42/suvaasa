import {SET_USER, ADD_TO_CART, SET_ADDRESS, SET_PRODUCT, REMOVE_PRODUCT, DECREASE_QUANTITY} from "./ActionType";

export const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const addToCart = cartItems => {
    return {
        type: ADD_TO_CART,
        payload: cartItems
    }
}

export const setAddress = address => {
    return {
        type: SET_ADDRESS,
        payload: address
    }
}

export const setProduct = product => {
    return {
        type: SET_PRODUCT,
        payload: product
    }
}

export const removeFromCart= item =>{
    return {
        type: REMOVE_PRODUCT,
        payload: item
    }
}

export const decQuantity= item =>{
    return {
        type: DECREASE_QUANTITY,
        payload: item
    }
}
