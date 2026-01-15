import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center max-w-2xl px-4">
        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
          AG
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">AdGen SaaS</h1>
        <p className="text-xl text-gray-600 mb-8">Enterprise Multi-Tenant Platform</p>
        <Link href="/login" className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg shadow-lg transition-all">
          Sign In
        </Link>
      </div>
    </div>
  );
}
