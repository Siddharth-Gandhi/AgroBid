import { createContext, useState, useCallback } from "react"

export const AuthContext = createContext({
  user: {
    email: '',
    name: '',
    role: '',
  },
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  checkLoggedIn: () => { },
  login: (data) => { },
  logout: () => { },
})

const retriveStoredToken = () => {
  const storedAccessToken = localStorage.getItem('accessToken');
  if (!storedAccessToken) {
    return null;
  }
  const storedRefreshToken = localStorage.getItem('refreshToken');
  return {
    storedAccessToken,
    storedRefreshToken,
  };
};

export const AuthContextProvider = (props) => {

  const tokenData = retriveStoredToken();
  let initialAccessToken, initialRefreshToken;
  if (tokenData !== null) {
    initialAccessToken = tokenData.storedAccessToken;
    initialRefreshToken = tokenData.storedRefreshToken;
  }

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(initialAccessToken)
  const [refreshToken, setRefreshToken] = useState(initialRefreshToken)

  const logoutHandler = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setEmail('');
    setName('');
    setRole('');
    setAccessToken('');
    setRefreshToken('');
    setIsLoggedIn(false);
  }, []);

  const loginHandler = (data) => {
    const accessTkn = data.accessToken;
    localStorage.setItem('accessToken', accessTkn);
    setAccessToken(accessTkn)
    const refreshTkn = data.refreshToken;
    localStorage.setItem('refreshToken', refreshTkn);
    setRefreshToken(refreshTkn)
    const fetchedName = data.user.name;
    const fetchedEmail = data.user.email;
    const fetchedRole = data.user.role;
    setName(fetchedName);
    setEmail(fetchedEmail);
    setRole(fetchedRole);
    localStorage.setItem(
      'user',
      JSON.stringify({ name, email, role })
    );
    setIsLoggedIn(true);
  };

  const checkLoggedIn = () => {
    const accTkn = localStorage.getItem('accessToken');
    const userJSON = localStorage.getItem('user');
    const user = JSON.parse(userJSON);
    if ((accTkn !== '' || accTkn !== null) && user !== null) {
      setIsLoggedIn(true);
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  };

  const contextValue = {
    user: {
      email,
      name,
      role,
    },
    accessToken: accessToken,
    refreshToken: refreshToken,
    isLoggedIn,
    checkLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
