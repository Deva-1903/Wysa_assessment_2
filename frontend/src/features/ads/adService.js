import axios from "../../axios";

const API_URL = "/api/ads/";

const createAdService = async (adData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, adData, config);

  return response.data;
};

const getAds = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const deleteAd = async (adId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + adId, config);

  return response.data;
};

const adService = {
  createAdService,
  getAds,
  deleteAd,
};

export default adService;
