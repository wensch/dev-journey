import { createContext, useContext, useState } from "react";

export type UserProps = {
  token: string,
  user: {
      id: number,
      email:string,
      nome: string
  }
}

type AuthContextProps = {
  userPeople: UserProps | null,
  saveLogin: (user: UserProps) => void,
  saveLogout: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({children} : {children: React.ReactNode}) => {
  const [userPeople, setUser] = useState<UserProps | null>(null);

  const saveLogin = (userPeople: UserProps) => {
    setUser(userPeople);
  }

  function saveLogout() {
    setUser(null);
  }
  
  return (
    <AuthContext.Provider value={{userPeople, saveLogin, saveLogout}}>
      {children}
    </AuthContext.Provider>
  )

}
// Hook para acessar o contexto facilmente
export const useAuth = () => {
  return useContext(AuthContext)
}
