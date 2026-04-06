import React from 'react'

function FeatureItem({ icon, title, description }) {
    return (
        <div className="flex items-center gap-4 p-2 rounded-2xl">
            <div className="flex shrink-0 w-12 h-12 items-center justify-center bg-white rounded-full">
                <img src={icon} alt={title} className="w-7 h-7 object-contain" />
            </div>
            <div>
                <h4 className="text-lg font-bold mb-1 text-white">{title}</h4>
                <p className="text-sm font-light text-white leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default FeatureItem
