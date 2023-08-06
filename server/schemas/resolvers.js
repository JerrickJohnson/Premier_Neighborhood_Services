const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order, Service, Events, Review, Payment, Message } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category').populate('seller');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders',
          populate: {
            path: 'products', // Populate the products inside orders
            model: 'Product', // The model of the products
            populate: 'category' // Populate the category inside products
          }
        })
        .populate('products') // Populate the products
        .populate('messages'); // Populate the Messages
        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      await new Order({ products: args.products });
      const line_items = [];

      for (const product of args.products) {
        line_items.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              images: [`${url}/images/${product.image}`]
            },
            unit_amount: product.price * 100,
          },
          quantity: product.purchaseQuantity,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
      const order = new Order({ products: args.products, session: session.id });
      await order.save();

      if (context.user) {
        await Payment.create({
          user: context.user._id,
          amount: totalAmount,
          paymentMethod: 'stripe',
          paymentDate: new Date(),
          paymentPurpose: 'Order Checkout',
          status: 'pending'
        });
      }
      return { session: session.id };
    },
    events: async () => {
      return await Events.find();
    },
    services: async () => {
      return await Service.find().populate('review');
    },
    messages: async (_, { sender, receiver, product }) => {
      console.log(`Sender: ${sender}, Receiver: ${receiver}, Product: ${product}`);
      try {
          return await Message.find({
              sender: sender,
              receiver: receiver,
              product: product
          }).sort({ createdAt: -1 });
      } catch (error) {
          console.error(error);
          throw new Error('Error fetching messages.');
      }
  },
    messageHistory: async (_, { user }) => {
      const users = await Message.find({
        $or: [{ sender: user }, { receiver: user }],
      })
        .populate('sender')
        .populate('receiver')
        .sort({ createdAt: -1 });

      return users.map(message =>
        message.sender._id.toString() === user ? message.receiver : message.sender
      );
    },
    productMessages: async (_, { product }) => {
        return await Message.find({
          product: product
        }).populate('sender').populate('receiver').sort({ createdAt: -1 });
      },
  },
  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password, address, dob, phoneNumber, emergencyContact, emergencyContactPhoneNumber }) => {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        address,
        dob,
        phoneNumber,
        emergencyContact,
        emergencyContactPhoneNumber
      });
      
      const token = signToken(user);
    
      return { token, user };
    },
    addProduct: async (parent, { name, description, image, price, quantity, category }, context) => {
      console.log(context);
      if (context.user) {
        const product = await Product.create({
           name,
           description,
           image,
           price,
           quantity,
           category,
           seller: context.user._id
        });

        await User.findByIdAndUpdate(context.user._id, { $push: { products: product._id } });
        return product;
      }

      throw new AuthenticationError('Not logged in');
    },
    
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    addEvent: async (parent, args, context) => {
      if (context.user) {
   
        const event = await Events.create(args);

        return event;
      }

      throw new AuthenticationError('Not logged in');
    },
    addReview: async (parent, { serviceId, reviewText, rating }, context) => {
      if (context.user) {
        const review = await Review.create({ reviewText, rating, username: context.user._id, serviceId });

        const updatedService = await Service.findOneAndUpdate(
          { _id: serviceId },
          { $push: { reviews: review._id } },
          { new: true, runValidators: true }
        );

        return updatedService;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    sendMessage: async (_, { sender, receiver, messageText, product }, context) => {
        if (context.user && context.user._id === sender) {
          const message = await Message.create({ sender, receiver, messageText, product });
          await User.findByIdAndUpdate(sender, { $push: { messages: message._id } });
          await User.findByIdAndUpdate(receiver, { $push: { messages: message._id } });
          return message;
        }
      
        throw new AuthenticationError('Not logged in');
      },
  }
};

module.exports = resolvers;