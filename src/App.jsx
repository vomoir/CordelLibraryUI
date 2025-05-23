import React from 'react';
import FetchComponent from './components/FetchComponent';
import Footer from './layout/Footer';
import Header from './layout/Header';

const App = () => {
  return (
    <div>
      <Header />
      <FetchComponent />
      <Footer />
    </div>
  );
};

export default App;
