import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import './Navbar.css';
import icon from '../../images/cryptocurrency.png';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" style={{width: '34px', height: '34px'}} />
        <Link to="/"><Typography.Title level={2} className="logo">Coinverse</Typography.Title></Link>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
      </div>
      {activeMenu && (
      <Menu theme="dark" className="menu-list">
        <Menu.Item icon={<HomeOutlined />} key={'home'} style={{marginLeft: '10px'}}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />} key={'cryptocurrencies'} style={{marginLeft: '10px'}}>
          <Link to="/cryptocurrencies">Crypto Currencies</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />} key={'exchanges'} style={{marginLeft: '10px'}}>
          <Link to="/exchanges">Exchanges</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />} key={'cryptonews'} style={{marginLeft: '10px'}}>
          <Link to="/cryptonews">News</Link>
        </Menu.Item>
      </Menu>
      )}
    </div>
  );
};

export default Navbar;