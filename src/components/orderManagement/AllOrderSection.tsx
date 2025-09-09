import React, { useState } from 'react'
import Filter from './All/Filter';
import OrderStatusFilter from './All/OrderStatusFilter';
import OnPreparingOrdersFilter from './All/OnPreparingOrdersFilter';

const AllOrderSection = () => {
    const [nav, setNav] = useState<'All' | 'Waiting for confirmation' | 'On preparing' | 'On delivering' | 'Deliver successful' | 'Return/Refund'>('All');
    const [orderStatus, setOrderStatus] = useState<'All' | 'Not processed yet' | 'Processed'>('All');

    const handleExport = () => {

    }

    const handleExportPrint = () => {

    }

  return (
    <div className='bg-gray-900 p-6'>
        {/* All orders header */}
        <div className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl'>All</h1>
            <div className='flex gap-4 items center'>
                <button onClick={handleExport} className='bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 cursor-pointer'>Export</button>
                <button onClick={handleExportPrint} className='bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 cursor-pointer'>Print</button>
            </div>
        </div>
        
        <ul className='flex gap-4 text-lg'>
            <li className={`cursor-pointer ${nav === 'All' ? "text-purple-600 underline" : 'hover:underline'}`} onClick={() => setNav('All')}>All</li>
            <li className={`cursor-pointer ${nav === 'Waiting for confirmation' ? "text-purple-600 underline" : 'hover:underline'}`} onClick={() => setNav('Waiting for confirmation')}>Waiting for confirmation</li>
            <li className={`cursor-pointer ${nav === 'On preparing' ? "text-purple-600 underline" : 'hover:underline'}`} onClick={() => setNav('On preparing')}>On preparing</li>
            <li className={`cursor-pointer ${nav === 'On delivering' ? "text-purple-600 underline" : 'hover:underline'}`} onClick={() => setNav('On delivering')}>On delivering</li>
            <li className={`cursor-pointer ${nav === 'Deliver successful' ? "text-purple-600 underline" : 'hover:underline'}`} onClick={() => setNav('Deliver successful')}>Deliver successful</li>
            <li className={`cursor-pointer ${nav === 'Return/Refund' ? "text-purple-600 underline" : 'hover:underline'}`} onClick={() => setNav('Return/Refund')}>Return/Refund</li>
        </ul>

        {nav === "On preparing" && <OrderStatusFilter currentStatus={orderStatus} handleChangeStatus={setOrderStatus} />}

        <Filter />

        {/* Orders table */}
        <div className='mt-10'>
            {/* Table Header */}
            <div className='flex items-center justify-between'>
                <h2 className='text-3xl'>Orders</h2>
                {nav === "On preparing" && <OnPreparingOrdersFilter />}
            </div>

        </div>
    </div>
  )
}

export default AllOrderSection