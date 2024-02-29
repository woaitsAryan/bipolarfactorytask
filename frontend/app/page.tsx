'use client'

import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from "next/link"
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


export default function Home() {

  const router = useRouter();

  const [isSignedin, setIsSignedin] = useState(false)
  useEffect(() => {
    if (Cookies.get('token')) {
      setIsSignedin(true)
    }
  }, [])

  const handleBook = async () => {
    if (!isSignedin) {
      toast.error('Please sign in to book a flight')
      router.push('/login')
      return;
    }
    router.push('/book')
  }

  const handleLogout = () => {
    Cookies.remove('token')
    setIsSignedin(false)
    router.push('/')
  }



  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <div className="flex gap-4">
            {!isSignedin ? (
              <>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/signup">
                  Sign Up
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
                  Login
                </Link>
              </>) : (
              <>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/myflights">
                  My flights
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="/book">
                  Book a flight
                </Link>
                <button  className="text-sm font-medium hover:underline underline-offset-4" onClick = {handleLogout}>Logout</button>
              </>
            )
            }
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Find your next adventure
                </h1>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Search for the best flight deals. Enter your departure city, destination, and travel dates to find the
                  best prices.
                </p>
              </div>
              <button
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 text-neutral-50 bg-black px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
                onClick={handleBook}
              >
                Book Now
              </button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid max-w-5xl mx-auto items-start gap-6 lg:grid-cols-2 lg:gap-10">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Paris, France</h2>
                  <p className="text-gray-500 dark:text-gray-400">City of Love</p>
                </div>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="/book"
                >
                  Book Paris
                </Link>
              </div>
              <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                <Image
                  alt="Image"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="310"
                  src="/paris.jpg"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid max-w-5xl mx-auto items-start gap-6 lg:grid-cols-2 lg:gap-10">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Tokyo, Japan</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    The city of ancient tradition and modern technology
                  </p>
                </div>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="/book"
                >
                  Book Tokyo
                </Link>
              </div>
              <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                <Image
                  alt="Image"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="310"
                  src="/tokyo.webp"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 FlyAway Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function MountainIcon(props: any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
