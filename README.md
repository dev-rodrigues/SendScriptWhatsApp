# SendScriptWhatsApp

Código para enviar os roteiros de Shrek ou Bee Movie em lotes pelo WhatsApp Web.

## Utilização

Abra [shrekSendScript.js](shrekSendScript.js)
Ou
Abra [beeMovieSendScript.js](beeMovieSendScript.js)

Copie todo o conteúdo (clique em raw -> ctrl+a -> ctrl+c)

No WhatsApp Web abra o console do Browser

|  ⚠️ Aviso importante, numa atualização recente do Google Chrome, está sendo impedido que qualquer script seja colado no Console.|
|--|
|  ***Para contornar esse problema, o console do desenvolvedor espera receber um confirmação textual escrevendo no console: "allow pasting"***| 
|Após isso será permitido colar e continuar a execução do script|


Cole o código no console e aperte Enter

Pronto

## Envio em lotes

Por padrão, cada mensagem reúne 10 linhas do roteiro e o script aguarda 1 segundo entre mensagens. Para alterar esses valores, edite os parâmetros padrão no início do arquivo:

```js
async function enviarScript(scriptText, linhasPorMensagem = 10, intervalo = 1000)
```

O envio agora aguarda o botão do WhatsApp antes de avançar e para com um erro claro caso a interface tenha mudado. Ainda assim, revise o código antes de colá-lo e teste primeiro em uma conversa própria: o script não é oficial e o DOM do WhatsApp Web pode mudar.

## Validação

```bash
node --check beeMovieSendScript.js
node --check shrekSendScript.js
node test-batches.js
```
