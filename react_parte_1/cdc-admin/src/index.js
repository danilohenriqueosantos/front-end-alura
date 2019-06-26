import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router, Route } from 'react-router-dom';
import history from 'history';
import AutorBox from './Autor';


ReactDOM.render(
    <Router history={history}>
        <Route path="/" component={App} >
            <Route path="/autor" component={AutorBox} />
            <Route path="/livro" />
        </Route>
    </Router>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
