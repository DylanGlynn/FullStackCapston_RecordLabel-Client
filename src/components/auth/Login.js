import "./Login.css"
import { Fetch, AuthMethod } from "../../ApiManager.js"
import { Link, useNavigate } from "react-router-dom"
import React, { useRef } from "react"
import Tzadik_Logo from "../img/Tzadik_Logo.png"

export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (evt) => {
        evt.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }

        Fetch("login", "", AuthMethod("POST", user))
            .then(res => {
                if ("token" in res) {
                    localStorage.setItem("tzadik_token", res.token)
                    navigate("/")
                } else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="contain--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <article className="login__article">
                <section className="login__logo">
                    <img className="login__logoImg" alt="Tzadik Logo" src={Tzadik_Logo} />
                </section>
                <div>
                    <section>
                        <form className="form--login" onSubmit={handleLogin}>
                            <h1 className="login__header">Tzadik Recordings</h1>
                            <h2 className="login__signInPrompt">Please sign in</h2>
                            <fieldset className="login__fieldset">
                                <label className="login__fieldsetLabel" htmlFor="inputUsername">Username</label>
                                <input ref={username} type="username" id="username" className="form-control" placeholder="Username address" required autoFocus />
                            </fieldset>
                            <fieldset className="login__fieldset">
                                <label className="login__fieldsetLabel" htmlFor="inputPassword">Password</label>
                                <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                            </fieldset>
                            <fieldset
                                className="login__fieldset"
                                style={{ textAlign: "center" }}>
                                <button className="btn btn-1 btn-sep icon-send button--submit" type="submit">Sign In</button>
                            </fieldset>
                        </form>
                    </section>
                    <section className="login__register">
                        <Link to="/register">Need to create a new account?</Link>
                    </section>
                </div>
            </article>
        </main>
    )
}