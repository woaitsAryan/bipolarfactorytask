/**
 * v0 by Vercel.
 * @see https://v0.dev/t/MwWmIUMdpD9
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

export default function Component() {
  return (
    <>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 items-start w-full max-w-6xl px-4 gap-4 md:px-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Centers</h1>
          <p className="text-gray-500 md:text-xl dark:text-gray-400">
            Search for vaccination centers by pincode, state, or name.
          </p>
        </div>
        <div className="flex flex-col space-y-2 md:col-start-2 md:space-y-4 lg:space-y-2">
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input id="pincode" placeholder="Enter pincode" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select id="state">
              <option>Choose a state</option>
              <option>Andhra Pradesh</option>
              <option>Arunachal Pradesh</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter name" />
          </div>
          <Button>Search</Button>
          <Button variant="outline">Reset</Button>
        </div>
      </div>
      <div className="w-full max-w-6xl px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Max Super Speciality Hospital</CardTitle>
              <CardDescription>
                1-2-1, Secretariat Road, Beside Ravindra Bharathi, Saifabad, Khairatabad, Hyderabad, Telangana 500063
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Dates: 25-02-2024 to 27-02-2024</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>Timings: 9:00 AM to 5:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Max Super Speciality Hospital</CardTitle>
              <CardDescription>
                1-2-1, Secretariat Road, Beside Ravindra Bharathi, Saifabad, Khairatabad, Hyderabad, Telangana 500063
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Dates: 25-02-2024 to 27-02-2024</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>Timings: 9:00 AM to 5:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

function CalendarIcon(props) {
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


function ClockIcon(props) {
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
