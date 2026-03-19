import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("currentUserEmail") ?
    { email: localStorage.getItem("currentUserEmail") } : 
    null
  );

  const signUp = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

    if (users.find(user => user.email === email)) {
      return {success: false, error: "User already exists"  };
    }

    const newuser = {
      email,
      password
    };

    users.push(newuser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);

    setUser({ email });

    return { success: true };
  };
  
  const logIn = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    localStorage.setItem("currentUserEmail", email);
    setUser({ email });

    return { success: true };
  };

  const logOut = () => {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  };


  return <AuthContext.Provider value={{signUp, user, logIn, logOut}}>{children}</AuthContext.Provider>

}