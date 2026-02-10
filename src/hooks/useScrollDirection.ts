import { useEffect, useState } from "react"

export const useScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const updateScrollDirection = () => {
            const scrollY = window.scrollY

            if (scrollY > lastScrollY && scrollY > 100) {
                setScrollDirection('down')
                setIsVisible(false)
            } else if (scrollY < lastScrollY) {
                setScrollDirection('up')
                setIsVisible(true)
            }
            setLastScrollY(scrollY)
        }

        let ticking = false
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateScrollDirection()
                    ticking = false 
                })
                ticking = true
            }
        }


        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY])

    return { scrollDirection, isVisible }
}