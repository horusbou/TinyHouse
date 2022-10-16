import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Layout } from 'antd';
import { Listings, Home, Host, Listing, NotFound, User, Login } from "./sections"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import './styles/index.css'


const client = new ApolloClient({
    uri: '/api',
    cache: new InMemoryCache()
})

const App = () => {
    return (
        <Router>
            <Layout id="app">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/host" element={<Host />} />
                    <Route path="/listing/:id" element={<Listing />} />
                    <Route path="/listings/:location" element={<Listings title={""} />} />
                    <Route path="/user/:id" element={<User />} />
                    <Route path="/login" element={<Login />} />
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
