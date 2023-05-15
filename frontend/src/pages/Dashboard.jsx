import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AdForm from "../components/AdForm";
import AdItem from "../components/AdItem";
import Spinner from "../components/Spinner";
import { getAds } from "../features/ads/adSlice";
import { reset } from "../features/auth/authSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { ads, isLoading, isError, message } = useSelector(
    (state) => state.ads
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getAds());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.nickname}</h1>
        <p>Ads Dashboard</p>
      </section>

      <AdForm />

      <section className="content">
        {ads.length > 0 ? (
          <div className="ads">
            {ads.map((ad) => (
              <AdItem key={ad._id} ad={ad} />
            ))}
          </div>
        ) : (
          <h3>You have not posted any ads</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
