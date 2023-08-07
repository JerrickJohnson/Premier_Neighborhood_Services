import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';
import AuthService from './auth.js';  // Import AuthService

const StoreContext = createContext();

const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
    dues: 0,
    messages: [],  // Add messages state
    currentReceiver: null, // Add currentReceiver state
    user: AuthService.loggedIn() ? AuthService.getProfile() : null  // Modify initial user state based on AuthService
  });

  console.log('GlobalState:', state);

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext, StoreContext };