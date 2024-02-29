'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie'
import {useRouter} from 'next/navigation';

export default function SignUp() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const data = {
            email: formData.email,
            password: formData.password,
        };
        try{

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, data)
        
        Cookies.set('token', response.data.token)
        toast.success('Logged in successfully')
        router.push('/book')
        }catch(err: any){
            toast.error(err.response.data.detail || 'An error occurred. Please try again')
        }

    }



return (
    <main className="flex-1">
        <section className="w-full sm:py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container flex flex-col items-center px-4 md:px-6 space-y-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                        Login in your account
                    </h1>
                    <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Don&apos;t have an account?
                        <Link className="underline" href="/signup">
                            Sign up
                        </Link>
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="m@example.com" required type="email" onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" required type="password" onChange={handleChange} />
                    </div>
                    <Button className="w-full" type="submit">
                        Login
                    </Button>
                </form>
            </div>
        </section>
    </main>
)
}