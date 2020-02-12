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
import Register from "../Register";

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
                    {/* Home must be last in switch order to display correctly */}
                    <Route path="/register" component={Register} />
                    <Route path="/contact" component={ContactForm} />
                    <Route path="/" component={Home} /> 
                </Switch>
            </Col>
        </Row>
    </Router>
  );
}

export default App;
