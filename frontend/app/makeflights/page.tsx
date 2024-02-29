'use client'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LQ2ifT6jXrB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

export default function Component() {
    const [formDate, setFormDate] = useState({
        planeType: '',
        departure: '',
        arrival: '',
        fromDate: '',
        toDate: '',
        fromTime: '',
        toTime: '',
        price: '',
        seats: '',
        company: ''
    })

    const handleChange = (e: any) => {
        setFormDate({ ...formDate, [e.target.id]: e.target.value });

    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/flight/addflight`, formDate,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    }
                }
            )
            console.log(response)
            toast.success(response.data.message)
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Create Flight</h1>
                <p className="text-gray-500 dark:text-gray-400">Enter the flight details</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="plane-type">Plane type</Label>
                        <Input id="planeType" placeholder="Type of plane" required onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="departure-location">Departure location</Label>
                        <Input id="departure" placeholder="Departure location" required onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="arrival-location">Arrival location</Label>
                        <Input id="arrival" placeholder="Arrival location" required onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="departure-date">Departure date</Label>
                        <Input id="fromDate" required type="date" onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="return-date">Return date</Label>
                        <Input id="toDate" type="date" onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="departure-time">Departure time</Label>
                        <Input id="fromTime" required type="time" onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="return-time">Return time</Label>
                        <Input id="toTime" type="time" onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" placeholder="Price" required onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="available-seats">Available seats</Label>
                        <Input id="seats" placeholder="Available seats" required onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company-name">Company name</Label>
                        <Input id="company" placeholder="Company name" required onChange={handleChange} />
                    </div>
                </div>
                <Button className="w-full" type="submit">Save</Button>
            </form>
        </div>
    )
}

