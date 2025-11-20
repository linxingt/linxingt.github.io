import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import HomePage from './pages/Home';
import GuestbookPage from './pages/Guestbook';
import './Global.scss';
import Footer from './components/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guestbook" element={<GuestbookPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
