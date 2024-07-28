"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Auth } from "@/store/Auth";
import { useRouter } from "next/navigation";

type Params = {
	params: { method: "login" | "signup" };
};

const formSchema = z
	.object({
		email: z.string().email("Not a valid email"),
		password: z.string().min(8, "Must be at least 8 characters long"),
	})
	.required();

export default function AuthPage({ params }: Params) {
	const { oAuth, passwordSignin, passwordSignup } = Auth();

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (params.method === "login") {
			await passwordSignin(values.email, values.password);
		} else {
			await passwordSignup(values.email, values.password);
		}
		router.replace("/");
	};

	const oAuthHandler = async (provider: "GOOGLE" | "GITHUB") => {
		await oAuth(provider);
		router.replace("/");
	};

	return (
		<main className="flex items-center justify-center h-[calc(100svh-90px)] p-6">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 max-w-xl w-full min-w-[320px]"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex items-center gap-x-4">
						<Button
							onClick={() => oAuthHandler("GOOGLE")}
							className="flex-1 gap-x-1 bg-transparent border text-white hover:text-black"
							type="button"
						>
							Google
							<FcGoogle size={20} />
						</Button>
						<Button
							onClick={() => oAuthHandler("GITHUB")}
							className="flex-1 gap-x-1 bg-transparent border text-white hover:text-black"
							type="button"
						>
							Github
							<FaGithub size={20} />
						</Button>
					</div>
					<Button type="submit" className="capitalize">
						{params.method}
					</Button>
				</form>
			</Form>
		</main>
	);
}
