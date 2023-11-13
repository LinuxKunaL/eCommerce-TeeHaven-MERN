import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Toaster, toast } from "react-hot-toast";
import { setTrue } from "../App/redux/states/componentsload";
import { GetProductData } from "../api";
import { ToastRed, ToastGreen } from "../App/toast";
import { MoonLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import Product from "../components/Product";

import Rating from "react-rating";
import {
  PostProductReview,
  GetProductReviewById,
  GetProductById,
} from "../api";

import { RxClipboardCopy } from "react-icons/rx";
import { CheckUserLogin } from "../api/auth";

import "../assets/styles/productOverview.css";

function ProductOverview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currantPage, setCurrantPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [Products, setProducts] = useState([]);
  const CounterInput = document.getElementById("CounterInput");
  const [postProductReview, setPostProductReview] = useState({
    stars: 1,
    message: "",
  });
  const [ProductReviewData, setProductReviewData] = useState([]);
  const [ProductData, setProductData] = useState([]);
  const [totalCount, setTotalCount] = useState(1);
  const CartData = JSON.parse(localStorage.getItem("cartItems")) || [];
  const [CheckItemInCart, setCheckItemInCart] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const LoadStateSelector = useSelector((state) => state.load);
  const userLogIn = useSelector((state) => state.userLoginStates);
  const LoadStateDispatch = useDispatch();
  const dispatch = useDispatch();
  const CHECK_VALUE_FOR_BUTTON = LoadStateSelector || CheckItemInCart;
  const [productReviewStats, setProductReviewStats] = useState({
    star: "",
    reviewCount: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetProductData(
        currantPage,
        4,
        ProductData.category,
        ""
      );
      setProducts(result.products);
      setTimeout(() => {
        setLoading(false);
      }, 400);
    };
    fetchData();
  }, [ProductData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetProductById(id);
        setProductData(data);
        if (data.length == 0) {
          navigate("/");
          return null;
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
    CheckUserLogin(dispatch);
  }, [id]);

  useEffect(() => {
    setCheckItemInCart(CartData.some((item) => item.id === `${id}`));
  }, [CartData]);

  useEffect(() => {
    if (ProductData.selectsize === null) {
      setSelectedOption("Empty");
    }
  }, [ProductData]);

  useEffect(() => {
    const fetching = async () => {
      const response = await GetProductReviewById(id);
      setProductReviewData(response);
      setProductReviewStats({
        star:
          response.reduce(
            (acc, currentValue) => acc + currentValue.review.stars,
            0
          ) / 5,
        reviewCount: response.length,
      });
    };
    fetching();
  }, [postProductReview]);

  const increment = () => {
    const newValue = totalCount + 1;
    if (newValue <= 9) {
      setTotalCount(newValue);
      CounterInput.value = newValue;
    }
  };

  const decrement = () => {
    const newValue = totalCount - 1;
    if (newValue >= 1) {
      setTotalCount(newValue);
      CounterInput.value = newValue;
    }
  };

  const addCart = () => {
    if (!selectedOption) {
      ToastRed("You haven't selected a size!");
      return;
    }
    const newItem = {
      id: `${ProductData._id}`,
      title: ProductData.title,
      image: ProductData.mainimg,
      size: selectedOption,
      price: ProductData.regularprice,
      total: totalCount,
    };
    const updatedCartItems = [...CartData, newItem];
    const cartDataString = JSON.stringify(updatedCartItems);
    if (CartData.length < 5) {
      localStorage.setItem("cartItems", cartDataString);
      ToastGreen("Product Added in cart!");
      LoadStateDispatch(setTrue());
      setCheckItemInCart(true);
      setSelectedOption("");
    } else {
      ToastRed("you can add 5 item only !");
    }
  };
  
  const ChangeImg = (e) => {
    const bigImg = document.getElementById("bigImg");
    bigImg.src = e.target.src;
  };

  const handleSubmitReview = async () => {
    if (postProductReview.message != "") {
      const result = await PostProductReview({
        token: localStorage.getItem("token"),
        ProductId: id,
        Review: postProductReview,
      });
      if (result.Error != undefined) {
        ToastRed(result.Error);
      } else {
        ToastGreen(result.message);
        setPostProductReview({
          stars: 1,
          message: "",
        });
      }
    } else {
      ToastRed("Enter a review message !");
    }
  };

  return (
    <div id="ProductOverview">
      <Toaster position="top-right" reverseOrder={true} />
      {loading ? (
        <div id="Loader">
          <MoonLoader size={40} color="#00dd6e" />
        </div>
      ) : (
        ""
      )}
      <div className="section_1">
        <div className="Navigate">
          <span>Home</span>-<b>Shop</b>-<b>{ProductData.title}</b>
        </div>
      </div>
      <div className="section_2">
        <div className="product_img">
          <div className="small_imgs">
            <div className="imgsboxs">
              <img
                src={ProductData.subimg1}
                onClick={ChangeImg}
                height="140"
                alt=""
              />
            </div>
            <div className="imgsboxs">
              <img
                src={ProductData.subimg2}
                onClick={ChangeImg}
                height="140"
                alt=""
              />
            </div>
            <div className="imgsboxs">
              <img
                src={ProductData.subimg3}
                onClick={ChangeImg}
                height="140"
                alt=""
              />
            </div>
          </div>
          <div className="big_img">
            <img src={ProductData.mainimg} id="bigImg" alt="" />
          </div>
        </div>
        <div className="product_details">
          <div className="part">
            <div className="price">
              <span>₹{ProductData.regularprice}</span>
              {ProductData.orignalprice === ProductData.regularprice ? (
                ""
              ) : (
                <legend>₹{ProductData.orignalprice} </legend>
              )}

              {ProductData.offerdiscount === "0" ? (
                ""
              ) : (
                <b>{ProductData.offerdiscount}% off</b>
              )}
            </div>
            <h2 className="title">{ProductData.title}</h2>
            <p>{ProductData.description}</p>
            <div className="stars">
              <Rating
                initialRating={productReviewStats.star}
                stop={5}
                readonly={true}
                emptySymbol={<AiOutlineStar className="icon" />}
                fullSymbol={<AiFillStar className="icon" />}
              />
              <span>total reviews {productReviewStats.reviewCount}</span>
            </div>
            <div className="Pid">
              <b>P ID : </b>
              <span>{ProductData._id}</span>
              <RxClipboardCopy
                className="icon"
                title="copy !"
                onClick={() => {
                  navigator.clipboard.writeText(ProductData._id);
                  ToastGreen("product Id Copy !");
                }}
              />
            </div>
          </div>
          <div className="part">
            <div className="size">
              <span>Select Size's</span>:
              {ProductData.selectsize == null
                ? " not any size for this item"
                : ProductData.selectsize.map((i, index) => (
                    <label
                      htmlFor={i}
                      className={selectedOption === i ? "checked" : ""}
                      key={index}
                    >
                      {i}
                      <input
                        hidden
                        value={i}
                        id={i}
                        type="radio"
                        checked={selectedOption === i}
                        onChange={(event) => {
                          setSelectedOption(event.target.value);
                        }}
                      />
                    </label>
                  ))}
            </div>
            <div className="book">
              <div className="Count">
                <div className="icon" onClick={increment}>
                  +
                </div>
                <input
                  type="text"
                  id="CounterInput"
                  maxLength="1"
                  onChange={(e) => setTotalCount(e.target.value)}
                  defaultValue={1}
                />
                <div className="icon" onClick={decrement}>
                  -
                </div>
              </div>
              <button
                className={CHECK_VALUE_FOR_BUTTON ? "disabledBtn" : "FillBtn"}
                data_productid={ProductData._id}
                onClick={addCart}
                disabled={CHECK_VALUE_FOR_BUTTON ? true : false}
              >
                Add Cart
              </button>
              {/* <button className="OutlineBtn">Buy</button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="section_3">
        <h2>Reviews</h2>
        {ProductReviewData.length != 0 ? (
          ProductReviewData.map((item) => (
            <div kay={item.id} className="reviewBox">
              <img
                src="https://secure.gravatar.com/avatar/a231450b732acb5a475d9e1f684811e5?s=60&d=mm&r=g"
                alt=""
              />
              <div className="Msg">
                <h3>{item.userName}</h3>
                <p>{item.review.message}</p>
                <div className="stars">
                  <Rating
                    initialRating={item.review.stars}
                    stop={5}
                    readonly={true}
                    emptySymbol={<AiOutlineStar className="icon" />}
                    fullSymbol={<AiFillStar className="icon" />}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <span className="NotAvailable">
            review are not available on this product{" "}
          </span>
        )}
        <div className="line"></div>
        {userLogIn ? (
          <div className="Addreview">
            <span>Add a review</span>
            <div className="rating">
              <span>Your rating</span>
              <div className="stars">
                <Rating
                  onClick={(value) => {
                    setPostProductReview({
                      ...postProductReview,
                      stars: value,
                    });
                  }}
                  initialRating={postProductReview.stars}
                  stop={5}
                  emptySymbol={<AiOutlineStar className="icon" />}
                  fullSymbol={<AiFillStar className="icon" />}
                />
              </div>
            </div>
            <div className="YourReview">
              <span>Your review</span>
              <textarea
                onChange={(e) =>
                  setPostProductReview({
                    ...postProductReview,
                    message: e.target.value,
                  })
                }
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Enter you review"
              ></textarea>
              <button onClick={handleSubmitReview} className="FillBtn">
                Submit
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <div className="section_4">
        <div className="top">
          <h2>Related Products for You</h2>
          <p>
            Explore a carefully selected range of products, personalized for
            you.
          </p>
        </div>
        <div className="center">
          {Products.length === 0 ? (
            <div className="dataNot">
              <span>Products are not available</span>
            </div>
          ) : (
            Products.map((data) => (
              <Product
                key={data._id}
                Title={data.title.slice(0, 19)}
                NewPrice={data.regularprice}
                OldPrice={data.orignalprice}
                Discount={data.offerdiscount}
                ProductTag={data.hint}
                ProductId={data._id}
                ProductMainImg={data.mainimg}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductOverview;
