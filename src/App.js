// libraries  
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// style
import './App.css';

// components
import {
  Akun,
  Dashboard,
  Landing,
  NotFound,
  Pengguna,RiwayatTransaksi,
  Sidebar
} from './components';

import GlobalProvider from './context';
import PrivateRoute from './PrivateRoute';
import Cookies from "js-cookie"
function App() {
  const isLanding = window.location.pathname !== '/'  
  const isNotFound = !['/dashboard','/pengguna','/riwayat-transaksi','/akun'].includes(window.location.pathname)

  return (
    <>
      <Router>
        <div className={`App${isLanding ? '' : ' netral'}`}>
          {/* {isLanding && (
            <Sidebar />
          )} */}
          {
            // isLanding ? isNotFound ? null : <Sidebar /> : null
            isLanding ? isNotFound ? null : Cookies.get('login') ? <Sidebar /> : null : null
          }

          <Switch>
            <Route path="/" exact component={Landing} />
            {/* <Route path="/dashboard" component={Dashboard} /> */}
            <PrivateRoute path="/dashboard" component={Dashboard} />
            {/* <Route path="/pengguna" component={Pengguna} /> */}
            <PrivateRoute path="/pengguna" component={Pengguna} />
            {/* <Route path="/riwayat-transaksi" component={RiwayatTransaksi} /> */}
            <PrivateRoute path="/riwayat-transaksi" component={RiwayatTransaksi} />
            {/* <Route path="/akun" component={Akun} /> */}
            <PrivateRoute path="/akun" component={Akun} />
            {isNotFound && (
              <Route path="" component={NotFound} />
            )}
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default GlobalProvider(App);
