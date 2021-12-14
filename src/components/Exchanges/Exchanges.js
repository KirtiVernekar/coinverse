import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Input } from 'antd';
// import { DownOutlined, UpOutlined } from '@ant-design/icons';
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
    <div className="exchange-page">
      <Col span={24} className="exchange-page-header">
        <Title level={2} className="exchange-page-heading">Popular Crypto Exchanges</Title>
        <div className="exchange-page-search">
          <Input allowClear 
                placeholder="Search an Exchange"
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      </Col>
      <Row className="exchange-col-header">
        <Col span={2}>No.</Col>
        <Col span={7}>Exchanges</Col>
        <Col span={5}>Trade Volume (24h)</Col>
        <Col span={5}>Markets</Col>
        <Col span={5}>Market Share</Col>
      </Row>
      <Row>
        {cryptoExchanges?.map((exchange, index) => (
          <Col span={24}>
            <Collapse className="exchange-card">
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id} className="exchange-card-info">
                    <Col span={2}>
                      <Text><strong>{index+1}.</strong></Text>
                    </Col>
                    <Col span={7}>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={5}><Text>${millify(exchange.volume)}</Text></Col>
                    <Col span={5}><Text>{millify(exchange.numberOfMarkets)}</Text></Col>
                    <Col span={5}><Text>{millify(exchange.marketShare)}%</Text></Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Exchanges;