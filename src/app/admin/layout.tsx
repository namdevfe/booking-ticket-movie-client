import { AdminHeader, AdminSidebar } from '@/components/admin'
import { SidebarProvider } from '@/components/ui/sidebar'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className='flex min-h-screen bg-background w-full'>
        <AdminSidebar />
        <div className='flex-1'>
          <AdminHeader />
          <main className='p-6'>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout
