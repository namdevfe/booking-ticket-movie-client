import ForgotPasswordForm from '@/app/(auth)/forgot-password/_components/ForgotPasswordForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const ForgotPasswordPage = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            Đặt lại mật khẩu
          </CardTitle>
          <CardDescription className='text-center'>
            Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn một liên kết
            để đặt lại mật khẩu của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
        <CardFooter className='flex justify-center border-t p-4'>
          <Link
            href='/login'
            className='flex items-center text-sm text-gray-600 hover:text-gray-900'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Quay lại trang đăng nhập
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ForgotPasswordPage
