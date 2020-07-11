import ReactDOM from 'react-dom';
import React from 'react';
import CourageTest from "./components/CourageTest";

const CONTAINER_ID = "main";

let pageHash = window.location.hash.substring(1);
let containerElement = document.getElementById(CONTAINER_ID);

switch(pageHash) {
	case("couragetest"):
	console.log("??");
		ReactDOM.render(<CourageTest />, containerElement);
		break;
	case("fortune"):
		ReactDOM.render(<FortuneDraw />, containerElement);
		break;
	default:
		ReactDOM.render(<DummyPage />, containerElement);
}