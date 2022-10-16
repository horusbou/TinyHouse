import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router";
import { useApolloClient, useMutation } from "@apollo/client";
import { Card, Layout, Typography, Spin } from "antd";
import { AUTH_URL, LOG_IN } from "../../lib/graphql";
import { AuthUrl as AuthUrlData } from "../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl";
import { LogIn as LogInData, LogInVariables } from "../../lib/graphql/mutations/Login/__generated__/LogIn";
import googleLogo from "./assets/google_logo.jpg"
import { Viewer } from "../../lib/types";
import { ErrorBanner } from "../../lib/components";
import { displayErrorMessage, displaySuccessNotification } from "../../lib/components/utils";
const { Content } = Layout;
const { Text, Title } = Typography

interface Props {
    setViewer: (viewer: Viewer) => void
}

export const Login = ({ setViewer }: Props) => {
    const client = useApolloClient();

    const [
        logIn,
        { data: logInData, loading: logInLoading, error: logInError }
    ] = useMutation<LogInData, LogInVariables>(LOG_IN, {
        onCompleted: (data) => {
            if (data && data.logIn)
                setViewer(data.logIn)
            displaySuccessNotification("you've successfully logged in!")
        }
    })

    const handleAuthorize = async () => {
        try {
            const { data } = await client.query<AuthUrlData>({ query: AUTH_URL })
            window.location.href = data.authUrl;
        } catch (error) {
            displayErrorMessage("Sorry! we weren't able to log you on, Please try again later!")
        }
    }

    const logInRef = useRef(logIn);

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        if (code) {
            logInRef.current({
                variables: {
                    input: { code }
                }
            })

        }
    }, [])
    if (logInLoading)
        return (<Content className="log-in">
            <Spin size="large" tip="Logging you in..." />
        </Content>)

    if (logInData && logInData.logIn) {
        const { id: viewerId } = logInData.logIn
        return <Navigate to={`/user/${viewerId}`} />
    }

    const logInErrorBannerElement = logInError
        ? (<ErrorBanner description="Sorry! we weren't able to log you on, Please try again later!" />)
        : null
    return <Content className="log-in">
        {logInErrorBannerElement}
        <Card className="log-in-card">
            <div className="log-in-card__intro">
                <Title level={3} className="log-in-card__intro-title">
                    <span role="img" aria-label="wave">
                        👋
                    </span>
                </Title>
                <Title level={3} className="log-in-card__intro-title">
                    Log in To TinyHouse
                </Title>
                <Text>Sign in with Google to start booking available rentals!</Text>
            </div>
            <button className="log-in-card__google-button" onClick={handleAuthorize}>
                <img src={googleLogo} alt="Google Logo" className="log-in-card__google-button-logo" />
                <span className="log-in-card__google-button-text">
                    Sign in with Google
                </span>
            </button>
            <Text type="secondary">
                Note: by signing in, you'll be redirected to the Google consent form
                to sign in with your Google account
            </Text>
        </Card>
    </Content>
}
