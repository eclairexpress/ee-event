import React from 'react';
import { SHEETS_PREFIX, readFromSheets } from './FetchSheets';
import { IState } from './helpers';

const TEXT_SHEET = "https://spreadsheets.google.com/feeds/list/1B_6uztovGLn5OW14pWC3VklwaMQvQjlI751z2FSmJmw/od6/public/values?alt=json";
const BACKGROUND = "#3a353a";
const DEFAULT_TEXT_COLOR = "white";

interface IOption {
	optionId: string;
	text: string;
}

interface IPrompt {
	text: string;
	image: string;
	options: IOption[];
}

interface IPromptDict {
	[id: string]: IPrompt;
}

interface IPromptState extends IState {
	currentPromptId: string;
	previousPromptId: string;
}

class CourageTest extends React.Component {
	private promptDict: IPromptDict = {};
	private lost = -1;
	private lostPhrases = [
		"",
		"You feel like you've already been here before...<br><br>",
		"You end up back here again... really? You do know that it's a 50/50 chance with only three signs... wait, what's the math on that...<br><br>",
		"You're back? Are you walking in circles or do you just really like this sign? If the latter, gee, thanks!",
		"You should probably just reload the page at this point and go along the other path... Or maybe you want to see if the text changes again?",
		"There's no more flavor text, please proceed!!"
	];
	state: IPromptState;

	private formatButtons(sheetsArray: any[]) {
		let formattedButtonArray: IOption[] = [];
		let buttonText = sheetsArray[SHEETS_PREFIX + "options"].$t;

		if (!buttonText) {
			return;
		}

		let buttonArray = buttonText.split(",");
			let optionId = "";
			let text = "";
			for (let i = 0; i < buttonArray.length; i++) {
				if (i % 2 === 0) {
					text = buttonArray[i];
				} else {
					optionId = buttonArray[i];
					formattedButtonArray.push({ text, optionId });
				}
			}

		return formattedButtonArray;
	}

	private getPromptObject (sheetsArray: any[]): IPrompt {
		return {
			text: sheetsArray[SHEETS_PREFIX + "text"].$t,
			image: sheetsArray[SHEETS_PREFIX + "image"].$t,
			options: this.formatButtons(sheetsArray)
		};
	}

	private preloadData = () => {
		readFromSheets(TEXT_SHEET)
			.then((result: any) => {
				let promptDict: IPromptDict = {};
				let mainArray = result.feed.entry;

				mainArray.forEach((prompt: any[]) => {
					promptDict[prompt[SHEETS_PREFIX + "id"].$t] = this.getPromptObject(prompt);
				});
				this.promptDict = promptDict;
				this.setState({
					isLoaded: true
				});
			})
			.catch((error: any) => {
				this.setState({
					isLoaded: true,
					error
				});
			});
	}

	private clickButton(e: any) {
		let id = e.currentTarget.id;
		this.setState({ previousPromptId: this.state.currentPromptId });

		setTimeout(() => {
			this.setState({ currentPromptId: id });
		}, 1000);
	}

	private getTemplate(id: string, fadeIn: boolean) {
		if (id === "16" && fadeIn) {
			this.lost ++;
			if (this.lost > 5) {
				this.lost = 5;
			}
		}
		let prompt = this.promptDict[id];
		let images = !!prompt.image ? [prompt.image] : [];

		return(
			<div className="courageTestContainer">
				<div className={"promptContainer" + (fadeIn ? " fadein" : "")}>
					{images.map(image => {
						return(
							<img key={image} src={image}></img>
						);
					})}
					<span className="promptText" dangerouslySetInnerHTML={{ __html: prompt.text }}></span>
				<span className="promptText" dangerouslySetInnerHTML={{ __html: id === "16" && this.lost > 0 ? this.lostPhrases[this.lost] : "" }}></span>
					<div className="buttonWrapper">
					{prompt.options.map(option => {
						return(
							<button key={option.optionId} id={option.optionId} onClick={e => this.clickButton(e)}>{option.text}</button>
						);
					})}
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
			currentPromptId: "1",
			previousPromptId: "0"
		};
	}

	componentDidMount() {
		this.preloadData();
	}

	render() {
		let body = document.querySelector("body");
		body.style.background = BACKGROUND;
		body.style.color = DEFAULT_TEXT_COLOR;
		document.getElementById("main").classList.add("courage-test");

		let { error, isLoaded } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div className="loading">Loading...</div>;
		} else if (this.state.previousPromptId === this.state.currentPromptId) {
			return this.getTemplate(this.state.previousPromptId, false);
		} else {
			return this.getTemplate(this.state.currentPromptId, true);
		}
	}
}

export default CourageTest;