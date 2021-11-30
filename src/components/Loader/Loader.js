import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './Loader.css';

const Loader = () => (
  <div className="loader">
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} tip="Loading..."/>
  </div>
);

export default Loader;