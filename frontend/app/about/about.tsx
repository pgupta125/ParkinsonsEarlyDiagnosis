import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About Our Team</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 relative mb-4">
            <Image
              src="/team/member1.jpg"
              alt="Team Member 1"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold">Team Member 1</h2>
          <p className="text-gray-600">Role / Position</p>
        </div>
        
        {/* Add more team members following the same structure */}
      </div>

      <div className="mt-12 prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg">
          We're dedicated to leveraging artificial intelligence and machine learning
          to assist in early detection of Parkinson's disease through voice analysis.
        </p>
      </div>

      <Link 
        href="/"
        className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  )
}
