interface Props { 
    activeTag: string;
    onTagChange: (tag: string) => void
}

export function Tabs({ activeTag, onTagChange }: Props) {

    const tabs = [
        { id: 'trend', label: 'Trends Now' },
        { id: 'popular', label: 'Popular' },
        { id: 'premiere', label: 'Premieres' },
        { id: 'recent', label: 'Recently Added' },
    ]

    return (
        <div className="flex justify-between px-50 relative">
            {tabs.map(tab => (
                <button key={tab.id} onClick={() => onTagChange(tab.id)} className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTag === tab.id 
                        ? 'bg-blue-600 text-white' 
                        : 'hover:bg-gray-700'
                }`}>
                    {tab.label}
                </button>
            ))}
            <div className="absolute bottom-0 top-20 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
    )
}
