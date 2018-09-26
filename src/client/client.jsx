import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux';
import createStore from '../app/state/store/global.store';

import Router from '../app/routes/app-router';

const store = createStore(window.REDUX_DATA);

Loadable.preloadReady().then(() => {
    hydrate(
        <ReduxProvider store={store}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </ReduxProvider>,
        document.getElementById('app')
    );
});
