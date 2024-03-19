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
import Yoga from './pages/Yoga/Yoga'
import Yoga1 from './pages/Yoga/Yoga1'
import History from './pages/History/History'
import Pain from './pages/pain/Rootpain'
import Keypain from './pages/pain/Keypain'
import Choice from './pages/pain/choice'

//import Login from './components/Login'

export default function App() {
  return (
    <div>
      <RecoilRoot>
    {/* <Navbar/> */}
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/auth' element={<Login />}/>
        <Route path='/start' element={<SessionTypes/>} />
        <Route path='/yoga' element={<Yoga/>} />
        <Route path='/yoga1' element={<Yoga1/>} />
        <Route path='/history' element={<History/>} />
        <Route path='/about' element={<About />} />
        <Route path='/tutorials' element={<Tutorials />} />
        <Route path='/pain' element={<Pain />}/>
        <Route path='/keypain' element={<Keypain />} />
        <Route path='/choice' element={<Choice />} />
      </Routes>
    </Router>
    </RecoilRoot>
    </div>
  )
}


