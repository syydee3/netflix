import { MouseEventHandler, PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props extends PropsWithChildren{
    onClose: () => void
}

export function Modal({children, onClose}: Props) {

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if(e.key === 'Escape') onClose()
        }

        window.addEventListener('keydown', handleEsc)

        return () => window.removeEventListener('keydown', handleEsc)
    }, [onClose])

    const handleCloseClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        onClose()
    }

    return createPortal(
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div className="relative w-[78%] h-auto max-w-xl bg-neutral-900 text-white p-6 rounded-2xl shadow-lg animate-fadeIn">
                <button onClick={handleCloseClick} className="absolute top-3 right-3 text-white text-xl hover:text-red-600 transition" aria-label="Close modal">
                  ×
                </button>
                <div className="flex justify-center items-center">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}
