import './Product.css'

function Product({title,price,description,image}){
    return ( 
      
      <div className="product-card">
        <div className="product-image">
          <img
            src={image} title={title}  
          />
        </div>
        <div className="product-info">
          <h5>{title}</h5>
          <h6>${price}</h6>
        </div>
      </div>

    );
  }
export default Product;
