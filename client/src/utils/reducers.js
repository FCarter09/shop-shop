// import actions
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
  } from "./actions";

// import useReducer hook from react
import { useReducer } from 'react';



  
  export const reducer = (state, action) => {
    switch (action.type) {
      // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
      case UPDATE_PRODUCTS:
            return {
            ...state,
            products: [...action.products],
            };

       // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
       case UPDATE_CATEGORIES:
            return {
            ...state,
            categories: [...action.categories]
            };
        
        // if action type value is the value of `UPDATE_CURRENT_CATEGORY`, return the new state object with an updated category
        case UPDATE_CURRENT_CATEGORY:
            return {
              ...state,
              currentCategory: action.currentCategory
            };

        // if action type value is the value of `ADD_TO_CART` turn the new state object with an updated cart array
        case ADD_TO_CART:
          return {
            ...state,
            cartOpen: true,
            cart: [...state.cart, action.product]
          };

        // if action type value is the value of `ADD_MULTIPLE_TO_CART` turn the new state object with an updated cart array 
        case ADD_MULTIPLE_TO_CART:
          return {
             ...state,
             cart: [...state.cart, ...action.products]
          };

        // if action type value is value of `DELETE_FROM_CART` turn the new state object with items deleted from cart
        case REMOVE_FROM_CART:
          let newState = state.cart.filter(product => {
            return product._id !== action._id;
          });

          return {
            ...state,
            cartOpen: newState.length > 0,
            cart: newState
          };

          // if action type value is value of `UPDATE_CART_QUANTITY` then the new state object with quantity of items updated
          case UPDATE_CART_QUANTITY:
            return {
              ...state,
              cartOpen: true,
              cart: state.cart.map(product => {
                if (action._id === product._id) {
                  product.purchaseQuantity = action.purchaseQuantity;
                }
                return product;
              })
            };

          // if value of `CLEAR_CART` then the new state object will return a clear cart
          case CLEAR_CART:
              return {
                ...state,
                cartOpen: false,
                cart: []
              };
              
          // if value of `TOGGLE_CART` then set value opposite of previous value
            case TOGGLE_CART:
              return {
                ...state,
                cartOpen: !state.cartOpen
              };

      // if it's none of these actions, do not update state at all and keep things the same!
      default:
        return state;
    }
  };

  // export userReducer hook with reducer function to initialize global state object
  export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
  }