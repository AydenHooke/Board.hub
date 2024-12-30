import { createContext, useState, ReactNode, useContext } from 'react';

interface AccountContextType {
  email: string;
  username: string;
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  jwt: string,
  setJwt: (jwt: string) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [jwt, setJwt] = useState('');

  return (
    <AccountContext.Provider value={{ email, username, setEmail, setUsername, jwt, setJwt }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};