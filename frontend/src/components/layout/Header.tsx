import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

function GithubMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.35-3.88-1.35-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.07.78 2.15 0 1.56-.01 2.81-.01 3.19 0 .3.2.66.79.55A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/config', label: 'Config' },
  { to: '/history', label: 'History' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-4 px-3">
        <NavLink to="/" className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <span className="h-3 w-3 rounded-full bg-sky-600 shadow-[0_0_0_4px_rgba(2,132,199,0.15)]" />
          myNetwork
        </NavLink>

        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-2.5 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900',
                  isActive && 'bg-sky-50 text-sky-700',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <a
          href="https://github.com/aceberg/WatchYourLAN"
          target="_blank"
          rel="noreferrer"
          title="Original project"
          className="ml-auto text-slate-500 transition-colors hover:text-slate-900"
        >
          <GithubMark className="h-[18px] w-[18px]" />
        </a>
      </div>
    </header>
  )
}
