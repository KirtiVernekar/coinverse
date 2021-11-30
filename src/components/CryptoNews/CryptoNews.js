import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptosQuery } from '../../services/cryptoCoinApi';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import { Loader } from '..';
import './CryptoNews.css'

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Title } = Typography;
const { Option } = Select;
const { Meta } = Card;

const CryptoNews = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

  if (!cryptoNews?.value) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24} className="news-page-header">
          <Title level={2} className="news-page-heading">Latest Crypto News</Title>
          <Select
            showSearch
            className="news-page-select"
            placeholder="Search Options"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
      )}
      
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card" >
            <a href={news.url} target="_blank" rel="noreferrer">
              <Row>
                <Col span={16}><Title className="news-title" level={5}>{news.name}</Title></Col>
                <Col span={8}><img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" className="news-image" /></Col>
                {/* <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p> */}
              </Row>
              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <hr style={{padding:'5px 0', border: 'none', borderTop: '1px solid gray'}} />
              <Meta
                avatar={<Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />}
                title={news.provider[0]?.name}
                description={moment(news.datePublished).startOf('ss').fromNow()}
              />
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CryptoNews;