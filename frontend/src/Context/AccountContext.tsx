import { createContext, useState, ReactNode} from 'react';

interface AccountContextType {
  id: string;
  setId: (id: string) => void;
  email: string;
  username: string;
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  jwt: string,
  setJwt: (jwt: string) => void;
  bggUsername: string,
  setBggUsername: (bggUsername: string) => void;
}

export const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [bggUsername, setBggUsername] = useState('');
  const [jwt, setJwt] = useState('');

  return (
    <AccountContext.Provider value={{ id, setId, email, username, setEmail, setUsername, jwt, setJwt, bggUsername, setBggUsername }}>
      {children}
    </AccountContext.Provider>
  );
};

