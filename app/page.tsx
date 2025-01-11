import PasswordGenerator from '@/components/PasswordGenerator'

export default function Home() {
  return (
    <div className="dark">
      <div className="background-grid"></div>
      <main className="relative flex min-h-screen flex-col items-center justify-center p-4 md:p-21">
        <PasswordGenerator />
      </main>
    </div>
  )
}

