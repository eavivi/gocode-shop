import './Products.css'
import Product from './Product'

function Products({products}){
    
    return(<section className="products">
    {products.map((product)=>(
        <Product key= {product.id} product={product}  />
    )
    
    )}
          
    </section>


    );
}
export default Products;
