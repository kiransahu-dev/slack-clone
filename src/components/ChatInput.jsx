import Button from '@mui/material/Button';
import React, { useState } from 'react'
import { styled } from 'styled-components';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';


const ChatInput = ({ channelName, channelId, chatRef }) => {
    const [input, setInput] = useState('');
    const [user] = useAuthState(auth);

    const sendMessage = (e) => {
        e.preventDefault();

        if (!channelId) {
            return false;
        }
        db.collection('rooms').doc(channelId).collection('messages').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImg: user.photoURL,
        });
        chatRef.current?.scrollIntoView({ behavior: 'smooth' });

        setInput("")
    };
    return (
        <InoutContainer>
            <form>
                <input value={input} placeholder={`Message #${channelName}`} onChange={(e) => setInput(e.target.value)} />
                <Button hidden type='submit' onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </InoutContainer>
    )
}

export default ChatInput;

const InoutContainer = styled.div`
    border-radius: 20px;
    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }
    > form > input {
        position: fixed;
        bottom: 30px;
        width: 50%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }
    > form > Button {
        display: none !important;
    }

`;