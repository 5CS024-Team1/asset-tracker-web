import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { 
    Row,
    Col 
} from 'reactstrap';

import './App.css';

import Sidebar from "../Sidebar";
import Home from "../Home";
import Header from "../Header";
import Dashboard from "../Dashboard";
import NotFound from "../NotFound";
import Search from "../Search";
import CollectCalendar from "../Reports/CollectCalendar";
import Reports from "../Reports";

import Session from "../Session/Session.js";

// User/Profile components
import User from "../User";
import RegisterUser from "../RegisterUser";
import EditUser from "../EditUser";
import Profile from "../Profile";

// Asset components
import SingleAsset from "../Assets/SingleAsset";
import AllAssets from "../Assets/AllAssets";
import RegisterAsset from "../Assets/RegisterAsset";
import AllocateAsset from "../Assets/AllocateAsset";

function requireAuth(component) {
    if (Session.getUser())
        return component;
    else
        return (<Redirect to="/"/>)
}

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
        <Row className="m-0 main-background">
            {/* Main sidebar of application */}
            <Sidebar />
            
            <Col md="10" className="px-0">
                {/* Main header of main content */}
                <Header />

                <Switch>
                    <Route exact path="/" component={Home} />
                    
                    <Route exact path="/assets" component={AllAssets} />
                    <Route path="/assets/register" component={RegisterAsset} />
                    <Route exact path="/asset/:assetId?" component={SingleAsset} />
                    <Route exact path="/asset/:assetId?/allocate" component={AllocateAsset} />

                    <Route exact path="/dashboard" component={Dashboard} /> {/* render={() => requireAuth(<Dashboard />) } */}

                    <Route path="/search" component={Search} />

                    <Route exact path="/reports/calendar" component={CollectCalendar} />
                    <Route path="/reports" component={Reports} />

                    <Route exact path="/users/edit/:userId?" component={EditUser} />
                    <Route exact path="/users/register" component={RegisterUser} />
                    <Route path="/users" component={User} />
                    <Route path="/profile" component={Profile} />

                    <Route component={NotFound} />
                </Switch>
            </Col>
        </Row>
    </Router>
  );
}

export default App;
