import { Route, Routes } from 'react-router-dom';
import { Sidebar } from './Sidebar';

const App = () => {
  return (
    <div className="flex h-screen md:flex-row flex-col">
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={<h1>Home</h1>}
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
          element={<h1>Login</h1>}
        />

        <Route
          path="/register"
          element={<h1>Register</h1>}
        />

        <Route
          path="*"
          element={<h1>Home but error</h1>}
        />
      </Routes>
    </div>
  );
};

export default App;
