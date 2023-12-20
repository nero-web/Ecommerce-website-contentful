import { Link } from "react-router-dom";
import { useContext } from "react";
import CartItem from "./CartItem";
import { CartContext } from "../pages/ProductPage";
import EmptyCart from "./EmptyCart";

function CartWithItems() {
  const { cartItem } = useContext(CartContext);

  const totalPrice = cartItem.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <>
    <div className="full-cart-div">
      <div className="full-cart">
        {cartItem.length !== 0 ? (
          cartItem.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
    <div className="subtotal-div">
        <div className="sub-right">
          <p>Subtotal</p>
          <p className="total-price">{totalPrice.toFixed(2)}$</p>
        </div>
        <div className="sub-left">
          <Link to="/checkout">Go to Checkout</Link>
        </div>
      </div>
    </>
  );
}

export default CartWithItems;


