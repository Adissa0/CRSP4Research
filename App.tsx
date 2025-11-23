import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Events from './pages/Events';
import Members from './pages/Members';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ressources" element={<Resources />} />
            <Route path="/evenements" element={<Events />} />
            <Route path="/membres" element={<Members />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;