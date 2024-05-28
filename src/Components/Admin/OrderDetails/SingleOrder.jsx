import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SingleOrder.css";

const SingleOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `https://mern-backend-s2e3.onrender.com/api/getallorders`
        );
        const orders = response.data;
        const order = orders.find((order) => order._id === orderId);

        if (order) {
          const productDetailsPromises = order.products.map((productId) =>
            axios.get(
              `https://mern-backend-s2e3.onrender.com/api/products/${productId}`
            )
          );
          const productResponses = await Promise.all(productDetailsPromises);
          const products = productResponses.map((response) => response.data);

          setOrder({ ...order, products: products });
        } else {
          console.error("Order not found");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching order:", error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleDeliveryStatusChange = async (e, productId) => {
    const { value } = e.target;
    try {
      const response = await axios.put(
        `https://mern-backend-s2e3.onrender.com/api/products/${productId}/update-delivery-status`,
        {
          deliveryStatus: value === "delivered",
        }
      );
      console.log("Delivery status updated successfully", response.data);

      setOrder((prevOrder) => ({
        ...prevOrder,
        products: prevOrder.products.map((product) =>
          product._id === productId
            ? { ...product, deliveryStatus: value === "delivered" }
            : product
        ),
      }));
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="Dashboard">
      <div className="single-order-details">
        <h2>Order Details</h2>
        <h3>Order ID: {order._id}</h3>
        <p>Total Price: ${order.totalPrice}</p>
        <p>Address: {order.address.address}</p>
        <p>City: {order.address.city}</p>
        <p>Products:</p>
        <ul className="product-list1">
          {order.products.map((product) => (
            <li key={product._id} className="product-item">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <p className="product-name">Name: {product.title.slice(0, 12)}</p>
              <p className="product-price">Price: ${product.price}</p>
              <select
                className="delivery-status"
                onChange={(e) => handleDeliveryStatusChange(e, product._id)}
                value={product.deliveryStatus ? "delivered" : "pending"}
              >
                <option value="pending">Pending</option>
                <option value="delivered">Delivered</option>
              </select>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleOrder;
