import { ReactNode, createContext, useState } from 'react';

export const AuthContext = createContext({});
interface PropsWithChildren
{
    children?: ReactNode;
}

export function AuthProvider({children}: PropsWithChildren){
    const [authData, setAuthData] = useState();
    return <AuthContext.Provider value={{authData, setAuthData}}>
                {children}
           </AuthContext.Provider>
}