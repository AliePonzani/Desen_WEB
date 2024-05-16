import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {BrowserRouter,Routes,Route} from "react-router-dom";

import Home from './Pages/Home/index.js';
import Cardapio from './Pages/Cardapio/index.js';
import Painel from './Pages/Painel/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/painel' element={<Painel/>}/>
        <Route path='/cardapio/:cardapio' element={<Cardapio/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
