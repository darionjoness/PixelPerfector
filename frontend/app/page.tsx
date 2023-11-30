import Image from 'next/image'
import Navbars from './components/Navbars'
import Navbar from './components/Navbar'
import HomeShowcase from './components/HomeShowcase'
import Footer from './components/Footer'


export default function Home() {
  return (
    <div>
      <Navbars />
      <HomeShowcase />
      <Footer />
    </div>
  )
}
