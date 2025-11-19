export default function CategoryCard ({ image, title, onClick }) {
      return (
        <div className="category-card my-3 me-4" onClick={onClick}>
          <img src={image} alt={title} className="category-img" />
          <div className="category-label">{title}</div>
        </div>
      );
    };