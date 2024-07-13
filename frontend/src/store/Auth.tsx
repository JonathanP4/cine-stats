"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    User,
} from "@firebase/auth";
import { app } from "@/lib/firebase";
import { getUserData, writeUserData } from "@/lib/firedb";
import { useRouter } from "next/navigation";

type Props = {
    children: ReactNode;
};

type Context = {
    user: User | null;
    dbUser: UserData | null;
    updateDbUser: (data: UserData) => null;
    passwordLogin: (email: string, password: string) => void;
    passwordSignup: (name: string, email: string, password: string) => void;
    oAuth: (provider: "GOOGLE" | "GITHUB") => void;
    logout: () => void;
};

const AuthContext = createContext<any>(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export function AuthContextProvider({ children }: Props) {
    const [user, setUser] = useState<User | UserData | null>(null);
    const [dbUser, setDbUser] = useState<UserData | null>(null);
    const router = useRouter();

    useEffect(() => {
        const authObserver = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            router.replace("/");
        });

        return () => authObserver();
    }, [user]);

    useEffect(() => {
        (async function () {
            if (!user) {
                setDbUser(null);
            } else {
                const firebaseUserData = await getUserData(user.uid);
                setDbUser(firebaseUserData);
            }
        })();
    }, [user]);

    const updateDbUser = (data: UserData) => {
        setDbUser(data);
    };

    const passwordSignup = async (
        name: string,
        email: string,
        password: string,
    ) => {
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );

            setUser(user);
            await writeUserData(user.uid, name, user.email!, user.photoURL);
        } catch (error) {
            console.log(error);
        }
    };

    const passwordLogin = async (email: string, password: string) => {
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            setUser(user);
        } catch (error) {
            console.log(error);
        }
    };

    const oAuth = async (provider: "GITHUB" | "GOOGLE") => {
        try {
            const result = await signInWithPopup(
                auth,
                provider === "GOOGLE" ? googleProvider : githubProvider,
            );
            let credential;

            if (provider === "GOOGLE") {
                credential = GoogleAuthProvider.credentialFromResult(result);
            } else {
                credential = GithubAuthProvider.credentialFromResult(result);
            }
            if (credential) {
                const token = credential.accessToken;
                const user = result.user;
                setUser(user);
                await writeUserData(
                    user.uid,
                    user.displayName!,
                    user.email!,
                    user.photoURL,
                );
            }
        } catch (error: any) {
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(error, credential);
        }
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                passwordLogin,
                passwordSignup,
                updateDbUser,
                oAuth,
                logout,
                dbUser,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const Auth = () => useContext(AuthContext) as Context;
