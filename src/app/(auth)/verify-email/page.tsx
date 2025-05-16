import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { HTTP_STATUS_CODES } from '@/constants/http-status-code'
import authService from '@/services/auth-service'
import { redirect } from 'next/navigation'

const VerifyEmailPage = async ({
  searchParams
}: {
  searchParams: { token?: string }
}) => {
  const token = searchParams.token

  // If no token is provided, show an error
  if (!token) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle className='text-xl text-red-500'>
              Verification Failed
            </CardTitle>
            <CardDescription>
              No verification token was provided.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-gray-600'>
              Please check your email and click the verification link again, or
              request a new verification email.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // // Verify the token
  const res = await authService.verifyEmail(token)

  if (res.statusCode === HTTP_STATUS_CODES.SUCCESS) {
    redirect('/verify-email/success')
  }
}

export default VerifyEmailPage
