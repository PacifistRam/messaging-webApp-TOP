import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";

// AuthContext Import
import { AuthContext } from "../layout/MainLayout";

const LogIn = () => {
  const { setToken, user, userLoading } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/chat-app");
    }
  }, [user.isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField((prevField) => ({ ...prevField, [name]: value }));
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "email" && !validatePassword(value)) {
      setError((prev) => ({ ...prev, email: "Invalid Email Format" }));
    } else if (name === "email") {
      setError((prev) => ({ ...prev, email: null }));
    }

    if (name === "password" && !validatePassword(value)) {
      setError((prev) => ({
        ...prev,
        password: "password must be at least 6 characters",
      }));
    } else if (name === "password") {
      setError((prev) => ({ ...prev, password: null }));
    }
    if (!value) {
      setError((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToken(null);
    if (
      !validateEmail(formField.email) ||
      !validatePassword(formField.password)
    ) {
      return; // Don't proceed if there are validation errors
    }
    setError({ email: null, password: null });
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/auth/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formField.email,
          password: formField.password,
        }),
      });
      const userData = await response.json();

      if (response.ok) {
        setToken(userData.token);
        localStorage.setItem("token", userData.token);
        setLoading(false);
        // navigate("/chat-app");
      } else {
        setMessage(userData.message);
        setFormField((prevField) => ({ ...prevField, password: "" }));
        localStorage.removeItem("token");
        setLoading(false);
      }
    } catch (error) {
      setMessage("Network Error");
      setFormField({ email: "", password: "" });
      setLoading(false);
    }
  };

  if (userLoading ) {
    return (
      <div className="h-full flex justify-center items-center text-3xl">
        <p className=" flex gap-1 items-center">
          <span>Verifying user</span>
          <span className="loading loading-dots loading-lg"></span>
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center gap-4 mt-9">
      <h1 className="font-bold text-3xl ">Log In </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 px-6 py-2 min-w-80 sm:min-w-96 sm:max-w-[500px] mx-auto"
      >
        <label
          htmlFor=""
          className="input input-bordered flex items-center gap-2"
        >
          <IoMdMail />
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={formField.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="grow bg-transparent"
          />
        </label>
        <label
          htmlFor=""
          className="input input-bordered flex items-center gap-2"
        >
          <IoKey />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            value={formField.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="grow"
          />
        </label>
        <button
          type="submit"
          className={`btn btn-primary uppercase btn-block text-primary-content text-xl font-semibold ${
            loading ? "btn-disabled  " : ""
          }`}
        >
          {loading && <span className="loading loading-spinner"></span>}
          {`${!loading ? "Log In" : "logging in"}`}
        </button>
      </form>
      {error && (
        <div className="grid gap-2">
          {error?.email && (
            <div
              role="alert"
              className="alert sm:min-w-80 sm:max-w-80 mx-auto text-error text-sm font-bold"
            >{`*${error.email}`}</div>
          )}
          {error?.password && (
            <div
              role="alert"
              className="alert sm:min-w-80 sm:max-w-80 mx-auto text-error text-sm font-bold"
            >{`*${error.password}`}</div>
          )}
          {message && (
            <div
              role="alert"
              className="alert sm:min-w-80 sm:max-w-80 mx-auto text-error text-sm font-bold"
            >
              {`*${message}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LogIn;
