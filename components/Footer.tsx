"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 mt-40">

      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              HABUR MATH
            </h2>

            <p className="mt-4 text-gray-400 max-w-sm">
              A community playground where cricket, football and
              unforgettable memories are created every day.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
              Navigation
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/players" className="hover:text-white transition">
                  Players
                </Link>
              </li>

              <li>
                <Link href="/toss" className="hover:text-white transition">
                  Digital Toss
                </Link>
              </li>

              <li>
                <Link href="/gallery" className="hover:text-white transition">
                  Gallery
                </Link>
              </li>

            </ul>
          </div>

          {/* Sports */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
              Sports
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-white transition">
                🏏 Cricket
              </li>

              <li className="hover:text-white transition">
                ⚽ Football
              </li>
            </ul>

          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between text-sm text-gray-500">

          <p>
            © {new Date().getFullYear()} HABUR MATH Playground
          </p>

          <p className="mt-2 md:mt-0">
            Built with Next.js • TypeScript
          </p>

        </div>

      </div>

    </footer>
  )
}
