import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './Navbar';
import Routing from './Routing';
import AuthProvider from '../auth/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <Navbar />
      <Routing/>
    </AuthProvider>
)
