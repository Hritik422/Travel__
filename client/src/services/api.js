import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err.response?.data || { message: "Network error" })
);

export const travelAPI = {
  getDestinations: () => api.get("/travel"),
  getDestinationById: (id) => api.get(`/travel/${id}`),
  getItinerary: (id) => api.get("/itinerary", { headers: { id } }),
  search: (q) => api.get(`/search?location=${encodeURIComponent(q)}`),
  getReviews: () => api.get("/reviews"),
  postQuery: (data) => api.post("/query", data),
  getCategories: () => api.get("/bycategory"),
};
