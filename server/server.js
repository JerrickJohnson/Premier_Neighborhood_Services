const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
//Model needed for REST API route for multer
const { Product } = require('./models/')

//MULTER CODE
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/images')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage: storage,
limits: {fileSize: '1000000'},
fileFilter: (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/
  const mimType = fileTypes.test(file.mimetype)
  const extname = fileTypes.test(path.extname(file.originalname))

  if(mimType && extname) {
    return cb(null, true)
  }
  cb('Give proper files format to upload')
}
 }).single('image');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,

});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//MULTER REST ROUTE - TEST OBJECT DATA STILL
app.post('/api/add-product', upload, async (req,res) => {
  const newProductData = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    quantity: req.body.quantity,
    category: req.body.category,
    // seller: req.body.seller,
    //get the filename specifically so the path works correctly
    image: req.file.filename
  }

  try {
    const newProduct = await Product.create(newProductData);
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
})


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();
