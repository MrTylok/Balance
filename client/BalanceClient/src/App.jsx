import './App.css';
import Navbar from './components/Navbar';
import Layout from './components/Layout';

function App() {
  const entry_navbar = { Home: '/', Login: '/login', Logout: '/logout' };

  return (
    <div className="app">
      <Navbar links={entry_navbar} />
      <Layout />
    </div>
  );
}

export default App;
