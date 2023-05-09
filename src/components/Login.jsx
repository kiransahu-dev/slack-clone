import { Button } from '@mui/base';
import React from 'react'
import { styled } from 'styled-components';
import { auth, provider } from '../firebase';


const Login = () => {
    const signin = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    };
    return (
        <LoginContainer>
            <InnerContainer>
                <img
                    src='https://cdn.cdnlogo.com/logos/s/29/slack.svg'
                    alt='slack/logo'
                />
                <h2>Sign-in & welcome to Kiran's World</h2>
                <p>www.kiransahu.dev.com</p>
                <Button onClick={signin}>Sign-in with Google</Button>
            </InnerContainer>
        </LoginContainer>
    )
}

export default Login;

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`;

const InnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    >img {
        object-fit: contain;
        height: 150px;
        margin-bottom: 10px;
    }
    > p {
        color: blue;
        cursor: wait;
    }
    >h2 {
        font-weight: 700;
    }
    >button {
        margin-top: 40px;
        text-transform: inherit !important;
        background-color: #0a8d48 !important;
        color: white;

        padding: 7px;
        cursor: pointer;
    }
`;