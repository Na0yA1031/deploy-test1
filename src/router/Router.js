import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'

import Header from '../components/Header';
import Login from '../components/Login';
import Main from '../components/Main';
import Restaurant from '../components/Restaurant';
import FavoriteShopLog from '../components/UserInfo/FavoriteShopLog';
import { searchRoutes } from './searchRoutes';
import { signupRoutes } from './signupRoutes';
import { userInfoRoutes } from './userInfoRoutes';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' >
                    <Header>
                        <Main />
                    </Header>
                </Route>

                <Route path='/restaurant/:id'>
                    <Header>
                        <Restaurant />
                    </Header>
                </Route>

                <Route exact path='/login'>
                    <Login />
                </Route>

                <Route path='/favoriteshop/:id'>
                    <FavoriteShopLog />
                </Route>

                <Route path='/signup' render={({ match: { url } }) => (
                    <Switch>
                        {signupRoutes.map((route) => (
                            <Route
                                key={route.path}
                                exact={route.exact}
                                path={`${url}${route.path}`}
                            >
                                {route.children}
                            </Route>
                        ))}
                    </Switch>
                )} />

                <Route path='/search' render={({ match: { url } }) => (
                    <Switch>
                        {searchRoutes.map((route) => (
                            <Route
                                key={route.path}
                                exact={route.exact}
                                path={`${url}${route.path}`}
                            >
                                <Header>{route.children}</Header>
                            </Route>
                        ))}
                    </Switch>
                )} />

                <Route path='/userinfo' render={({ match: { url } }) => (
                    <Switch>
                        {userInfoRoutes.map((route) => (
                            <Route
                                key={route.path}
                                exact={route.exact}
                                path={`${url}${route.path}`}
                            >
                                <Header>{route.children}</Header>
                            </Route>
                        ))}
                    </Switch>
                )} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;