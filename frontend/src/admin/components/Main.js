import React, { useEffect, useState } from "react";
import {
  RiShoppingCart2Fill,
  RiShoppingBagFill,
  RiUser3Fill,
  RiFundsBoxFill,
  RiTeamFill,
} from "react-icons/ri";
import Orders from "./Orders";
import { GetDashboardMainData } from "../api/index.js";
import { BeatLoader } from "react-spinners";

function Main() {
  const [DashboardMainData, setDashboardMainData] = useState({
    productsOrdersCount: 0,
    productsCount: 0,
    Revenue: 0,
    loginUserDataCount: 0,
    visitorCount: 0,
  });

  useEffect(() => {
    const fetching = async () => {
      const result = await GetDashboardMainData();
      setDashboardMainData(result);
    };
    fetching();
  }, []);

  return (
    <>
      <div className="Top">
        <h1>Dashboard</h1>
        <p>Whole data about your business here</p>
        <div className="Boxs">
          <div className="box">
            <RiFundsBoxFill className="icon" />
            <div className="info">
              <h3>Revenue</h3>
              <span>
                {" "}
                {DashboardMainData.Revenue ? (
                  "₹ " + DashboardMainData.Revenue
                ) : (
                  <BeatLoader size={7} color="#00dd6e" />
                )}
              </span>
            </div>
          </div>
          <div className="box">
            <RiUser3Fill className="icon" />
            <div className="info">
              <h3>User</h3>
              <span>
                {" "}
                {DashboardMainData.loginUserDataCount ? (
                  DashboardMainData.loginUserDataCount
                ) : (
                  <BeatLoader size={7} color="#00dd6e" />
                )}
              </span>
            </div>
          </div>
          <div className="box">
            <RiShoppingCart2Fill className="icon" />
            <div className="info">
              <h3>Orders</h3>
              <span>
                {" "}
                {DashboardMainData.productsOrdersCount ? (
                  DashboardMainData.productsOrdersCount
                ) : (
                  <BeatLoader size={7} color="#00dd6e" />
                )}
              </span>
            </div>
          </div>
          <div className="box">
            <RiShoppingBagFill className="icon" />
            <div className="info">
              <h3>Products</h3>
              <span>
                {" "}
                {DashboardMainData.productsCount ? (
                  DashboardMainData.productsCount
                ) : (
                  <BeatLoader size={7} color="#00dd6e" />
                )}
              </span>
            </div>
          </div>
          <div className="box">
            <RiTeamFill className="icon" />
            <div className="info">
              <h3>visitors</h3>
              <span>
                {" "}
                {DashboardMainData.visitorCount ? (
                  DashboardMainData.visitorCount
                ) : (
                  <BeatLoader size={7} color="#00dd6e" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Orders />
    </>
  );
}

export default Main;
