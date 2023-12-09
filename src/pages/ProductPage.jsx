/** @format */

import { createContext, useContext, useState, useEffect } from "react";
import "../components/ProductPage.css";
import TrendingSlider from "../components/TrendingSlider";
import Footer from "../components/Footer";
import { useParams } from "react-router";
import * as contentful from "contentful";

const client = contentful.createClient({
  space: "e9dwau7vjbs6",
  accessToken: "d9ymuC2EDYPqlUt3i6oihIk1vW_q90jJeGbNxefiLtg",
});

export const CartContext = createContext();

function ProductPage() {
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [notify, setNotify] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    // Fetch data from Contentful
    client
      .getEntries({
        content_type: "products",
        "fields.id": parseInt(id),
      })
      .then(response => {
        // Set the item state with the fetched data
        const contentfulItem = response.items[0];
        setItem(contentfulItem.fields);
        setImage(contentfulItem.fields.img.fields.file.url);
      })
      .catch(error =>
        console.error("Error fetching data from Contentful:", error)
      );
  }, [id]);

  const changeImage = e => {
    setImage(e.target.src);
  };

  const increase = () => {
    if (quantity >= 1) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const calcPrice = (quantity, price) => {
    return quantity * price;
  };

  const showNotify = () => {
    setNotify(!notify);
  };

  if (!item) {
    // Loading state or error handling can be added here
    return null;
  }

  return (
    <>
      <div
        onAnimationEnd={() => setNotify(false)}
        className={`notify ${notify ? "slide-in" : ""}`}>
        <p>Item has been added to the cart &nbsp; ✅</p>
      </div>

      <div className='product-page-div'>
        <div className='container'>
          <div className='product-div'>
            <h3 className='product-big-name'>{item.descriprtion}</h3>
            <div className='product-left'>
              <div className='big-img'>
                <img src={image} alt='product' />
              </div>
              <div className="small-imgs">
              <img src={item.img.fields.file.url} alt="" className="simple-img" onMouseOver={changeImage}/>
                {item.otherImgs.map((img, index) => (
                  <img
                    key={index}
                    onMouseOver={changeImage}
                    src={img.fields.file.url}
                    alt={`product-${index}`}
                  />
                ))}
              </div>
            </div>
            <div className='product-right'>
              <p className='product-spec'>{item.specs}</p>
              <div className='product-quant'>
                <p>Quantity</p>
                <div className='product-btns'>
                  <button onClick={decrease}>-</button>
                  <p className='quantity'>{quantity}</p>
                  <button onClick={increase}>+</button>
                </div>
                <p className='product-price'>
                  {calcPrice(quantity, item.price)}.00$
                </p>
              </div>
              <div className='atc-buy'>
                <button
                  onClick={() => {
                    // Include quantity in the product object
                    addToCart({ ...item, quantity });
                    showNotify();
                  }}
                  className='atc-btn'>
                  add to cart
                </button>
                <button className='buy-btn'>buy now</button>
              </div>
            </div>
          </div>
          <div className='specifications'>
            <div className='spec'>
              <p className='spec-title'>Texture:</p>
              <p className='title-desc'>{item.texture}</p>
            </div>
            <div className='spec'>
              <p className='spec-title'>Weight:</p>
              <p className='title-desc'>{item.weight}</p>
            </div>
            <div className='spec'>
              <p className='spec-title'>Size:</p>
              <p className='title-desc'>{item.size}</p>
            </div>
          </div>
        </div>
        <TrendingSlider />
        <Footer />
      </div>
    </>
  );
}

export default ProductPage;



