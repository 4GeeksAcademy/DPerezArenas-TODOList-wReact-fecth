import React from "react";
import {JPHUsers} from "./JPHUsers.jsx"

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { JPHTodos } from "./JPHTodos.jsx";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<JPHTodos />
		</div>
	);
};

export default Home;
