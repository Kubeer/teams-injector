var MAIN_BACKGROUND = "https://media1.tenor.com/images/79a1d6b4607203809a36b8ca27d3c6ef/tenor.gif"
var SIDE_BACKGROUND = "https://i.imgur.com/QEIpGEC.gif"

document.styleSheets[0].insertRule(".item-wrap {background: transparent !important;}");
document.styleSheets[0].insertRule('.message-list-common::before {content:"";top:0;left:0;width:100%;height:100%;position:absolute;background:url("'+MAIN_BACKGROUND+'") center / cover no-repeat;filter:brightness(0.5);}');
document.styleSheets[0].insertRule(".vr-item-placeholders {display: none !important;}");
document.styleSheets[0].insertRule(".css-43 {background: transparent !important;}");
document.styleSheets[0].insertRule('.ms-ScrollablePane::before {content:"";top:0;left:0;width:100%;height:100%;position:absolute;background:url("'+MAIN_BACKGROUND+'");background-size:cover;filter:brightness(0.5);}');
document.styleSheets[0].insertRule('.ts-channel-list::before {content:"";top:0;left:0;width:100%;height:100%;position:absolute;background:url("'+SIDE_BACKGROUND+'") center / cover no-repeat;filter:brightness(0.5);}');
document.styleSheets[0].insertRule(".contentContainer-48::-webkit-scrollbar {display: none;}");