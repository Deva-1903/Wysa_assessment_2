import { useDispatch } from "react-redux";
import { deleteAd } from "../features/ads/adSlice";

function AdItem({ ad }) {
  const dispatch = useDispatch();

  return (
    <div className="ad">
      <div>{new Date(ad.createdAt).toLocaleString("en-US")}</div>
      <h2>{ad.text}</h2>
      <button onClick={() => dispatch(deleteAd(ad._id))} className="close">
        X
      </button>
    </div>
  );
}

export default AdItem;
