import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import firebase from 'firebase/app'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const { Header, Content, Footer } = Layout;

const NavBar = () => {
    const logOut = () => {
        firebase.auth().signOut().then(() => {
            console.log('====> success signOut',)
            localStorage.removeItem('token');
        }).catch(e => console.log('====> error signOut',  e))
    }

    let token = localStorage.getItem('token');
    console.log('====> token', token)
    return (
        <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">
                    {token ?
                    <div onClick={logOut}>Log out</div> :

                        <Link to={'/signin'} >Sign in</Link>
                    }

                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={'/signup'} >Sign up</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    {token && <Link to={'/'} >Main</Link>}
                </Menu.Item>
                <Menu.Item key="4">
                    {token && <Link to={'/list'}>List</Link>}
                </Menu.Item>
            </Menu>
        </Header>
    )
}

export default NavBar
