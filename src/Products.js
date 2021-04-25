import './Products.css'
import Product from './Product'

function Products({products}){
    
    return(<section className="products">
    {products.map(({id, title, price, description, image })=>(
        <Product 
        key= {id} 
        title={title} 
        price={price}
        description={description}
        image={image}
         />
    )
    
    )}
          
    </section>


    );
}
export default Products;
