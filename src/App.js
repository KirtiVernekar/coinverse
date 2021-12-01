import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Routes, Route, Link } from 'react-router-dom';
import { Typography } from 'antd';

import { Homepage, Navbar, CryptoCurrencies, Exchanges, CryptoDetails, CryptoNews } from './components';
import './App.css';

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location]);

  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <div className="layout">
          <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route exact path="/exchanges" element={<Exchanges/>} />
            <Route exact path="/cryptocurrencies" element={<CryptoCurrencies/>} />
            <Route exact path="/crypto/:coinId" element={<CryptoDetails/>} />
            <Route exact path="/cryptonews" element={<CryptoNews/>} />
            {/* <Route element={<PageNotFound/>}></Route> */}
          </Routes>
        </div> 
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
