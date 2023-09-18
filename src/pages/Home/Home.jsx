const { useState, useEffect } = React;
const { useDispatch } = ReactRedux;
import { Login } from "../../components/Login/Login.jsx";
import { usersService } from "../../services/user.service.js";
import * as store from "../../../store/store.js";
import { SignUp } from "../../components/SignUp/SignUp.jsx";

export function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getLoggedInUser();
  }, []);

  async function getLoggedInUser() {
    const loggedInUser = await usersService.getLoggedInUser();
    if (loggedInUser) {
      dispatch({ type: store.POST_USER, loggedInUser });
      setIsLoggedIn(true);
    }
  }
  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <Login
            onUserLogin={({ username, password }) => {
              usersService
                .login(username, password)
                .then((user) => {
                  setIsLoggedIn(!!user);
                  dispatch({ type: store.POST_USER, loggedInUser: user });
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          />
          <SignUp
            onUserSignUp={(signup) => {
              usersService.signup(signup);
            }}
          />
        </div>
      ) : (
        <div>logged in </div>
      )}
    </div>
  );
}
