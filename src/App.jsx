import './App.css'
import Header from './components/header/Header'
import Home from './pages/Home'
import Teams from './pages/Teams'
import TeamBuilder from './pages/TeamBuilder'
import { ThemeProvider , useTheme  } from './contexts/ThemeContext'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import User from './pages/User'

function AppContent() {
  
  const { isDarkMode } = useTheme();

  return (
    <div className={`container-fluid ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white'}`}>
      <Header />
      <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='/teams' element={<Teams/>}/>
        <Route path='/teams/teambuilder' element={<TeamBuilder/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/user' element={<User />}/>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
