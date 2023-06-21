import "./Profile.css"
import { artistBoolean, staffBoolean, vendorBoolean } from "../auth/Register"
import { Fetch, Method } from "../../ApiManager"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

export const MyProfile = () => {
    const [activeUser, setActiveUser] = useState({})
    const email_address = useRef()
    const first_name = useRef()
    const last_name = useRef()
    const username = useRef()
    const password = useRef()
    const is_staff = useRef()
    const is_artist = useRef()
    const is_vendor = useRef()
    const address_street = useRef()
    const address_city = useRef()
    const address_state = useRef()
    const address_zipcode = useRef()
    const payment_type = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const getActiveUser = () => {
        Fetch("my-profile", "", Method("GET",))
            .then((userObject) => { setActiveUser(userObject) })
    }

    useEffect(() => { getActiveUser() }, [])

    const handleUpdate = () => {

        if (password.current.value === verifyPassword.current.value) {
            const updatedUser = {
                "email_address": email_address.current.value,
                "first_name": first_name.current.value,
                "last_name": last_name.current.value,
                "username": username.current.value,
                "password": password.current.value,
                "is_staff": staffBoolean(is_staff.current.value),
                "is_artist": artistBoolean(is_artist.current.value),
                "is_vendor": vendorBoolean(is_vendor.current.value),
                "address_street": address_street.current.value,
                "address_city": address_city.current.value,
                "address_state": address_state.current.value,
                "address_zipcode": address_zipcode.current.value,
                "payment_type": payment_type.current.value
            }

            Fetch("my-profile", "/edit", Method("PUT", updatedUser))
                .then(navigate("/"))

        } else {
            passwordDialog.current.showModal()
        }
    }
    
    return (
        <article className="profile">
        <article className="profile__heading">
            <div className="profile__greeting">
                {activeUser?.user?.first_name}'s Profile!
            </div>
            <div className="profile__logout">
                <Link to="/" onClick={() => {
                    localStorage.removeItem("tzadik_token")
                    navigate("/", { replace: true })
                }}>{`please, log me out!`}</Link>
            </div>
        </article>
        <form className="form--login" onSubmit={handleUpdate}>
            <fieldset className="profile__fieldset">
                <label className="profile__fieldsetLabel" htmlFor="first_name">First Name</label>
                <input
                    ref={first_name}
                    type="text"
                    name="first_name"
                    className="form-control"
                    defaultValue={activeUser?.user?.first_name}
                    required autoFocus/>
            </fieldset>
            <fieldset className="profile__fieldset">
                <label className="profile__fieldsetLabel" htmlFor="last_name">Last Name</label>
                <input
                    ref={last_name}
                    type="text"
                    name="last_name"
                    className="form-control"
                    defaultValue={activeUser?.user?.last_name}
                    required />
            </fieldset>
            <fieldset className="profile__fieldset">
                <label className="profile__fieldsetLabel" htmlFor="email_address">Email Address</label>
                <input
                    ref={email_address}
                    type="text"
                    name="email_address"
                    className="form-control"
                    defaultValue={activeUser?.user?.email}
                    required />
            </fieldset>
            <fieldset className="profile__fieldset">
                <label className="profile__fieldsetLabel" htmlFor="username">Username</label>
                <input
                    ref={username}
                    type="text"
                    name="username"
                    className="form-control"
                    defaultValue={activeUser?.user?.username}
                    required />
            </fieldset>
            <fieldset className="profile__fieldset">
                <label className="profile__fieldsetLabel" htmlFor="password">Password</label>
                <input
                    ref={password}
                    type="password"
                    name="password"
                    className="form-control"
                    defaultValue={activeUser?.user?.password}
                    required />
            </fieldset>
            <fieldset className="profile__fieldset">
                <label className="profile__fieldsetLabel" htmlFor="verifyPassword">VerifyPassword</label>
                <input
                    ref={verifyPassword}
                    type="password"
                    name="verifyPassword"
                    className="form-control"
                    defaultValue={activeUser?.user?.password}
                    required />
            </fieldset>
            <fieldset className="profile__fieldset">
                <label className="profile__fieldsetLabel" htmlFor="address_street">Street Address</label>
                <input
                    ref={address_street}
                    type="text"
                    name="address_street"
                    className="form-control"
                    defaultValue={activeUser.address_street}
                    required />
            </fieldset>
            <fieldset className="profile__fieldset">
                <label className="profile__fieldsetLabel" htmlFor="address_city">City</label>
                <input
                    ref={address_city}
                    type="text"
                    name="address_city"
                    className="form-control"
                    defaultValue={activeUser?.address_city}
                    required />
            </fieldset>
            <fieldset className="profile__fieldset">
                <label className="profile__fieldsetLabel" htmlFor="address_state">State</label>
                <input
                    ref={address_state}
                    type="text"
                    name="address_state"
                    className="form-control"
                    defaultValue={activeUser?.address_state}
                    required />
            </fieldset>
            <fieldset className="profile__fieldset">
                <label className="profile__fieldsetLabel" htmlFor="address_zipcode">Zip Code</label>
                <input
                    ref={address_zipcode}
                    type="text"
                    name="address_zipcode"
                    className="form-control"
                    defaultValue={activeUser.address_zipcode}
                    required />
            </fieldset>
            <fieldset className="profile__fieldset">
                <label className="profile__fieldsetLabel" htmlFor="payment_type">Payment Type</label>
                <input
                    ref={payment_type}
                    type="text"
                    name="payment_type"
                    className="form-control"
                    defaultValue={activeUser.payment_type}
                    required />
            </fieldset>
            <fieldset className="profile__fieldset">
                <input className="register_check" ref={is_staff}
                    type="checkbox" id="is_staff" />
                <label className="register_isStaff" htmlFor="is_staff">Wait... You work here?!</label>
            </fieldset>
            <fieldset className="profile__fieldset">
                <input className="register_check" ref={is_vendor}
                    type="checkbox" id="is_vendor" />
                <label className="register_isVendor" htmlFor="is_vendor">Do you sell our records? Thank you, sincerely.</label>
            </fieldset>
            <fieldset className="profile__fieldset">
                <input className="register_check" ref={is_artist}
                    type="checkbox" id="is_artist" />
                <label className="register_isArtist" htmlFor="is_artist">Are you an artist with a release on Tzadik?</label>
            </fieldset>
            <fieldset className="profile__fieldset">
                <button className="button--submit" type="submit">Update Profile</button>
            </fieldset>
        </form>
    </article>)
}