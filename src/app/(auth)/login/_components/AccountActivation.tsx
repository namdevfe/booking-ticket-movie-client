'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import authService from '@/services/auth-service'
import { HTTP_STATUS_CODES } from '@/constants/http-status-code'
import { useToast } from '@/hooks/use-toast'

interface AccountActivationProps {
  email: string
  isOpen?: boolean
  onClose?: (isOpen: boolean) => void
}

export default function AccountActivation({
  email = '',
  isOpen = false,
  onClose
}: AccountActivationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [isSent, setIsSent] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (isSent && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isSent, countdown])

  const handleResendEmail = async () => {
    setIsLoading(true)

    if (!!email) {
      try {
        const res = await authService.retryActive({ email })

        if (res.statusCode === HTTP_STATUS_CODES.SUCCESS) {
          setIsSent(true)
          setCountdown(60)
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
  }

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => onClose?.(isOpen)}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-red-500'>
            Tài khoản chưa được kích hoạt
          </DialogTitle>
          <DialogDescription>
            Tài khoản của bạn chưa được kích hoạt. Vui lòng kiểm tra email để
            hoàn tất quá trình kích hoạt.
          </DialogDescription>
        </DialogHeader>
        <Alert className='mb-4'>
          <AlertTitle>Thông báo:</AlertTitle>
          <AlertDescription>
            Tài khoản của bạn chưa được kích hoạt. Vui lòng kiểm tra email để
            hoàn tất quá trình kích hoạt.
          </AlertDescription>
        </Alert>
        <Button
          onClick={handleResendEmail}
          disabled={isLoading || (isSent && countdown > 0)}
          className='w-full'
        >
          {isLoading
            ? 'Đang gửi...'
            : isSent && countdown > 0
            ? `Gửi lại sau ${countdown}s`
            : 'Gửi lại email kích hoạt'}
        </Button>
        <div className='mt-4 text-center text-sm text-gray-500'>
          Không nhận được email?{' '}
          <a href='/support' className='text-blue-500'>
            Liên hệ hỗ trợ
          </a>
          .
        </div>
      </DialogContent>
    </Dialog>
  )
}
