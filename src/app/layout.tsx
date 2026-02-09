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
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-2xl h-20 flex items-center px-8 md:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            Fortus Buyer Portal
          </h1>
        </header>

        <div className="flex pt-20 min-h-screen">
          <Navigation />
          <main className="flex-1 p-8 md:p-12 overflow-y-auto pb-28 md:pb-12 md:pl-64 lg:pl-80">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}