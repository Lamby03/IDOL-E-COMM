import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  // Ensure each cart item has a `quantity` property and merge duplicates
 useEffect(() => {
  const initializeCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const mergedCart = savedCart.reduce((acc, item) => {
      const existingItem = acc.find((p) => p._id === item._id);
      if (existingItem) {
        existingItem.quantity += item.quantity > 0 ? item.quantity : 1;
      } else {
        acc.push({ ...item, quantity: item.quantity > 0 ? item.quantity : 1 });
      }
      return acc;
    }, []);
    setCart(mergedCart);
    localStorage.setItem("cart", JSON.stringify(mergedCart)); // Ensure localStorage is also updated
  };

  initializeCart();
}, []);


  // Calculate total price
  const totalPrice = () => {
    try {
      return cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Update quantity of a cart item
  const updateQuantity = (pid, delta) => {
    const updatedCart = cart.map((item) =>
      item._id === pid
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Fetch payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/profile");
      toast.success("Payment done successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : "Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row m-2 card flex-row mb-2 p-3" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                </div>
                <div className="col-md-8">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 30)}</p>
                  <h4>Price: ₹ {p.price}</h4>
                  <p>Quantity: {p.quantity}</p>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-primary me-2"
                      onClick={() => updateQuantity(p._id, 1)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => updateQuantity(p._id, -1)}
                    >
                      -
                    </button>
                  </div>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <div className="mb-3">
                <h4>Current Address:</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
