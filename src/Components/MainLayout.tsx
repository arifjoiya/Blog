import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';


const { Header, Sider, Content } = Layout;
interface UserType {
  id: number,
  name: string,
}
let rand: number;

const MainLayout: React.FC = () => {
  const [todos, setTodos] = useState<UserType>();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const fetchUser = async () => {
      rand = Math.round(Math.random() * 10);
      const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch(`${base_url}/users/${rand}`);
      const result = await res.json();
      setTodos(result);
      console.log(result.name)
    }
    fetchUser()
  }, [])

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: `${todos?.name}`,
            },
            {
              key: '2',
              icon: <Link to={`/`}><VideoCameraOutlined /></Link>,
              label: 'Dashboard',
            },
            {
              key: '3',
              icon: (
                <Link to={`/dashboard`}><UploadOutlined /></Link>
              ),
              label: 'Blog',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100vh',
            background: colorBgContainer,
          }}
        >
          <Outlet />

        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;