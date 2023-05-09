import React, { useEffect, useRef } from 'react'
import { styled } from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from 'react-redux';
import { selectRoomId } from './../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';


const Chat = () => {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    )
    const [roomMessages, loading] = useCollection(
        roomId &&
        db
            .collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy("timestamp", "asc")
    );
    // useEffect(() => {
    //     chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [roomId, loading]);
    return (
        <ChatContainer>
            <Header>
                {/* left */}
                <HeaderLeft>
                    <h4>#{roomDetails?.data().name}</h4>
                    <StarIcon />
                </HeaderLeft>
                {/* right */}
                <HeaderRight>
                    <p><InfoIcon />Details</p>
                </HeaderRight>
            </Header>

            <ChatMessages>
                {roomMessages?.docs.map(doc => {
                    const { message, timestamp, user, userImg } = doc.data();

                    return (
                        <Message
                            key={doc.id}
                            message={message}
                            timestamp={timestamp}
                            user={user}
                            userImg={userImg}
                        />
                    );
                })}
                <ChatBottom />
            </ChatMessages>
            <ChatInput
                // channel name
                chatRef={chatRef}
                channelName={roomDetails?.data().name}
                channelId={roomId}
            />
        </ChatContainer>
    )
}

export default Chat;

// scroll
const ChatBottom = styled.div`
    padding-bottom: 200px;
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: auto;
  margin-top: 50px;
  background-color: #ffdee9;
  background-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%);
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    >h4{
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }
    >h4 > .MuiSvgIcon-root {
        margin-left: 20px;
        font-size: 18px;
    } 
    .MuiSvgIcon-root :hover{
        color: #F8D800;
        cursor: pointer;
    }
`;

const HeaderRight = styled.div`
    >p{
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    >p > .MuiSvgIcon-root {
        margin-left: 20px;
        font-size: 18px;
        color: blue;
        cursor: pointer;
    }
`;

// messages
const ChatMessages = styled.div``;
