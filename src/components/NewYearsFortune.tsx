import React from 'react';
import { SHEETS_PREFIX, readFromSheets } from './FetchSheets';
import { IState } from './helpers';

const TEXT_SHEET = "https://spreadsheets.google.com/feeds/list/1N6joUQPvsvFNVrL-3AB60Gz1zY7wL3VeK0AdGA-oSIg/od6/public/values?alt=json";

interface IFortuneState extends IState {
	fortune?: string[];
}

class FortuneDraw extends React.Component {
	private fortunes: string[][] = [[], [], []];
	private imageCount = 0;
	state: IFortuneState;

	private preloadData = () => {
		readFromSheets(TEXT_SHEET)
			.then((result: any) => {
				let mainArray = result.feed.entry;
				let arrayIndex = 0;
				mainArray.forEach((prompt: any[]) => {
					let fortuneText = prompt[SHEETS_PREFIX + "text"].$t;
					if (fortuneText === "break") {
						arrayIndex ++;
						return;
					}
					this.fortunes[arrayIndex].push(fortuneText);
				});
				this.setState({ isLoaded: true });
			})
			.catch((error: any) => {
				this.setState({ isLoaded: true, error });
			});
	}

	private generateFortune(type: 0 | 1 | 2) {
		let fortunePool = this.fortunes[type];
		let randInt = Math.floor(Math.random() * fortunePool.length);
		return fortunePool[randInt];
	}

	private clickButton() {
		let genFortune = this.generateFortune(0);
		let loveFortune = this.generateFortune(1);
		let luckFortune = this.generateFortune(2);

		let slip = document.querySelector(".fortuneDraw-slip");
		slip.classList.add("draw");

		setTimeout(() => {
			document.querySelector("#main").scrollTop = 0;
			this.setState({ fortune: [ genFortune, loveFortune, luckFortune ] });
			slip.classList.remove("draw");
		}, 2200);
	}

	private retry() {
		let btn = document.querySelector(".fortuneDrawResultContainer");
		btn.classList.add("fade");

		setTimeout(() => {
			document.querySelector("#main").scrollTop = 0;
			this.setState({ fortune: [] });
		}, 1000);
	}

	private showFortuneTemplate(fortuneStrings: string[]) {
		return (
			<div className="fortuneDrawResultContainer">
				<div className="fortuneDrawResultContainerOuter">
					<span>Your fortune:</span>
					<button onClick={ () => this.retry() } id="retry"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d6155b58-5126-439a-ade3-895083fe1973/ddxelba-f92e0d4e-3dcf-48bb-afed-fe99d605f2a7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZDYxNTViNTgtNTEyNi00MzlhLWFkZTMtODk1MDgzZmUxOTczXC9kZHhlbGJhLWY5MmUwZDRlLTNkY2YtNDhiYi1hZmVkLWZlOTlkNjA1ZjJhNy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.Tbgd32K_c5fgTJxKxcOlv6pc48KGmfS0R8Q1sPBseIk"></img></button>
					<div className="fortuneDrawResultContainerMiddle">
						<div className="fortuneDrawResultContainerInner">
							<span>LUCK</span>
							<div className="fortuneContentContainer">
								<div className="fortuneImage"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d6155b58-5126-439a-ade3-895083fe1973/de16tn4-77fb1197-38c9-4b50-af4c-d1a1c45449e4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZDYxNTViNTgtNTEyNi00MzlhLWFkZTMtODk1MDgzZmUxOTczXC9kZTE2dG40LTc3ZmIxMTk3LTM4YzktNGI1MC1hZjRjLWQxYTFjNDU0NDllNC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.FFoXy_53iqFjriREg0BSN8PjUJYEfC_Ng2U8SIh_PG4"></img></div>
								<div className="fortuneText" id="genLuckText" dangerouslySetInnerHTML={{ __html: `<span>${fortuneStrings[0]}</span>` }}></div>
							</div>
							<span>RELATIONSHIPS</span>
							<div className="fortuneContentContainer">
								<div className="fortuneImage"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d6155b58-5126-439a-ade3-895083fe1973/de16tmx-ca1d0ed0-104b-4df2-bedf-49c1b66e3cb1.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZDYxNTViNTgtNTEyNi00MzlhLWFkZTMtODk1MDgzZmUxOTczXC9kZTE2dG14LWNhMWQwZWQwLTEwNGItNGRmMi1iZWRmLTQ5YzFiNjZlM2NiMS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ._uN5I1vkcbS-pZsN8_1v4zRUCNTcuU8cn5nmYvHX00U"></img></div>
								<div className="fortuneText" id="loveLuckText">{ fortuneStrings[1] }</div>
							</div>
							<span>CAREER</span>
							<div className="fortuneContentContainer">
								<div className="fortuneImage"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d6155b58-5126-439a-ade3-895083fe1973/de16tmu-e59e64dd-78bd-4235-a9a5-4a7e97b1052e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZDYxNTViNTgtNTEyNi00MzlhLWFkZTMtODk1MDgzZmUxOTczXC9kZTE2dG11LWU1OWU2NGRkLTc4YmQtNDIzNS1hOWE1LTRhN2U5N2IxMDUyZS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.ffCOPgRZuIBgvBIdLKwz-llFtQ2o51GAdp2ia_-l2xs"></img></div>
								<div className="fortuneText" id="luckLuckText">{ fortuneStrings[2] }</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	private showGenerator() {
		this.imageCount ++;

		if (this.imageCount === 4) {
			document.querySelector(".fortuneDrawContainer").classList.remove("hide");
			document.querySelector(".loading-container").classList.add("hide");
			this.imageCount = 0;
		}
	}

	private getTemplate() {
		return(
			<div>
				<div className="loading-container">Loading...</div>
				<div className="fortuneDrawContainer hide">
					<div className="fortuneDraw-side"><img onLoad={() => this.showGenerator() } src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d6155b58-5126-439a-ade3-895083fe1973/de14mtz-072f7ffb-883d-4b56-ac3d-ff351266f132.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZDYxNTViNTgtNTEyNi00MzlhLWFkZTMtODk1MDgzZmUxOTczXC9kZTE0bXR6LTA3MmY3ZmZiLTg4M2QtNGI1Ni1hYzNkLWZmMzUxMjY2ZjEzMi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.p5kxhbP0LtARiAeKIxxWX97iNfE90hzJ2uGUlwmAsx4"></img></div>
					<div className="fortuneDraw-main">
						<div className="fortuneDraw-top"><img onLoad={() => this.showGenerator() } src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d6155b58-5126-439a-ade3-895083fe1973/de14mu3-d53a37fa-d88f-4d52-abac-d5447572dd1e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZDYxNTViNTgtNTEyNi00MzlhLWFkZTMtODk1MDgzZmUxOTczXC9kZTE0bXUzLWQ1M2EzN2ZhLWQ4OGYtNGQ1Mi1hYmFjLWQ1NDQ3NTcyZGQxZS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.4sLV3_4LS1FIQ-DneVSMn5tGmmODhhfetQ2Kb9pxKnk"></img></div>
						<div className="fortuneDraw-bottom"><img onLoad={() => this.showGenerator() } src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d6155b58-5126-439a-ade3-895083fe1973/de14mu9-e58264bd-b796-4ca7-af92-2f1ab8fef75e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZDYxNTViNTgtNTEyNi00MzlhLWFkZTMtODk1MDgzZmUxOTczXC9kZTE0bXU5LWU1ODI2NGJkLWI3OTYtNGNhNy1hZjkyLTJmMWFiOGZlZjc1ZS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.CsjXoiSPyYVrFM9PXxPVAy6KblqEFE2zIOg98aN-lQA"></img></div>
						<div className="fortuneDraw-slip" onClick={ () => this.clickButton() }><img onLoad={() => this.showGenerator() } src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d6155b58-5126-439a-ade3-895083fe1973/de2lmci-c1dd3e0e-2fa7-44ae-8c3a-2d9983ecefbc.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZDYxNTViNTgtNTEyNi00MzlhLWFkZTMtODk1MDgzZmUxOTczXC9kZTJsbWNpLWMxZGQzZTBlLTJmYTctNDRhZS04YzNhLTJkOTk4M2VjZWZiYy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.-9SQZU5vOIvuyLN2uafZtvZqFgyabdiUtmYEKP7mVpk"></img></div>
					</div>
				</div>
			</div>
		);
	}

	constructor(props: Readonly<{}>) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			fortune: []
		};
	}

	componentDidMount() {
		this.preloadData();
	}

	render() {
		document.getElementById("main").classList.add("fortune");

		let { error, isLoaded, fortune } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div className="loading-container">Loading...</div>;
		} else if (fortune.length) {
			return this.showFortuneTemplate(fortune);
		} else {
			return this.getTemplate();
		}
	}
}

export default FortuneDraw;