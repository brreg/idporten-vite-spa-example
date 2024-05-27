import "./App.css"
import { Routes, Route } from 'react-router-dom';
import { AuthGuard } from './components/AuthGuard';
import HomePage from "./pages";
import UserPage from "./pages/user";

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
      </Routes>
    </main>
  )
}

export default App
