import "./Albums.css"
import { Link } from "react-router-dom"

export const AlbumList = ( { albumObject }) => {
    return (
        <li className="albumList__overview" key={albumObject.id}>
            <Link className="albumList__link" to={`/albums/${albumObject.id}`} id={albumObject.id}>
                <article className="albumList__article">
                    <section className="albumList__image">
                        <div>
                            <img 
                                className="albumList__artwork"
                                src={albumObject.artwork_url}
                                width="75px"
                                alt="Album Cover"
                            />
                        </div>
                    </section>
                    <section className="albumList__details">
                            <div className="albumList__title">
                                {albumObject?.artist?.band_name} | {albumObject.title}
                            </div>
                            <div className="albumList__catalogRelease" >
                                Category #: {albumObject.catalog_number} | Release Date: {albumObject.release_date}
                        </div>
                    </section>
                </article>
            </Link>
        </li>
    )
}