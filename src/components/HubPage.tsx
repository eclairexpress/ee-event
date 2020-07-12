import React from 'react';

const ALL_PAGES = [
	{ id: "courage-test", name: "Test of Courage" },
	{ id: "fortune", name: "New Year's Fortune", disabled: true }
];

const LOGO_URL = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d6155b58-5126-439a-ade3-895083fe1973/dbjviwi-d969c9f9-8473-4124-901b-6e04796ce0f8.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZDYxNTViNTgtNTEyNi00MzlhLWFkZTMtODk1MDgzZmUxOTczXC9kYmp2aXdpLWQ5NjljOWY5LTg0NzMtNDEyNC05MDFiLTZlMDQ3OTZjZTBmOC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.orQh_3PWljwMG1i4_y2PC7QuB9x0_RjAlnkPO7vUgEo";

class HubPage extends React.Component {
	private clickBind: (e: any) => void;

	private clickButton(e: any) {
		let id = e.currentTarget.id;
		window.location.hash = "#" + id;
	}

	private getTemplate() {
		return(
			<div className="hubPageContainer">
				<div className={ "hub-logo" }>
					<img src={ LOGO_URL } />
				</div>
				<div className={ "hub-title" }>
					Games Directory
				</div>
				<div className={ "hub-text" }>
					Here you will find event related games. Information should be provided in whatever journal mentions them...
					<br /><br />Select an option below. Some games may be removed over time to make room for new ones.
				</div>
				<div className={ "hub-button-container" }>
					{ALL_PAGES.map(page => {
						return(
							<button key={ page.id } id={ page.id } onClick={this.clickBind} disabled={ !!page.disabled }>{ page.name + (!!page.disabled ? " (not yet available)" : "") }</button>
						);
					})}
				</div>
			</div>
		);
	}

	constructor(props: Readonly<{}>) {
		super(props);
		this.clickBind = this.clickButton.bind(this);
	}

	render() {
		let body = document.querySelector("body");
		body.style.background = `url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d6155b58-5126-439a-ade3-895083fe1973/dbkc9nw-1fd2bbf7-d350-4eaa-a7e2-8562c4607a66.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZDYxNTViNTgtNTEyNi00MzlhLWFkZTMtODk1MDgzZmUxOTczXC9kYmtjOW53LTFmZDJiYmY3LWQzNTAtNGVhYS1hN2UyLTg1NjJjNDYwN2E2Ni5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.xqi7KLj0DwtrWAXH57li7_xP_PmRKIMkEsWjRTFuyzI") repeat`;
		body.style.color = "#876046";

		document.getElementById("main").classList.add("hub-page");
		return this.getTemplate();
	}
}

export default HubPage;