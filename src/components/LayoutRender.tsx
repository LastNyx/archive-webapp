import React from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import { useState } from 'react';
import NavSide from './NavSide';
import RoutesRender from '../routes/RoutesRender';
const { Header, Content, Footer} = Layout;

const LayoutRender: React.FC = () => {

  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout>
      <NavSide collapsed={collapsed}/>
      <Layout className="site-layout" style={{marginLeft: collapsed ? '5rem' : '12rem', transition:'all 0.2s'}}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => { setCollapsed(!collapsed) },
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            overflow: 'initial',
            height: '100vh',
          }}
        >
          <RoutesRender></RoutesRender>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
};

export default LayoutRender;