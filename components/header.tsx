"use client"
import React from 'react';
import { Layout, Typography } from 'antd';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

function Header() {
  return (
    <AntHeader style={{ background: '#f0f2f5', padding: '0 50px' }}>
      <Title level={2} style={{ margin: 0, lineHeight: '64px' }}>
        <a href="/" style={{ color: 'inherit' }}>
          Recipe Generator
        </a>
      </Title>
    </AntHeader>
  );
}

export default Header;
