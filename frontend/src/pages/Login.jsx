import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import React from "react";
import axios from "../axios";

function Login() {
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });
  const [ads, setAds] = useState([]);
  const { mobile, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const getAds = async () => {
      try {
        const res = await axios.get("/api/get/ads");
        setAds(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAds();
  }, []);

  useEffect(() => {
    if (isError) {
      console.log("message in login: " + message);
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      mobile,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start posting ads</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="tel"
              className="form-control"
              id="mobile"
              name="mobile"
              value={mobile}
              placeholder="Enter your mobile"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>

      <h2>List of Ads in Our Application</h2>
      <p>If you are interested, call the number which user mentioned</p>
      <p>If you are want to post you ads, please login</p>
      <section className="ads">
        {ads.map((ad) => (
          <div className="card" key={ad._id}>
            <div className="card-body">
              <h5 className="card-title">{ad.nickname}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{ad.mobile}</h6>
              <p className="card-text">{ad.text}</p>
            </div>
          </div>
        ))}
      </section>

      <style jsx>{`
        .ads {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 20px;
        }

        .card {
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
          margin: 10px;
          padding: 10px;
          width: 200px;
          height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
}

export default Login;
