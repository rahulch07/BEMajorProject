import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Home from './pages/Home/Home'
//import Yoga from './pages/Yoga/Yoga'
import About from './pages/About/About'
import Tutorials from './pages/Tutorials/Tutorials'
import Login from './components/auth/Login'

import './App.css'
import Navbar from './pages/Navbar/Navbar'

import {RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import SessionTypes from './pages/Yoga/SessionTypes'
import History from './pages/History/History'

//import Login from './components/Login'

export default function App() {
  return (
    <div>
      <RecoilRoot>
    <Navbar/>
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/auth' element={<Login />}/>
        <Route path='/start' element={<SessionTypes/>} />
        <Route path='/history' element={<History/>} />
        <Route path='/about' element={<About />} />
        <Route path='/tutorials' element={<Tutorials />} />
      </Routes>
    </Router>
    </RecoilRoot>
    </div>
  )
}


