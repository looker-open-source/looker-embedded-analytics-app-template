import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import bgImage from 'assets/images/globe.png'

export default function Root() {
  return (
    <>
      <div className="flex flex-row size-full h-screen overscroll-none font-medium text-white bg-[#121212] antialiased">
        <img
          className="fixed w-1/2 opacity-20 mix-blend-screen pointer-events-none"
          src={bgImage}
          alt="Globe used as a background"
        ></img>
        <Sidebar />
        <div className="flex w-full flex-col h-full overflow-hidden pb-8">
          <Header />
          <div className="h-full overflow-scroll no-scrollbar">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
