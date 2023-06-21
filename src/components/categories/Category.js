import "./Category.css"
import { Fetch, Method } from "../../ApiManager";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TzadikCircles from "../img/Tzadik_Circles.png"
import { AlbumList } from "../albums/AlbumList";

export const Category = () => {
    const [category, setCategory] = useState({})
    const [categoryAlbums, setCategoryAlbums] = useState([])
    const { categoryId } = useParams()
    const categoryURL = `/${categoryId}`
    const categoryAlbumsURL = `?category=${categoryId}`

    const getCategory = () => {
        Fetch("categories", categoryURL, Method("GET",))
            .then((categoryObject) => { setCategory(categoryObject) })
    }

    const getCategoryAlbums = () => {
        Fetch("albums", categoryAlbumsURL, Method("GET",))
            .then((categoryAlbumArray) => { setCategoryAlbums(categoryAlbumArray) })
    }

    useEffect(() => { getCategory() }, [categoryId])
    useEffect(() => { getCategoryAlbums() }, [category])

    return (
        <section className="category">
            <article className="category__albumList">
                <div className="category__heading">
                    <h2 className="category__headingTitle">
                        <img 
                            className="category__headingCircles"
                            src={TzadikCircles}
                            alt="Tzadik Circles"
                        />
                        {category.name}
                    </h2>
                </div>
                <div className="category__description">{category.description}</div>
                <h4 className="category__albumHeading">Releases in {category.name}:</h4>
                <ul>
                    {categoryAlbums.map(album => <AlbumList key={album.id} albumObject={album}/>)}
                </ul>
            </article>
        </section>
    )
}