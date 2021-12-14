import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import './Navbar.css';
import icon from '../../images/cryptocurrency.png';


const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }

    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [screenSize]);

  const toggle = () => {
    if (screenSize <= 800) {
      setActiveMenu(!activeMenu);
    }
  };

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" style={{width: '34px', height: '34px'}} />
        <Link to="/"><Typography.Title level={2} className="logo">Coinverse</Typography.Title></Link>
        <Button className="menu-control-container" onClick={toggle}><MenuOutlined /></Button>
      </div>
      {activeMenu && (
        <Menu mode="inline" theme="dark" className="menu-list" onClick={toggle}>
          <Menu.Item icon={<HomeOutlined />} key={'home'} 
                     className={(location.pathname === '/') ? "ant-menu-item-selected" : "inactive"}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />} key={'cryptocurrencies'} 
                     className={(location.pathname === '/cryptocurrencies') ? "ant-menu-item-selected" : ""}>
            <Link to="/cryptocurrencies">Crypto Currencies</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />} key={'exchanges'} 
                     className={(location.pathname === '/exchanges') ? "ant-menu-item-selected" : ""}>
            <Link to="/exchanges">Crypto Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />} key={'cryptonews'} 
                     className={(location.pathname === '/cryptonews') ? "ant-menu-item-selected" : ""}>
            <Link to="/cryptonews">Recent News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;