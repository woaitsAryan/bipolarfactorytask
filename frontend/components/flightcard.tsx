import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { CardFooter, Card, CardContent } from "./ui/card";
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";


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


export function FlightCard(props: Flight) {

    const handleBook = async (flight: string) => {
        console.log(Cookies.get('token'))

        const response = await axios.patch(`http://localhost:8000/bookflight/${flight}`,{}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
        toast.success(response.data.message)
    }
    
    return (
        <Card key={props._id}>
            <CardContent className="space-y-4 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">{props.planeType}</div>
                    </div>
                    <div className="text-lg font-bold">Rs. {props.price}</div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-500 dark:text-gray-400">From</div>
                        <div className="text-lg font-bold">{props.departure}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-500 dark:text-gray-400">To</div>
                        <div className="text-lg font-bold">{props.arrival}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{props.fromDate} - {props.toDate}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{props.fromTime} - {props.toTime}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Company</div>
                    <div className="text-lg font-bold">{props.company}</div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Seats left</div>
                    <div className="text-lg font-bold">{props.seats}</div>
                </div>
            </CardContent>
            <CardFooter className="p-4 md:p-6">
                <Button className="w-full" type="submit" onClick={() => handleBook(props._id)}>Book</Button>
            </CardFooter>
        </Card>
    )
}
