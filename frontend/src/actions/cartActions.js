import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  // get the product data from the database
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  });

  // save the cartItems to localStorage
  // getState() retreives the whole state from the store
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = id => (dispatch, getState) => {
  // remove the item from state
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  });

  // save the updated cartItems to localStorage
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = formData => dispatch => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: formData
  });

  // save the shipping address to localStorage
  localStorage.setItem('shippingAddress', JSON.stringify(formData));
};
