// import { createContext, useContext, useEffect, useState } from 'react';

// const UserContext = createContext({});

// export const UserProvider = ({ children }) => {
//   const [userInfo, setUserInfo] = useState({});

//   const putUserData = (userInfo) => {
//     setUserInfo(userInfo);
//     localStorage.setItem('devburger:userData', JSON.stringify(userInfo));
//   };

//   const logout = () => {
//     setUserInfo({});
//     localStorage.removeItem('devburger:userData');
//   };

//   useEffect(() => {
//     const userInfoLocalStorage = localStorage.getItem('devburger:userData');
//     if (userInfoLocalStorage) {
//       setUserInfo(JSON.parse(userInfoLocalStorage));
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={{ userInfo, putUserData, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);

//   if (!context) {
//     throw new Error('useUser must be a calid context');
//   }

//   return context;
// };
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  const putUserData = (userInfo) => {
    setUserInfo(userInfo);
    localStorage.setItem('devburger:userData', JSON.stringify(userInfo));
  };

  const logout = () => {
    setUserInfo({});
    localStorage.removeItem('devburger:userData');
  };

  useEffect(() => {
    const userInfoLocalStorage = localStorage.getItem('devburger:userData');
    if (userInfoLocalStorage) {
      try {
        setUserInfo(JSON.parse(userInfoLocalStorage));
      } catch (error) {
        console.error("Erro ao parsear dados do usuário do localStorage", error);
        localStorage.removeItem('devburger:userData');
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, putUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be a valid context');
  }

  return context;
};