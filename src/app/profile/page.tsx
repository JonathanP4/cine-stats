"use client";

import { Auth } from "@/store/Auth";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import "./page.css";
import { updateUserData } from "@/lib/firedb";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { user, dbUser, updateDbUser } = Auth();
    const [showMessage, setShowMessage] = useState(false);
    const [inputs, setInputs] = useState({
        image: "",
        name: "",
    });
    const router = useRouter();

    useEffect(() => {
        if (dbUser)
            setInputs({ image: dbUser.photoURL || "", name: dbUser.name });
    }, [dbUser]);

    const inputChangeHandler = (e: ChangeEvent) => {
        const element = e.target as HTMLInputElement;
        setInputs((state) => {
            const name = element.name as "image" | "name";
            const newSate = { ...state };
            newSate[name] = element.value;

            return newSate;
        });
    };

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        if (user) {
            const data = {
                uid: user.uid,
                name: inputs.name,
                email: user.email!,
                photoURL: inputs.image,
            };
            await updateUserData(
                data.uid,
                data.photoURL,
                data.name,
                data.email,
            );
            updateDbUser(data);
            setShowMessage(true);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => setShowMessage(false), 5000);

        return () => clearTimeout(timeout);
    }, [showMessage]);

    return (
        <main
            className={
                "grid h-[calc(100svh-88px)] place-content-center relative"
            }
        >
            {showMessage && (
                <div className={`popup ${!showMessage && "popup--hide"}`}>
                    Profile Updated!
                </div>
            )}
            <div>
                <figure className={"flex justify-center mb-4"}>
                    <div
                        className={
                            "border border-white grid place-content-center h-[200px] w-[200px] rounded-full"
                        }
                    >
                        {inputs.image ? (
                            <img
                                className={
                                    "h-[198px] object-cover rounded-full"
                                }
                                src={inputs.image}
                                alt="user profile picture"
                            />
                        ) : (
                            <div className={"text-8xl"}>
                                {dbUser?.name[0].toUpperCase()}
                            </div>
                        )}
                    </div>
                </figure>
                <form
                    onSubmit={submitHandler}
                    className={"sm:min-w-[500px] space-y-3"}
                >
                    <div>
                        <Label>Image URL</Label>
                        <Input
                            name={"image"}
                            onChange={inputChangeHandler}
                            value={inputs.image}
                        />
                    </div>
                    <div>
                        <Label>Name</Label>
                        <Input
                            name={"name"}
                            onChange={inputChangeHandler}
                            value={inputs.name}
                        />
                    </div>
                    <div className={"flex items center gap-3 mt-5"}>
                        <Button
                            className={
                                "flex-1 border border-white text-white bg-transparent hover:bg-primary hover:text-black"
                            }
                            type={"submit"}
                        >
                            Update
                        </Button>
                        <Button
                            onClick={() => router.back()}
                            className={
                                "flex-1 border border-white text-white bg-transparent hover:bg-primary hover:text-black"
                            }
                            type={"button"}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
