import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";

// AuthContext Import
import { AuthContext } from "../layout/MainLayout";

const LogIn = () => {
  const { setToken, token } = useContext(AuthContext)
  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/chat-app");
    }
  }, [token, navigate]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

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
    if (
      !validateEmail(formField.email) ||
      !validatePassword(formField.password)
    ) {
      return; // Don't proceed if there are validation errors
    }
    setError({ email: null, password: null });

    try {
      setLoading(true);
      const getToken = await fetch("http://localhost:5000/auth/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formField.email,
          password: formField.password,
        }),
      });
      const tokenData = await getToken.json();
      if (getToken.ok) {
        if (tokenData.message === "authentication successful")
          setToken(tokenData.token);
        localStorage.setItem("token", tokenData.token)
        console.log(token);
        setLoading(true);
        navigate("/chat-app");
      } else {
        setMessage(tokenData.message);
        setFormField((prevField) => ({ ...prevField, password: "" }));
        setLoading(false);
      }
    } catch (error) {
      setMessage("Network Error");
      setFormField({ email: "", password: "" });
      setLoading(false);
    }
  };

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
            className="grow"
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
