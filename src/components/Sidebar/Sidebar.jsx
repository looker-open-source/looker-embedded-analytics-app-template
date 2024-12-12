import routes from './routes'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <>
      <div className="p-4 px-8 w-64 min-w-[300px] shrink-0">
        <h2 className="my-4">Looker Application Template </h2>
        <nav className="flex flex-col gap-2">
          {routes.map((route, i) => (
            <div className="py-1.5" key={i}>
              <Link to={route.path}>
                <div
                  className={`group relative flex h-12 items-center gap-3 overflow-hidden whitespace-nowrap rounded-full p-4 text-white ${pathname === route.path ? 'custom-bg-menu-selected' : ''}`}
                >
                  <img
                    className="size-5 shrink-0 "
                    src={route.img}
                    alt={route.name}
                  />
                  {route.name}
                </div>
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
