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

function App() {
  return (
    <Router>
        <Row className="m-0">
            {/* Main sidebar of application */}
            <Sidebar />
            
            <Col>
                <Switch>
                    {/* Home must be last in switch order to display correctly */}
                    <Route path="/" component={Home} />
                </Switch>
            </Col>
        </Row>
    </Router>
  );
}

export default App;
