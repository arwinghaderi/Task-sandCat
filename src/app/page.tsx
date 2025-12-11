import Header from '../components/modules/Header/Header'
import SectionHeader from '../components/modules/sectionHeader/sectionHeader'

export default function Home() {
  return (
    <>
      <div className=" p-5 ">
        <Header />
        <div className=' px-5 lg:px-60 '>
          <SectionHeader />
        </div>
      </div>
    </>
  )
}
