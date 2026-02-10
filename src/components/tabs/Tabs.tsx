export function Tabs() {
    return (
        <div className="flex justify-between px-50 relative">
            <button>
                Trands now
            </button>

            <button>
                Popular
            </button>

            <button>
                Premieres
            </button>

            <button>
                Recently Added
            </button>
            <div className="absolute bottom-0 top-20 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
    )
}
