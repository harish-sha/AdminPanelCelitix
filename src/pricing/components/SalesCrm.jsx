import React, { useState } from 'react'

const SalesCrm = () => {
    const [selectedTab, setSelectedTab] = useState(0)

    const tabs = [
        "Monthly",
        "Quaterly",
        "Yearly"
    ]
    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
                {tabs.map((tab, index) => (
                    <button key={index}
                        onClick={() => setSelectedTab(index)}
                        style={{
                            padding: '8px 16px',
                            background: selectedTab === index
                ? 'linear-gradient(90deg, #004e92 0%, #000428 100%)'
                : '#FFFFFF',
                            color: selectedTab === index ? '#fff' : '#000',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            

            {/* Content */}
            <div> 
                 <h2>{tabs[selectedTab]}</h2>
            </div>

        </div >
    )
}

export default SalesCrm
