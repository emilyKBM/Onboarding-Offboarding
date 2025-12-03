import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Define the props the mount function accepts
interface MountProps {
  apiKey?: string;
}

// Standard React mounting for Development/Standalone mode
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Global mounting function for Angular Integration
// This allows the Angular app to call window.FlowState.mount(element, props)
const mount = (element: HTMLElement, props: MountProps = {}) => {
  const root = ReactDOM.createRoot(element);
  root.render(
    <React.StrictMode>
      <App apiKey={props.apiKey} />
    </React.StrictMode>
  );
  
  // Return a cleanup function for Angular's ngOnDestroy
  return () => {
    root.unmount();
  };
};

// Attach to window object
(window as any).FlowState = {
  mount,
};

export { mount }; // Export for module systems if needed
