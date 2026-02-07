import { memo, useState, MouseEventHandler } from "react"

function FavouriteButton() {

    const [isFavourite, setIsFavourite] = useState(false)

    const handleFavouriteButton: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        setIsFavourite(!isFavourite)
    }

    return (
        <button onClick={handleFavouriteButton}>
            {isFavourite ? '❤️' : '🤍'}
        </button>
    )
}

export default memo(FavouriteButton)