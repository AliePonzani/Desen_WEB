import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Pages/Home/index.js';
import Cardapio from './Pages/Cardapio/index.js';
import Painel from './Pages/Painel/index.js';
import NotFound from './Pages/NotFound/index.js';

const user = "teste 1";
const senha = "12345";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path={`/painel/${user}/${senha}`} element={<Painel/>}/>
        <Route path='/cardapio/:cardapio' element={<Cardapio />} />
        <Route path='*' element={<NotFound />} />
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
