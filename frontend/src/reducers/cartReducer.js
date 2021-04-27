import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      // check if the item is already in the cart
      // returns false if not in cart
      const existItem = state.cartItems.find(x => x.product === item.product);

      if (existItem) {
        // if the item exists, map over the cart
        // if the current iteration is the same as the item,
        // set the item, otherwise, set the current iteration (x)
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x
          )
        };
      } else {
        // if the item does not exist in the cart, push it to the array
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        // return products not matching the product id in payload
        cartItems: state.cartItems.filter(x => x.product !== action.payload)
      };
    default:
      return state;
  }
};
