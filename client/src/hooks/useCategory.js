import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // get category
  const getCategories = async () => {
    try {
      const callAPI = await axios.get("http://localhost:8080/api/v1/category/get-category")
      console.log(callAPI,"api called")
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
      setCategories(data?.category);
    } catch (error) {
      console.log(error,"test");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
