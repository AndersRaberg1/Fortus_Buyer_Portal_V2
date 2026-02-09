import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata = {
  title: 'Fortus Buyer Portal',
  description: 'Mockup för buyer portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        {/* Fixed header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-lg h-16 flex items-center px-6 md:px-10">
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            Fortus Buyer Portal
          </h1>
        </header>

        {/* Navigation + content */}
        <div className="flex pt-16 min-h-screen">
          <Navigation />
          <main className="flex-1 p-6 md:p-10 overflow-y-auto pb-24 md:pb-10 md:pl-64 lg:pl-72">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}