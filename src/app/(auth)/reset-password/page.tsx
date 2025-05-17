import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import ResetPasswordForm from '@/app/(auth)/reset-password/_components/ResetPasswordForm'

const ResetPasswordPage = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <Card className='min-w-[400px]'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            Đặt lại mật khẩu mới
          </CardTitle>
          <CardDescription className='text-center'>
            Nhập mật khẩu mới của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPasswordPage
