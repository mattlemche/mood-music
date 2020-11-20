import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Landingpage from './components/LandingPage/LandingPage';
import Form from './components/Form/Form';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import React from 'react';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Landingpage}/>
                <Route path="/videoplayer" component={VideoPlayer} />
                <Route path="/form" component={Form} />
            </Switch>
        </Router>
    );
};

export default Routes;