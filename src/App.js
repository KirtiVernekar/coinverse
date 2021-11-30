import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography } from 'antd';

import { Homepage, Navbar, CryptoCurrencies, Exchanges, CryptoDetails, CryptoNews } from './components';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout className="layout">
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage/>} />
              <Route exact path="/exchanges" element={<Exchanges/>} />
              <Route exact path="/cryptocurrencies" element={<CryptoCurrencies/>} />
              <Route exact path="/crypto/:coinId" element={<CryptoDetails/>} />
              <Route exact path="/cryptonews" element={<CryptoNews/>} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright ©2021
              <Link to="/">
                  Coinverse Inc.
              </Link>
          </Typography.Title>
        </div>
      </div>
    </div>
  );
}

export default App;
