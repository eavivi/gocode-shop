const { exec } = require("child_process");
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.static("client/build"));

const ProductSchema = mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});
const Product = mongoose.model("Product", ProductSchema);

app.get("/api/products", (req, res) => {
  const { q } = req.query;
  const { category } = req.query;
  Product.find({})
    .exec()
    .then((productsArr) => {
      if (q) {
        const strFoundArr = productsArr.filter(
          (product) =>
            product.title.includes(q) || product.description.includes(q)
        );
        res.send(
          strFoundArr.length > 0 ? strFoundArr : "No data found for your search"
        );
      } else if (category) {
        const categoryArr = productsArr.filter(
          (product) => product.category === category
        );
        res.send(
          categoryArr.length ? categoryArr : "No data found for your search"
        );
      } else {
        res.send(productsArr);
      }
    });
});

app.get("/api/products/:id", (req, res) => {
  Product.findById(req.params.id)
    .exec()
    .then((product) => {
      if (product) {
        res.send(product);
      } else {
        res.status(404);
        res.send();
      }
    });
});

app.post("/api/products", (req, res) => {
  Product.insertMany([
    {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
    },
  ]).then((addProduct) => {
    res.send(addProduct);
  });
});

app.put("/api/products/:id", (req, res) => {
  Product.findById(req.params.id)
    .exec()
    .then((product) => {
      const { title, price, image, description, category } = req.body;
      Product.findByIdAndUpdate(req.params.id, {
        title: title || product.title,
        price: price || product.price,
        image: image || product.image,
        description: description || product.description,
        category: category || product.category,
      })
        .exec()
        .then(() => {
          res.send("Product updated");
        });
    });
});

app.delete("/api/products/:id", (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .exec()
    .then(() => {
      res.send("success delete");
    });
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  });
