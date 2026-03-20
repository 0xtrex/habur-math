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

          <div className="flex items-center gap-6 mt-2 md:mt-0">

            <p>
              Built with Next.js • TypeScript
            </p>

            {/* Developer */}
            <a
              href="https://github.com/0xtrex"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition"
            >

              {/* GitHub Icon (SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.87 3.15 9 7.52 10.46.55.1.75-.24.75-.53v-1.87c-3.06.67-3.7-1.3-3.7-1.3-.5-1.27-1.22-1.61-1.22-1.61-1-.68.08-.67.08-.67 1.1.08 1.67 1.13 1.67 1.13.98 1.68 2.58 1.2 3.2.92.1-.72.38-1.2.7-1.48-2.44-.28-5-1.22-5-5.42 0-1.2.43-2.17 1.13-2.94-.12-.28-.5-1.4.1-2.92 0 0 .92-.3 3 .12a10.5 10.5 0 0 1 5.46 0c2.08-.42 3-.12 3-.12.6 1.52.22 2.64.1 2.92.7.77 1.13 1.74 1.13 2.94 0 4.21-2.56 5.13-5 5.42.4.34.75 1.02.75 2.06v3.06c0 .3.2.64.75.53a11.26 11.26 0 0 0 7.52-10.46C23.25 5.48 18.27.5 12 .5z"/>
              </svg>

              <span>
                Developed by T REX
              </span>

            </a>

          </div>

        </div>

      </div>

    </footer>
  )
}
