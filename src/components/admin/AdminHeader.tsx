'use client'

import { Bell, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SidebarTrigger } from '@/components/ui/sidebar'

const AdminHeader = () => {
  return (
    <header className='sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6'>
      <SidebarTrigger className='hidden md:flex' />

      <div className='relative flex-1 max-w-md'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          type='search'
          placeholder='Search...'
          className='w-full pl-8 md:max-w-sm'
        />
      </div>

      <div className='flex items-center gap-4 md:ml-auto'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='icon' className='relative'>
              <Bell className='h-4 w-4' />
              <span className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground'>
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-80'>
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className='max-h-96 overflow-auto'>
              {[1, 2, 3].map((i) => (
                <DropdownMenuItem key={i} className='cursor-pointer p-4'>
                  <div className='grid gap-1'>
                    <p className='text-sm font-medium'>
                      New booking #{1000 + i}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      A new ticket was booked for Interstellar at 7:30 PM
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      2 minute{i > 1 ? 's' : ''} ago
                    </p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <Avatar>
                <AvatarImage
                  src='/placeholder.svg?height=32&width=32'
                  alt='Admin'
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default AdminHeader
