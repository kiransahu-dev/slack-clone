import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import { styled } from 'styled-components';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './components/Login';
import { auth } from './firebase';
import Spinner from 'react-spinkit';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (<AppLoading>
      <AppContent>
        <img
          src='https://cdn.dribbble.com/users/1238764/screenshots/5864612/slack-animation.gif'
          alt=''
        />
        <Spinner
          name='ball-spin-fade-loader'
          color='purple'
          fadeIn='none'
        />
      </AppContent>
    </AppLoading>);
  }

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Routes>
                {/* chat compo */}
                <Route path='/' element={<Chat />} />
              </Routes>
            </AppBody>
          </>
        )}

      </Router>
    </div>
  );
}

export default App;


const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
const AppLoading = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
> img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }

`;

const AppContent = styled.div`
  display: grid;
  place-items: center;
  width: 100vh;
`; 