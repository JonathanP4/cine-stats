"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Auth } from "@/store/Auth";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

type FormData = {
    name: string;
    email: string;
    password: string;
};

const Schema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Email is not valid"),
        password: z.string().min(8, "Minimum of 8 characters"),
    })
    .required();

export default function SignupPage() {
    const [isLogin, setIsLogin] = useState(false);
    const { passwordSignup, oAuth } = Auth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: zodResolver(Schema) });

    const params = useSearchParams();

    useEffect(() => {
        setIsLogin(!!params.get("login"));
    }, [params]);

    const onSubmit = (data: FormData) => {
        const { email, password, name } = data;
        passwordSignup(name, email, password);
    };

    return (
        <main className={"flex justify-center items-center h-full p-6"}>
            <form
                className={"min-w-[320px] w-full max-w-[500px] space-y-3"}
                onSubmit={handleSubmit(onSubmit)}
            >
                {!isLogin && (
                    <div>
                        <Label htmlFor={"name"}>Name</Label>
                        <Input {...register("name")} id={"name"} />
                        {errors.name && (
                            <p className={"text-red-600 text-xs"}>
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                )}
                <div>
                    <Label htmlFor={"email"}>Email</Label>
                    <Input {...register("email")} id={"email"} type={"email"} />
                    {errors.email && (
                        <p className={"text-red-600 text-xs"}>
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div>
                    <Label htmlFor={"password"}>Password</Label>
                    <Input
                        {...register("password")}
                        id={"password"}
                        type={"password"}
                    />
                    {errors.password && (
                        <p className={"text-red-600 text-xs"}>
                            {errors.password.message}
                        </p>
                    )}
                    <div
                        className={"grid sm:flex sm:justify-between gap-4 mt-4"}
                    >
                        <Button
                            onClick={() => oAuth("GOOGLE")}
                            className={
                                "bg-transparent border text-white flex-1 py-6 hover:bg-white hover:text-background"
                            }
                            type={"button"}
                        >
                            Sign in with
                            <span className={"mx-1 font-semibold"}>Google</span>
                            <FcGoogle size={20} />
                        </Button>
                        <Button
                            onClick={() => oAuth("GITHUB")}
                            className={
                                "bg-transparent border text-white flex-1 py-6 hover:bg-white hover:text-background"
                            }
                            type={"button"}
                        >
                            Sign in with{" "}
                            <span className={"mx-1 font-semibold"}>Github</span>{" "}
                            <FaGithub size={20} />
                        </Button>
                    </div>
                </div>
                <Button type={"submit"}>
                    {isLogin ? "Log in" : "Sign Up"}
                </Button>
            </form>
        </main>
    );
}
