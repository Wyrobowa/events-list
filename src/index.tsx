import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'tharaday/styles.css';

import App from './App';
import configureStore from './configureStore';

const store = configureStore();

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}
