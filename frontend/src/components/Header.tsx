import { Auth } from "@/store/Auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
	const { user, logout } = Auth();

	return (
		<header className="bg-secondary p-6">
			<nav className="flex items-center justify-between">
				<Link href={"/"}>
					<Image
						src="/images/logo.png"
						className="max-w-44"
						alt="cine-stats logo"
						width={340}
						height={60}
					/>
				</Link>
				<ul className="flex items-center gap-4">
					{user && (
						<>
							<li>
								<Link href={"/bookmarks"}>Bookmarks</Link>
							</li>
							<li>
								<Button onClick={logout}>Logout</Button>
							</li>
						</>
					)}
					{!user && (
						<>
							<li>
								<Link href={"/auth/signup"}>Signup</Link>
							</li>
							<li>
								<Link href={"/auth/login"}>
									<Button>Login</Button>
								</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
}
