import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  BiCategory,
  BiSolidLeftArrow,
  BiSolidRightArrow,
} from "react-icons/bi";
import { MoonLoader } from "react-spinners";
import { BsInboxFill } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetProductData } from "../api";
import { CheckUserLogin } from "../api/auth";
import { setFalse } from "../App/redux/states/componentsload";
import Product from "../components/Product";
import ReactPaginate from "react-paginate";
import "../assets/styles/shop.css";

const Shop = () => {
  const PagePerLimit = 10;
  const dispatch = useDispatch();
  const LoadStateDispatch = useDispatch();
  const [TotalPages, setTotalPages] = useState();
  const [currentPages, setCurrentPages] = useState(1);
  const [Products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [category, setCategory] = useSearchParams("category");
  const [loading, setLoading] = useState(true);
  const CategoryArray = [
    "all",
    "woman",
    "girls",
    "hoodie",
    "kids",
    "boy",
    "men",
    "accessories",
    "shoes",
    "beauty",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await GetProductData(
          currentPages,
          PagePerLimit,
          category.get("category"),
          searchQuery
        );
        setTotalPages(productData.productCount);
        setProducts(productData.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPages, searchQuery, category]);

  useEffect(() => {
    LoadStateDispatch(setFalse());
    CheckUserLogin(dispatch);
  }, []);

  const TotalPagesCalculator = () => {
    return Array.from(
      { length: Math.ceil(parseInt(TotalPages, 10) / PagePerLimit) },
      (_, index) => index + 1
    );
  };

  const handlePageChange = (selected) => {
    setCurrentPages(selected.selected + 1);
    setLoading(true);
  };

  return (
    <div id="Shop">
      <div className="section_1">
        {loading && (
          <div id="Loader">
            <MoonLoader size={40} color="#00dd6e" />
          </div>
        )}
        <h1>Shop</h1>
        <div className="Navigate">
          <span>Home</span>-<b>Shop</b>
        </div>
      </div>
      <div className="section_2">
        <div className="filters">
          <div className="search">
            <span>Search</span>
            <div className="inputSearch">
              <input
                type="text"
                name="searchInput"
                id="search"
                placeholder="Search Products.."
                onKeyDown={(e) =>
                  e.key === "Backspace" ? setSearchQuery("") : null
                }
              />
              <AiOutlineSearch
                className="icon"
                onClick={() => {
                  setSearchQuery(
                    document.getElementById("search").value.toLowerCase()
                  );
                  setLoading(true);
                }}
              />
            </div>
          </div>
          <div
            className="categories"
            onClick={() => {
              document
                .getElementsByClassName("categoriesBox")[0]
                .classList.toggle("activeCategoriesBox");
            }}
          >
            <div className="DSF">
              <legend>Product categories</legend>
              <BiCategory className="CategoryIcon" />
            </div>
            <div className="categoriesBox">
              {CategoryArray.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setCategory({ category: item });
                    setCurrentPages(1);
                    setLoading(true);
                  }}
                  className={`${
                    category.get("category") === item ? "active" : ""
                  }`}
                  data-category={item}
                >
                  <span>{item}</span>
                </li>
              ))}
            </div>
          </div>
        </div>
        <div className="productBox">
          <div className="top">
            <span>Showing {TotalPages} results</span>
          </div>
          {TotalPagesCalculator().length > 1 ? (
            <div className="bottomBox">
              <div className="number">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={<BiSolidRightArrow />}
                  onPageChange={handlePageChange}
                  pageRangeDisplayed={1}
                  pageCount={TotalPagesCalculator().length}
                  previousLabel={<BiSolidLeftArrow />}
                  renderOnZeroPageCount={null}
                  forcePage={currentPages - 1}
                />
              </div>
            </div>
          ) : null}
          <div className="center">
            {Products.length === 0 ? (
              <div className="ProductNotAv">
                <BsInboxFill className="icon" style={{ color: "#61ce70" }} />
                <h2>Products not available</h2>
              </div>
            ) : (
              Products.map(
                (
                  {
                    title,
                    regularprice,
                    orignalprice,
                    offerdiscount,
                    category,
                    hint,
                    _id,
                    mainimg,
                  },
                  index
                ) => (
                  <Product
                    key={index}
                    Title={title.slice(0, 17) + " .."}
                    NewPrice={regularprice}
                    OldPrice={orignalprice}
                    Discount={offerdiscount}
                    Categories={category}
                    ProductTag={hint}
                    ProductId={_id}
                    ProductMainImg={mainimg}
                  />
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
