import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setFalse } from "../App/redux/states/componentsload";
import { callFalse } from "../App/redux/states/CartView";
import { Link } from "react-router-dom";
import { increment } from "../App/redux/states/counter";

function CartView() {
  const [cartItemData, setCartItemData] = useState([]);
  const dispatch = useDispatch();
  const dispatchCounter = useDispatch();
  const cartViewSelector = useSelector((state) => state.CartView);
  const [subtotal, setSubtotal] = useState(0);
  const LoadStateSelector = useSelector((state) => state.load);

  useEffect(() => {
    setCartItemData(JSON.parse(localStorage.getItem("cartItems")) || []);
  }, [LoadStateSelector]);

  useEffect(() => {
    const newSubtotal = cartItemData.reduce(
      (acc, item) => acc + item.price * item.total,
      0
    );
    setSubtotal(newSubtotal);
  }, [cartItemData]);

  const deleteCartItem = (productId) => {
    dispatchCounter(increment());
    dispatch(setFalse());
    const updatedCart = cartItemData.filter((item) => item.id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setCartItemData(updatedCart);
  };
  const closeCart = () => {
    dispatch(callFalse());
  };
  return (
    <>
      {cartViewSelector ? (
        <div id="Cart">
          <div className="top">
            <h2>Shopping Cart</h2>
            <AiOutlineClose onClick={closeCart} className="icon" />
          </div>
          <div className="line"></div>
          <div className="cartProducts">
            {cartItemData.length === 0 ? (
              <h2>
                Cart Is empty <AiOutlineShoppingCart className="icon" />
              </h2>
            ) : (
              cartItemData.map((item) => (
                <div key={item.id} className="products">
                  <div className="imgs">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="details">
                    <h3>{item.title}</h3>
                    <span>
                      ₹{item.price} x {item.total}
                    </span>
                  </div>
                  <AiOutlineClose
                    onClick={() => deleteCartItem(item.id)}
                    className="icon"
                  />
                </div>
              ))
            )}
          </div>
          <div className="bottom">
            <div className="total">
              <span>Subtotal:</span>
              <b>₹{parseInt(subtotal)}.0</b>
            </div>
            <Link to="/checkout">
              <button className="FillBtn">Checkout</button>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CartView;
