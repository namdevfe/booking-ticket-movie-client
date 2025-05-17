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
import { ForgotPasswordPayload } from '@/types/auth-type'
import { forgotPasswordSchema } from '@/validations/auth-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const ForgotPasswordForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const form = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  /** Events handler */
  const handleForgotPasswordFormSubmit = async (
    data: ForgotPasswordPayload
  ) => {
    setIsLoading(true)

    try {
      const payload: ForgotPasswordPayload = { ...data }
      const res = await authService.forgotPassword(payload)

      if (res.statusCode === HTTP_STATUS_CODES.SUCCESS) {
        toast({
          description:
            'Yêu cầu đặt lại mật khẩu đã gửi đến email của bạn. Vui lòng kiểm tra email!'
        })
        router.push('/reset-password')
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: error.message || 'Có lỗi xảy ra!'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        className='space-y-4'
        onSubmit={form.handleSubmit(handleForgotPasswordFormSubmit)}
      >
        <div className='space-y-2'>
          <FormField
            control={form.control}
            disabled={isLoading}
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
        </div>
        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading && <Loader2 className='animate-spin' />}
          Gửi yêu cầu đặt lại mật khẩu
        </Button>
      </form>
    </Form>
  )
}

export default ForgotPasswordForm
