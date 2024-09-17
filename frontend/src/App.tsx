import { Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
import { Sidebar } from './Sidebar';
import { Dashboard } from './Dashboard';

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
            path="/settings"
            element={<h1>Settings</h1>}
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
