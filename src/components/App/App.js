import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation
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
        return (<Redirect to="/?auth=false"/>)
}

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL} forceRefresh={true}>
        <Row className="m-0 main-background">
            {/* Main sidebar of application */}
            <Sidebar />
            
            <Col md="10" className="px-0">
                {/* Main header of main content */}
                <Header />

                <Switch>
                    <Route exact path="/" component={Home} />
                    
                    <Route exact path="/assets" render={(props) => requireAuth(<AllAssets props={props} />) } />
                    <Route path="/assets/register" render={(props) => requireAuth(<RegisterAsset props={props} />) } />
                    <Route exact path="/asset/:assetId?" render={(props) => requireAuth(<SingleAsset props={props} />) } />
                    <Route exact path="/asset/:assetId?/allocate" render={(props) => requireAuth(<AllocateAsset props={props} />) } />

                    <Route exact path="/dashboard" render={(props) => requireAuth(<Dashboard props={props} />) }/> 

                    <Route path="/search" component={Search} />

                    <Route exact path="/reports/calendar" render={(props) => requireAuth(<CollectCalendar props={props}/>) } />
                    <Route path="/reports" render={(props) => requireAuth(<Reports props={props} />) } />

                    <Route exact path="/users/edit/:userId?" render={(props) => requireAuth(<EditUser props={props} />) } />
                    <Route exact path="/users/register"  render={(props) => requireAuth(<RegisterUser props={props} />) } />
                    <Route path="/users"  render={(props) => requireAuth(<User props={props}/>) }  />
                    <Route path="/profile"  render={(props) => requireAuth(<Profile props={props}/>) } />

                    <Route component={NotFound} />
                </Switch>
            </Col>
        </Row>
    </Router>
  );
}

export default App;
