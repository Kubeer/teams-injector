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

var MAIN_BACKGROUND, CALENDAR_BACKGROUND;

MAIN_BACKGROUND = getCookie("mainBackground");
CALENDAR_BACKGROUND = getCookie("calendarBackground");

var styleSheet = document.styleSheets[0];

// Apply background image to calendar tab
styleSheet.insertRule('.f1ctqxl6 {background: transparent !important;}')
styleSheet.insertRule('.f16xq7d1 {background: transparent !important;}')
styleSheet.insertRule('.ui-flex.bf.nf.rn.ng, .ui-flex.bg.bh.blx.bih {background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("'+CALENDAR_BACKGROUND+'") center / cover no-repeat;}')

// Apply background image to chat tab
styleSheet.insertRule('div#message-pane-layout-a11y {background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("'+MAIN_BACKGROUND+'") center / cover no-repeat;}')


cookieStore.addEventListener('change', ({changed}) => {
    for (const {name, value} of changed) {
		if (name == 'calendarBackground') {
			CALENDAR_BACKGROUND = decodeURIComponent(value);
			styleSheet.rules[1].style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("'+CALENDAR_BACKGROUND+' center / cover no-repeat;")';
		}
		if (name == "mainBackground") {
			MAIN_BACKGROUND = decodeURIComponent(value);
			styleSheet.rules[0].style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("'+MAIN_BACKGROUND+' center / cover no-repeat;")';
		}
    }
});