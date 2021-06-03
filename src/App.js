
import '@tensorflow/tfjs-backend-webgl';
import {useState, useEffect} from "react";
import 'antd/dist/antd.css';
import {Button, Card, Col, Divider, Layout, Row, Typography} from 'antd';

import NavBar from "./components/Header";
import FirebaseAuth from "./components/FirebaseAuth";

import firebase from 'firebase';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    withRouter,
} from "react-router-dom";
import MainPage from "./components/MainPage";
import TextList from "./components/TextList";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App({navigation}) {
    const [user, setUser] = useState(null)

    return (
       <Router>
           <NavBar />
            <FirebaseAuth setUser={setUser} />
           <Switch>
               <Route exact path="/">
                   <MainPage user={user} />
               </Route>
               <Route path="/signin">
                   <SignIn />
               </Route>
               <Route path="/signup">
                   <SignUp />
               </Route>
               <Route path="/list">
                   <TextList user={user} />
               </Route>
           </Switch>

       </Router>
    );
}

export default App;
