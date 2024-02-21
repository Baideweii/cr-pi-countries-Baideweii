import React, { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage.jsx';
import HomePage from './components/home/HomePage.jsx';
import LoadingPage from './components/loading/LoadingPage.jsx';
import { useEffect } from 'react';
import Clock from './components/clock/Clock.jsx';
import Detail from './components/detail/Detail.jsx';
import ActivityForm from './components/form/ActivityForm.jsx';
import Background from './components/background/Background.jsx';

function App() {
    const [access, setAccess] = useState(false);
    const [background, setBackground] = useState(null);

    const navigate = useNavigate();

    const handleAccess = () => {
        setAccess(true);
    };

    useEffect(() => {
        !access && navigate('/');
    }, [access, navigate]);

    return (
        <div>
            <Routes>
                <Route
                    path='/'
                    element={<LandingPage handleAccess={handleAccess} background={background} />}
                />
                <Route path='/home' element={<HomePage background={background} />} />
                <Route path='/loading' element={<LoadingPage setBackground={setBackground} />} />
                <Route path='/detail/:id' element={<Detail />} />
                <Route path='/activity' element={<ActivityForm />} />
            </Routes>
            <Clock />
            {/* Background solo en las páginas LandingPage y LoadingPage */}
            {(background !== null) && <Background />}
        </div>
    );
}

export default App;

