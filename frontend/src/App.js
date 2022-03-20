import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegistrationForm from './components/RegistrationForm';
import UserList from './components/UserList';

function App() {
  return (
    <Router>
      <Routes>                                                                                                                                                                                                                                                                                      
        <Route path='/' element={<UserList/>}/>
        <Route path='/register/' element={<RegistrationForm/>}/>
        <Route path='/register/:id' element={<RegistrationForm/>}/>
      </Routes>
     
    </Router>

  );
}

export default App;
