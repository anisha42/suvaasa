const {SET_USER, ADD_TO_CART, SET_ADDRESS, SET_PRODUCT, REMOVE_PRODUCT, DECREASE_QUANTITY}= require("./ActionType");

export const initialState = {
    productToBuy: [],
    cart: [],
    user: null,
    addressDetails: []
}

const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);
    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        );
    }
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
};

const removeItemFromCart = (cartItems, cartItemToRemove)=> {
    const itemIndex = cartItems.findIndex(cartItem => cartItem.id === cartItemToRemove.id);
    let newCart= [...cartItems];
    newCart.splice(itemIndex, 1);
    return newCart;
}

const decreaseQuantity = (cartItems, item) => {
    const itemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    let newCart= [...cartItems];
    if(newCart[itemIndex].quantity>1){
        newCart[itemIndex].quantity-=1;
    }else {
        newCart.splice(itemIndex, 1);
    }
    return newCart;
};

export const getCartTotal = (productList) =>
    productList?.reduce((amount, product) => product.price * product.quantity + amount, 0);

export const getCartLength= (cart)=>
    cart?.reduce((count, item)=> item.quantity + count, 0);


const reducer = (state= initialState, action) => {
    switch (action.type){
        case ADD_TO_CART:
            return {
                ...state,
                cart: addItemToCart(state.cart, action.payload)
                // cart: [...state.cart, action.payload]
                // cart: action.payload
            };
        case DECREASE_QUANTITY:
            return {
                ...state,
                cart: decreaseQuantity(state.cart, action.payload)
            }
        case SET_ADDRESS:
            return {
                ...state,
                addressDetails: action.payload
            }
        case SET_PRODUCT:
            return {
                ...state,
                productToBuy: action.payload
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case REMOVE_PRODUCT:
            return {
                ...state,
                cart: removeItemFromCart(state.cart, action.payload)
            }
        default:
            return state;
    }
}

export default reducer;