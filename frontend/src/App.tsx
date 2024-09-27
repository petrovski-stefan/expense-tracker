import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { Sidebar } from './layout/Sidebar';
import { Dashboard } from './pages/dashboard/Dashboard';

const App = () => {
  return (
    <div className="flex h-screen md:flex-row flex-col">
      <Sidebar />
      <div className="h-full md:w-4/5 border bg-slate-200 p-2">
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />
          <Route
            path="/transactions"
            element={<h1>Transactions</h1>}
          />
          <Route
            path="/preferences"
            element={<h1>Preferences</h1>}
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
