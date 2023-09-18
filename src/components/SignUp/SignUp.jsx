const { useState } = React;

export function SignUp({ onUserSignUp }) {
  const [signUp, setSignUp] = useState({
    fullName: "",
    username: "",
    password: "",
  });
  const { fullName, username, password } = SignUp;
  function handleChange({ target }) {
    const field = target.name;
    const value = target.value;
    setSignUp((prevSignUp) => ({ ...prevSignUp, [field]: value }));
  }
  return (
    <div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          onUserSignUp(signUp);
        }}
      >
        <input
          type="text"
          name="fullName"
          value={fullName}
          placeholder="fullName"
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          value={username}
          placeholder="username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={handleChange}
        />
        <button>Sign up</button>
      </form>
    </div>
  );
}
