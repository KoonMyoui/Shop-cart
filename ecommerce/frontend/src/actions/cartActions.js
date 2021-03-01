import axios from "axios"
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actionTypes";

const addToCart = (productId, qty) => async (dispatch, getState) =>{
    try {
        const {data} = await axios.get(`/api/product/${productId}`);
        dispatch({
            type: CART_ADD_ITEM, payload:{
                product: data._id,
                name: data.name,
                image: data.url,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        });
        const {cart:{cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));//save to Cookie

    } catch (error) {
        
    }
}
const removeFromCart = (productId) =>(dispatch, getState) =>{
    dispatch({type: CART_REMOVE_ITEM, payload: productId});

    const {cart:{cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}
export {addToCart, removeFromCart}