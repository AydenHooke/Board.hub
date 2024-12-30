import { createContext, useState, ReactNode} from 'react';

interface AccountContextType {
  email: string;
  username: string;
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  jwt: string,
  setJwt: (jwt: string) => void;
}

export const AccountContext = createContext<AccountContextType | undefined>(undefined);

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

