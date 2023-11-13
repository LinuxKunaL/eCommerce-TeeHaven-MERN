import React, { useEffect, useState } from "react";
import { RiSearch2Line, RiEdit2Fill, RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { BsInboxFill } from "react-icons/bs";
import { MoonLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { GetDashboardProducts, ProductDeleteById } from "../api";
import {
  ToastGreen,
  ProductDeleteDialogToast,
  ToastRed,
} from "../../App/toast";
import "../assets/styles/products.css";

function Products() {
  const PerPageLimit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState();
  const [searchQueryById, setSearchQueryById] = useState("");
  const [statusQuery, setStatusQuery] = useState("all");
  const [ProductsData, setProductsData] = useState([]);
  const [useEffectDependencyLoad, loadUseEffect] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      const result = await GetDashboardProducts(
        searchQuery,
        searchQueryById,
        statusQuery,
        currentPage,
        PerPageLimit
      );
      if (result.message) {
        ToastRed(result.message);
        return null;
      }
      setProductsData(result.products);
      setProductsCount(result.productsCount);
      setLoading(false);
    };

    fetching();
  }, [
    useEffectDependencyLoad,
    currentPage,
    searchQuery,
    searchQueryById,
    statusQuery,
  ]);

  const HandleSearchProduct = (event) => {
    const SearchParam = event.target.value.toLowerCase();
    setSearchQuery(SearchParam);
  };

  const HandleSearchProductId = () => {
    const searchInputId = document.getElementById("searchInputId");
    if (searchInputId.value.toLowerCase().length == 24) {
      const SearchParam = searchInputId.value;
      setSearchQueryById(SearchParam);
    } else {
      ToastRed("your product id wrong !");
    }
  };

  const HandleSelectStatus = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "true") {
      setStatusQuery(true);
    } else if (selectedValue === "ShowAll") {
      setStatusQuery("all");
    } else {
      setStatusQuery(false);
    }
  };

  const TotalPagesCalculator = () => {
    return Array.from(
      { length: Math.ceil(parseInt(productsCount, 10) / PerPageLimit) },
      (_, index) => index + 1
    );
  };

  const HandleDropProduct = (id) => {
    const deleteYas = async () => {
      try {
        const result = await ProductDeleteById(id);
        if (result.deletedCount) {
          setLoading(true);
          loadUseEffect((val) => val + 1);
          ToastGreen("Product delete successfully !");
        }
      } catch (Error) {
        console.log(Error + " in HandleDropProduct");
      }
    };
    ProductDeleteDialogToast(deleteYas);
  };

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected + 1);
    setLoading(true);
  };

  return (
    <div className="products">
      {loading && (
        <div id="Loader">
          <MoonLoader size={40} color="#00dd6e" />
        </div>
      )}
      <Toaster position="topcenter" />
      <div className="Top">
        <div className="text">
          <h2>Products List : {productsCount}</h2>
          <p>here is all products</p>
        </div>
        <Link to="/dashboard/products/add">
          <button className="FillBtn">Create New</button>
        </Link>
      </div>
      <div className="Lists">
        <div className="filter">
          <div className="searchInputs">
            <div className="search">
              <input
                type="text"
                placeholder="Product name"
                onChange={HandleSearchProduct}
              />
              <RiSearch2Line className="icon" />
            </div>
            <div className="search">
              <input type="text" id="searchInputId" placeholder="Product id" />
              <RiSearch2Line onClick={HandleSearchProductId} className="icon" />
            </div>
          </div>
          <div className="left">
            <select name="" id="" onChange={HandleSelectStatus}>
              <option value="ShowAll">Show all</option>
              <option value="true">Active</option>
              <option value="false">Disabled</option>
            </select>
          </div>
        </div>
        <div className="NextButtons">
          {TotalPagesCalculator().length > 1 ? (
            <ReactPaginate
              breakLabel="..."
              nextLabel={<BiSolidRightArrow />}
              onPageChange={handlePageChange}
              pageRangeDisplayed={1}
              pageCount={TotalPagesCalculator().length}
              previousLabel={<BiSolidLeftArrow />}
              renderOnZeroPageCount={null}
              forcePage={currentPage - 1}
            />
          ) : null}
        </div>
        <div className="center">
          <div className="table">
            {ProductsData.length !== 0 ? (
              <table>
                <tbody>
                  {ProductsData.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="ImgTitle">
                          <img src={item.mainimg} alt="" />
                          <h3>{item.title.slice(0, 24)}...</h3>
                        </div>
                      </td>
                      <td>₹ {item.regularprice}.0</td>
                      <td
                        className={
                          item.productactivate
                            ? "status active"
                            : "status disable"
                        }
                      >
                        {item.productactivate ? "Active" : "Disable"}
                      </td>
                      <td>
                        <div className="btns">
                          <Link to={"/dashboard/products/" + item._id}>
                            <button className="FillBtn">
                              <RiEdit2Fill className="icon" />
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={(e) => HandleDropProduct(item._id)}
                            className="OutlineBtn"
                          >
                            <RiDeleteBin5Fill className="icon" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="IsEmpty">
                <BsInboxFill className="Icon" /> <b>Products not found</b>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
