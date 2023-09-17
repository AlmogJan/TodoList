const { Link, NavLink } = ReactRouterDOM;
const { useSelector } = ReactRedux;
const { useEffect } = React;

export function AppHeader() {
  const fullName = useSelector((state) => state.fullname);

  useEffect(() => {
    console.log(fullName);
  }, []);
  return (
    <header className="app-header flex align-center">
      <Link to="/">
        <h3 className="logo">TodoList</h3>
      </Link>
      <h3>Hello, {fullName || "guest"}</h3>
      <nav>
        <button className="img-button">
          <NavLink to="/">
            <img
              src="assets/img/home_FILL0_wght400_GRAD0_opsz24.png"
              alt="home"
            />
          </NavLink>
        </button>
        <button className="img-button">
          <NavLink to="/todos">
            <img src="assets/img/check.png" alt="my todo list" />
          </NavLink>
        </button>
        <button className="img-button">
          <NavLink to="/settings">
            <img
              src="assets/img/manage_accounts_FILL0_wght400_GRAD0_opsz24.png"
              alt="user settings"
            />
          </NavLink>
        </button>
      </nav>
    </header>
  );
}
