import React from 'react'
import OutletNav from '../../../components/OutletNav'
import OutletHeaders from '../../../components/OutletHeaders'

const Budgets = () => {
  return (
    <div>
      <OutletNav />
      <div className="flex items-center justify-between mb-5">
        <OutletHeaders
          title="Budget Tracking"
          subtitle="Set spending limits and track your progress"
        />
        
      </div>
      
    </div>
  )
}

export default Budgets