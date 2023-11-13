import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiSearch2Line } from "react-icons/ri";
import { BsInboxFill } from "react-icons/bs";
import { GetDashboardLatestOrders } from "../api";
import ReactPaginate from "react-paginate";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { MoonLoader } from "react-spinners";

import "../assets/styles/order.css";

function Orders() {
  const PerPageLimit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [orderCount, setOrderCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [statusQuery, setStatusQuery] = useState("all");
  const [OrderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      const result = await GetDashboardLatestOrders(
        filterDate,
        searchQuery,
        statusQuery,
        currentPage,
        PerPageLimit
      );
      setOrderData(result.Orders);
      setOrderCount(result.orderCount);
      setLoading(false);
    };
    fetching();
  }, [filterDate, statusQuery, searchQuery, currentPage]);

  const ModifyDate = (event) => {
    const Date = event.target.value;
    const SplitDate = Date.split("-");
    const FinalDate = `${SplitDate[2]}/${SplitDate[1]}/${SplitDate[0]}`;
    setFilterDate(FinalDate == "undefined/undefined/" ? "" : FinalDate);
  };

  const TotalPagesCalculator = () => {
    return Array.from(
      { length: Math.ceil(parseInt(orderCount, 10) / PerPageLimit) },
      (_, index) => index + 1
    );
  };

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected + 1);
    setLoading(true);
  };

  const HandleChangeStatus = (event) => {
    const Value = event.target.value;
    if (Value == "true") {
      setStatusQuery(true);
    } else if (Value == "false") {
      setStatusQuery(false);
    } else {
      setStatusQuery("all");
    }
  };

  return (
    <div className="orders">
      {loading && (
        <div id="Loader">
          <MoonLoader size={40} color="#00dd6e" />
        </div>
      )}
      <h3>Latest orders : {orderCount}</h3>
      <div className="filter">
        <div className="search">
          <input
            type="text"
            placeholder="order id / billing name"
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <RiSearch2Line className="icon" />
        </div>
        <div className="left">
          <input type="date" placeholder="Select date" onChange={ModifyDate} />
          <select onChange={HandleChangeStatus}>
            <option value="all">all</option>
            <option value="true">Confirm</option>
            <option value="false">Pending</option>
          </select>
        </div>
      </div>
      <div className="line"></div>
      <div className="body">
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
        <div className="table">
          {OrderData.length != 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Billing Name</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {OrderData &&
                  OrderData.map((item) => (
                    <tr key={item._id}>
                      <td>{item.razorpayOrderId.slice(0, 14)}....</td>
                      <td>{item.billingName}</td>
                      <td>{item.orderDate}</td>
                      <td>₹ {item.orderTotalPrice}.0</td>
                      <td>
                        {item.deliveredOrNot ? (
                          <div className="statusPaid">Confirm</div>
                        ) : (
                          <div className="statusPending">Pending</div>
                        )}
                      </td>
                      <td>
                        <Link
                          to={"/dashboard/orders/" + item._id}
                          className="Link"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="OrderIsEmpty">
              <BsInboxFill className="Icon" /> Order is empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
