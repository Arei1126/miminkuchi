`use strict`
const LANG = "ja";
import * as IDB from "./module/idb.js"
var port;

function textToESCPOS(text, port) {
	kuromoji.builder({ dicPath: "./resources/scripts/dict" }).build(async function (err, tokenizer) {
		// tokenizer is ready
		var tokens = tokenizer.tokenize(text);
		console.info(tokens);
		let kanalist = [];
		for( const token of tokens){

			if(token.pos_detail_1 == "数"){
				// 数はそのまま
				kanalist.push(token.surface_form);
				continue;
			}
			if((token.pos == "記号")){
				// 記号は飛ばす
				continue;
			}
			if(token.reading == null && (token.surface_form != null)){
				// 英単語の固有名詞はそのまま
				kanalist.push(token.surface_form);
				continue;
			}
			if(token.reading == null){
				// それ以外は飛ばす
				continue;
			}
			// 普通のかなは入れる
			kanalist.push(token.reading);
		}
		console.log(kanalist);
		const kana = kanalist.join("");
		console.log(kana);
		const kanalist2  = kana.split("");
		console.log(kanalist2);
		const kanalist3 = kanalistToAnk(kanalist2);
		console.log(kanalist3);
		try{
			const ank = kanalist3;
			const cmd = new Uint8Array(ank.length + 1)
			for (let i = 0; i < ank.length; i++){
				cmd[i] = ank[i];
			}
			cmd[ank.length] = 0x0A;	
			console.log(cmd);

			const all = new Uint8Array(cmd.length + INIT_ANK.length);
			for (let i = 0; i < ank.length; i++){
				all[i] = cmd[i];
			}
/*
			for (let i = 0; i < INIT_ANK.length; i++){
				all[i] = INIT_ANK[cmd.length + i];
			}
*/
const writer = port.writable.getWriter();
			await writer.write(cmd);
			writer.releaseLock();
		}
		catch(e){}


		function kanalistToAnk(kanalist){
			const dict = {
				"ヲ": [0xA6],
				"ァ": [0xA7],
				"ィ": [0xA8],
				"ゥ": [0xA9],
				"ェ": [0xAA],
				"ォ": [0xAB],
				"ャ": [0xAC],
				"ュ": [0xAD],
				"ョ": [0xAE],
				"ッ": [0xAF],
				"ー": [0xB0],
				"ア": [0xB1],
				"イ": [0xB2],
				"ウ": [0xB3],
				"エ": [0xB4],
				"オ": [0xB5],
				"カ": [0xB6],
				"キ": [0xB7],
				"ク": [0xB8],
				"ケ": [0xB9],
				"コ": [0xBA],
				"サ": [0xBB],
				"シ": [0xBC],
				"ス": [0xBD],
				"セ": [0xBE],
				"ソ": [0xBF],
				"タ": [0xC0],
				"チ": [0xC1],
				"ツ": [0xC2],
				"テ": [0xC3],
				"ト": [0xC4],
				"ナ": [0xC5],
				"ニ": [0xC6],
				"ヌ": [0xC7],
				"ネ": [0xC8],
				"ノ": [0xC9],
				"ハ": [0xCA],
				"ヒ": [0xCB],
				"フ": [0xCC],
				"ヘ": [0xCD],
				"ホ": [0xCE],
				"マ": [0xCF],
				"ミ": [0xD0],
				"ム": [0xD1],
				"メ": [0xD2],
				"モ": [0xD3],
				"ヤ": [0xD4],
				"ユ": [0xD5],
				"ヨ": [0xD6],
				"ラ": [0xD7],
				"リ": [0xD8],
				"ル": [0xD9],
				"レ": [0xDA],
				"ロ": [0xDB],
				"ワ": [0xDC],
				"ン": [0xDD],
				"ガ": [0xB6, 0xDE],
				"ギ": [0xB7, 0xDE],
				"グ": [0xB8, 0xDE],
				"ゲ": [0xB9, 0xDE],
				"ゴ": [0xBA, 0xDE],
				"ザ": [0xBB, 0xDE],
				"ジ": [0xBC, 0xDE],
				"ズ": [0xBD, 0xDE],
				"ゼ": [0xBE, 0xDE],
				"ゾ": [0xBF, 0xDE],
				"ダ": [0xC0, 0xDE],
				"ヂ": [0xC1, 0xDE],
				"ヅ": [0xC2, 0xDE],
				"デ": [0xC3, 0xDE],
				"ド": [0xC4, 0xDE],
				"バ": [0xCA, 0xDE],
				"ビ": [0xCB, 0xDE],
				"ブ": [0xCC, 0xDE],
				"ベ": [0xCD, 0xDE],
				"ボ": [0xCE, 0xDE],

				"パ": [0xCA, 0xDF],
				"ピ": [0xCB, 0xDF],
				"プ": [0xCC, 0xDF],
				"ペ": [0xCD, 0xDF],
				"ポ": [0xCE, 0xDF],

"A": [0x41],
"B": [0x42],
"C": [0x43],
"D": [0x44],
"E": [0x45],
"F": [0x46],
"G": [0x47],
"H": [0x48],
"I": [0x49],
"J": [0x4A],
"K": [0x4B],
"L": [0x4C],
"M": [0x4D],
"N": [0x4E],
"O": [0x4F],
"P": [0x50],
"Q": [0x51],
"R": [0x52],
"S": [0x53],
"T": [0x54],
"U": [0x55],
"V": [0x56],
"W": [0x57],
"X": [0x58],
"Y": [0x59],
"Z": [0x5A],
"a": [0x61],
"b": [0x62],
"c": [0x63],
"d": [0x64],
"e": [0x65],
"f": [0x66],
"g": [0x67],
"h": [0x68],
"i": [0x69],
"j": [0x6A],
"k": [0x6B],
"l": [0x6C],
"m": [0x6D],
"n": [0x6E],
"o": [0x6F],
"p": [0x70],
"q": [0x71],
"r": [0x72],
"s": [0x73],
"t": [0x74],
"u": [0x75],
"v": [0x76],
"w": [0x77],
"x": [0x78],
"y": [0x79],
"z": [0x7A],
"0": [0x30],
"1": [0x31],
"2": [0x32],
"3": [0x33],
"4": [0x34],
"5": [0x35],
"6": [0x36],
"7": [0x37],
"8": [0x38],
"9": [0x39],

"０": [0x30],
"１": [0x31],
"２": [0x32],
"３": [0x33],
"４": [0x34],
"５": [0x35],
"６": [0x36],
"７": [0x37],
"８": [0x38],
"９": [0x39],
				" ": [0x40],
				"!": [0x41],
				'"': [0x42],
				"#": [0x43],
				"$": [0x44],
				"%": [0x45],
				"&": [0x46],
				"'": [0x47],
				"(": [0x48],
				")": [0x49],
				"*": [0x4A],
				"+": [0x4B],
				",": [0x4C],
				".": [0x4D],
				"/": [0x4E],
				
			}

			let ankList = [];
			for(let i = 0; i < kanalist.length; i++){
				const word = kanalist[i];
				ankList.push(dict[word]);
			}
			//return ankList;
			let ankList2 = [];
			for(let i = 0; i < ankList.length; i++){
				if(ankList[i] == null){
					continue;
				}
				for(let j = 0; j < ankList[i].length; j++){
					ankList2.push(ankList[i][j]);
				}
			}
			return ankList2;
		}
	});
}

// 以下は縦横1倍カナ
//const INIT_ANK = new Uint8Array([0x1c, 0x2e,  0x1b, 0x74, 0x01, 0x1b, 0x4D, 0x00, 0x1d, 0x21, 0x00, 0x1b, 0x32, 0x1b, 0x20, 0x00, 0x1b, 0x61, 0x00, 0x0A]);
//以下は二倍

const INIT_ANK = new Uint8Array([0x1c, 0x2e,  0x1b, 0x74, 0x01, 0x1b, 0x4D, 0x00, 0x1d, 0x21, 0x11, 0x1b, 0x32, 0x1b, 0x20, 0x00, 0x1b, 0x61, 0x00, 0x0A]);

window.addEventListener("load", async ()=>{

	const downloadList = document.querySelector("#downloadList");
	const close = document.querySelector("#close");

	const manager = document.querySelector("#manager");
	
	const textArea = document.querySelector("#textArea");


	//const blue = navigator.Bluetooth;
	const ainfo = document.querySelector("#info");

	window.document.addEventListener("click", init);
	
	async function init() {
		manager.showModal();
		IDB.downloadAllCSV(downloadList);

		window.document.removeEventListener("click", init);
		ainfo.style.display = "none"
		// ここからbluetooth
		// 直接何かしているわけじゃないけど、これが無いとbluetoothでつながらない
		const ret = await navigator.bluetooth.getAvailability();
		console.info(ret);
		const devices = await navigator.bluetooth.getDevices();
		console.info(devices);
		let options = {
			fileters: [
				//	{services: ["headset"]},
			],
			acceptAllDevices: true,
		};
		// 実際に接続しているのはここから
		port = await navigator.serial.requestPort();
		await port.open({baudRate: 9600, dataits: 8,flowCotrol: "none", parity: "none",stopBits: 1});

		const writer = port.writable.getWriter();
		await writer.write(INIT_ANK);
		writer.releaseLock();

		const printerInit = document.querySelector("#printerInit");
		printerInit.addEventListener("click", async ()=>{
			const writer = port.writable.getWriter();
			await writer.write(INIT_ANK);
			writer.releaseLock();
		});
	}

	close.addEventListener("click", main);

	async function main () {

		const recognition = new webkitSpeechRecognition();
		recognition.lang = LANG;
		recognition.intermResult = false;


		const date = new Date();
		const sessionId = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
		IDB.createNewDb(sessionId);
		let PrevNode = null;

		recognition.addEventListener("result", (e)=>{
			recognition.stop();
			let results = e.results;
			console.info(results);

			let node = document.createElement("p");
			const text =results[0][results.length-1].transcript;

			node.innerText =  text;

			textArea.className = "";
			window.requestAnimationFrame(() => {
				window.requestAnimationFrame(() => {
					textArea.classList.add("prevLineAnim");
				});
			});

			textArea.insertBefore(node, PrevNode);
			PrevNode = node;

			const date = new Date();
			const recordingId = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
			const data = {"sessionId": sessionId, "recordingId": recordingId, "text": text};
			let DataArray = [];
			DataArray.push(data);
			IDB.write(sessionId, DataArray);

			// プリンターはここから
			textToESCPOS(text, port);
		});

		recognition.addEventListener("error", ()=>{
			recognition.stop();

		});
		//intermResult とisFInal

		recognition.addEventListener("end", ()=>{
			recognition.start();

		});

		recognition.start();
	}

});
