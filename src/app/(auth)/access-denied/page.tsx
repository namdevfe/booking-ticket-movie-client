import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

const AccessDeniedPage = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
      <Card className='mx-auto max-w-md shadow-lg'>
        <CardHeader className='text-center'>
          <div className='flex justify-center mb-2'>
            <ShieldAlert className='h-12 w-12 text-red-500' />
          </div>
          <CardTitle className='text-2xl font-bold text-red-600'>
            Permission Denied
          </CardTitle>
          <CardDescription className='text-gray-600'>
            You do not have permission to access this page
          </CardDescription>
        </CardHeader>
        <CardContent className='text-center'>
          <p className='mb-4 text-gray-700'>
            This area is restricted. If you believe you should have access,
            please contact your administrator.
          </p>
        </CardContent>
        <CardFooter className='flex justify-center gap-4'>
          <Button asChild variant='outline'>
            <Link href='/'>Return Home</Link>
          </Button>
          <Button asChild>
            <Link href='/contact'>Contact Support</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AccessDeniedPage
