import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { Sidebar } from './shared-components/Sidebar';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Preferences } from './pages/preferences/Preferences';
import { Transactions } from './pages/transactions/Transactions';

const App = () => {
  return (
    <div className="flex min-h-screen md:flex-row flex-col">
      <Sidebar />
      <div className="md:w-4/5 md:ms-[20%] border bg-slate-200 p-2">
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />
          <Route
            path="/transactions"
            element={<Transactions />}
          />
          <Route
            path="/preferences"
            element={<Preferences />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
