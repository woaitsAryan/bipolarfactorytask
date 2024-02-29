'use client'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ry8CXeR7Y3Q
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { useState, useEffect } from 'react';
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import { cn } from "@/lib/utils"
import axios from "axios"
import { FlightCard } from "@/components/flightcard"


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

  const [formData, setFormData] = useState({
    departure: '',
    arrival: '',
    fromTime: '',
    toTime: ''
  })

  const [flightData, setFlightData] = useState<Flight[]>([])

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/flight/flights?departure=${formData.departure}&arrival=${formData.arrival}`)
    console.log(response.data)
    console.log(formData)
    console.log(date)
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/flight/flights`)
      setFlightData(res.data.flights)
      console.log(res.data)
    }
    fetchData()
  }, [])

  const handleBookFlight = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/flight/bookflight`, flightData)
    console.log(response)
  }


  return (
    <main>
      <div className="space-y-6">
        <div className="space-y-2 flex justify-center flex-col items-center">
          <div className="flex items-center gap-2 ">
            <PlaneIcon className="w-6 h-6 " />
            <div className="text-2xl font-bold ">Book a flight</div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Enter your flight details to get started</div>
        </div>
        <form onSubmit={handleSubmit}>
          <Card className="p-0">
            <CardContent className="space-y-4 p-4 md:p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label className="sr-only" htmlFor="from">
                    From
                  </Label>
                  <Input id="departure" placeholder="From" onChange={handleChange} />
                  <div className={cn("grid gap-2")}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-[100%] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(date.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label className="sr-only" htmlFor="to">
                    To
                  </Label>
                  <Input id="arrival" placeholder="To" onChange={handleChange} />

                </div>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Label className="w-[6.5rem] flex items-center gap-2 text-sm" htmlFor="departure">
                    <span>Departure</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">(optional)</span>
                  </Label>
                  <Input className="w-[calc(100%-1.625rem)]" id="toTime" placeholder="10:00 AM" type="time" onChange={handleChange} />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="w-[6.5rem] flex items-center gap-2 text-sm" htmlFor="arrival">
                    <span>Arrival</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">(optional)</span>
                  </Label>
                  <Input className="w-[calc(100%-1.625rem)]" id="toTime" placeholder="10:00 AM" type="time" onChange={handleChange} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 md:p-6 flex justify-center">
              <Button className=" w-1/2 md:w-1/4" type="submit">Search flights</Button>
            </CardFooter>
          </Card>
        </form>
        <div className="grid gap-4 md:grid-cols-2">
          {flightData.map((flight) => (
            <FlightCard key={flight._id} {...flight} />
          ))}
        </div>
        </div>
    </main>
  )
}

function CalendarIcon(props:any) { 
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}


function ClockIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function PlaneIcon(props: any) {
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
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  )
}
