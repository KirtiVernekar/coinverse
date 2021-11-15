import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Input } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../../services/cryptoCoinApi';
import {Loader} from '..';
import './Exchanges.css'

const { Text, Title } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;
  const [cryptoExchanges, setCryptoExchanges] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptoExchanges(exchangesList);

    const filteredData = exchangesList?.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptoExchanges(filteredData);
  }, [exchangesList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      <Col span={24} className="exchange-page-header">
        <Title level={2} className="exchange-page-heading">Popular Crypto Exchanges</Title>
        <div className="exchange-page-search">
          <Input placeholder="Search an Exchange" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
        </div>
      </Col>
      <Row className="exchange-col-header">
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {cryptoExchanges?.map((exchange) => (
          <Col span={24}>
            <Collapse className="exchange-card">
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id} >
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}><Text>${millify(exchange.volume)}</Text></Col>
                    <Col span={6}><Text>{millify(exchange.numberOfMarkets)}</Text></Col>
                    <Col span={6}><Text>{millify(exchange.marketShare)}%</Text></Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;