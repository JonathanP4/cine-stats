import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/drawer";
import { Auth } from "@/store/Auth";

export function MobileNav() {
    const { user, logout } = Auth();
    return (
        <Drawer direction={"right"}>
            <DrawerTrigger>
                <HamburgerMenuIcon width={20} height={20} />
            </DrawerTrigger>
            <DrawerContent className={"p-6 space-y-6"}>
                {user && (
                    <>
                        <Link href={"/profile"}>
                            <DrawerClose>Profile</DrawerClose>
                        </Link>
                        <Link href={"/bookmarks"}>
                            <DrawerClose>Bookmarks</DrawerClose>
                        </Link>
                        <Link href={"/"}>
                            <DrawerClose onClick={logout}>Logout</DrawerClose>
                        </Link>
                    </>
                )}

                {!user && (
                    <Link href={"/auth?login=true"}>
                        <DrawerClose className={"text-left"}>
                            Log in{" "}
                        </DrawerClose>
                    </Link>
                )}

                {!user && (
                    <Link
                        className={
                            "bg-primary/90 p-2 rounded-md text-secondary font-semibold hover:bg-primary transition"
                        }
                        href={"/auth"}
                    >
                        <DrawerClose className={"text-left"}>
                            Sign up
                        </DrawerClose>
                    </Link>
                )}
            </DrawerContent>
        </Drawer>
    );
}
