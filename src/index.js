
// Importando react y los arhcivos necesarios
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

// Renderizacion
ReactDOM.render(
  (<React.StrictMode>
      <Suspense>
        <App />
      </Suspense>
    </React.StrictMode>),
  document.getElementById('root')
);

reportWebVitals();
