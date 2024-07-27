import Image from "next/image";
import Link from "next/link";

export function Header() {
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
					<li>
						<Link href={"/"}>Bookmarks</Link>
					</li>
					<li>
						<Link href={"/"}>Login</Link>
					</li>
					<li>
						<Link href={"/"}>Signup</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
