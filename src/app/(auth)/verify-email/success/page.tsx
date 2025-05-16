import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const VerificationSuccessPage = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
      <Card className='w-full max-w-md text-center'>
        <CardHeader>
          <div className='flex justify-center mb-2'>
            <CheckCircle className='h-16 w-16 text-green-500' />
          </div>
          <CardTitle className='text-2xl'>Email Verified!</CardTitle>
          <CardDescription>
            Your email has been successfully verified.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-gray-600'>
            Thank you for verifying your email address. You now have full access
            to all features of your account.
          </p>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button asChild className='px-8'>
            <Link href='/'>Go to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default VerificationSuccessPage
