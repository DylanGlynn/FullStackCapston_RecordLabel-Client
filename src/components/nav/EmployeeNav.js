import "./NavBar.css"
import { Fetch, Method } from "../../ApiManager"
import LargeProfileIcon from "../img/Profile_LargeIcon.png"
import { Link } from "react-router-dom"
import Tzadik_Logo from "../img/Tzadik_Logo.png"
import Tzadik_CartLogo from "../img/Tzadik_CartLogo.png"
import { useEffect, useState } from "react"

export const EmployeeNav = () => {
    const [categories, setCategories] = useState([])
    let categoryLength = categories.length

    const getCategories = () => {
        Fetch("categories", "", Method("GET",))
            .then((categoriesArray) => { setCategories(categoriesArray) })
    }

    useEffect(
        () => {
            getCategories()
        }, [])

    return (
        <section className="navbar__section">
            <ul className="navbar">
                <div className="navbar__groupLeft">
                    <Link className="logo__small" to={"/"}><img className="navbar__logoSmall" src={Tzadik_Logo} alt="Tzadik Logo"/></Link>
                </div>
                <div className="navbar__groupRight">
                    <li className="navbar__item active">
                        <Link className="cart__logo" to={"/cart"}><img className="navbar__cartIcon" src={Tzadik_CartLogo} alt="Cart Icon" /></Link>
                    </li>
                    <li className="navbar__item active">
                        <Link className="profile__icon" to={"/my-profile"}><img className="navbar__profileIcon" src={LargeProfileIcon} alt="Profile Icon" /></Link>
                    </li>
                </div>
            </ul>
            <ul className="navbar__categories">
                <div className="categories__list">
                    {
                        categories.map(category => 
                        <li className="category__label" key={category.id} id={category.id}>
                            <Link className="category" to={`/categories/${category.id}`}>{category.name}</Link>
                            {category.id < categoryLength ? " |": ""}
                        </li>)
                    }
                </div>
            </ul>
        </section>
    )
}