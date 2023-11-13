import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import gallerySkeleton from "../../assets/svg/imageFrame.svg";
import { ToastGreen, ToastRed } from "../../App/toast";
import { PostDashboardProduct, PostImageFileForProduct } from "../api";

function ProductAdd() {
  const Navigate = useNavigate();
  const [PreviewImage, setPreviewImage] = useState({
    MainProductImage: gallerySkeleton,
    SubProductImage: gallerySkeleton,
    Sub2ProductImage: gallerySkeleton,
    Sub3ProductImage: gallerySkeleton,
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [ProductEnableToggle, setProductEnableToggle] = useState(true);
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

  const HandleSubmitProduct = async (event) => {
    event.preventDefault();
    const fromData = new FormData(event.target);
    const fromObject = Object.fromEntries([...fromData.entries()]);
    var PostDataUpdated = { ...fromObject, ...PreviewImage };

    if (selectedItems.length == 0) {
      ToastRed("select any size please !");
      return null;
    }
    if (
      PostDataUpdated.MainProductImage.size != 0 &&
      PostDataUpdated.SubProductImage.size != 0 &&
      PostDataUpdated.Sub2ProductImage.size != 0 &&
      PostDataUpdated.Sub3ProductImage.size != 0
    ) {
      const result = await PostDashboardProduct({
        ...PostDataUpdated,
        productActivate: ProductEnableToggle,
        ProductSize: selectedItems,
        MainProductImage: PreviewImage.MainProductImage,
        SubProductImage: PreviewImage.SubProductImage,
        Sub2ProductImage: PreviewImage.Sub2ProductImage,
        Sub3ProductImage: PreviewImage.Sub3ProductImage,
      });
      if (result.acknowledged) {
        ToastGreen("Product add successfully !!");
        setTimeout(() => {
          Navigate("/dashboard/products");
        }, 2000);
      }
    } else {
      ToastRed("please upload the images");
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

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const dataSetName = event.currentTarget.dataset.names;
    const ImageFile = event.dataTransfer.files[0];

    if (ImageFile.type.startsWith("image/")) {
      try {
        const { ImageUrl } = await PostImageFileForProduct(ImageFile);
        setPreviewImage((prevState) => ({
          ...prevState,
          [dataSetName]: ImageUrl,
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

  return (
    <form onSubmit={HandleSubmitProduct} className="ProductAction">
      <Toaster position="topWright" />
      <div className="Top">
        <h1>Add New Product</h1>
        <div className="btn">
          <input type="submit" value="Add" className="OutlineBtn" />
          <input
            type="reset"
            value="Cancel"
            onClick={(e) => Navigate("/dashboard/products")}
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
              placeholder="Product title"
              required
            />
          </div>
          <div className="InputField">
            <span>Full description</span>
            <textarea
              type="text"
              name="description"
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
                placeholder="Regular price"
                required
              />
            </div>
            <div className="InputField">
              <span>Original price</span>
              <input
                type="number"
                name="orignalprice"
                placeholder="Original price"
                required
              />
            </div>
            <div className="InputField">
              <span>Offer discount</span>
              <input
                type="number"
                name="offerdiscount"
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
                  name="productActivate"
                  defaultChecked={ProductEnableToggle}
                  onChange={(e) =>
                    setProductEnableToggle(ProductEnableToggle ? false : true)
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
              >
                <option value="woman">woman</option>
                <option value="hoodie">hoodie</option>
                <option value="kids">kids</option>
                <option value="boy">boy</option>
                <option value="girls">girls</option>
                <option value="men">men</option>
                <option value="accessories">accessories</option>
                <option value="beauty">beauty</option>
                <option value="shoes">shoes</option>
              </select>
            </div>
          </div>
        </div>
        <div className="media">
          <h2>Media</h2>
          <div className="center">
            <div
              className="MainImg"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              data-names="MainProductImage"
            >
              <img src={PreviewImage.MainProductImage} alt="" />

              <label htmlFor="MainImg">Select img</label>
              <input
                type="file"
                accept="image/*"
                filename="aa"
                name="MainProductImage"
                onChange={handleImagePreview}
                id="MainImg"
                hidden
              />
            </div>
            <div className="subImg">
              <div
                className="Box"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-names="SubProductImage"
              >
                <img src={PreviewImage.SubProductImage} alt="" />
                <label htmlFor="subImg1">Select img</label>
                <input
                  type="file"
                  name="SubProductImage"
                  accept="image/*"
                  onChange={handleImagePreview}
                  id="subImg1"
                  hidden
                />
              </div>
              <div
                className="Box"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-names="Sub2ProductImage"
              >
                <img src={PreviewImage.Sub2ProductImage} alt="" />
                <label htmlFor="subImg2">Select img</label>
                <input
                  type="file"
                  id="subImg2"
                  accept="image/*"
                  onChange={handleImagePreview}
                  name="Sub2ProductImage"
                  hidden
                />
              </div>
              <div
                className="Box"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-names="Sub3ProductImage"
              >
                <img src={PreviewImage.Sub3ProductImage} alt="" />
                <label htmlFor="subImg3">Select img</label>
                <input
                  type="file"
                  id="subImg3"
                  accept="image/*"
                  onChange={handleImagePreview}
                  name="Sub3ProductImage"
                  hidden
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProductAdd;
