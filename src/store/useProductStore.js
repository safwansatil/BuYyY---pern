import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added yayy");
      // close the modal
      document.getElementById("add_product_modal").close();
    } catch (error) {
      console.log("Error in add Product funtion: ", error);
      toast.error("Couldn't add product");
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null }); // first data is from axios and the latter is of our api (backend)
    } catch (err) {
      // 429 indicates rate limiting
      if (err.status == 429)
        set({ error: "Rate Limit Exceeded", products: [] });
      else set({ error: "Something went wrong, maybe in fetchProducts" });
    } finally {
      set({ loading: false });
    }
  },

  deleteProducts: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Product Deleted Successfully");
    } catch (error) {
      console.log("Error in deletProducts store: ", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data,
        error: null,
      });
    } catch (error) {
        console.log("Error in fetchProduct: ", error);
        set({error:"Something went wrong", currentProduct:null})
        toast.error("Not Working :(");
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id) => {
    set({ loading: true });
    try {
        const {formData} = get();
        const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
        set({currentProduct:response.data.data});
        toast.success("Uodated Successfully :O")
    } catch (error) {
        console.log("Error in updateProduct function : ", error);
        toast.error("ded Xp");
    } finally{
        set({ loading: false });
    }
  },
}));
