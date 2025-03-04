import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Registro from "./components/Registro";
import DashBoard from "./components/DashBoard";
import MainLayout from "./Layouts/MainLayout";

const router = createBrowserRouter([
	{
		path: '/', element: <MainLayout />,
		children: [
			{ path:'/', element: <Login />},
			{ path:'/registro', element: <Registro />},
			{ path:'/dashboard', element: <DashBoard />},
		]
	}
])

export default router