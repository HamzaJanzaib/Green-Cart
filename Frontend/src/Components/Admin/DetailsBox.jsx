import React from 'react';

const DetailsBox = ( { data } ) => {
    return (
        <div className="max-w-xs rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">{data.name}</h3>
            <p className="my-3 text-2xl font-bold">{data.value}</p>

            <div className="flex justify-between text-sm text-gray-600">
                <span>Cash</span>
                <span>Online</span>
            </div>

            <div className="flex justify-between font-medium">
                <span>${data.cash}</span>
                <span>${data.online}</span>
            </div>
        </div>
    );
}

export default DetailsBox;