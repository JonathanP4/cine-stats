"use client";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { CaretDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function NavMenu() {
    return (
        <Menubar className="bg-transparent relative border-0">
            <MenubarMenu>
                <MenubarTrigger className="cursor-pointer relative">
                    Movies
                    <CaretDownIcon />
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        <Link href={"/movies/popular"}>Popular</Link>
                    </MenubarItem>
                    <MenubarItem>
                        <Link href={"/movies/now-playing"}>Now Playing</Link>
                    </MenubarItem>
                    <MenubarItem>
                        <Link href={"/movies/upcoming"}>Upcoming</Link>
                    </MenubarItem>
                    <MenubarItem>
                        <Link href={"/movies/top-rated"}>Top Rated</Link>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger className="cursor-pointer relative">
                    TV Shows
                    <CaretDownIcon />
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        <Link href={"/tv/popular"}>Popular</Link>
                    </MenubarItem>
                    <MenubarItem>
                        <Link href={"/tv/airing-today"}>Airing Today</Link>
                    </MenubarItem>
                    <MenubarItem>
                        <Link href={"/tv/on-tv"}>On TV</Link>
                    </MenubarItem>
                    <MenubarItem>
                        <Link href={"/tv/top-rated"}>Top Rated</Link>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger className="cursor-pointer">
                    People
                    <CaretDownIcon />
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        <Link href={"/people/popular"}>Popular People</Link>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}
