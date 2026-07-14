# SendScriptWhatsApp

Envia os roteiros de Shrek ou Bee Movie em mensagens agrupadas pelo WhatsApp Web.

> Este projeto não é oficial do WhatsApp. Teste primeiro em uma conversa própria e use somente com pessoas que concordaram em receber as mensagens.

## Como usar

1. Escolha um roteiro:
   - [Shrek](shrekSendScript.js)
   - [Bee Movie](beeMovieSendScript.js)
2. Na página do arquivo, clique em **Raw** e copie todo o conteúdo.
3. Abra o [WhatsApp Web](https://web.whatsapp.com), entre na sua conta e selecione a conversa que receberá o roteiro.
4. Abra o Console do navegador:
   - Windows/Linux: `Ctrl + Shift + J`
   - macOS: `Command + Option + J`
5. Cole o script no Console e pressione `Enter`.
6. Acompanhe o progresso pelas mensagens `Lote X/Y enviado` exibidas no Console.

Se o Chrome bloquear a colagem, leia o alerta de segurança. Somente depois de revisar e confiar no código, digite `allow pasting`, pressione `Enter` e tente colar novamente.

A conversa aberta no início fica fixada como destinatária. Se você abrir outra pessoa ou grupo durante a execução, o script interrompe antes do próximo lote para evitar envio no chat errado.

## Configurar os lotes

Os valores padrão ficam na assinatura da função, no início de cada arquivo:

```js
async function enviarScript(scriptText, linhasPorMensagem = 10, intervalo = 1000)
```

- `linhasPorMensagem`: quantidade de linhas reunidas em cada mensagem.
- `intervalo`: espera entre mensagens, em milissegundos.

Por exemplo, para enviar 20 linhas por mensagem e aguardar 2 segundos, altere para:

```js
async function enviarScript(scriptText, linhasPorMensagem = 20, intervalo = 2000)
```

Com a configuração padrão:

- Bee Movie envia 137 mensagens.
- Shrek envia 267 mensagens.

## Interromper o envio

Recarregue ou feche a aba do WhatsApp Web. As mensagens já enviadas não são desfeitas.

## Erros comuns

- `Abra uma conversa antes de executar o script`: selecione uma conversa e execute novamente.
- `Botão de enviar não encontrado`: recarregue o WhatsApp Web. Se continuar, a interface pode ter mudado e os seletores precisam ser atualizados.
- `A conversa mudou`: volte à conversa original e inicie novamente; os lotes já enviados não serão repetidos automaticamente.
- O Console não aceita a colagem: siga o alerta de segurança do Chrome descrito acima.

## Validar localmente

O projeto não possui dependências. Com Node.js instalado:

```bash
node --check beeMovieSendScript.js
node --check shrekSendScript.js
node test-batches.js
```
