'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Film,
  TicketCheck,
  Users,
  BarChart3,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar'

const sidebarItems = [
  {
    title: 'Dashboard',
    icon: BarChart3,
    href: '/admin/dashboard'
  },
  {
    title: 'Movies',
    icon: Film,
    href: '/admin/movies'
  },
  {
    title: 'Bookings',
    icon: TicketCheck,
    href: '/admin/bookings'
  },
  {
    title: 'Customers',
    icon: Users,
    href: '/admin/customers'
  },
  {
    title: 'Schedules',
    icon: Calendar,
    href: '/admin/schedules'
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/admin/settings'
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { openMobile, setOpenMobile } = useSidebar()

  return (
    <>
      <div className='md:hidden fixed top-4 left-4 z-50'>
        <Button
          variant='outline'
          size='icon'
          onClick={() => setOpenMobile(!openMobile)}
          className='rounded-full'
        >
          {openMobile ? (
            <X className='h-4 w-4' />
          ) : (
            <Menu className='h-4 w-4' />
          )}
        </Button>
      </div>

      <Sidebar>
        <SidebarHeader className='p-4'>
          <div className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary'>
              <TicketCheck className='h-4 w-4 text-primary-foreground' />
            </div>
            <span className='text-xl font-bold'>MovieAdmin</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className='gap-2'
                >
                  <Link href={item.href}>
                    <item.icon className='h-4 w-4' />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className='p-4'>
          <Button variant='outline' className='w-full justify-start gap-2'>
            <LogOut className='h-4 w-4' />
            Logout
          </Button>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </>
  )
}
