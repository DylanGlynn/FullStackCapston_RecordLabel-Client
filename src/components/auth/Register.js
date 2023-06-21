import "./Login.css"
import { Fetch, AuthMethod } from "../../ApiManager.js"
import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"

export let staffBoolean = (checkbox) => {
    let value = false
    if (checkbox === "true") {
        value = true
    }
    return value
}

export let artistBoolean = (checkbox) => {
    let value = false
    if (checkbox === "true") {
        value = true
    }
    return value
}

export let vendorBoolean = (checkbox) => {
    let value = false
    if (checkbox === "true") {
        value = true
    }
    return value
}

export const Register = () => {
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

    const handleRegister = (evt) => {
        evt.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
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

            Fetch("register", "", AuthMethod("POST", newUser))
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("tzadik_token", res.token)
                        navigate("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    const cancelRegister = () => {
        navigate("/login")
    }

    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog gialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close"
                    onClick={e => {
                        passwordDialog.current.close()
                    }}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register New Account</h1>
                <fieldset>
                    <label htmlFor="first_name">First Name</label>
                    <input ref={first_name}
                        type="text" name="first_name"
                        className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="last_name">Last Name</label>
                    <input ref={last_name}
                        type="text" name="last_name"
                        className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email_address">Email Address</label>
                    <input ref={email_address}
                        type="text" name="email_address"
                        className="form-control" placeholder="Email" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <input ref={username}
                        type="text" name="username"
                        className="form-control" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <input ref={password}
                        type="text" name="password"
                        className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword">VerifyPassword</label>
                    <input ref={verifyPassword}
                        type="text" name="verifyPassword"
                        className="form-control" placeholder="verifyPassword" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="address_street">Street Address</label>
                    <input ref={address_street}
                        type="text" name="address_street"
                        className="form-control" placeholder="Street Address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="address_city">City</label>
                    <input ref={address_city}
                        type="text" name="address_city"
                        className="form-control" placeholder="City" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="address_state">State</label>
                    <input ref={address_state}
                        type="text" name="address_state"
                        className="form-control" placeholder="State" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="address_zipcode">Zip Code</label>
                    <input ref={address_zipcode}
                        type="text" name="address_zipcode"
                        className="form-control" placeholder="Zip Code" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="payment_type">Payment Type</label>
                    <input ref={payment_type}
                        type="text" name="payment_type"
                        className="form-control" placeholder="Payment Type" required />
                </fieldset>
                <fieldset>
                    <input className="register_check" ref={is_staff}
                        type="checkbox" id="is_staff" />
                    <label className="register_isStaff" htmlFor="is_staff">Wait... You work here?!</label>
                </fieldset>
                <fieldset>
                    <input className="register_check" ref={is_vendor}
                        type="checkbox" id="is_vendor" />
                    <label className="register_isVendor" htmlFor="is_vendor">Do you sell our records? Thank you, sincerely.</label>
                </fieldset>
                <fieldset>
                    <input className="register_check" ref={is_artist}
                        type="checkbox" id="is_artist" />
                    <label className="register_isArtist" htmlFor="is_artist">Are you an artist with a release on Tzadik?</label>
                </fieldset>
                <fieldset>
                    <button className="button--submit" type="submit">Register</button>
                </fieldset>
                <fieldset>
                    <button className="button--cancel" type="cancel" onClick={cancelRegister}>I want to go back...</button>
                </fieldset>
            </form>
        </main>
    )
}