const db = require('./connection');
const { User, Product, Category, Service, Events } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Household Supplies' },
    { name: 'Home and Garden' },
    { name: 'Electronics' },
    { name: 'Automotive' },
    { name: 'Books' },
    { name: 'Clothing and Accessories' },
    { name: 'Sports and Outdoors' },
    { name: 'Toys and Games' },
    { name: 'Food' },
    { name: 'More' },
   
  ]);

  console.log('categories seeded');

  await User.deleteMany();

  const users = await User.insertMany([
    {
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    address: '1 Main St',
    _id: '60f1b4a6f3e0d7a5f8f7f1b1'

  },
  {
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
    address: '2 Main St',
  
  },
  {
    firstName: 'Cesar',
    lastName: 'Garcia',
    email: 'cesar@mail.com',
    password: 'password12345',
    address: '3 Main St',
    },
  ]);

  console.log('users seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Bicycle',
      description:
        'Great bike. Great condition!',
      image: 'bike.jpeg',
      category: categories[6]._id,
      price: 50.00,
      quantity: 1,
      seller: users[0]._id,
    },
    {
      name: 'Apple Watch',
      description:
        'My old apple watch since I got the new one. It has barely been used and has good batter life.',
      image: 'apple-watch.jpeg',
      category: categories[2]._id,
      price: 150.00,
      quantity: 1,
      seller: users[1]._id,
    },
    {
      name: 'Deck Table and Chairs',
      category: categories[6]._id,
      description:
        'A solid set for entertaining outside. Must be able to pick it up to purchase',
      image: 'deck-table-and-chairs.jpeg',
      price: 850.00,
      quantity: 6,
      seller: users[2]._id,
    },
    {
      name: 'Lawn Gnome',
      category: categories[1]._id,
      description:
        'This gnome rules!!!!',
      image: 'lawn-gnome.jpeg',
      price: 1000.00,
      quantity: 1,
      seller: users[1]._id,
    },
    {
      name: 'Lawnmower',
      category: categories[6]._id,
      description:
        'For cutting grass.',
      image: 'lawnmower.jpeg',
      price: 250.00,
      quantity: 1,
      seller: users[0]._id,
    },
    {
      name: 'Camera',
      category: categories[2]._id,
      description:
        'Mint condition camera',
      image: 'camera.jpg',
      price: 399.99,
      quantity: 1,
      seller: users[2]._id,
    },
    {
      name: 'Leather Couches',
      category: categories[0]._id,
      description:
        'Being in the dog house just got more comfortable. A steal at this price!',
      image: 'leather-couches.jpeg',
      price: 720.00,
      quantity: 3,
      seller: users[0]._id,
    },
    {
      name: 'Child Play Yard',
      category: categories[7]._id,
      description:
        'Keep your kids safe and happy',
      image: 'play-yard.jpeg',
      price: 25.00,
      quantity: 1,
      seller: users[1]._id,
    },
    {
      name: 'TV',
      category: categories[2]._id,
      description: 'Solid flat-screen',
      image: 'tv.jpeg',
      price: 450.00,
      quantity: 1000,
      seller: users[2]._id,
    },
    ]);

  console.log('products seeded');

  // await Service.deleteMany();

  // await Service.create([
  //   {
  //     name: 'Electric Service',
  //       category: 'Electrical',
  //       description:
  //         'Our electrician recommended choice',
  //       image: 'electric-service.jpg',
  //       rating: 4.8,
  //   },
  // {
  //     name: 'Plumbing Service',
  //       category: 'Plumbing',
  //       description: "Our plumber recommeded choice",
  //       image: 'plumbing-service.jpg',
  //       rating: 4.3,
  // }
  // ]);

  // console.log('services seeded');

  // await User.deleteMany();

  // const users = await User.insertMany([
  //   {
  //   firstName: 'Pamela',
  //   lastName: 'Washington',
  //   email: 'pamela@testmail.com',
  //   password: 'password12345',
  //   address: '1 Main St',
  //   orders: [
  //     {
  //       products: [products[0]._id, products[0]._id, products[1]._id]
  //     }
  //   ]
  // },
  // {
  //   firstName: 'Elijah',
  //   lastName: 'Holt',
  //   email: 'eholt@testmail.com',
  //   password: 'password12345',
  //   address: '2 Main St',
  // },
  // {
  //   firstName: 'Cesar',
  //   lastName: 'Garcia',
  //   email: 'cesar@mail.com',
  //   password: 'password12345',
  //   address: '3 Main St',
  //   },
  // ]);

  // console.log('users seeded');

  await Events.deleteMany();

  await Events.insertMany([
    {
      name: 'Community Picnic',
      description: 'Join us for a fun and relaxing community picnic at the central park',
      date: '2023-08-15 12:00:00',
      location: 'Central Park',
      attendees: 5,
    },
    {
      name: 'Neighborhood Cleanup',
      description: 'We are organizing a neighborhood cleanup. Come lend a hand and make our community even more beautiful!',
      date: '2023-08-22 09:00:00',
      location: 'Front Gate',
      attendees: 10,
    },
    {
      name: 'Local Concert',
      description: 'A local band will be performing live at the community center',
      date: '2023-09-01 19:00:00',
      location: 'Community Center',
      attendees: 50,
    }
  ]);

  console.log('events seeded');


  process.exit();
});
