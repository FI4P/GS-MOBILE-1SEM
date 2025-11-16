import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  signIn: () => void;
  signOut: () => void;
  user: boolean | null; 
}


const AuthContext = createContext<AuthContextType | null>(null);


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<boolean | null>(false); 

  const signIn = () => {
    setUser(true);
  };

  const signOut = () => {
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}