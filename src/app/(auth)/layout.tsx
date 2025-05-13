const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      {children}
    </main>
  )
}

export default AuthLayout
