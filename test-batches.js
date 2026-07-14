const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

(async () => {
	for (const arquivo of ["beeMovieSendScript.js", "shrekSendScript.js"]) {
		const codigo = fs.readFileSync(arquivo, "utf8").split("enviarScript(`", 1)[0];
		let buscas = 0;
		let chatAtual = "Pessoa A";
		let campoAtual = 0;
		let reaberturas = 0;
		const focados = [];
		const valoresBusca = [];
		class CampoBusca {
			focus() {}
			get value() { return this._value; }
			set value(valor) { this._value = valor; valoresBusca.push(valor); }
			dispatchEvent(event) { assert.equal(event.type, "input"); }
		}
		const busca = new CampoBusca();
		const botao = {cliques: 0, click() { this.cliques++; if (this.cliques === 1) chatAtual = "Pessoa B"; }};
		const main = {querySelector(seletor) {
			if (seletor.includes("contenteditable")) {
				const id = campoAtual++;
				return {focus() { focados.push(id); }, getAttribute() { return `Digite uma mensagem para ${chatAtual}`; }, dispatchEvent(event) { assert.equal(event.type, "input"); }};
			}
			assert.match(seletor, /aria-label="Enviar"/);
			return ++buscas > 2 ? {closest: () => botao} : null;
		}};
		const titulo = {getAttribute: () => "Pessoa A", closest: () => ({click() { chatAtual = "Pessoa A"; reaberturas++; }})};
		const contexto = {
			console: {log() {}},
			document: {
				querySelector: seletor => seletor === "#main" ? main : busca,
				querySelectorAll: () => [titulo],
				execCommand: () => true
			},
			Event: class { constructor(type) { this.type = type; } },
			HTMLInputElement: CampoBusca,
			setTimeout: resolve => resolve()
		};
		vm.runInNewContext(codigo, contexto);

		assert.deepEqual(Array.from(contexto.criarLotes(" a\n\n b\t c ", 2)), ["a\nb", "c"]);
		assert.throws(() => contexto.criarLotes("a", 0), /ao menos uma linha/);
		assert.equal(await contexto.enviarScript("a\nb\nc", 2, 0), 2);
		assert.equal(botao.cliques, 2);
		assert.equal(new Set(focados).size, 2);
		assert.equal(reaberturas, 1);
		assert.deepEqual(valoresBusca, ["Pessoa A", ""]);
	}

	console.log("Lotes e envio sequencial validados nos dois scripts");
})().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
