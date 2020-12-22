import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Landingpage from './components/LandingPage/LandingPage';
import Form from './components/Form/Form';
import SongSuggester from './components/SongSuggestor/SongSuggestor';
import React from 'react';

const Routes = () => {
    
    return (
        <main className="main">
            <Router>
                <Switch>
                    <Route exact path="/" component={Landingpage}/>
                    <Route path="/tell-moody" component={Form} />
                    <Route path="/moody-says" component={SongSuggester} />
                </Switch>
            </Router>
        </main>
        
    );
};

export default Routes;