import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import Services from './pages/Services';
import Events from './pages/Events';
import Marketplace from './pages/Marketplace';
import AddItem from './pages/AddItem';
import NewEvent from './pages/NewEvent';
import PaymentPage from './pages/PaymentPage';
import ServiceRequests from './pages/ServiceRequests';
import Message from './pages/Message';
import EditEventPage from './pages/EditEvent';



const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  console.log(token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route 
                path="/success" 
                element={<Success />} 
              />
              <Route 
                path="/orderHistory" 
                element={<OrderHistory />} 
              />
              <Route 
                path="/marketplace"
                element={<Marketplace />} 
              />
              <Route 
                path="/addItem"
                element={<AddItem />} 
              />
              <Route 
                path="/products/:id" 
                element={<Detail />} 
              />
              <Route 
                path="*" 
                element={<NoMatch />} 
              />
              <Route
                path="/services"
                element={<Services />}
              />
              <Route
                path="/servicerequests"
                element={<ServiceRequests />}
              />
              <Route
                path="/events"
                element={<Events />}
              />
              <Route
                path="/newevent"
                element={<NewEvent />}
              />
             <Route
                path="/payments"
                element={<PaymentPage />}   
              />
                           <Route
                path="/message"
                element={<Message />}   
              />
              <Route
                path="/editevent/:id"
                element={<EditEventPage />}
              />            
            </Routes>
            
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
