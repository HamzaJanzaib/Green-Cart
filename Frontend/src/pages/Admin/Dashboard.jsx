import React from 'react'
import { DetailsBox } from '../../Components/Admin'

const Dashboard = () => {
  return (
    <div className="no-scrolbar py-10 flex-1 h-[95vh] flex overflow-y-scroll flex-col justify-between bg-[#F9FAFB]">
      <DetailsBox />
    </div>
  )
}

export default Dashboard