import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Affix, Spin } from "antd";
import { Viewer } from "./lib/types";
import {
  Listings,
  Home,
  Host,
  Listing,
  NotFound,
  User,
  Login,
  AppHeader,
} from "./sections";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useMutation,
} from "@apollo/client";
import "./styles/index.css";
import { LOG_IN } from "./lib/graphql/mutations";
import {
  LogIn as LogInData,
  LogInVariables,
} from "./lib/graphql/mutations/Login/__generated__/LogIn";
import { AppHeaderSkeleton, ErrorBanner } from "./lib/components";

const token = sessionStorage.getItem("token");
console.log({ token });
const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
  headers: {
    "X-CSRF-TOKEN": token || "",
  },
});

const initialViwer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViwer);
  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);
      }

      if (data.logIn.token) sessionStorage.setItem("token", data.logIn.token);
      else sessionStorage.removeItem("token");
    },
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, []);

  if (!viewer.didRequest && !error) {
    return (
      <Layout className="app-skeleton">
        <AppHeaderSkeleton />
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Launching Tinyhouse" />
        </div>
      </Layout>
    );
  }
  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We weren't able to verify if you were logged in. Please Try again later!" />
  ) : null;
  return (
    <Router>
      <Layout id="app">
        {logInErrorBannerElement}
        <Affix offsetTop={0} className="app__affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer} />
        </Affix>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<Host />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/listings/:location" element={<Listings title={""} />} />
          <Route path="/user/:id" element={<User viewer={viewer} />} />
          <Route path="/login" element={<Login setViewer={setViewer} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
