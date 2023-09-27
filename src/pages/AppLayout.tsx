import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import {
    HomeOutlined,
    UnorderedListOutlined,
    PlusCircleOutlined,
    AppstoreOutlined,
    BookOutlined,
    ApartmentOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Typography } from 'antd';
import '../index.css';

const usePathname = () => {
    const location = useLocation();
    return location.pathname;
    
  }

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to="/">Genel</Link>, '/', <HomeOutlined />),
    getItem('Odalar', 'sub1', <AppstoreOutlined />, [
        getItem(<Link to="/newroom">Yeni</Link>, '/newroom', <PlusCircleOutlined />),
        getItem(<Link to="/listroom">Listele</Link>, '/listroom', <UnorderedListOutlined />),
    ]),
    getItem('Oda Tipleri', 'sub2', <ApartmentOutlined />, [
        getItem(<Link to="/newroomtype">Yeni</Link>, '/newroomtype', <PlusCircleOutlined />),
        getItem(<Link to="/listroomtype">Listele</Link>, '/listroomtype', <UnorderedListOutlined />),
    ]),
    getItem('Rezervasyonlar', 'sub3', <BookOutlined />, [
        getItem(<Link to="/newbooking">Yeni</Link>, '/newbooking', <PlusCircleOutlined />),
        getItem(<Link to="/listbooking">Listele</Link>, '/listbooking', <UnorderedListOutlined />),
    ])
];

const { Title } = Typography;


const AppLayout: React.FC = () => {
    
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (

        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu selectedKeys={[usePathname()]} theme="dark" mode="inline" items={items} style={{ fontWeight: '500' }} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    <Title level={4}>Oda & Rezervasyon Yönetimi</Title>
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>

                        <Outlet />

                    </div>
                </Content>
                <Footer style={{ textAlign: 'right' }}>Java Spring Boot Restful Api - ReactJS - PostgreSQL | Oda & Rezervasyon Yönetimi ©2023 | Oğuzhan Parlak </Footer>
            </Layout>
        </Layout>
    );
};

export default AppLayout;