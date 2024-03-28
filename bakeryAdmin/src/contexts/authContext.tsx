import { ReactNode, createContext, useState } from 'react';

interface AuthContext<T>{
    authData: T | undefined
    setAuthData: React.Dispatch<React.SetStateAction<T | undefined>>
}

export const AuthContext = createContext({} as AuthContext<object>);
interface PropsWithChildren
{
    children?: ReactNode;
}

export function AuthProvider({children}: PropsWithChildren){
    const [authData, setAuthData] = useState<object>();
    return <AuthContext.Provider value={{authData, setAuthData}}>
                {children}
           </AuthContext.Provider>
}