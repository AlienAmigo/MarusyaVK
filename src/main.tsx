import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { AuthInitializer } from '@/components/AuthInitializer';
import './scss/style.scss';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/MarusyaVK">
        <AuthInitializer>
          <App />
        </AuthInitializer>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
