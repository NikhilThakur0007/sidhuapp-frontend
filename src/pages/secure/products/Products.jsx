import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loginloader from "../../../components/Loader/LoginLoader";
import Loader from "../../../components/Loader/Loader";
import { Backdrop } from "@mui/material";
import { Link } from "react-router-dom";

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const [products1, setProducts1] = useState([]);
  const [display, setdisplay] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setopen] = useState(false);
  const customId = "custom-id-yes";
  const customId1 = "custom-id-yess";
  const customId2 = "custom-id-yesss";

  const handleClickk = (e) => {
    e.preventDefault();
  };

  const getproducts = async () => {
    try {
      setLoading(true);
      const res = await axios("http://localhost:8080/products/getproducts");
      console.log(res.data);

      let status = res.data.statusDescription.statusCode;
      if (status == 210) {
        setLoading(false);
        await setProducts(res.data.statusDescription);

        await setProducts1(res.data.Products);

        setTimeout(async () => {
          await toast.success(res.data.statusDescription.statusMessage, {
            theme: "colored",
            toastId: customId2,
          });
        }, 1000);
      } else {
        setLoading(false);
        setTimeout(async () => {
          await toast.error(res.data.statusDescription.statusMessage, {
            theme: "colored",
            toastId: customId2,
          });
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      console.log("something went wrong");
    }
  };

  const deleteproduct = async (id) => {
    try {
      setopen(true);
      const deletee = await axios.delete(
        `http://localhost:8080/products/deleteproduct/${id}`
      );
      console.log(deletee);

      let status = deletee.data.statusDescription.statusCode;
      if (status == 211) {
        setopen(false);
        setTimeout(async () => {
          await toast.success(deletee.data.statusDescription.statusMessage, {
            theme: "colored",
          });
        }, 1000);
        getproducts();
      } else if (status == 404) {
        setopen(false);

        setdisplay("d-none");
      } else {
        setopen(false);
        setTimeout(async () => {
          await toast.error(deletee.data.statusDescription.statusMessage, {
            theme: "colored",
          });
        }, 1000);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getproducts();
  }, []);

  const handleChange = async (e) => {
    console.log(e.target.value, "prosp");
    e.preventDefault();
    let key = e.target.value;
    if (key) {
      const res = await axios(`http://localhost:8080/products/search/${key}`);
      console.log(res);
      if (res) {
        await setProducts1(res.data.results);
      }
    } else {
      await getproducts();
    }
  };

  return (
    <>
      <div className="container">
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
        <form style={{ marginLeft: "40%" }} className="d-flex">
          <input
            onChange={handleChange}
            style={{ width: "30%", marginTop: "20px" }}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
        <h3 className="text" style={{ textAlign: "center", marginTop: "50px" }}>
          Product List
        </h3>
        {loading ? (
          <h1>Please wait Hold On!!</h1>
        ) : (
          <>
            <table className={`${display}`} style={{ width: "100%" }}>
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>

                <th>Operation</th>
              </tr>
              {products1.length > 0 &&
                products1.map((pro, index) => {
                  // console.log(pro._id);
                  return (
                    <>
                      <tr key={pro.id}>
                        <td>{index + 1}</td>
                        <td>{pro.name}</td>
                        <td>{pro.brand}</td>
                        <td>{pro.category}</td>
                        <td>${pro.price}</td>
                        <td>{pro.userId}</td>

                        <td>
                          <button onClick={() => deleteproduct(pro._id)}>
                            Delete
                          </button>
                          <Link to={"/updateproducts/" + pro._id}>
                            <button>Update</button>
                          </Link>
                        </td>
                      </tr>
                    </>
                  );
                })}{" "}
              <Loginloader visible={props.loading} />
            </table>
          </>
        )}
      </div>
    </>
  );
}
