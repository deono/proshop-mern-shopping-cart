import axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  // get the product data from the database
  const { data } = axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  // save the cartItems to localStorage
  // getState() retreives the whole state from the store
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
