'use client'

import { Button } from '@/components/ui/button'
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
import { useToast } from '@/hooks/use-toast'
import authService from '@/services/auth-service'
import { ResetPasswordPayload } from '@/types/auth-type'
import { resetPasswordSchema } from '@/validations/auth-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const ResetPasswordForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const form = useForm<ResetPasswordPayload>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      resetPasswordToken: '',
      password: '',
      confirmPassword: ''
    }
  })

  /** Events handler */
  const handleResetPasswordFormSubmit = async (data: ResetPasswordPayload) => {
    setIsLoading(true)

    try {
      const payload: Omit<ResetPasswordPayload, 'confirmPassword'> = {
        resetPasswordToken: data.resetPasswordToken,
        password: data.password
      }

      const res = await authService.resetPassword(payload)

      if (res.statusCode === HTTP_STATUS_CODES.SUCCESS) {
        toast({
          description: 'Đặt lại mật khẩu thành công'
        })

        router.push('/login')
      }
    } catch (error: any) {
      toast({
        description: 'Đặt lại mật khẩu thất bại!'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        className='space-y-4'
        onSubmit={form.handleSubmit(handleResetPasswordFormSubmit)}
      >
        <div className='space-y-2'>
          <FormField
            control={form.control}
            disabled={isLoading}
            name='resetPasswordToken'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='Nhập code' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            disabled={isLoading}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu mới</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Nhập mật khẩu mới'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            disabled={isLoading}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Nhập xác nhận mật khẩu mới'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading && <Loader2 className='animate-spin' />}
          Đặt lại mật khẩu
        </Button>
      </form>
    </Form>
  )
}

export default ResetPasswordForm
