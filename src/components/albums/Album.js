import "./Albums.css"
import { Fetch, Method } from "../../ApiManager"
import { Link, useNavigate, useParams } from "react-router-dom"
import TzadikCircles from "../img/Tzadik_Circles.png"
import { useEffect, useState } from "react"

export const Album = () => {
    const [album, setAlbum] = useState({})
    const [openOrder, setOpenOrder] = useState({})
    const navigate = useNavigate()
    const { albumId } = useParams()
    const albumSelectionURL = `/${albumId}`
    const albumPurchaseURL = `/${albumId}/add_to_order`
    const openOrderURL = `/current`

    const getAlbum = () => {
        Fetch("albums", albumSelectionURL, Method("GET",))
            .then((albumObject) => { setAlbum(albumObject) })
    }

    const getOrder = () => {
        Fetch("orders", openOrderURL, Method("GET",))
            .then((openOrderObject) => { setOpenOrder(openOrderObject) })
    }

    useEffect(() => { getAlbum() }, [albumId])
    useEffect(() => { getOrder() }, [albumId])

    const addAlbumToCart = (evt) => {
        evt.preventDefault()

        Fetch("albums", albumPurchaseURL, Method("POST", ))
            .then(() => navigate(`/cart`))

    }

    return (
        <section className="album__view" key={`key__${album.id}`}>
            <div className="category__heading">
                <h2 className="category__headingTitle">
                    <img
                        className="category__headingCircles"
                        src={TzadikCircles}
                        alt="Tzadik Circles"
                    />
                    <Link to={`/categories/${album.category?.id}`}>{album.category_name}</Link>
                </h2>
            </div>
            <article className="album__info">
                <div className="album__artistTitle">
                    <h3 className="albumAT__artist">{album.album_artist} : <font color="#FFFFFF"> {album.title}</font></h3>
                </div>
                <div className="album__artTrackDetails">
                    <section className="album__artTracks">
                        <article className="album__artwork">
                            <img
                                src={album.artwork_url}
                                width="250px"
                            />
                        </article>
                        <article className="album__trackListing">
                            {
                                album.tracks?.map(track =>
                                    <div className="album__trackDetails" key={`key__${track.id}`}>
                                        <i>Disc {track.disc_number} - Track {track.track_number.toFixed()}:</i> {track.track_title}
                                    </div>
                                )
                            }
                        </article>
                    </section>
                    <aside className="album__details" key={`key__${album.id}`}>
                        <div className="album__detailsCat">
                            <i>Catalog Number:</i> {album.catalog_number}
                        </div>
                        <div className="album__detailsDate">
                            <i>Release Date:</i> {album.release_date}
                        </div>
                        <div className="album__detailsDur">
                            <i>Duration:</i> {album.duration}
                        </div>
                        <div className="album__detailsPrice">
                            <i>Price:</i> ${album.price?.toFixed(2)}
                        </div>
                        {(album?.status?.id === 4 || album?.status?.id === 3) ? <button
                            className="button-album__purchase"
                            type="submit" onClick={addAlbumToCart}
                        >Add to Cart
                        </button>
                            : <button
                                className="button-album__unavailable"
                                type=""
                            >{album?.status?.name}
                            </button>}
                    </aside>
                </div>
                <div className="album__description">
                    {album.description}
                </div>
                <div className="album__personnelHeader">
                    Personnel
                </div>
                <div className="album__personnelDetails">
                    {
                        album.performers?.map(performer =>
                            <div className="album__personnelPerformer" /* key={`key__${performer.id}`} */>
                                {performer.first_name} {performer.last_name}
                            </div>
                        )
                    }
                </div>
            </article>
        </section>
    )
}