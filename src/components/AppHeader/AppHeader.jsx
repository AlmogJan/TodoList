const { Link, NavLink } = ReactRouterDOM;
const { useSelector } = ReactRedux;
const { useEffect } = React;

export function AppHeader() {
  const fullName = useSelector((state) => state.fullname);

  useEffect(() => {
    console.log(fullName);
  }, []);
  return (
    <header className="app-header">
      <Link to="/">
        <h3>LOGO!</h3>
      </Link>
      <h3>Hello {fullName || "guest"}</h3>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/todos">Todos</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </header>
  );
}
