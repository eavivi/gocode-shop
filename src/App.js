import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header'
import Products from './Products'
import Cart from './Cart';
import ProductContext from './ProductContext';



function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((Response) => Response.json())
      .then((data) => setProducts(data))
  }, []);

  const groupBy = (xs, key) => xs.reduce((rv, x) => {
    (rv[x[key]] = true || []);
    return rv;
  }, {});



  const categories = Object.keys(groupBy(products, 'category'));

  const [categor, setCategor] = useState("All Categories")


  function chooseCategor(category) {
    setCategor(category);
  }
  const [cart, setCart] = useState([]);
  const [numItems, setNumItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  function addToCart(title) {

    const productToAdding = products.filter((p) => p.title === title);
    const newProductInCart = {
      id: cart.length + 1,
      title:  productToAdding[0].title,
      price:  productToAdding[0].price,
      image:  productToAdding[0].image,
      description:  productToAdding[0].description,
      category:  productToAdding[0].category,
    }

    setCart([...cart, newProductInCart])
    setNumItems(cart.length + 1)
    setTotalPrice(totalPrice + newProductInCart.price)
  }

  return (
  <ProductContext.Provider value={{addToCart,numItems,totalPrice,cart}}>
    <div className="App">
      <Header categories={categories} choose={chooseCategor} />
      <div className="cart">
        <Cart/>
      </div>
      <Products products={products.filter(
        product => product.category === categor || categor === "All Categories")}
      />

    </div>
  </ProductContext.Provider>
  );
}

export default App;