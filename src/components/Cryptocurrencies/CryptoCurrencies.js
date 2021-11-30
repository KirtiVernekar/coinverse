import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Typography } from 'antd';

import { useGetCryptosQuery } from '../../services/cryptoCoinApi';
import { Loader } from '..';
import './CryptoCurrencies.css'

const { Title, Text } = Typography;

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoCoinsList, isFetching } = useGetCryptosQuery(count);
  const [cryptoCoins, setCryptoCoins] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptoCoins(cryptoCoinsList?.data?.coins);

    const filteredData = cryptoCoinsList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptoCoins(filteredData);
  }, [cryptoCoinsList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <Col span={24} className="crypto-page-header">
          <Title level={2} className="crypto-page-heading">Popular Crypto Currencies</Title>
          <div className="crypto-page-search">
            <Input placeholder="Search a Crypto-Coin" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
          </div>
        </Col>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptoCoins?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link key={currency.id} to={`/crypto/${currency.id}`}>
              <Card className="coin-card" title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl} alt="Coin Logo"/>} hoverable>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CryptoCurrencies;
