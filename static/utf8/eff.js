(function(window, document) {

	var textareas = document.getElementsByTagName('textarea');
	var decoded = textareas[0];
	var encoded = textareas[1];
	var stringFromCharCode = String.fromCharCode;

	function hexEscape(string) {
		var length = string.length;
		var index = -1;
		var result = '';
		var hex;
		while (++index < length) {
			hex = string.charCodeAt(index).toString(16).toUpperCase();
			result += '\\x' + ('00' + hex).slice(-2);
		}
		return result;
	}

	function binEscape(string) {
		var result = '';
		var symbols = Array.from(string);
		for (var index = 0; index < symbols.length; index++) {
			result += binEscapeSymbol(symbols[index]) + '\n';
		}
		return result;
	}

	function binEscapeSymbol(symbol) {
		var utf8Value = utf8.encode(symbol);
		var result = '';
		var bin;
		for (var index = 0; index < utf8Value.length; index++) {
			bin = utf8Value.charCodeAt(index).toString(2);
			result += ('00000000' + bin).slice(-8) + ' ';
		}
		return result;
	}

	function update() {
		encoded.value = binEscape(decoded.value);
		decoded.className = encoded.className = '';
	};

	// https://mathiasbynens.be/notes/oninput
	decoded.onkeyup = update;
	decoded.oninput = function() {
		decoded.onkeyup = null;
		update.call(this);
	};
}(this, document));
