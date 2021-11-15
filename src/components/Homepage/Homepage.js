import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Card } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../../services/cryptoCoinApi';
import { Loader, CryptoCurrencies, CryptoNews } from '..';
import './Homepage.css'

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <Card className="card">
        <Title level={2} className="heading">Global Crypto Stats</Title>
        <Row gutter={[32, 32]}>
          <Col span={12}><Statistic className="card-text" title="Total Cryptocurrencies" value={globalStats.total} /></Col>
          <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
          <Col span={12}><Statistic title="Total Market Cap:" value={`$${millify(globalStats.totalMarketCap)}`} /></Col>
          <Col span={12}><Statistic title="Total 24h Volume" value={`$${millify(globalStats.total24hVolume)}`} /></Col>
          <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
          <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
        </Row>
      </Card>
      <Card className="card">
        <div className="home-heading-container">
          <Title level={2} className="home-title">Top 10 Cryptos In The World</Title>
          <Link to="/cryptocurrencies"><Title level={3} className="show-more">Show more</Title></Link>
        </div>
        <CryptoCurrencies simplified />
      </Card>
      <Card className="card">
        <div className="home-heading-container">
          <Title level={2} className="home-title">Latest Crypto News</Title>
          <Link to="/cryptonews"><Title level={3} className="show-more">Show more</Title></Link>
        </div>
        <CryptoNews simplified />
      </Card>
    </> 
  );
};

export default Homepage;