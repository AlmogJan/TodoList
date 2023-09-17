const { Route, Routes } = ReactRouterDOM;
const { Provider } = ReactRedux;
const Router = ReactRouterDOM.HashRouter;
import { Home } from "./src/pages/Home/Home.jsx";
import { AppHeader } from "./src/components/AppHeader/AppHeader.jsx";
import { TodoApp } from "./src/pages/TodoApp/TodoApp.jsx";
import { store } from "./store/store.js";

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<TodoApp />} />
          </Routes>
        </section>
      </Router>
    </Provider>
  );
}
