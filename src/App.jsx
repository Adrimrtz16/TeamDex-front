import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Teams from './pages/Teams'
import TeamBuilder from './pages/TeamBuilder'
import { ThemeProvider , useTheme  } from './contexts/ThemeContext'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import User from './pages/User'
import Users from './pages/UserList'
import Me from './components/login/Me'
import TeamsExplorer from './pages/TeamsExplorer'

function AppContent() {
  
  const { isDarkMode } = useTheme();

  return (
    <>
 <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white'}`}>
      <div className="flex-1 container-fluid">
        <Header />
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='/teams' element={<Teams/>}/>
          <Route path='/teams/teambuilder' element={<TeamBuilder/>}/>
          <Route path='/teams/explorer' element={<TeamsExplorer/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/users' element={<Users />}/>
          <Route path='/users/user/:id' element={<User />}/>
          <Route path='/me' element={<Me />} />
        </Routes>
      </div>
      <footer className={`flex justify-center items-center gap-2 ${isDarkMode ? 'bg-slate-950' : 'bg-gray-100'}`}>
        <a href="https://team-dex-front.vercel.app/">TeamDex</a> © 2025 by <a href="https://github.com/Adrimrtz16">Adrián Martínez Díaz</a> is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>
        <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" style={{ maxWidth: '1em', maxHeight: '1em', marginLeft: '.2em' }} alt="CC" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" style={{ maxWidth: '1em', maxHeight: '1em', marginLeft: '.2em' }} alt="BY" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" style={{ maxWidth: '1em', maxHeight: '1em', marginLeft: '.2em' }} alt="SA" />
        <br /><br /><br /> <br />
      </footer>
    </div>
    </>
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
