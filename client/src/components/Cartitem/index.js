import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

const CartItem = ({ item }) => {

    const [, dispatch] = useStoreContext();

    // function to remove item from cart when user clicks on 'trash can' icon
    const removeFromCart = item => {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
    };

    // allow users to manually edit the quantity of shopping cart items by typing directly in the input field 
    const onChange = (e) => {
        const value = e.target.value;
      
        if (value === '0') { // if user types 0 for quantity of items then delete item from cart
          dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
          });
        } else { // user enters any number greater than 0 then add the value in the quantity input field
          dispatch({
            type: UPDATE_CART_QUANTITY, 
            _id: item._id,
            purchaseQuantity: parseInt(value)
          });
        }
      };

    return (
        <div className="flex-row">
        <div>
            <img
            src={`/images/${item.image}`}
            alt=""
            />
        </div>
        <div>
            <div>{item.name}, ${item.price}</div>
            <div>
            <span>Qty:</span>
            <input
                type="number"
                placeholder="1"
                value={item.purchaseQuantity}
                onChange={onChange}
            />
            <span
                role="img"
                aria-label="trash"
                onClick={() => removeFromCart(item)}
            >
                🗑️
            </span>
            </div>
        </div>
        </div>
    );
}

export default CartItem;