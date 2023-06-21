import { ClientNav } from "./ClientNav"
import { EmployeeNav } from "./EmployeeNav"
import './NavBar.css';

export const NavBar = () => {
    if (localStorage.getItem("tzadik_token").is_staff) {
        return <EmployeeNav />
    } else {
        return <ClientNav />
    }
}