import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import { Backdrop } from "@mui/material";

export default function Updateproduct() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [userid, setUserId] = useState("");
  const params = useParams();
  const [open, setopen] = useState(false);
  const customId2 = "custom-id-yesss";

  const Updateproduct = async (e) => {
    e.preventDefault();
    try {
      setopen(true);
      const res = await axios.put(
        `http://localhost:8080/products/updateproduct/${params.id}`,
        {
          name: name,
          brand: brand,
          category: category,
          price: price,
          userId: userid,
        }
      );
      console.log(res.data);
      let status = res.data.statusDescription.statusCode;
      if (status === 200) {
        setopen(false);
        setTimeout(async () => {
          await toast.success(res.data.statusDescription.statusMessage, {
            theme: "colored",
            toastId: customId2,
          });
        }, 100);
      } else {
        setopen(false);
        setTimeout(async () => {
          await toast.error(res.data.statusDescription.statusMessage, {
            theme: "colored",
            toastId: customId2,
          });
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(name, brand, category, price, userid);
  };

  const getproductdetails = async () => {
    try {
      const res = await axios(
        `http://localhost:8080/products/products/${params.id}`
      );
      setName(res.data.result.name);
      setBrand(res.data.result.brand);
      setCategory(res.data.result.category);
      setPrice(res.data.result.price);
      setUserId(res.data.result.userId);
      let status = res.data.statusDescription.statusCode;
      if (status === 200) {
        setTimeout(async () => {
          await toast.success(res.data.statusDescription.statusMessage, {
            theme: "colored",
            toastId: customId2,
          });
        }, 100);
      } else {
        setTimeout(async () => {
          await toast.error(res.data.statusDescription.statusMessage, {
            theme: "colored",
            toastId: customId2,
          });
        }, 100);
      }
    } catch (error) {
      console.log("something");
    }
  };

  useEffect(() => {
    getproductdetails();
  }, []);

  return (
    <>
      <div className="container mt-2">
        <Backdrop
          sx={{
            transform: "translateZ(0)",
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={open}
          // onClick={handleClose}
        >
          <Loader />
        </Backdrop>
        <form className="row g-3 needs-validation" novalidate>
          <div className="col-md-4">
            <label for="validationCustom01" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom01"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-4">
            <label for="validationCustom02" className="form-label">
              Brand
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom02"
              value={brand}
              required
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand"
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-4">
            <label for="validationCustomUsername" className="form-label">
              Price
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">
                $
              </span>
              <input
                type="number"
                className="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
              <div className="invalid-feedback">Please choose a Price.</div>
            </div>
          </div>
          <div className="col-md-6">
            <label for="validationCustom03" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              value={category}
              id="validationCustom03"
              required
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
            />
            <div className="invalid-feedback">
              Please provide a valid Category.
            </div>
          </div>

          <div className="col-md-3">
            <label for="validationCustom05" className="form-label">
              UserId
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom05"
              required
              value={userid}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="UserId"
            />
            <div className="invalid-feedback">
              Please provide a valid User Id.
            </div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="invalidCheck"
                required
              />
              <label className="form-check-label" for="invalidCheck">
                Agree to terms and conditions
              </label>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div className="col-12">
            <button
              onClick={Updateproduct}
              className="btn btn-primary"
              type="submit"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>{" "}
    </>
  );
}
