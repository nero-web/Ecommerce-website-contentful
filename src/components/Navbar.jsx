import "./Navbar.css";

import LogoImg2 from "../img/newlogo2.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';
import CartWithItems from "./CartWithItems";
import EmptyCart from "./EmptyCart";
import { CartContext } from "../pages/ProductPage";
import { IconMenu2, IconShoppingCart, IconX } from "@tabler/icons-react";

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [cart, setCart] = useState(false);

  const { cartItem } = useContext(CartContext);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const links = [
    { to: '/', label: 'Home' },
    { to: '/categories/all', label: 'Categories' },
    { to: '/contactus', label: 'Contact Us'},
  ];

  const closeOverlay = () => {
    mobileNav(false);
  };


  const openCart = () => {
    setCart(!cart);
  };

  window.addEventListener("scroll", handleScroll);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };



  return (
    <div>
      <div onClick={setMobileNav}  style={{ color:  "black", transition: 'transform 1s', transform: mobileNav ? 'translateY(0%)' : 'translateY(-100%)', opacity: 0.8, backgroundColor: "#fff"}} className={mobileNav ? 'fixed text-black left-0 top-[70px] w-full px-4 py-7 flex flex-col rounded-b-[16px] z-50' : 'absolute top-[-100]'}>
        <ul className={mobileNav ? 'block' : 'hidden'}>
          {links.map((link, index) => (
            <Link onClick={closeOverlay} to={link.to} key={index}>
              <li
                
                className="py-4 ps-6 text-3xl font-semibold"
              >
                {link.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* overlay */}
      <div
        onClick={openCart}
        className={`page-overlay ${cart ? "open-flex" : "closed-flex"}`}
      ></div>

      {/* cart */}
      <div className={`cart-div ${cart ? "open-cart" : "closed-cart"}`}>
        <div className="cart-title-btn">
          <h2 className="cart-full-h2">
            Your Shopping Cart ({cartItem.length})
          </h2>
          <IconX onClick={openCart} />
        </div>

        <div className="cart-body">
          {cartItem.length < 1 ? (
            <EmptyCart openCart={openCart} />
          ) : (
            <CartWithItems />
          )}
        </div>
      </div>

      <nav className="navbar htm">
        <div className="container">
          <div className={`nav-container ${sticky ? "cont-sticky" : ""}`}>
            <Link to="/">
              <img
                onClick={scrollToTop}
                src={LogoImg2}
                alt="logo"
                className="logo-img"
              />
            </Link>
            <div className="nav-links">
              <Link
                onClick={() => window.scrollTo(0, 0)}
                to="/"
              >
                Home
              </Link>
              <Link onClick={() => window.scrollTo(0, 0)} to="/categories/all">
                CATEGORIES
              </Link>
              <Link onClick={() => window.scrollTo(0, 0)} to="/contactus">
                Contact us
              </Link>
              <i
                data-array-length={cartItem.length}
                onClick={openCart}
                className={`${
                  cartItem.length < 1 ? "cart-icon" : "cart-icon with-items"
                }`}
              >
                <IconShoppingCart />
              </i>
            </div>
            <div className="hamburger-menu">
              <i
                data-array-length={cartItem.length}
                onClick={openCart}
                className={`hamburger-cart ${
                  cartItem.length < 1 ? "cart-icon" : "cart-icon with-items"
                }`}
              >
                <IconShoppingCart />
              </i>
              <i
                onClick={() => setMobileNav(!mobileNav)}
                className="hamburger-hamb"
              >
                {mobileNav ? <AiOutlineClose/> : <IconMenu2 />}
              </i>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
