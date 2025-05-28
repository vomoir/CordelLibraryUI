import React from 'react';
import BooksDisplay from './components/BooksDisplay';
import Footer from './layout/Footer';
import Header from './layout/Header';

const App = () => {
  return (
    <div>
      <Header />
      <BooksDisplay />
      <Footer />
    </div>
  );
};

export default App;
