import { useContext } from "react";
import { CartContext } from "../pages/ProductPage";
import { IconX } from "@tabler/icons-react";

function CartItem({ item, index }) {
  const { cartItem, setCartItem } = useContext(CartContext);

  const increase = () => {
        const updatedCart = cartItem.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
        setCartItem(updatedCart);
      };

    const decrease = () => {
    const updatedCart = cartItem.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
    setCartItem(updatedCart);
  };

  // const removeFromCart = () => {
  //   const updatedCart = [...cartItem];
  //   updatedCart.splice(index, 1);
  //   setCartItem(updatedCart);
  // };

  const removeFromCart = () => {
    // Find the index of the item with the matching id
    const itemIndex = cartItem.findIndex((cartItem) => cartItem.id === item.id);
  
    if (itemIndex !== -1) {
      // Create a new array without the item
      const updatedCart = cartItem.filter((_, index) => index !== itemIndex);
      setCartItem(updatedCart);
    }
  };

  const calcPrice = (quantity, price) => {
    return quantity * price;
  };

  return (
    <div className="cart-item">
      <div className="cart-img">
        <img src={item.img.fields.file.url} alt="product" />
      </div>
      <div className="cart-middle">
        <p className="cart-name">{item.descriprtion}</p>
        <div className="cart-btns">
          <button onClick={decrease}>-</button>
          <p className="quantity">{item.quantity}</p>
          <button onClick={increase}>+</button>
        </div>
      </div>
      <div className="cart-right">
        <p className="cart-price">{calcPrice(item.quantity, item.price)}.00$</p>
        <IconX onClick={removeFromCart} />
      </div>
    </div>
  );
}

export default CartItem;

// import { useContext } from "react";
// import { CartContext } from "../pages/ProductPage";
// import { IconX } from "@tabler/icons-react";

// function CartItem({ item, index }) {
//   const { cartItem, setCartItem } = useContext(CartContext);

//   const increase = () => {
//     const updatedCart = cartItem.map((cartItem) => {
//       if (cartItem.fields.id === item.fields.id) {
//         return { ...cartItem, quantity: cartItem.quantity + 1 };
//       }
//       return cartItem;
//     });
//     setCartItem(updatedCart);
//   };

//   const decrease = () => {
//     const updatedCart = cartItem.map((cartItem) => {
//       if (cartItem.fields.id === item.fields.id && cartItem.quantity > 1) {
//         return { ...cartItem, quantity: cartItem.quantity - 1 };
//       }
//       return cartItem;
//     });
//     setCartItem(updatedCart);
//   };

//   const removeFromCart = () => {
//     const updatedCart = cartItem.filter((cartItem) => cartItem.fields.id !== item.fields.id);
//     setCartItem(updatedCart);
//   };

//   const calcPrice = (quantity, price) => {
//     return quantity * price;
//   };

//   return (
//     <div className="cart-item">
//       <div className="cart-img">
//         <img src={item.fields.img.fields.file.url} alt="product" />
//       </div>
//       <div className="cart-middle">
//         <p className="cart-name">{item.fields.descriprtion}</p>
//         <div className="cart-btns">
//           <button onClick={decrease}>-</button>
//           <p className="quantity">{item.quantity}</p>
//           <button onClick={increase}>+</button>
//         </div>
//       </div>
//       <div className="cart-right">
//         <p className="cart-price">{calcPrice(item.quantity, item.fields.price)}.00$</p>
//         <IconX onClick={removeFromCart} />
//       </div>
//     </div>
//   );
// }

// export default CartItem;





