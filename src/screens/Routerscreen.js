import {Router,Scene,Stack}  from 'react-native-router-flux'
import React,{Component} from 'react';
import Register from './Register';
import Login from './Login';
import Home from './HomeScreen';
import Splash from './SplashScreen';
import SecondarySplash from './SecondarySplashScreen';

const RouterScreen = () => (
    <Router>
        <Stack key="root">
            <Scene key="SecondarySplash" intial={true} component={SecondarySplash} hideNavBar={true}/>
            <Scene key="Splash" component={Splash}   hideNavBar={true}/>
            <Scene key="Login" component={Login} hideNavBar={true}/>
            <Scene key="Register" component=  {Register} hideNavBar={true}/>
            <Scene key="Home" component={Home} hideNavBar={true} />
        </Stack>
    </Router>
);

export default RouterScreen;
