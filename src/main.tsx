import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyles } from 'twin.macro';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import router from './router/router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<GlobalStyles />
		<RouterProvider router={router} />
	</React.StrictMode>
);
