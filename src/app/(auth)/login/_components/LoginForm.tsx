'use client'

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
import { toast } from '@/hooks/use-toast'
import authService from '@/services/auth-service'
import { LoginPayload } from '@/types/auth-type'
import { loginSchema } from '@/validations/auth-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const defaultValues = {
  email: '',
  password: ''
}

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues
  })

  async function onSubmit(data: LoginPayload) {
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
            description: res.message
          })

          // Reset form
          form.reset(defaultValues)
        }
      }
    } catch (error: any) {
      toast({
        description: error.message,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold text-center'>
          Login to system
        </CardTitle>
        <CardDescription className='text-center'>
          Enter your information to login
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
                    <Input
                      type='email'
                      placeholder='example@gmail.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={isLoading}
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading && <Loader2 className='animate-spin' />}
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <p className='text-sm text-muted-foreground'>
          Do you not have an account?{' '}
          <Link href='/register' className='text-primary hover:underline'>
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export default LoginForm
