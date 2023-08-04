const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order, Service, Events, Review, Payment } = require('../models');
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

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, { id }, context) => {
      if (id) {
        return await User.findById(id);
      }
    
      if (context.user) {
        return await User.findById(context.user._id);
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
      const line_items = [];

      let totalAmount = 0;

      for (const product of args.products) {
        totalAmount += product.price * product.purchaseQuantity;

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
    payments: async () => {
      return await Payment.find().populate('user');
    },
    userPayments: async (parent, { userId }, context) => {
      return await Payment.find({ user: userId }).populate('user');
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
    addProduct: async (parent, { name, description, image, price, quantity, category, seller }, context) => {
      if (context.user) {
        const product = new Product({
          name,
          description,
          image,
          price,
          quantity,
          category,
          createdBy: seller || context.user._id
        });
    
        await product.save();
    
        return product;
      }
    
      throw new AuthenticationError('Not logged in');
    },
    
    addOrder: async (parent, { products }, context) => {
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

        await User.findByIdAndUpdate(context.user._id, { $push: { events: event._id } });

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
    }
  }
};

module.exports = resolvers;