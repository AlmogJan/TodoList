const { useState } = React;

export function Login({ onUserLogin }) {
  const [login, setLogin] = useState({ username: "", password: "" });
  const { username, password } = login;

  function handleChange({ target }) {
    const field = target.name;
    const value = target.value;
    setLogin((prevLogin) => ({ ...prevLogin, [field]: value }));
  }

  return (
    <div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          onUserLogin(login);
        }}
      >
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
