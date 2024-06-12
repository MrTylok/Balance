import './App.css';
import Navbar from './components/Navbar';
import Layout from './components/Layout';

function App() {
  const entry_navbar = { home: '/', page1: '/page1', page2: '/page2' };

  return (
    <div className="app">
      <Navbar links={entry_navbar} />
      <Layout />
    </div>
  );
}

export default App;
