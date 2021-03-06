import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { useState } from "react";
// import { useState, useEffect } from "react";
import { BsFillEyeFill, BsFillCartFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { fetchProducts, AddCart } from "../Actions/index";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
// import AddtoCart from "./AddtoCart";

var cart = [];

function SingleProduct(props) {
  // const [itemId, setItemId] = useState([]);
  // const [all, setAll] = useState(true)

  const [color, setColor] = useState("#ffcccc");
  const styleSheet = () => {
    setColor("#c0392b");
  };

  const style = {
    color: `${color}`,
    cursor: "pointer",
  };

  const [show, setShow] = useState("hidden");

  const styling = {
    visibility: `${show}`,
  };

  const styled = () => {
    setShow("visible");
  };

  const hide = () => {
    setShow("hidden");
  };

  const handleAddCart = async (id) => {
    // setItemId((prev)=>([...prev, id]))
    cart.push(id);
    var res = await axios({
      method: "patch",
      url: "http://localhost:5000/user/1",
      data: {
        addcart: cart,
      },
    });
    console.log(props);
    props.AddCart(props);
    // console.log(res.data)
    styled();

    setTimeout(() => {
      hide();
    }, 1000);
  };
  // console.log(props);

  return (
    <div>
      <div
        className="bg-dark sizing ms-auto text-white mt-5 shadow rounded"
        style={styling}
      >
        Added to Cart
        <TiTick />
      </div>
      <div className="card mt-5 borderRou border-0 shadow-lg">
        <div className="card-header overflow-hidden size border-0 borderRou">
          <img
            src={props.image}
            style={{ width: "100%", height: "100%" }}
            className="zoom img-fluid figure borderRou"
            alt="..."
          />

          <FaHeart
            className="fa-2x wishlist"
            style={style}
            onClick={() => styleSheet("Red")}
          />
        </div>
        <div className="card-body">
          <h5 className="text-justify mb-3 text-center ">
            {props.productname}
          </h5>
          <h6 className="text-truncate mb-3 text-center text-secondary">
            {props.brand}
          </h6>
          <div className="d-flex justify-content-center p-2">
            <h6 className="ms-0 btn fs-4">Rs.{props.price}</h6>
            <h6 className="me-0 btn text-secondary fs-4">
              <del>Rs.{props.price - 3}</del>
            </h6>
          </div>
        </div>

        <div className="card-footer d-flex justify-content-between bg-light border-0 borderRou">
          {/* <p className="me-auto btn">{<BsFillEyeFill />}View All</p> */}

          <Link
            to={`/ProductDescription/${props.id}`}
            className="btn btn-sm text-dark p-0"
          >
            <i className="text-primary mr-1"></i>
            <BsFillEyeFill
              className="h3 pe-2"
              style={{ color: "#c0392b" }}
            />{" "}
            <span className="fw-bolder fs-6 btn-clr"> View Detail</span>
          </Link>
          {/* <p className="ms-5 btn">{<BsFillCartFill />}View All</p> */}
          <Link to="" className="btn btn-sm text-dark p-0">
            <i className="text-primary mr-1"></i>
            <BsFillCartFill className="h3 pe-2" style={{ color: "#c0392b" }} />
            <span
              className="fw-bolder fs-6 btn-clr"
              onClick={() => {
                // props.AddCart(props);
                handleAddCart(props.id);
              }}
            >
              Add To Cart
            </span>
          </Link>
        </div>
      </div>
      {/* <AddtoCart id ={props.id} /> */}
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    AddCart: (props) => dispatch(AddCart(props)),
  };
}

// export default SingleProduct;
export default connect(mapDispatchToProps, { fetchProducts, AddCart })(
  SingleProduct
);
