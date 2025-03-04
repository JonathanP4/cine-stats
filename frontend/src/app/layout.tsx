"use client";

import { Inter, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/store/Auth";
import { Header } from "@/components/Header";

const montserrat = Montserrat({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta
					name="description"
					content="Get information about movies, tv series, actors and bookmark them!"
				></meta>
				<title>Cine Stats</title>
			</head>
			<body className={montserrat.className + " dark"}>
				<AuthProvider>
					<Header />
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
