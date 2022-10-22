
import { Routes, Route } from 'react-router-dom';
import AddContact from './components/AddContact/AddContact';
import ContactList from './components/ContactList/ContactList';
import Navbar from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditContact from './components/EditContact/EditContact'
import ViewContact from './components/ViewContact/ViewContact';
function App() {
  return (
    <>
      <ToastContainer autoClose={2000} />
      <Navbar />
      <Routes>
        <Route path='/' element={<ContactList />} />
        <Route path='/contact/list' element={<ContactList />} />
        <Route path='/contact/add' element={<AddContact />} />
        <Route path='/contact/view/:contactId' element={<ViewContact />}/>
        <Route path='/contact/edit/:contactId' element={<EditContact />} />
      </Routes>
    </>
  );
}

export default App;
