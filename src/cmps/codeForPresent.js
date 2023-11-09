export function AppHeader() {
    
    const isScrolled = window.scrollY > 30
    const textColor = isScrolled ? '#62646a' : 'white'
    const isScrollingText = isScrolled
    const isScrollingHeader = isScrolled

    const handleScroll = () => {

        if (window.innerWidth >= 800) {
            if (isHomePage) {
                setTextColor(textColor)
                setScrolling(isScrollingText)
                setScrollingHeader(isScrollingHeader)

                if (window.scrollY > 100) {
                    secondScroll()
                } else {
                    CloseHeader()
                }
            }

            setScrollingHeader(isScrolled)
            
        } else {
            setShowTextFilter(isScrolled)
            setScrollingHeader(!isScrolled)
        }
    }
}