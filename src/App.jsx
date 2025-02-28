import React from "react"
import { RouterProvider } from "react-router-dom"
import router from "./router"

function App() {

return (
	<div className="h-[100vh] flex items-center justify-center bg-gray-700">
		<RouterProvider router={router} />
	</div>
)
}

export default App
