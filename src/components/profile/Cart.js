import "./Profile.css"
import { Fetch, FetchDelete, Method } from "../../ApiManager"
import TzadikCircles from "../img/Tzadik_Circles.png"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Cart = () => {
    const navigate = useNavigate()
    const [openOrder, setOpenOrder] = useState()
    const openOrderURL = `/current`
    const submitOpenOrderURL = `/${openOrder?.id}/complete`

    const getOpenOrder = () => {
        Fetch("orders", openOrderURL, Method("GET",))
            .then((openOrderObject) => { setOpenOrder(openOrderObject) })
    }

    const submitOpenOrder = () => {
        Fetch("orders", submitOpenOrderURL, Method("PUT",))
    }

    useEffect(() => { getOpenOrder() }, [])

    const continueShopping = () => {
        navigate('/')
    }

    const completeOrder = () => {
        submitOpenOrder()
        navigate("/order-submitted")
    }

    const deleteAlbum = (id) => {
        let albumId = parseInt(id)
        FetchDelete("albums", `/${albumId}/remove_from_order`, Method("DELETE",))

    }

    return (
        <section className="cart">
            <div className="cart__heading">
                <h2 className="cart__headingTitle">
                    <img
                        className="cart__headingCircles"
                        src={TzadikCircles}
                        alt="Tzadik Circles"
                    />
                    Your Current Cart
                </h2>
            </div>
            <article className="cart__article">
                {openOrder?.message === "You do not have an open order."
                    ? <>
                        <div className="cart__empty">
                            Your cart is currently empty.
                        </div>
                    </>
                    : <>
                        <article className="cart__contents">
                            <div className="cart__orderNumber">
                                Order Number: {openOrder?.id}
                            </div>
                            <div className="cart__orderSelection">
                                {
                                    openOrder?.selection?.map(album =>
                                        <section className="cart__orderItem" key={`album__${album.id}`}>
                                            <article className="cart__orderArtDetails">
                                                <section className="albumList__image">
                                                    <div>
                                                        <img
                                                            className="albumList__artwork"
                                                            src={album.artwork_url}
                                                            width="75px"
                                                            alt="Album Cover"
                                                        />
                                                    </div>
                                                </section>
                                                <section className="cart__albumDetails">
                                                    <div className="albumList__title">
                                                        {album?.artist?.band_name} | {album.title}
                                                    </div>
                                                    <div className="albumList__catalogRelease">
                                                        Category #: {album.catalog_number} | Release Date: {album.release_date}
                                                    </div>
                                                </section>
                                            </article>
                                            <article className="cart__priceDelete">
                                                <div className="cart__albumPrice">
                                                    ${album.price.toFixed(2)}
                                                </div>
                                                <div className="cart__delete" value={album.id}>
                                                    <div
                                                        className="cart__trashcan"
                                                        onClick={() => deleteAlbum(album.id)}
                                                    >
                                                        🗑️
                                                    </div>
                                                </div>
                                            </article>
                                        </section>
                                    )
                                }
                            </div>
                        </article>
                    </>
                }
            </article>
            <article className="cart__buttonArticle">
                {openOrder?.message === "You do not have an open order."
                    ? <>
                        <button
                            className="button-cart__continueShopping"
                            type="submit"
                            onClick={continueShopping}
                        >Continue Shopping
                        </button>
                    </>
                    : <>
                        <button
                            className="button-cart__completeOrder"
                            type="submit"
                            onClick={completeOrder}
                        >Complete your order
                        </button>
                        <button
                            className="button-cart__continueShopping"
                            type="submit"
                            onClick={continueShopping}
                        >Continue Shopping
                        </button>
                    </>
                }
            </article>
            <article className="cart__finePrint">
                <div className="cart_fpUSPS">
                    Note: The price shown for each item includes the cost of
                    Media Mail shipping to U.S. destinations, including Hawaii
                    and Alaska, and all U.S. possessions [Guam, Puerto Rico,
                    etc.] EXCEPT in the case of single item orders, in which case
                    a $2 surcharge will be added.
                </div>
                <div className="cart_fpInternational">
                    International orders will be calculated by weight in accordance
                    with USPS rates which vary by destination
                    (<Link to={"https://postcalc.usps.com/?country=10440"}>https://postcalc.usps.com/?country=10440</Link>)
                </div>
                <div className="cart__fpNYSalesTax">
                    An 8.875% Sales Tax will be collected on the total of all NY
                    State orders/shipments.
                </div>
            </article>
        </section>
    )
}