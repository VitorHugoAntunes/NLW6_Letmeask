import { createContext, ReactNode, useEffect, useState } from "react";
import {auth, firebase} from '../services/firebase';

type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
type AuthContextType = {
user: User | undefined;
signInWithGoogle: () => Promise<void>;
signInWithGitHub: () => Promise<void>;
signoutAccount: () => void;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
          const { displayName, photoURL, uid } = user

          if(!displayName || !photoURL){
            throw new Error('Missing information from Google Account.')
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle(){
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(googleProvider);

    if(result.user){
      const { displayName, photoURL, uid } = result.user

      if(!displayName || !photoURL){
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  async function signInWithGitHub(){
    const githubProvider = new firebase.auth.GithubAuthProvider();
    const result = await auth.signInWithPopup(githubProvider);

    if(result.user){
      const { displayName, photoURL, uid } = result.user

      if(!displayName || !photoURL){
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  function signoutAccount() {
    firebase.auth().signOut();
  }
    return(
        <AuthContext.Provider value={{ user, signInWithGoogle, signInWithGitHub, signoutAccount }}>
            {props.children}
        </AuthContext.Provider>
    );
}