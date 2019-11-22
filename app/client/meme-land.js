const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');

const MemeLandPage = require('../pages/meme-land/view');
const styles = require('../pages/meme-land/style.scss');

const initialState = JSON.parse(window.__STATE__);

delete window.__STATE__;

ReactDOM.hydrate(
    <BrowserRouter>
        <MemeLandPage initialState={initialState} />
    </BrowserRouter>,
    document.getElementById('app'));