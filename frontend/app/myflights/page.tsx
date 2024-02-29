'use client'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DDIB0M26TM4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MyFlightCard } from "@/components/myflightcard";

interface Flight {
    _id: string;
    planeType: string;
    departure: string;
    arrival: string;
    fromDate: string;
    toDate: string;
    fromTime: string;
    toTime: string;
    price: string;
    seats: string;
    company: string;
}

export default function Component() {
    const router = useRouter();
    const [flightData, setFlightData] = useState<Flight[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/flight/myflights`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            })
            setFlightData(response.data.flights)
        }
        fetchData()
    },[])


  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex items-center px-4 sm:px-6 py-2 border-b gap-4">
        <Link
          className="flex items-center space-x-2 text-sm font-medium group text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          href="/"
        >
          <ChevronLeftIcon className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform" />
          Back
        </Link>
        <h1 className="text-lg font-bold tracking-tighter">My Flights</h1>
      </header>
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="space-y-6">
        {flightData.map((flight) => (
            <MyFlightCard key={flight._id} {...flight} />
          ))}
        </div>
      </main>
      
    </div>
  )
}

function ChevronLeftIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}
