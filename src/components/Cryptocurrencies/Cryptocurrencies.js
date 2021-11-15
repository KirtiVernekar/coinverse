import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../../services/cryptoCoinApi';
import { Loader } from '..';
import './CryptoCurrencies.css'

const Cryptocurrencies = ({ simplified }) => {
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
        <div className="search-crypto">
          <Input placeholder="Search a Crypto-Coin" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} style={{borderRadius: '10px'}}/>
        </div>
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

export default Cryptocurrencies;
