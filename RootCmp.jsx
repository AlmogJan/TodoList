const { Route, Routes } = ReactRouterDOM;
const Router = ReactRouterDOM.HashRouter;
import { Home } from "./src/pages/Home/Home.jsx";
import { AppHeader } from "./src/components/AppHeader/AppHeader.jsx";
export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </section>
    </Router>
  );
}
