import axios from "axios";

const BASE = `${import.meta.env.VITE_API_URL}/admin`;

const adminApi = axios.create({ baseURL: BASE, timeout: 15000 });

// Attach JWT to every request
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Redirect to login on 401
adminApi.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("admin_token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(err.response?.data || { message: "Request failed" });
  }
);

export const adminService = {
  // auth
  login:              (creds)   => adminApi.post("/login", creds),

  // dashboard
  getStats:           ()        => adminApi.get("/stats"),

  // destinations
  getDestinations:    ()        => adminApi.get("/destinations"),
  createDestination:  (data)    => adminApi.post("/destinations", data),
  updateDestination:  (id, data)=> adminApi.put(`/destinations/${id}`, data),
  deleteDestination:  (id)      => adminApi.delete(`/destinations/${id}`),

  // itinerary
  getItineraries:     ()        => adminApi.get("/itinerary"),
  getItineraryById:   (id)      => adminApi.get(`/itinerary/${id}`),
  createItinerary:    (data)    => adminApi.post("/itinerary", data),
  updateItinerary:    (id, data)=> adminApi.put(`/itinerary/${id}`, data),
  deleteItinerary:    (id)      => adminApi.delete(`/itinerary/${id}`),

  // categories
  getCategories:      ()        => adminApi.get("/categories"),
  createCategory:     (data)    => adminApi.post("/categories", data),
  updateCategory:     (id, data)=> adminApi.put(`/categories/${id}`, data),
  deleteCategory:     (id)      => adminApi.delete(`/categories/${id}`),

  // reviews
  getReviews:         ()        => adminApi.get("/reviews"),
  createReview:       (data)    => adminApi.post("/reviews", data),
  updateReview:       (id, data)=> adminApi.put(`/reviews/${id}`, data),
  deleteReview:       (id)      => adminApi.delete(`/reviews/${id}`),

  // queries (leads)
  getQueries:         (status)  => adminApi.get("/queries", { params: { status } }),
  deleteQuery:        (id)      => adminApi.delete(`/queries/${id}`),
};
