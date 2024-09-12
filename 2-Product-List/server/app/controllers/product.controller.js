const { Product, Rating, sequelize } = require("../models/product.model.js");

module.exports = {
  list: async (req, res) => {
    console.log("request recieved: ", req.params);
    try {
      const data = await Product.findAndCountAll({ include: Rating });
      res.status(200).send({
        error: false,
        result: data,
        request: req,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  },
  create: async (req, res) => {
    const { rating, ...productData } = req.body; // req.body'den rating ve product verilerini ayrıştır
    try {
      const product = await Product.create(productData);

      await Rating.create({
        rate: rating.rate,
        count: rating.count,
        productId: product.id,
      });

      res.status(201).send({
        error: false,
        result: product.dataValues,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  },

  read: async (req, res) => {
    try {
      const data = await Product.findByPk(req.params.id, { include: Rating });
      res.status(200).send({
        error: false,
        result: data,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      const { title, price, description, category, image, rating } = req.body;

      const product = await Product.findByPk(req.params.id);

      await product.update({ title, price, description, category, image });
      let productRating = await Rating.findOne({
        where: { productId: product.id },
      });

      if (productRating) {
        await productRating.update({ rate: rating.rate, count: rating.count });
      } else {
        await Rating.create({
          rate: rating.rate,
          count: rating.count,
          productId: product.id,
        });
      }

      res.status(202).send({
        error: false,
        message: "Updated",
        body: req.body, // Gönderdiğim veriyi göster.
        result: data,
        new: await Product.findByPk(req.params.id), // Güncellenmiş veriyi de göster.
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    const data = await Product.destroy({ where: { id: req.params.id } });

    if (data > 0) {
      res.status(204);
    } else {
      res.errorStatusCode = 404;
      throw new Error("Not Found.");
    }
  },

  listByCategory: async (req, res) => {
    try {
      console.log("Category received:", req.params.category);
      const category = req.params.category; // URL'den kategoriyi al
      const data = await Product.findAndCountAll({
        where: { category }, // Kategoriye göre filtrele
        include: Rating,
      });
      res.status(200).send({
        error: false,
        result: data,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  },
};

// // Create a new product with rating
// app.post('/products', async (req, res) => {
//   try {
//     const { title, price, description, category, image, rating } = req.body;
//     const product = await Product.create({ title, price, description, category, image });

//     if (rating) {
//       await Rating.create({
//         rate: rating.rate,
//         count: rating.count,
//         productId: product.id
//       });
//     }

//     res.status(201).json(product);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Get all products with ratings
// app.get('/products', async (req, res) => {
//   try {
//     const products = await Product.findAll({ include: Rating });
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get a single product by ID
// app.get('/products/:id', async (req, res) => {
//   try {
//     const product = await Product.findByPk(req.params.id, { include: Rating });
//     if (product) {
//       res.status(200).json(product);
//     } else {
//       res.status(404).json({ error: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update a product by ID
// app.put('/products/:id', async (req, res) => {
//   try {
//     const { title, price, description, category, image, rating } = req.body;
//     const product = await Product.findByPk(req.params.id);

//     if (product) {
//       await product.update({ title, price, description, category, image });

//       if (rating) {
//         let productRating = await Rating.findOne({ where: { productId: product.id } });
//         if (productRating) {
//           await productRating.update({ rate: rating.rate, count: rating.count });
//         } else {
//           await Rating.create({ rate: rating.rate, count: rating.count, productId: product.id });
//         }
//       }

//       res.status(200).json(product);
//     } else {
//       res.status(404).json({ error: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Delete a product by ID
// app.delete('/products/:id', async (req, res) => {
//   try {
//     const product = await Product.findByPk(req.params.id);

//     if (product) {
//       await product.destroy();
//       res.status(204).json();
//     } else {
//       res.status(404).json({ error: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
