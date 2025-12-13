// این فایل سرور کامپوننت باقی می‌مونه
import Header from '../components/modules/Header/Header'
import SectionHeader from '../components/modules/sectionHeader/sectionHeader'
import GameClient from '../components/template/GameClient/GameClient'

export default function Home() {
  return (
    <div className="p-5">
      <Header />
      <div className="px-5 lg:px-60 mt-6">
        <SectionHeader />
      </div>
      <div className="px-2 lg:px-60 mt-6">
        <GameClient />
      </div>
    </div>
  )
}
