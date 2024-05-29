import "./App.css"
import { Routes, Route } from 'react-router-dom';
import { AuthGuard } from './components/AuthGuard';
import HomePage from "./pages";
import UserPage from "./pages/user";
import LpidPage from "./pages/lpid";

const App = () => {
  return (
    <main>
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/user'
          element={
            <AuthGuard>
              <UserPage />
            </AuthGuard>
          }
        />
        <Route
          path='/lpid'
          element={
            <AuthGuard>
              <LpidPage />
            </AuthGuard>
          }
        />
      </Routes>
    </main>
  )
}

export default App
