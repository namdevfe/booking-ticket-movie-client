'use client'

import AccountActivation from '@/app/(auth)/login/_components/AccountActivation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { HTTP_STATUS_CODES } from '@/constants/http-status-code'
import { toast } from '@/hooks/use-toast'
import authService from '@/services/auth-service'
import { LoginPayload } from '@/types/auth-type'
import { loginSchema } from '@/validations/auth-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const defaultValues = {
  email: '',
  password: ''
}

const LoginForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isShowResendVerifyEmail, setIsShowResendVerifyEmail] =
    useState<boolean>(false)

  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues
  })

  const onSubmit = async (data: LoginPayload) => {
    setIsLoading(true)
    const payload = { ...data }

    try {
      const res = await authService.login(payload)

      if (!!res.data) {
        // Save token to localStorage
        localStorage.setItem(
          'accessToken',
          JSON.stringify(res.data.accessToken)
        )
        localStorage.setItem(
          'refreshToken',
          JSON.stringify(res.data.refreshToken)
        )

        // Set cookies on next server
        const resFromNextServer: { statusCode: number; message: string } =
          await authService.auth(res.data)

        if (resFromNextServer.statusCode === 200) {
          toast({
            variant: 'default',
            description: res.message
          })

          // Reset form
          form.reset(defaultValues)

          router.push('/')
        }
      }
    } catch (error: any) {
      // Account inactived
      if (error.statusCode === HTTP_STATUS_CODES.FORBIDDEN) {
        setIsShowResendVerifyEmail(true)
      }

      toast({
        description: error.message,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  /** Events handler */
  const handleCloseResendVerifyEmail = (isOpen: boolean) => {
    setIsShowResendVerifyEmail(isOpen)
  }

  return (
    <>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center'>
            Đăng nhập
          </CardTitle>
          <CardDescription className='text-center'>
            Nhập thông tin đăng nhập của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                disabled={isLoading}
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder='Nhập email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex flex-col gap-2'>
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Nhập mật khẩu'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link
                  href='/forgot-password'
                  className='text-right text-primary text-sm hover:underline'
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading && <Loader2 className='animate-spin' />}
                Đăng nhập
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <p className='text-sm text-muted-foreground'>
            Bạn chưa có tài khoản?{' '}
            <Link href='/register' className='text-primary hover:underline'>
              Đăng ký ngay
            </Link>
          </p>
        </CardFooter>
      </Card>

      {isShowResendVerifyEmail && (
        <AccountActivation
          email={form.getValues('email')}
          isOpen={isShowResendVerifyEmail}
          onClose={handleCloseResendVerifyEmail}
        />
      )}
    </>
  )
}

export default LoginForm
