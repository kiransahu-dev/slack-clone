import React from 'react'
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Header = () => {
    const [user] = useAuthState(auth);
    return (
        <HeaderContainer>
            {/* Header left */}
            <HeaderLeft>
                <HeaderAvatar
                    sx={{ width: 30, height: 30 }}// onlick todo
                    src={user?.photoURL}
                    alt={user?.displayName}
                    onClick={() => auth.signOut()}
                />
                <AccessTimeIcon />
            </HeaderLeft>
            {/* Header Search */}
            <HeaderSearch>
                <SearchIcon />
                <input type="text" placeholder='Search your Channel' />
            </HeaderSearch>
            {/* Header right */}
            <HeaderRight>
                <HelpOutlineIcon />
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header;

const HeaderContainer = styled.div`
    background-color: var(--slack-color);
    display: flex;
    position: fixed;
    width: 100%;
    height: 7vh;
    align-items: center;
    justify-content: space-between;
`;

// left
const HeaderLeft = styled.div`
    display: flex;
    flex: 0.3;
    align-items: center;
    margin-left: 20px; 
    > .MuiSvgIcon-root{
        margin-left: auto;
        margin-right: 30px;
    }
`;

// search
const HeaderSearch = styled.div`
    display: flex;
    flex: 0.4;
    opacity:1;
    background-color: white;
    border-radius: 6px;
    text-align: center;
    padding: 0 50px;
    color: gray;
    border: 1px solid gray;

    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 30vw;
        outline: 0;
        color: #8C1BAB;
    }
`
// right
const HeaderRight = styled.div`
    display: flex;
    flex: 0.3;
    align-items: flex-end;

    >.MuiSvgIcon-root{
        margin-left: auto;
        margin-right: 30px;
    }
`
// avatar
const HeaderAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity: 0.5;
    }
`;