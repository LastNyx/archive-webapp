import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const { Header } = Layout;

const navItems: MenuProps['items'] = [
  {
    key: '/',
    label: (
      <NavLink to='/'>
          Home
      </NavLink>
    ),
  },
  {
    key: '/login',
    label: (
      <NavLink to='Login'>
          Login
      </NavLink>
    ),
  },
  {
    key: '/register',
    label: (
      <NavLink to='Register'>
          Register
      </NavLink>
    ),
  },
]

const NavHeader = () => {

  const location = useLocation()
  const [selectedKey, setSelectedKey] = useState([location.pathname])

  useEffect(() => {
    setSelectedKey([location.pathname])
  }, [location])

  return (
    <Header className="site-layout-background" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo">ARCHIVE</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={selectedKey}
          items={navItems}
        />
    </Header>
  )
}

export default NavHeader;