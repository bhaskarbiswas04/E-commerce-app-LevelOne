export default function CategoryCard ({ image, title, onClick }) {

      return (
        <div className="category-card mb-4" onClick={onClick}>
          <img src={image} alt={title} className="category-img" />
          <div className="category-label text-center">{title}</div>
        </div>
      );
    };
