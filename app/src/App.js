import logo from './logo.svg';
import './App.css';
import Add from './components/add';
import FormBuilder from './components/formBuilder';
import Forms from './components/forms';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';


function App() {
  return (
    <Router>

      <h1 className='text-4xl text-center font-bold text-black py-5'>Form Builder</h1>
      <nav >
        <ul className='flex flex-row  space-x-7 bg-pink-100 py-4' >
          <li >
            <Link className='hover:text-blue-700 hover:bg-white px-4 py-4' to="/">Home</Link>
          </li>
          <li >
            <Link className='hover:text-blue-700 hover:bg-white px-4 py-4' to="/add">Create Form</Link>
          </li>
          
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/add" element={<FormBuilder />} />
        <Route path="/forms/:id" element={<Forms />} />
      </Routes>
    </Router>
  );
}

export default App;
