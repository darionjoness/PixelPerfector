import Image from 'next/image'
import Navbars from './components/Navbars'
import Navbar from './components/Navbar'
import HomeShowcase from './components/HomeShowcase'

export default function Home() {
  return (
    <div>
      <Navbars />
      <HomeShowcase />
    </div>
  )
}
