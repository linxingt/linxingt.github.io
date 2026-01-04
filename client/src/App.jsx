import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import HomePage from './pages/Home';
import GuestbookPage from './pages/Guestbook';
import GuestbookFormPage from './pages/GuestbookFormPage';
import Footer from './components/Footer';
import './Global.scss';
import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div className="backgroundImage" />
      <NavBar />
      <main className="appContent">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/guestbook" element={<GuestbookPage />} />
          <Route path="/guestbook/new" element={<GuestbookFormPage mode="create" />} />
          <Route path="/guestbook/edit/:id" element={<GuestbookFormPage mode="edit" />} />
          <Route path="/guestbook/replyTo/:id" element={<GuestbookFormPage mode="reply" />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
