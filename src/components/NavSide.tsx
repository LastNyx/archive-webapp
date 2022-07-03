import {
  HomeOutlined,
  DatabaseOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const { Sider } = Layout;

const navItems: MenuProps['items'] = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: (
      <NavLink to='/'>
          Home
      </NavLink>
    ),
  },
  // {
  //   key: '/products',
  //   icon: <DatabaseOutlined />,
  //   label: (
  //     <NavLink to='/products'>
  //         Produk
  //     </NavLink>
  //   ),
  // },
  // {
  //   key: '/sellings',
  //   icon: <FileTextOutlined />,
  //   label: (
  //     <NavLink to='/sellings'>
  //         Home
  //     </NavLink>
  //   ),
  // },
]

type Props = {
  collapsed: boolean,
}

const NavSide: React.FC<Props> = ({collapsed}) => {
  const location = useLocation()
  const [selectedKey, setSelectedKey] = useState([location.pathname])

  useEffect(() => {
    setSelectedKey([location.pathname])
  }, [location])

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
      }}
    >
      <div className="logo">ARCHIVE</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={selectedKey}
        items={navItems}
      />
    </Sider>
  )
}

export default NavSide;