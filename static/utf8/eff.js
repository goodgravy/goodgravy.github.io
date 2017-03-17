(function(window, document) {
	var decoded = document.querySelector('textarea');
	var encodedChars = document.querySelector('div.encoded.characters');
	var encodedBits = document.querySelector('div.encoded.binary');

	function binEscape(string) {
		var byteSequences = [];
		var symbols = Array.from(string);

		for (var index = 0; index < symbols.length; index++) {
			byteSequences.push(binEscapeSymbol(symbols[index]));
		}
		return byteSequences.join('\n');
	}

	function binEscapeSymbol(symbol) {
		var utf8Value = utf8.encode(symbol);
		var bytes = [];
		var bin;

		for (var index = 0; index < utf8Value.length; index++) {
			bin = utf8Value.charCodeAt(index).toString(2);
			bytes.push(('00000000' + bin).slice(-8));
		}
		return bytes.join(' ');
	}

	function splitChars(string) {
		var chars = Array.from(string);
		var spacesForReturns = chars.map(function(char) {
			return char.replace(/(\r\n|\n|\r)/gm, '');
		});
		return Array.from(spacesForReturns).join('\n');
	}

	function update() {
		encodedChars.innerText = splitChars(decoded.value);
		encodedBits.innerText = binEscape(decoded.value);
	};

	// https://mathiasbynens.be/notes/oninput
	decoded.onkeyup = update;
	decoded.oninput = function() {
		decoded.onkeyup = null;
		update.call(this);
	};
}(this, document));
