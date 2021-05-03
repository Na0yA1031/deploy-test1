import './App.css';
import { Reset } from 'styled-reset'


import Router from './router/Router'
import { AuthProvider } from './AuthProvider';

function App() {
  return (
    <>
      <Reset />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
