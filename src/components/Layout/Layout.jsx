import { Outlet } from 'react-router-dom'
import Nav from '../Navbar/Nav'
import Search from '../Search/Search'
import DataStewardshipData from '../DataStewardship/StewardshipParent'

const Layout = () => (
  <div className="h-screen overflow-hidden relative">
    <Nav />
    <Search />
    <DataStewardshipData />
    <main>
      <Outlet />
    </main>
    <footer className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-light text-center">
      &copy; 2024 Markaaz Inc. Use of this portal is governed by the terms of the licensing agreement
    </footer>
  </div>
)

export default Layout
