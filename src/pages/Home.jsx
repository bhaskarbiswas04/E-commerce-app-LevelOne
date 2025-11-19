import { categoriesData } from "../datas/categoryData";
import CollectionCard from "../components/CollectionCards";
import { newCollection } from "../datas/newCollectionData";

export default function Home() {

    const CategoryCard = ({ image, title, onClick }) => {
      return (
        <div className="category-card m-3" onClick={onClick}>
          <img src={image} alt={title} className="category-img" />
          <div className="category-label">{title}</div>
        </div>
      );
    };

    const handleClick = ()=>{}

    return (
      <div>
        <div className="container d-flex justify-content-between">
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

        <div className="container full-banner my-4">
          <img
            src="https://img.freepik.com/free-photo/portrait-young-handsome-bearded-man_1303-19639.jpg?semt=ais_incoming&w=740&q=80"
            alt="Banner"
            className="banner-img"
          />
        </div>

        <div className="container d-flex justify-content-between">
          {newCollection.map((item) => {
            return (
              <CollectionCard title={item.title} description={item.description} image={item.image} />
            );
          })}
        </div>
      </div>
    );
}