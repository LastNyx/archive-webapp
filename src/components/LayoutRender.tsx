import React from 'react';
import { Layout, Card } from 'antd';
import { useState } from 'react';
import NavHeader from './NavHeader';
import NavBar from './NavBar';
import RoutesRender from '../routes/RoutesRender';
const { Header, Content, Footer} = Layout;

const LayoutRender: React.FC = () => {

  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout>
      <NavBar />
      <Content
        className="site-layout-container container"
        style={{
          padding: '0 50px',
          overflow: 'initial',
        }}
      >
        <Card className="mt-3">
          <p>You Can Scroll the Table Horizontally if You're on the Phone</p>
        </Card>
        <RoutesRender></RoutesRender>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Pipi Usagi ©2022 Created by <a href="http://asiangirlsaddict.xyz/" target="_blank" rel="noreferrer">Cosukin</a></Footer>
    </Layout>
  )
};

export default LayoutRender;