import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CollectionCard from "../components/home-comps/CollectionCards";
import { newCollection } from "../datas/newCollectionData";
import CategoryCard from "../components/home-comps/CategoryCards";

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const handleClick = (cTitle) => {
    if (cTitle === "All Products") {
      navigate("/products");
    } else {
      navigate(`/products/${cTitle}`);
    }
  };

  // 🔹 Fetch categories from backend
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          "https://e-commerce-level-one-backend.vercel.app/categories"
        );
        const json = await res.json();
        setCategories(json.data.categories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="container">
      {/* CATEGORY CARDS */}
      <div className="row gx-3 gy-3 mt-4 justify-content-between">
        {categories.map((category) => (
          <div className="col-6 col-md-3 col-lg-2" key={category.id}>
            <CategoryCard
              image={category.imageUrl}
              title={category.title}
              onClick={() => handleClick(category.title)}
            />
          </div>
        ))}
      </div>

      {/* BANNER */}
      <div className="row my-4">
        <div className="col-12">
          <div className="full-banner">
            <img
              src="https://img.freepik.com/free-photo/portrait-young-handsome-bearded-man_1303-19639.jpg"
              alt="Banner"
              className="banner-img"
            />
          </div>
        </div>
      </div>

      {/* COLLECTION CARDS */}
      <div className="row g-4 mb-5">
        {newCollection.map((item, index) => (
          <div className="col-12 col-md-6" key={index}>
            <CollectionCard
              title={item.title}
              description={item.description}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}