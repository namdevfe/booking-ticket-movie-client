import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, Film, Ticket, Users, TrendingUp } from 'lucide-react'

const AdminDashboardPage = () => {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
        <p className='text-muted-foreground'>
          Overview of your movie booking platform
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$24,685</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-emerald-500'>+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Bookings</CardTitle>
            <Ticket className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1,482</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-emerald-500'>+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Active Movies</CardTitle>
            <Film className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>24</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-emerald-500'>+2</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Customers</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>3,642</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-rose-500'>-1.3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='overview'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          <TabsTrigger value='reports'>Reports</TabsTrigger>
        </TabsList>
        <TabsContent value='overview' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>You had 248 bookings this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className='flex items-center gap-4 rounded-lg border p-4'
                  >
                    <div className='h-12 w-12 rounded bg-muted flex items-center justify-center'>
                      <Ticket className='h-6 w-6 text-muted-foreground' />
                    </div>
                    <div className='flex-1 space-y-1'>
                      <p className='font-medium'>Booking #{10024 + i}</p>
                      <div className='flex items-center text-sm text-muted-foreground'>
                        <span>Interstellar • 2 tickets • Hall A</span>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium'>$24.00</p>
                      <p className='text-sm text-muted-foreground'>
                        May 18, 7:30 PM
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='analytics' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Monthly revenue breakdown</CardDescription>
            </CardHeader>
            <CardContent className='h-[300px] flex items-center justify-center'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <BarChart3 className='h-5 w-5' />
                <span>Analytics charts would appear here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='reports' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Download and manage reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <p className='text-muted-foreground'>
                  No reports generated yet.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminDashboardPage
