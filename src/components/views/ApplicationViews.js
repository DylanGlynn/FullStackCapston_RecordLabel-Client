import { Route, Routes } from "react-router-dom"
import { Home } from "../home/Home"
import { Category } from "../categories/Category"
import { Album } from "../albums/Album"
import { MyProfile } from "../profile/Profile"
import { Cart } from "../profile/Cart"
import { OrderSubmitted } from "../profile/OrderSubmitted"

export const ApplicationViews = () => {
	return <Routes>
		<Route>
			<Route path="/" element={<Home />} />
			<Route path="/categories/:categoryId" element={<Category />} />
			<Route path="/albums/:albumId" element={<Album />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-submitted" element={<OrderSubmitted />} />
		</Route>
	</Routes>
}