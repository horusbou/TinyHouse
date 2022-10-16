import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Layout, Affix } from 'antd';
import { Viewer } from './lib/types';
import { Listings, Home, Host, Listing, NotFound, User, Login, AppHeader } from "./sections"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import './styles/index.css'


const client = new ApolloClient({
    uri: '/api',
    cache: new InMemoryCache()
})

const initialViwer: Viewer = {
    id: null,
    token: null,
    avatar: null,
    hasWallet: null,
    didRequest: false
}

const App = () => {
    const [viewer, setViewer] = useState<Viewer>(initialViwer);
    return (
        <Router>
            <Layout id="app">
                <Affix offsetTop={0} className="app__affix-header" >
                    <AppHeader viewer={viewer} setViewer={setViewer} />
                </Affix>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/host" element={<Host />} />
                    <Route path="/listing/:id" element={<Listing />} />
                    <Route path="/listings/:location" element={<Listings title={""} />} />
                    <Route path="/user/:id" element={<User />} />
                    <Route path="/login" element={<Login setViewer={setViewer} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </Router>
    )
}




const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
