import { Auth } from "@/store/Auth";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

export function Header() {
	const [showMobileNav, setShowMobileNav] = useState(false);

	const { user, logout } = Auth();

	return (
		<>
			<div
				className={`${
					showMobileNav ? "block" : "hidden"
				} fixed top-0 left-0 right-0 bottom-0 bg-black/50 md:hidden z-10`}
			></div>
			<header className="bg-secondary p-6 relative z-20">
				<nav className="flex items-center justify-between">
					<Link href={"/"}>
						<img
							src="/images/logo.png"
							className="max-w-44"
							alt="cine-stats logo"
							width={340}
							height={60}
						/>
					</Link>
					<HamburgerMenuIcon
						className="block md:hidden"
						width={30}
						height={30}
						onClick={() => setShowMobileNav(true)}
					/>
					<ul
						className={`${
							showMobileNav ? "translate-x-0" : "translate-x-full"
						} transition-all flex fixed bg-background w-[70svw] flex-col gap-4 px-6 py-8 bottom-0 top-0 right-0 md:w-[auto] md:p-0 md:translate-x-0 md:relative md:flex-row md:items-center md:bg-transparent`}
					>
						<Cross1Icon
							onClick={() => setShowMobileNav(false)}
							width={20}
							height={20}
							className="ml-auto md:hidden"
						/>
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
		</>
	);
}
