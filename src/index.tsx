import ReactDOM from 'react-dom';
import React from 'react';
import CourageTest from "./components/CourageTest";
import HubPage from './components/HubPage';

const CONTAINER_ID = "main";

function getPageByHash() {
	let pageHash = window.location.hash.substring(1);
	let containerElement = document.getElementById(CONTAINER_ID);

	switch(pageHash) {
		case("courage-test"):
		console.log("??");
			ReactDOM.render(<CourageTest />, containerElement);
			break;
		// case("fortune"):
		// 	ReactDOM.render(<FortuneDraw />, containerElement);
		// 	break;
		default:
			ReactDOM.render(<HubPage />, containerElement);
	}
}
getPageByHash();

window.onhashchange = getPageByHash;