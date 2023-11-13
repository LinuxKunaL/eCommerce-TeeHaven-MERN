import React from "react";
import { useEffect, useState } from "react";
import { GetProductData } from "../api";
import ModelImg from "../assets/images/Models.png";

import Indian_Woman from "../assets/images/Indian_Woman.jpg";
import Indian_Man from "../assets/images/Indian_Man.jpg";

import { BsInboxFill } from "react-icons/bs";
import ManCollection from "../assets/svg/manCollection.svg";
import CoupleCollection from "../assets/svg/coupleCollection.svg";
import GirlCollection from "../assets/svg/girlCollection.svg";
import ShoesCollection from "../assets/svg/shoesCollection.svg";
import SunglassCollection from "../assets/svg/sunglassCollection.svg";
import BeautyCollection from "../assets/svg/beautyCollection.svg";

import { CheckUserLogin } from "../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIp } from "../App/GetIpAddress";
import { postVisitorIp } from "../api";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import Product from "../components/Product";
import { Link } from "react-router-dom";

import "../assets/styles/home.css";

const Home = () => {
  const [Products, setProducts] = useState([]);
  const Navigate = useNavigate();
  const [currantPage, setCurrantPage] = useState(1);
  const checkUserLogIN = useSelector((state) => state.userLoginStates);
  const [hours, setHours] = useState(24);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(timer);
      } else {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            if (hours > 0) {
              setHours(hours - 1);
              setMinutes(59);
              setSeconds(59);
            }
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetProductData(currantPage, 4, "", "");
      setProducts(result.products);
    };
    fetchData();
  }, [currantPage]);

  useEffect(() => {
    const fetching = async () => {
      // `if else` for unwanted requests
      if (!localStorage.getItem("a344bh3412ef")) {
        localStorage.setItem("a344bh3412ef", "done");
        const Ip = await getIp();
        await postVisitorIp(Ip);
      } else {
        localStorage.setItem("a344bh3412ef", "none");
      }
    };
    fetching();
  }, []);

  const dispatch = useDispatch();
  CheckUserLogin(dispatch);

  return (
    <div id="Home">
      <div className="section_1">
        <div className="HeroTexts">
          <div className="text_1">Welcome to TeeHaven</div>
          <h2>
            Discover a world of <br /> fashion with <br /> TeeHaven
          </h2>
          <p>
            We bring you a curated selection of high-quality products that cater
            to your every need. From fashion to electronics, home decor to
            beauty essentials, we've got it all.
          </p>
          <div className="ButtonsLinks">
            <Link to="/shop">
              <button className="FillBtn">Shop Now</button>
            </Link>
            {!checkUserLogIN ? (
              <Link to="/login/signup">
                <button className="OutlineBtn">SignUp</button>
              </Link>
            ) : (
              <Link to="/profile/">
                <button className="OutlineBtn">Profile</button>
              </Link>
            )}
          </div>
          <div className="stats">
            <div>
              <h2>12k+</h2>
              <span>Collections</span>
            </div>
            <hr />
            <div>
              <h2>26k+</h2>
              <span>items trusted to deliver</span>
            </div>
          </div>
        </div>
        <div className="HeroImages">
          <img src={ModelImg} alt="Models" />
        </div>
      </div>
      <div className="section_2">
        <div className="row">
          <Link className="link" to="/shop?category=men">
            <img src={ManCollection} alt="" />
          </Link>
          <Link className="link" to="/shop?category=shoes">
            <img src={ShoesCollection} alt="" />
          </Link>
        </div>
        <div className="row">
          <Link className="link" to="/shop?category=all">
            <img src={CoupleCollection} alt="" />
          </Link>
          <Link className="link" to="/shop?category=accessories">
            <img src={SunglassCollection} alt="" />
          </Link>
        </div>
        <div className="row">
          <Link className="link" to="/shop?category=girls">
            <img src={GirlCollection} alt="" />
          </Link>
          <Link className="link" to="/shop?category=beauty">
            <img src={BeautyCollection} alt="" />
          </Link>
        </div>
      </div>
      <div className="section_3">
        <div className="top">
          <h2>Our picks for you</h2>
          <p>
            Discover a curated selection of handpicked products tailored just
            for you. <br />
            From the latest trends to timeless classics, our team of experts has
            scoured <br />
            the market to bring you the best of the best.
          </p>
        </div>
        <div className="center">
          <BiSolidLeftArrow
            className="ArrowIcon"
            onClick={() =>
              currantPage != 1 ? setCurrantPage(currantPage - 1) : 1
            }
          />
          {Products.length === 0 ? (
            <div className="ProductNotAv">
              <BsInboxFill className="icon" style={{ color: "#61ce70" }} />
              <h2>Products not available</h2>
            </div>
          ) : (
            Products.map((data, index) => (
              <Product
                key={index}
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
          <BiSolidRightArrow
            className="ArrowIcon"
            onClick={() =>
              currantPage != 3 ? setCurrantPage(currantPage + 1) : 1
            }
          />
        </div>
      </div>
      <div className="section_4">
        <div className="texts">
          <span>SPECIAL OFFER</span>
          <h2>Extra Sale 30% off</h2>
          <p>
            Bucket toy with a contrast colored handle. <br /> Perfect for
            playing on the beach.
          </p>
          <div className="time">
            <legend>{hours < 10 ? `0${hours}` : hours}</legend>:
            <legend>{minutes < 10 ? `0${minutes}` : minutes}</legend>:
            <legend>{seconds < 10 ? `0${seconds}` : seconds}</legend>
          </div>
          <button onClick={() => Navigate("/shop")} className="FillBtn">
            Get only $29.00 {">"}
          </button>
        </div>
        <div className="imgs">
          <img src={Indian_Woman} alt="" />
          <div className="offerTag">
            Save
            <b>30%</b>
          </div>
          <img src={Indian_Man} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
