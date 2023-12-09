// import "./TrendingSlider.css";
// import { items } from "./AllData";
// import { Link } from "react-router-dom";

// function TrendingItem() {

//   const filteredItems = items.filter((item) => item.id >= 8);
//   return (
//     <>
//       {filteredItems.map((item) => (
//         <div key={item.id} className="row-item">
//           <Link
//             onClick={() => window.top(0, 0)}
//             to={`/categories/product/${item.id}`}
//           >
//             <div className="item-header">
//               <img src={item.img} alt="product" className=""/>
//             </div>
//             <div className="item-description">
//               <p>{item.description}</p>
//               <p className="item-price">{item.price}$</p>
//             </div>
//           </Link>
//         </div>
//       ))}
//     </>
//   );
// }

// export default TrendingItem;


import "./TrendingSlider.css";
import { useEffect, useState } from "react";
import * as contentful from "contentful";
import { Link } from "react-router-dom";

const client = contentful.createClient({
  space: "e9dwau7vjbs6",
  accessToken: "d9ymuC2EDYPqlUt3i6oihIk1vW_q90jJeGbNxefiLtg",
});

function TrendingItem() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from Contentful
    client
      .getEntries({
        content_type: "products",
      })
      .then((response) => {
        setItems(response.items);
      })
      .catch((error) => console.error("Error fetching data from Contentful:", error));
  }, []);

  const filteredItems = items.filter((item) => item.fields.id >= 8);

  return (
    <>
      {filteredItems.map((item) => (
        <div key={item.sys.id} className="row-item">
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to={`/categories/product/${item.fields.id}`}
          >
            <div className="item-header">
              <img src={item.fields.img.fields.file.url} alt="product" className="" />
            </div>
            <div className="item-description">
              <p>{item.fields.descriprtion}</p>
              <p className="item-price">{item.fields.price}$</p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}

export default TrendingItem;
