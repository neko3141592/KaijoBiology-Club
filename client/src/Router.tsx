import {BrowserRouter , Routes , Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Blogs from './components/Blogs';
import SignUp from './components/SignUp';
import Notfound from './components/Notfound';
import About from './components/About';
import React from 'react';
import Achievement from './components/Achievement';

const Router:React.FC = () => {
    return (
        <BrowserRouter>
            <Header/>
            <div className='main'>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/blogs'} element={<Blogs/>}/>
                    <Route path={'/signup'} element={<SignUp/>}/>
                    <Route path={'/about'} element={<About/>}/>
                    <Route path={'/achievement'} element={<Achievement/>}/>
                    <Route path={'/*'} element={<Notfound/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default Router; 