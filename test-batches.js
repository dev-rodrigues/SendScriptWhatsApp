const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

(async () => {
	for (const arquivo of ["beeMovieSendScript.js", "shrekSendScript.js"]) {
		const codigo = fs.readFileSync(arquivo, "utf8").split("enviarScript(`", 1)[0];
		let buscas = 0;
		const botao = {cliques: 0, click() { this.cliques++; }};
		const textarea = {focus() {}, dispatchEvent(event) { assert.equal(event.type, "input"); }};
		const main = {querySelector(seletor) {
			if (seletor.includes("contenteditable")) return textarea;
			return ++buscas > 2 ? {closest: () => botao} : null;
		}};
		const contexto = {
			console: {log() {}},
			document: {querySelector: () => main, execCommand: () => true},
			Event: class { constructor(type) { this.type = type; } },
			setTimeout: resolve => resolve()
		};
		vm.runInNewContext(codigo, contexto);

		assert.deepEqual(Array.from(contexto.criarLotes(" a\n\n b\t c ", 2)), ["a\nb", "c"]);
		assert.throws(() => contexto.criarLotes("a", 0), /ao menos uma linha/);
		assert.equal(await contexto.enviarScript("a\nb\nc", 2, 0), 2);
		assert.equal(botao.cliques, 2);
	}

	console.log("Lotes e envio sequencial validados nos dois scripts");
})().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
