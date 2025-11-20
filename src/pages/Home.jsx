import { categoriesData } from "../datas/categoryData";
import CollectionCard from "../components/CollectionCards";
import { newCollection } from "../datas/newCollectionData";
import CategoryCard from "../components/CategoryCards";

export default function Home() {

    const handleClick = ()=>{}

    return (
      <div className="container">
        <div className="d-flex gap-3 mt-4">
          {categoriesData.map((category) => {
            return (
              <CategoryCard
                image={category.imageUrl}
                title={category.title}
                onClick={handleClick}
              />
            );
          })}
        </div>

        <div className="full-banner my-4">
          <img
            src="https://img.freepik.com/free-photo/portrait-young-handsome-bearded-man_1303-19639.jpg?semt=ais_incoming&w=740&q=80"
            alt="Banner"
            className="banner-img"
          />
        </div>

        <div className="d-flex gap-5">
          {newCollection.map((item) => {
            return (
              <CollectionCard
                title={item.title}
                description={item.description}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    );
}