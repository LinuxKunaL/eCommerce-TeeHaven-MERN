import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiSearch2Line } from "react-icons/ri";
import { BsInboxFill } from "react-icons/bs";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { GetDashboardRegisterUserData } from "../api";
import { MoonLoader } from "react-spinners";

function Users() {
  const PagePerLimit = 10;
  const [registerUserData, setRegisterUserData] = useState([]);
  const [userCount, setUserCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      const response = await GetDashboardRegisterUserData(
        currentPage,
        searchQuery,
        PagePerLimit
      );
      setUserCount(response.userCount);
      setRegisterUserData(response.users);
      setLoading(false);
    };
    fetching();
  }, [searchQuery, currentPage]);

  const TotalPagesCalculator = () => {
    return Array.from(
      { length: Math.ceil(parseInt(userCount, 10) / PagePerLimit) },
      (_, index) => index + 1
    );
  };

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected + 1);
    setLoading(true);
  };

  return (
    <div className="orders user">
      {loading && (
        <div id="Loader">
          <MoonLoader size={40} color="#00dd6e" />
        </div>
      )}
      <h3>Total users : {userCount}</h3>
      <div className="filter">
        <div className="search">
          <input
            type="text"
            placeholder="user name"
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <RiSearch2Line className="icon" />
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
      </div>
      <div className="table">
        {registerUserData.length != 0 ? (
          <table>
            <thead>
              <tr>
                <th>Sr No</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Account type</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              {registerUserData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.FullName}</td>
                  <td>{item.Email}</td>
                  <td>{item.AccountCreated}</td>
                  <td>{item.AccountType}</td>
                  <td>
                    <Link className="Link" to={"/dashboard/users/" + item._id}>
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="OrderIsEmpty">
            <BsInboxFill className="Icon" /> User not found
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
