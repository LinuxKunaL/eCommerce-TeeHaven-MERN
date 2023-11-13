import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { GetDashboardProductById } from "../api";
import { Toaster } from "react-hot-toast";
import { ToastGreen, ToastRed } from "../../App/toast";
import Rating from "react-rating";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import {
  UpdateDashboardProduct,
  PostImageFileForProduct,
  GetProductReviewById,
} from "../api";

function ProductAction() {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ProductData, setProductData] = useState([]);
  const [PreviewImage, setPreviewImage] = useState({
    MainPreviewImage: "",
    SubPreviewImage: "",
    Sub2PreviewImage: "",
    Sub3PreviewImage: "",
  });
  const [ProductReviewData, setProductReviewData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [ProductEnableToggle, setProductEnableToggle] = useState();
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [selectedHint, setSelectedHint] = useState("new");
  const selectedSizeData = {
    men: ["S", "M", "L", "XL", "XXl"],
    girls: ["S", "M", "L", "XL", "XXl"],
    boy: ["S", "M", "L", "XL", "XXl"],
    kids: [
      "2-3 Years",
      "5-6 Year",
      "4-5 Year",
      "6-7 Year",
      "8-9 Years",
      "9-10 Years",
    ],
    woman: ["free size", "S", "M", "L", "XL", "XXl"],
    accessories: ["free size"],
    beauty: ["free size"],
    hoodie: ["S", "M", "L", "XL", "XXl"],
    shoes: ["8-UK", "5-UK", "7-UK", "4-UK", "9-UK"],
  };

  const isChecked = (value) => selectedItems.includes(value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetDashboardProductById(id);
        if (result.length == 0) {
          Navigate("/dashboard");
          return null;
        }
        setProductData(result);
        setPreviewImage((prevState) => ({
          ...prevState,
          MainPreviewImage: result.mainimg,
          SubPreviewImage: result.subimg1,
          Sub2PreviewImage: result.subimg2,
          Sub3PreviewImage: result.subimg3,
        }));
        setSelectedItems(result.selectsize);
        setProductEnableToggle(result.productactivate);
        setSelectedCategory(result.category);
        setSelectedHint(result.hint);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetching = async () => {
      const response = await GetProductReviewById(id);
      setProductReviewData(response);
    };
    fetching();
  }, [id]);

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = Object.fromEntries(formData.entries());
    const updatedProduct = {
      ...formDataObject,
      id: id,
      MainPreviewImage: PreviewImage.MainPreviewImage,
      SubPreviewImage: PreviewImage.SubPreviewImage,
      Sub2PreviewImage: PreviewImage.Sub2PreviewImage,
      Sub3PreviewImage: PreviewImage.Sub3PreviewImage,
      ProductSize: selectedItems,
      productActivate: ProductEnableToggle,
    };
    console.log(updatedProduct);

    try {
      if (selectedItems.length != 0) {
        const result = await UpdateDashboardProduct(updatedProduct);
        if (result.ModifiedCount) {
          ToastGreen("Product updated successful !");
        }
      } else {
        ToastRed("Please select size !");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleImagePreview = async (event) => {
    const ImageFile = event.target.files[0];

    if (ImageFile.type.startsWith("image/")) {
      try {
        const { ImageUrl } = await PostImageFileForProduct(ImageFile);
        setPreviewImage((prevState) => ({
          ...prevState,
          [event.target.name]: ImageUrl,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      ToastRed("Wrong format selected !!");
    }
  };

  const handleCheckboxChange = (value) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };
  function name(params) {
    console.log("hi");
  }

  return (
    <form onSubmit={handleUpdateProduct} className="ProductAction">
      <Toaster position="topWright" />
      {loading && (
        <div id="Loader">
          <MoonLoader size={40} color="#00dd6e" />
        </div>
      )}
      <div className="Top">
        <h1>Edit product</h1>
        <div className="btn">
          <input type="submit" value="Update" className="OutlineBtn" />
          <input
            type="reset"
            onClick={() => Navigate("/dashboard/products")}
            value="Cancel"
            className="FillBtn"
          />
        </div>
      </div>
      <div className="Center">
        <div className="basic">
          <h2>Basic</h2>
          <div className="InputField">
            <span>Product title</span>
            <input
              type="text"
              name="title"
              defaultValue={ProductData.title}
              placeholder="Product title"
              required
            />
          </div>
          <div className="InputField">
            <span>Full description</span>
            <textarea
              type="text"
              name="description"
              defaultValue={ProductData.description}
              placeholder="Full description"
              required
            />
          </div>
          <div className="box">
            <div className="InputField">
              <span>Regular price</span>
              <input
                type="number"
                name="regularprice"
                defaultValue={ProductData.regularprice}
                placeholder="Regular price"
                required
              />
            </div>
            <div className="InputField">
              <span>Original price</span>
              <input
                type="number"
                name="orignalprice"
                defaultValue={ProductData.orignalprice}
                placeholder="Original price"
                required
              />
            </div>
            <div className="InputField">
              <span>Offer discount</span>
              <input
                type="number"
                name="offerdiscount"
                defaultValue={ProductData.offerdiscount}
                placeholder="Offer discount"
                required
              />
            </div>
          </div>
          <div className="box">
            <div className="checkBox">
              <span>Select Size</span>
              <div className="Select">
                {selectedItems.length != 0
                  ? selectedItems.map((e, index) => <div key={index}>{e}</div>)
                  : "select size"}
              </div>
              <div className="Options">
                {selectedSizeData[selectedCategory].map((item) => {
                  return (
                    <label
                      key={item}
                      className={
                        isChecked(item)
                          ? "checked " + selectedCategory
                          : selectedCategory
                      }
                      htmlFor={item}
                    >
                      <span>{item}</span>
                      <input
                        checked={isChecked(item)}
                        onChange={() => handleCheckboxChange(item)}
                        type="checkbox"
                        id={item}
                        hidden
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="Activate">
              <span>Product Activate</span>
              <label className="toggler-wrapper style-4">
                <input
                  type="checkbox"
                  name="productactivate"
                  checked={ProductEnableToggle}
                  onClick={() =>
                    setProductEnableToggle((prevToggle) => !prevToggle)
                  }
                />
                <div className="toggler-slider">
                  <div className="toggler-knob"></div>
                </div>
              </label>
            </div>
            <div className="selectDD">
              <span>hint</span>
              <select
                name="selectHint"
                value={selectedHint}
                onChange={(e) => setSelectedHint(e.target.value)}
                id=""
              >
                <option value="none">none</option>
                <option value="new">new</option>
                <option value="hot">hot</option>
                <option value="chip">chip</option>
                <option value="best">best</option>
              </select>
            </div>
            <div className="selectDD">
              <span>category</span>
              <select
                name="category"
                value={selectedCategory}
                onChange={(e) => {
                  selectedItems.splice(0, selectedItems.length);
                  setSelectedCategory(e.target.value);
                }}
                id=""
              >
                <option value="men">men</option>
                <option value="girls">girls</option>
                <option value="boy">boy</option>
                <option value="kids">kids</option>
                <option value="woman">woman</option>
                <option value="accessories">accessories</option>
                <option value="beauty">beauty</option>
                <option value="hoodie">hoodie</option>
                <option value="shoes">shoes</option>
              </select>
            </div>
          </div>
        </div>
        <div className="media">
          <h2>Media</h2>
          <div className="center">
            <div className="MainImg">
              <img src={PreviewImage.MainPreviewImage} alt="" />
              <label htmlFor="MainImg">Select img</label>
              <input
                type="file"
                accept="image/*"
                filename="aa"
                name="MainPreviewImage"
                onChange={handleImagePreview}
                id="MainImg"
                hidden
              />
            </div>
            <div className="subImg">
              <div className="Box">
                <img src={PreviewImage.SubPreviewImage} alt="" />
                <label htmlFor="subImg1">Select img</label>
                <input
                  type="file"
                  name="SubPreviewImage"
                  accept="image/*"
                  onChange={handleImagePreview}
                  id="subImg1"
                  hidden
                />
              </div>
              <div className="Box">
                <img src={PreviewImage.Sub2PreviewImage} alt="" />
                <label htmlFor="subImg2">Select img</label>
                <input
                  type="file"
                  id="subImg2"
                  accept="image/*"
                  onChange={handleImagePreview}
                  name="Sub2PreviewImage"
                  hidden
                />
              </div>
              <div className="Box">
                <img src={PreviewImage.Sub3PreviewImage} alt="" />
                <label htmlFor="subImg3">Select img</label>
                <input
                  type="file"
                  id="subImg3"
                  accept="image/*"
                  onChange={handleImagePreview}
                  name="Sub3PreviewImage"
                  hidden
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Top">
        <h1>Product reviews</h1>
      </div>
      <div className="Center">
        {ProductReviewData.length != 0
          ? ProductReviewData.map((item) => (
              <div className="reviewBox">
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
          : "review are not available on this product "}
      </div>
    </form>
  );
}

export default ProductAction;
