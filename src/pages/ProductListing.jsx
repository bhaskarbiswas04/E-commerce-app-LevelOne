import ProductCard from "../components/ProductCard";
import FilterUIComponent from "../components/FilterUIComponent";

import products from "../datas/products";

export default function ProductListing(){
    return (
      <>
        <div className="d-flex w-100 my-5 gap-3">
          <FilterUIComponent />

          <div
            className="flex-grow-1 p-4"
            style={{ backgroundColor: "#eae1e1" }}
          >
            <div className="d-flex flex-column ">
              {/* HEADER */}
              <div className="mb-4">
                <h4 className="fw-bold">
                  Showing All Products
                  <span className="fs-6 text-muted">
                    &nbsp; ( Showing {products.length} products )
                  </span>
                </h4>
              </div>

              {/* PRODUCT GRID */}
              <div className="row g-4">
                {products.map((item) => (
                  <div key={item.id} className="col-6 col-md-4 col-lg-3">
                    <ProductCard product={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
}