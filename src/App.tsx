/* eslint-disable require-jsdoc */
import React from 'react';
// import {ReactComponent as Logo} from './logo.svg';
import './styles/App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {NavBar} from './components/NavBar';
import {HomePage} from './pages/HomePage';
import {AboutPage} from './pages/AboutPage';
import {ContactPage} from './pages/ContactPage';
import {Salaries} from './pages/SalariesPage';
import {CompaniesPage} from './pages/CompaniesPage';
import {SearchBar} from './components/SearchBar';

function App() {
  return (
    <>
      <BrowserRouter>
        <SearchBar/>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path='/salaries' element={<Salaries />}></Route>
          <Route path="/companies" element={<CompaniesPage/>}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
