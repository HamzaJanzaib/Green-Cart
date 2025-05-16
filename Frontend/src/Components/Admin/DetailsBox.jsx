import React from 'react'

const DetailsBox = () => {
    return (
        <div className="max-w-xs rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Today Orders</h3>
            <p className="my-3 text-2xl font-bold">$251.14</p>

            <div className="flex justify-between text-sm text-gray-600">
                <span>Cash</span>
                <span>Online</span>
            </div>

            <div className="flex justify-between font-medium">
                <span>$251.14</span>
                <span>$0.00</span>
            </div>
        </div>
    )
}

export default DetailsBox
