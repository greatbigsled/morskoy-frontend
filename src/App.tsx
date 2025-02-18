import { BrowserRouter, Route, Routes } from 'react-router';
import GlobalLayout from './pages/GlobalLayout.tsx';
import AuthLayout from './pages/auth/AuthLayout.tsx';
import Login from './pages/auth/Login.tsx';
import Register from './pages/auth/Register.tsx';
import BattlefieldCreator from './pages/battlefieldCreator/BattlefieldCreator.tsx';
import Game from './pages/Game/Game.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route index element={<BattlefieldCreator />} />
          <Route path="create-battlefield" element={<BattlefieldCreator />} />
          <Route path="game/:id" element={<Game />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
