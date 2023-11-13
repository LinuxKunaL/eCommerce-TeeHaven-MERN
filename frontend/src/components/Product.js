import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Product(props) {
  return (
    <Link to={"/product/" + props.ProductId}>
      <div
        data-product-id={props.ProductId}
        data-after={props.Discount + "%"}
        data-before={props.ProductTag}
        data-category={props.Categories}
        className="product"
      >
        <div className="imgDiv">
          <img src={props.ProductMainImg} alt="" />
        </div>
        <div className="bottom">
          <h1>{props.Title}</h1>
          <div className="price">
            <span>₹{props.NewPrice + ".0"}</span>
            <legend>₹{props.OldPrice + ".0"}</legend>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Product;
