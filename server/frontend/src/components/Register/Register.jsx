
import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/djangoapp/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Registration failed.");
      }

      setMessage(data.message || "Registration successful!");
    } catch (error) {
      setMessage(error.message || "Unable to register. Please try again.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Create Your Account</h1>
        <p style={styles.subtitle}>
          Sign up to explore dealerships and share your reviews.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={styles.label} htmlFor="username">Username</label>
          <input
            style={styles.input}
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label style={styles.label} htmlFor="firstName">First Name</label>
          <input
            style={styles.input}
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label style={styles.label} htmlFor="lastName">Last Name</label>
          <input
            style={styles.input}
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label style={styles.label} htmlFor="email">Email</label>
          <input
            style={styles.input}
            id="email"
            name="email"
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label style={styles.label} htmlFor="password">Password</label>
          <input
            style={styles.input}
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button style={styles.button} type="submit">
            Register
          </button>

          {message && (
            <p role="status" style={styles.message}>{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px 16px",
    background: "#f1f5f9",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "450px",
    padding: "32px",
    borderRadius: "12px",
    background: "#ffffff",
    boxShadow: "0 5px 24px rgba(0,0,0,0.10)",
  },
  heading: {
    textAlign: "center",
    color: "#17365d",
    marginBottom: "8px",
  },
  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: "25px",
  },
  label: {
    display: "block",
    marginTop: "14px",
    marginBottom: "6px",
    fontWeight: "bold",
    color: "#334155",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    marginTop: "24px",
    padding: "13px",
    border: "none",
    borderRadius: "6px",
    background: "#17365d",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  message: {
    marginTop: "16px",
    textAlign: "center",
    overflowWrap: "anywhere",
  },
};

export default Register;
