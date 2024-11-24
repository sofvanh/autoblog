import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import MarkdownCustomizer from './components/MarkdownCustomizer';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <MarkdownCustomizer />,
      },
      {
        path: '*',
        element: <MarkdownCustomizer />,
      }
    ]
  }
]);