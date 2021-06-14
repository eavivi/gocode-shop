const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

app.get("/products", (req, res) => {
  const { q } = req.query;
  const { category } = req.query;
  fs.readFile("products.json", "utf8", (err, products) => {
    productsArr = JSON.parse(products);
    if (q) {
      const strFoundArr = productsArr.filter(
        (product) =>
          product.title.includes(q) || product.description.includes(q)
      );
      if (strFoundArr.length > 0) {
        res.send(strFoundArr);
      } else {
        res.send("No data found for your search");
      }
    } else if (category) {
      const categoryArr = productsArr.filter(
        (product) => product.category === category
      );
      if (categoryArr.length > 0) {
        res.send(categoryArr);
      } else {
        res.send("This category does not exist");
      }
      
    }else{
      res.send(productsArr);
    }
  });
});

app.get("/products/:id", (req, res) => {
  fs.readFile("products.json", "utf8", (err, products) => {
    productsArr = JSON.parse(products);
    const product = productsArr.find((item) => item.id === +req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404);
      res.send();
    }
  });
});

app.post("/products", (req, res) => {
  fs.readFile("products.json", "utf8", (err, products) => {
    productsArr = JSON.parse(products);
    productsArr.push({
      id: productsArr.length + 1,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
    });
    fs.writeFile("products.json", JSON.stringify(productsArr), (err) => {
      console.log(err);
      res.send("success to add");
    });
  });
});
app.put("/products/:id", (req, res) => {
  fs.readFile("products.json", "utf8", (err, products) => {
    productsArr = JSON.parse(products);
    const { title, price, image, description, category } = req.body;
    const { id } = req.params;
    const updatedProductsArr = productsArr.map((product) => {
      if (product.id === +id) {
        return {
          ...product,
          title: title || product.title,
          price: price || product.price,
          image: image || product.image,
          description: description || product.description,
          category: category || product.category,
        };
      } else {
        return product;
      }
    });

    fs.writeFile("products.json", JSON.stringify(updatedProductsArr), (err) => {
      console.log(err);
      res.send("success to update");
    });
  });
});

app.delete("/products/:id", (req, res) => {
  fs.readFile("products.json", "utf8", (err, products) => {
    productsArr = JSON.parse(products);
    const { id } = req.params;
    const updatedProductsArr = productsArr.filter(
      (product) => product.id !== +id
    );
    fs.writeFile("products.json", JSON.stringify(updatedProductsArr), (err) => {
      console.log(err);
      res.send("success to delete");
    });
  });
});

app.listen(8080);
