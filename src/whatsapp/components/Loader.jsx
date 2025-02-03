import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div className="loader-container flex items-center justify-center h-[80vh]">
            <ClipLoader
                size={80}
                color="#9a9a9a"
                loading={true}
            />
        </div>
    )
}

export default Loader