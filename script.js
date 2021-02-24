// Cookie functions
function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
	options = {
		path: '/',
		'max-age': '31536000',
		...options
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	for (let optionKey in options) {
		updatedCookie += "; " + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}

	document.cookie = updatedCookie;
}

var itemInjectorOption, rightInjectorContent, options, rightPanel;
var MAIN_BACKGROUND, SIDE_BACKGROUND, CALENDAR_BACKGROUND;

// Setting some default backgrounds
if (getCookie("mainBackground") === undefined) {
	setCookie("mainBackground", "https://media1.tenor.com/images/79a1d6b4607203809a36b8ca27d3c6ef/tenor.gif");
	setCookie("sideBackground", "https://i.imgur.com/QEIpGEC.gif");
	setCookie("calendarBackground", "https://i.imgur.com/0ofQAW6.jpeg");
}
MAIN_BACKGROUND = getCookie("mainBackground");
SIDE_BACKGROUND = getCookie("sideBackground");
CALENDAR_BACKGROUND = getCookie("calendarBackground");

var styleSheet = document.styleSheets[0];

// Make wrapper transparent
styleSheet.insertRule(".item-wrap {background: transparent !important;}");
// Add background image to ::before pseudo, so background can be changed using css
styleSheet.insertRule('.message-list-common::before {content:"";top:0;left:0;width:100%;height:100%;position:absolute;background:url("'+MAIN_BACKGROUND+'") center / cover no-repeat;filter:brightness(0.5);}');

// Hide elements in files tab and sidebar so background is visible
styleSheet.insertRule(".vr-item-placeholders {display: none !important;}");
styleSheet.insertRule(".css-43 {background: transparent !important;}");
styleSheet.insertRule(".root_b545fc9a div{background: transparent !important;}");
// Apply background to files tab
styleSheet.insertRule('.ms-ScrollablePane::before {content:"";top:0;left:0;width:100%;height:100%;position:absolute;background:url("'+MAIN_BACKGROUND+'");background-size:cover;filter:brightness(0.5);}');
// Apply background to sidebar
styleSheet.insertRule('.ts-channel-list::before {content:"";top:0;left:0;width:100%;height:100%;position:absolute;background:url("'+SIDE_BACKGROUND+'") center / cover no-repeat;filter:brightness(0.5);}');

// Hide elements in calendar tab so background is visible
styleSheet.insertRule(".contentContainer-48::-webkit-scrollbar {display: none;}");
styleSheet.insertRule(".node_modules--msteams-bridges-components-calendar-grid-dist-es-src-renderers-grid-line-renderer-grid-line-renderer__gridLineContainer--1OJHY *{background: transparent !important;}");
styleSheet.insertRule(".node_modules--msteams-bridges-components-calendar-grid-dist-es-src-renderers-grid-line-renderer-grid-line-renderer__gridLineContainer--1OJHY{background: transparent !important;}");
// Apply background image to calendar tab
styleSheet.insertRule('.node_modules--msteams-bridges-components-calendar-grid-dist-es-src-containers-calendar-grid-container-calendar-grid-container__calendarGridContainer--291Hk.node_modules--msteams-bridges-components-calendar-grid-dist-es-src-containers-calendar-grid-container-calendar-grid-container__flexFill--Oa0UA::before {content:"";top:0;left:0;width:100%;height:100%;position:absolute;background:url("'+CALENDAR_BACKGROUND+'") center / cover no-repeat;filter:brightness(0.5);}');

// Hide elements in files sidebar tab so background is visible
styleSheet.insertRule(".ts-embedded-container{background: transparent !important;}");
styleSheet.insertRule(".files-list-repeat-container{background: transparent !important;}");
styleSheet.insertRule(".files-list-repeat-container div div{background: transparent !important;}");
styleSheet.insertRule(".ts-table .tbody .tr{border: none !important;}")
// Apply background to files sidebar tab
styleSheet.insertRule('.ts-middle-stars-tab-stripe::before {content:"";top:0;left:0;width:100%;height:100%;position:absolute;background:url("'+MAIN_BACKGROUND+'");background-size:cover;filter:brightness(0.5);}');

// Converting html string to element
function htmlToElement(html) {
	var template = document.createElement('template');
	html = html.trim();
	template.innerHTML = html;
	return template.content.firstChild;
}


// Template for left settings side
var leftTemplate = `
<div class="options-settings-left-item" role="tab" id="teams-injector">
	<svg viewBox="0 0 32 32" role="presentation" focusable="false" class="app-svg icons-settings">
		<g class="icons-default-fill">
			<path class="icons-unfilled" d="m 22.114135,8.0111198 c -0.805547,0.08475 -1.774722,0.6210004 -2.962902,1.6393759 -2.149605,1.8424383 -4.685311,5.0236273 -6.318406,7.3125033 -1.192461,-0.185969 -2.449267,0.324001 -3.1934068,1.254157 -1.3658707,1.707345 -0.2224419,3.230971 -1.5108111,4.58944 -0.2243481,0.236531 -0.1443153,0.625157 0.1556281,0.753563 2.1077608,0.902375 4.8020948,0.339969 6.0660258,-0.99275 0.772453,-0.81447 1.192742,-2.016876 0.981613,-3.148815 2.258826,-1.733188 5.3797,-4.404877 7.147016,-6.621409 0.978645,-1.227407 1.475279,-2.214751 1.51828,-3.0184393 0.05797,-1.0827193 -0.782328,-1.8833134 -1.883037,-1.7676259 z M 13.670062,21.922221 c -0.855079,0.901563 -2.746898,1.426688 -4.4303059,0.977719 0.9412689,-1.501345 0.1321588,-2.847626 1.1317099,-4.097065 0.820204,-1.02525 2.469861,-1.312281 3.428474,-0.353656 1.119991,1.120094 0.598293,2.705189 -0.129878,3.473002 z m 0.09594,-4.651284 c 0.229817,-0.317719 0.59023,-0.808282 1.040333,-1.395595 l 1.538155,1.538252 c -0.566417,0.465812 -1.039489,0.839375 -1.346183,1.077938 -0.276318,-0.496219 -0.703951,-0.940876 -1.232305,-1.220595 z M 23.061029,9.7286207 C 22.955777,11.697497 18.565878,15.54178 17.067254,16.81053 L 15.38644,15.129592 c 1.233087,-1.561251 4.852002,-5.9785028 6.825822,-6.1860654 0.526604,-0.055469 0.875955,0.2768126 0.848767,0.7850941 z" />
		</g>
	</svg>
	<span class="single-line-truncation" title="Teams injector">Teams injector</span>
</div>
`;
// Template for right settings side
var contentTemplate = `
<div>
	<style>
		.input-text {
			background: transparent;
			border-width: 0px;
			font-size: 14px;
			font-weight: 400;
			box-shadow: none;
			margin: 0px;
			padding: 0px 12px 2px 12px;
			width: 100%;
			color: white;
			height: 32px;
		}
		.input-text-wrapper:focus-within {
			border-bottom-color: rgb(166, 167, 220);
			border-bottom-right-radius: 2px;
			border-bottom-left-radius: 2px;
			border-width: 0px 0px 2px;
		}
		.input-text-wrapper {
			backgorund: rgb(32, 31, 31);
			height: auto;
			box-shadow: none;
			margin: 0px 0px 0px 0px;
			padding: 0px 0px 0px 0px;
			box-sizing: border-box;
			cursor: text;
			height: 32px;
			display: flex;
			flex-direction: row;
			align-items: stretch;
			position: relative;
			border-image: initial;
			border-radius: 3px;
			background: rgb(32, 31, 31);
			border-width: 0px 0px 2px;
			border-style: solid;
			border-color: transparent;
		}
		.input-label {
			font-size: 1.2rem;
			font-weight: 400;
			margin: 1rem 0 .8rem;
		}
	</style>
	<div class="options-settings-right" id="teams-injector-right">
		<div class="options-settings-right-item">
			<div class="right-item-default-scrollbar">
				<div class="options-device-permission-tab options-settings-common-tab simple-scrollbar">
					<div class="manage-permissions">
						<div class="manage-header">Teams injector</div>
						<div class="manage-text">Settings for teams injector default script. You can change here background images.</div>
						<hr aria-hidden="true" class="device-settings-partition">
						<div class="audio-dropdown-container">
							<label class="input-label">Main background</label>
							<div class="ms-TextField-wrapper">
								<div class="ms-TextField-fieldGroup input-text-wrapper" style="">
									<input type="text" placeholder="Put new URL" class="ms-TextField-field input-text" id="mainBckgInput">
								</div>
							</div>
						</div>
						<div class="audio-dropdown-container">
							<label class="input-label">Sidebar background</label>
							<div class="ms-TextField-wrapper">
								<div class="ms-TextField-fieldGroup input-text-wrapper" style="">
									<input type="text" placeholder="Put new URL" class="ms-TextField-field input-text" id="sidebarBckgInput">
								</div>
							</div>
						</div>
						<div class="audio-dropdown-container">
							<label class="input-label">Calendar background</label>
							<div class="ms-TextField-wrapper">
								<div class="ms-TextField-fieldGroup input-text-wrapper" style="">
									<input type="text" placeholder="Put new URL" class="ms-TextField-field input-text" id="calendarBckgInput">
								</div>
							</div>
						</div>
						<div class="form-field-input generic-edit-button" style="margin-top: 2.5rem;">
							<button class="ts-btn ts-btn-fluent ts-btn-fluent-secondary" id="injectorApplyButton">Apply</button>
						</div>
						<hr aria-hidden="true" class="device-settings-partition">
						<div class="manage-text">Icons made by Freepik from www.flaticon.com</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
`;

// Changing settings tab
function itemClicked(e) {
	if (e.target === itemInjectorOption || itemInjectorOption.contains(e.target)) {
		for (const _item of options.children) _item.classList.remove("selected");
		itemInjectorOption.classList.add("selected");
		rightInjectorContent.style.display = "";
		rightPanel.style.display = "none";
	} else {
		itemInjectorOption.classList.remove("selected");
		rightInjectorContent.style.display = "none";
		rightPanel.style.display = "";
	}
}

// Applying changes
function applyClicked() {
	var main = rightInjectorContent.querySelector("#mainBckgInput").value;
	var side = rightInjectorContent.querySelector("#sidebarBckgInput").value;
	var calendar = rightInjectorContent.querySelector("#calendarBckgInput").value;
	styleSheet.rules[0].style.backgroundImage = 'url("'+main+'")';
	styleSheet.rules[10].style.backgroundImage = 'url("'+main+'")';
	styleSheet.rules[14].style.backgroundImage = 'url("'+main+'")';
	
	styleSheet.rules[5].style.backgroundImage = 'url("'+calendar+'")';
	styleSheet.rules[9].style.backgroundImage = 'url("'+side+'")';
	
	setCookie("mainBackground", main);
	setCookie("sideBackground", side);
	setCookie("calendarBackground", calendar);
}

// Observing for settings dialog box
var observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		if (!mutation.addedNodes) return;

		for (let i = 0; i < mutation.addedNodes.length; i++) {
			let node = mutation.addedNodes[i];
			if (node.id && node.id.startsWith('ngdialog')) {
				options = node.querySelector('#options-dialog-focus-default');
				rightPanel = node.querySelector('.options-settings-right');
				rightInjectorContent = htmlToElement(contentTemplate);
				rightPanel.parentElement.appendChild(rightInjectorContent);
				rightInjectorContent.querySelector("#mainBckgInput").value = MAIN_BACKGROUND;
				rightInjectorContent.querySelector("#sidebarBckgInput").value = SIDE_BACKGROUND;
				rightInjectorContent.querySelector("#calendarBckgInput").value = CALENDAR_BACKGROUND;
				rightInjectorContent.querySelector("#injectorApplyButton").onclick = applyClicked;
				rightInjectorContent.style.display = "none";
				itemInjectorOption = htmlToElement(leftTemplate);
				options.appendChild(itemInjectorOption);
				for (const item of options.children) item.onclick = itemClicked;
			}
		}
	});
});

observer.observe(document.body, {
	childList: true,
	subtree: true,
	attributes: false,
	characterData: false
});