import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { 
    Row,
    Col 
} from 'reactstrap';

import './App.css';

import Sidebar from "../Sidebar";
import Home from "../Home";
import Header from "../Header";
import ContactForm from "../ContactForm";
import RegisterUser from "../RegisterUser";
import Dashboard from "../Dashboard";
import NotFound from "../NotFound";
import Search from "../Search";

import SingleAsset from "../Assets/SingleAsset";
import AllAssets from "../Assets/AllAssets";
import RegisterAsset from "../Assets/RegisterAsset";
import AllocateAsset from "../Assets/AllocateAsset";

function App() {
  return (
    <Router>
        <Row className="m-0">
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

                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/register-user" component={RegisterUser} />
                    <Route exact path="/contact" component={ContactForm} />
                    <Route path="/search" component={Search} />

                    <Route component={NotFound} />
                </Switch>
            </Col>
        </Row>
    </Router>
  );
}

export default App;
