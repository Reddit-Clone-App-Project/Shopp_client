import React from 'react'

const OrderStatusFilter = ({ currentStatus, handleChangeStatus }: {currentStatus: 'All' | 'Not processed yet' | 'Processed', handleChangeStatus: (status: 'All' | 'Not processed yet' | 'Processed') => void }) => {
  return (
    <div className='flex items-center gap-4 mt-6 text-lg'>
      <label>Order status</label>
      <button className={`${currentStatus === 'All' ? 'bg-purple-600' : 'bg-gray-600 hover:bg-gray-700 cursor-pointer'} text-white px-4 py-2 rounded transition-colors`} onClick={() => handleChangeStatus('All')}>All</button>
      <button className={`${currentStatus === 'Not processed yet' ? 'bg-purple-600' : 'bg-gray-600 hover:bg-gray-700 cursor-pointer'} text-white px-4 py-2 rounded transition-colors`} onClick={() => handleChangeStatus('Not processed yet')}>Not processed yet</button>
      <button className={`${currentStatus === 'Processed' ? 'bg-purple-600' : 'bg-gray-600 hover:bg-gray-700 cursor-pointer'} text-white px-4 py-2 rounded transition-colors`} onClick={() => handleChangeStatus('Processed')}>Processed</button>
    </div>
  )
}

export default OrderStatusFilter