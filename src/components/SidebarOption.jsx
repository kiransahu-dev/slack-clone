import React from 'react';
import { styled } from 'styled-components';
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../features/appSlice';


function SidebarOption({ Icon, title, addChanelOption, id }) {

    const dispatch = useDispatch();
    const addChannel = () => {
        const channelName = prompt('Please provide the channel name');

        if (channelName) {
            db.collection('rooms').add({
                name: channelName,
            })
        }
    }
    const selectChannel = () => {
        if (id) {
            dispatch(enterRoom({
                roomId: id,
            }));
        }
    }

    return (
        <SidebarOptionContainer
            onClick={addChanelOption ? addChannel : selectChannel}
        >
            {Icon && <Icon fontSize='small' style={{ padding: 5 }} />}
            {Icon ? (
                <h3>{title}</h3>
            ) : (
                <SidebarOptionChannel>
                    {/* Content for SidebarOptionChannel */}
                    <span>#</span>{title}
                </SidebarOptionChannel>
            )}
        </SidebarOptionContainer>
    );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
    /* Add styles for SidebarOptionContainer */
    display: flex;
    font-size:12px;
    align-items: center;
    padding: 2px;
    cursor: pointer;
    :hover {
        opacity: 0.9;
        background-color: #7367F0;
    }
    >h3{
        font-weight: 100;
        padding: 5px;
    }
`;

const SidebarOptionChannel = styled.h3`
    /* Add styles for SidebarOptionChannel */
    padding: 10px;
    font-weight: bolder;
    color: white;
    background-color: #7367F0;
    width:100%;
    > span{
        padding: 0 15px 0 0;
    }
`;