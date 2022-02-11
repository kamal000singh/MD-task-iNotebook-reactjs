import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';
import NoteState from './contextAPI/Notes/NoteState';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <div className="container p-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/addNewUser" element={<SignUp />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
