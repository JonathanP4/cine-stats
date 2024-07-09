"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Auth } from "@/store/Auth";
import { MobileNav } from "@/components/MobileNav";
import { NavMenu } from "./NavMenu";

export function Header() {
    const [offsetY, setOffsetY] = useState(0);
    const { user, dbUser, logout } = Auth();

    useEffect(() => {
        const handleScroll = () => setOffsetY(window.scrollY);

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={`${
                offsetY >= 150 ? "scroll-header" : ""
            } relative z-10 bg-secondary top-0 transition-all`}
        >
            <nav className={`p-6 flex justify-between items-center`}>
                <Link href={"/"}>
                    <Image
                        src="/images/logo.png"
                        alt="cinestats logo"
                        width={345}
                        height={60}
                        priority={true}
                        className="max-w-[180px] h-auto select-none"
                    />
                </Link>
                <NavMenu />
                <div className={"block md:hidden"}>
                    <MobileNav />
                </div>
                <div className={"hidden md:block"}>
                    <ul className={"flex items-center gap-4"}>
                        {user && (
                            <>
                                <li>
                                    <Link href={"/bookmarks"}>Bookmarks</Link>
                                </li>
                                <div className={"h-6 w-px bg-primary/70"} />
                            </>
                        )}
                        {!user?.uid && (
                            <>
                                <li>
                                    <Link href={"/auth?login=true"}>
                                        Log in
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={
                                            "bg-primary/90 p-2 rounded-md text-secondary font-semibold hover:bg-primary transition"
                                        }
                                        href={"/auth"}
                                    >
                                        Sign up
                                    </Link>
                                </li>
                            </>
                        )}
                        {user && (
                            <>
                                <li>
                                    <Link
                                        className={
                                            "transition-all bg-primary p-2 border border-white font-semibold text-background rounded-md hover:bg-transparent hover:text-white "
                                        }
                                        onClick={logout}
                                        href={"/"}
                                    >
                                        Logout
                                    </Link>
                                </li>

                                <li
                                    className={
                                        "rounded-full bg-background border border-white h-[40px] text-white font-semibold aspect-square grid place-content-center"
                                    }
                                >
                                    <Link href={"/profile"}>
                                        {dbUser?.photoURL && (
                                            <img
                                                src={dbUser.photoURL}
                                                className={
                                                    "rounded-full h-[38px] object-cover"
                                                }
                                                alt={"Avatar Image"}
                                                width={88}
                                                height={88}
                                            />
                                        )}
                                        {!dbUser?.photoURL && (
                                            <span
                                                className={
                                                    "text-white font-semibold"
                                                }
                                            >
                                                {dbUser?.name[0]}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
