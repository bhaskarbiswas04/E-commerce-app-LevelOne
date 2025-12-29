import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CollectionCard from "../components/home-comps/CollectionCards";
import { newCollection } from "../datas/newCollectionData";
import CategoryCard from "../components/home-comps/CategoryCards";

export default function Home() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleClick = (cTitle) => {
    if (cTitle === "All Products") {
      navigate("/products");
    } else {
      navigate(`/products/${cTitle}`);
    }
  };

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://e-commerce-level-one-backend.vercel.app/categories"
        );
        const json = await res.json();
        setCategories(json.data.categories);
      } catch (err) {
        console.error("Failed to fetch categories", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="container">
      {/*  CATEGORY SECTION  */}
      <div className="row gx-3 gy-3 mt-4 justify-content-between">
        {loading &&
          Array.from({ length: 5 }).map((_, index) => (
            <div className="col-6 col-md-3 col-lg-2" key={index}>
              {/* SKELETON CARD */}
              <div className="card border-0 shadow-sm">
                <div
                  className="bg-secondary bg-opacity-25"
                  style={{ height: "100px", borderRadius: "6px" }}
                />
                <div className="card-body p-2">
                  <div
                    className="bg-secondary bg-opacity-25 mb-2"
                    style={{ height: "12px", width: "70%" }}
                  />
                </div>
              </div>
            </div>
          ))}

        {!loading &&
          !error &&
          categories.map((category) => (
            <div className="col-6 col-md-3 col-lg-2" key={category.id}>
              <CategoryCard
                image={category.imageUrl}
                title={category.title}
                onClick={() => handleClick(category.title)}
              />
            </div>
          ))}

        {error && (
          <div className="text-center text-danger mt-4">
            Failed to load categories. Please try again later.
          </div>
        )}
      </div>

      {/*  BANNER  */}
      {!loading && !error && (
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
      )}

      {/*  COLLECTIONS  */}
      {!loading && !error && (
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
      )}
    </div>
  );
}