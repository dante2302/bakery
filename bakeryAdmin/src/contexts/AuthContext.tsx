import { ReactNode, createContext, useState } from 'react';

interface AuthContext<T>{
    authData: T | undefined
    setAuthData: React.Dispatch<React.SetStateAction<T | undefined>>
}

export const AuthContext = createContext({} as AuthContext<string>);
interface PropsWithChildren
{
    children?: ReactNode;
}

export function AuthProvider({children}: PropsWithChildren){
    const [authData, setAuthData] = useState<string>();
    return <AuthContext.Provider value={{authData, setAuthData}}>
                {children}
           </AuthContext.Provider>
}