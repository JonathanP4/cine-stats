import { app } from "@/firebase/app";
import { writeUserData } from "@/firebase/db";
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	User,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

type AuthContext = {
	passwordSignup: (email: string, password: string) => Promise<void>;
	passwordSignin: (email: string, password: string) => Promise<void>;
	oAuth: (provider: "GOOGLE" | "GITHUB") => Promise<void>;
	logout: () => Promise<void>;
	user: User | null;
};

const auth = getAuth(app);
const AuthContext = createContext<any | null>(null);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>();

	const router = useRouter();

	useEffect(() => {
		const authObserver = onAuthStateChanged(auth, (user: User | null) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
		return () => authObserver();
	}, []);

	const passwordSignup = async (email: string, password: string) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			setUser(user);
			writeUserData(
				user.uid,
				user.displayName || "",
				user.email!,
				user.photoURL || ""
			);
		} catch (error: any) {
			console.log(error);
		}
	};

	const passwordSignin = async (email: string, password: string) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			const user = userCredential.user;
			setUser(user);
			writeUserData(
				user.uid,
				user.displayName || "",
				user.email!,
				user.photoURL || ""
			);
		} catch (error: any) {
			console.log(error);
		}
	};

	const oAuth = async (provider: "GOOGLE" | "GITHUB") => {
		try {
			const result = await signInWithPopup(
				auth,
				provider === "GOOGLE" ? googleProvider : githubProvider
			);
			const { user } = result;
			setUser(user);
			writeUserData(
				user.uid,
				user.displayName!,
				user.email!,
				user.photoURL!
			);
		} catch (error) {
			console.log(error);
		}
	};

	const logout = async () => {
		await signOut(auth);
		setUser(null);
		router.replace("/");
	};

	const value = {
		passwordSignup,
		passwordSignin,
		oAuth,
		logout,
		user,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}

export const Auth = () => useContext(AuthContext) as AuthContext;
