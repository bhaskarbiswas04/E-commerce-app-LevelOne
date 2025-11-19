export default function CollectionCard({
  title,
  description,
  image,
}) {
  return (
    <div className="collection-card d-flex align-items-center p-4 m-3">
      {/* Left Image Box */}
      <div className="image-box me-4">
        <img src={image} alt={title} />
      </div>

      {/* Right Text Section */}
      <div>
        <p className="text-uppercase small mb-1">New Arrivals</p>

        <div className="mt-5">
          <h4 className="fw-bold">{title}</h4>

          <p className="text-muted">{description}</p>
        </div>
      </div>
    </div>
  );
}
