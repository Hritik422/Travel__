import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { travelAPI } from "../../services/api";
import { toast } from "react-toastify";

// ─── Thunks ───────────────────────────────────────────────────────────────────
export const fetchDestinations = createAsyncThunk("travel/fetchDestinations", async (_, { rejectWithValue }) => {
  try { return await travelAPI.getDestinations(); }
  catch (e) { return rejectWithValue(e.message); }
});

export const fetchDestinationById = createAsyncThunk("travel/fetchById", async (id, { rejectWithValue }) => {
  try { return await travelAPI.getDestinationById(id); }
  catch (e) { return rejectWithValue(e.message); }
});

export const fetchItinerary = createAsyncThunk("travel/fetchItinerary", async (id, { rejectWithValue }) => {
  try { return await travelAPI.getItinerary(id); }
  catch (e) { return rejectWithValue(e.message); }
});

export const searchDestinations = createAsyncThunk("travel/search", async (q, { rejectWithValue }) => {
  try { return await travelAPI.search(q); }
  catch (e) { return rejectWithValue(e.message); }
});

export const fetchReviews = createAsyncThunk("travel/fetchReviews", async (_, { rejectWithValue }) => {
  try { return await travelAPI.getReviews(); }
  catch (e) { return rejectWithValue(e.message); }
});

export const postQuery = createAsyncThunk("travel/postQuery", async (data, { rejectWithValue }) => {
  try { return await travelAPI.postQuery(data); }
  catch (e) { return rejectWithValue(e.message); }
});

export const fetchCategories = createAsyncThunk("travel/fetchCategories", async (_, { rejectWithValue }) => {
  try { return await travelAPI.getCategories(); }
  catch (e) { return rejectWithValue(e.message); }
});

// ─── Slice ────────────────────────────────────────────────────────────────────
const travelSlice = createSlice({
  name: "travel",
  initialState: {
    destinations: [], destinationsLoading: false, destinationsError: null,
    currentDestination: null, currentDestinationLoading: false,
    itinerary: null, itineraryLoading: false,
    searchResults: [], searchLoading: false,
    reviews: [], reviewsLoading: false,
    categories: [], categoriesLoading: false,
    querySubmitting: false,
  },
  reducers: {
    clearSearch: (state) => { state.searchResults = []; },
    clearItinerary: (state) => { state.itinerary = null; },
  },
  extraReducers: (b) => {
    // destinations
    b.addCase(fetchDestinations.pending, (s) => { s.destinationsLoading = true; s.destinationsError = null; })
     .addCase(fetchDestinations.fulfilled, (s, a) => { s.destinationsLoading = false; s.destinations = a.payload?.items || []; })
     .addCase(fetchDestinations.rejected, (s, a) => { s.destinationsLoading = false; s.destinationsError = a.payload; });
    // single destination
    b.addCase(fetchDestinationById.pending, (s) => { s.currentDestinationLoading = true; })
     .addCase(fetchDestinationById.fulfilled, (s, a) => { s.currentDestinationLoading = false; s.currentDestination = a.payload?.items || null; })
     .addCase(fetchDestinationById.rejected, (s) => { s.currentDestinationLoading = false; });
    // itinerary
    b.addCase(fetchItinerary.pending, (s) => { s.itineraryLoading = true; s.itinerary = null; })
     .addCase(fetchItinerary.fulfilled, (s, a) => { s.itineraryLoading = false; s.itinerary = a.payload?.items || null; })
     .addCase(fetchItinerary.rejected, (s) => { s.itineraryLoading = false; });
    // search
    b.addCase(searchDestinations.pending, (s) => { s.searchLoading = true; })
     .addCase(searchDestinations.fulfilled, (s, a) => { s.searchLoading = false; s.searchResults = a.payload?.items || []; })
     .addCase(searchDestinations.rejected, (s) => { s.searchLoading = false; s.searchResults = []; });
    // reviews
    b.addCase(fetchReviews.pending, (s) => { s.reviewsLoading = true; })
     .addCase(fetchReviews.fulfilled, (s, a) => { s.reviewsLoading = false; s.reviews = a.payload?.items || []; })
     .addCase(fetchReviews.rejected, (s) => { s.reviewsLoading = false; });
    // categories
    b.addCase(fetchCategories.pending, (s) => { s.categoriesLoading = true; })
     .addCase(fetchCategories.fulfilled, (s, a) => { s.categoriesLoading = false; s.categories = a.payload?.items || []; })
     .addCase(fetchCategories.rejected, (s) => { s.categoriesLoading = false; });
    // query
    b.addCase(postQuery.pending, (s) => { s.querySubmitting = true; })
     .addCase(postQuery.fulfilled, (s) => { s.querySubmitting = false; toast.success("We'll be in touch within 24 hours!"); })
     .addCase(postQuery.rejected, (s, a) => { s.querySubmitting = false; toast.error(a.payload || "Submission failed. Please retry."); });
  },
});

export const { clearSearch, clearItinerary } = travelSlice.actions;
export default travelSlice.reducer;
