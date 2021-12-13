# Avaliação Sprint 3 - Programa de Bolsas Compass.uol e UFMS

Terceira sprint do programa de bolsas Compass.uol para formação em chatbot Dialogflow.


## Execução

- Criar Chatbot em Dialogflow para atender esta necessidade:
  - A Pizzaria Tre Fratelli te contratou para fazer um bot para atender seus clientes.
O bot deve conseguir mostrar ao usuário quais os sabores disponíveis, e guiá-lo ao longo de um pedido.
Para fazer o pedido, são necessárias três informações:
    - qual o sabor da pizza;
    - qual o tamanho;
    - qual a forma de pagamento. 

  - Menu:
    - 5 pizzas salgadas:
      - 4 queijos, camarão, calabresa, atum, frango;
    - 3 pizzas doces:
      - brigadeiro, banana, doce de leite;
    - 4 tipos de bebida:
      - refrigerante, suco, água, água de coco;
    - 4 tamanhos de pizza:
      - broto, média, grande, família; 
    - Opção de pizzas com ou sem borda recheada.
    
- Ao final, deve mostrar as opções escolhidas, o valor do pedido, e perguntar se o cliente deseja concluir o pedido.

- Canal: Telegram.

- Subir serviço Nodejs que trate as respostas;


## Diário de bordo
Antes de iniciar o projeto, planejei o Flow da conversação desejado, de acordo com a especificação da atividade:

![Pizzaria drawio](https://user-images.githubusercontent.com/81719133/146041453-7a6fc0ac-2d2b-45d0-8e4b-2c304a0c0b52.png)

Com o Flow criado, defini as intents dentro do DialogFlow ES, e também criei as entidades. Defini os valores das pizzas com um valor estático para cada tamanho, e um modificador dependendo do sabor e borda.
Criei as rotas utilizando o express, com NodeJS. Seguindo o desenvolvimento, implementei modelos para os objetos armazenados e entidades do cardápio. Dentro do controlador, criei as respostas para os intents que utilizaram do webhook, além das respectivas funções utilizadas para persistência de dados entre intents, e outros processamentos.

## Entrega

Aplicação em NodeJS, requer que este esteja instalado na máquina/container usado.
Faça download/clone do repositório, caso necessário extraia para uma pasta local.
Importe o bot para o DialogFlow; Isso pode ser feito ao criar um novo agente no console do DialogFlow, e nas configurações deste acessar "Import and Export" e importar o zip contido no repositório.
Utilize de uma aplicação como o ngrok para estabelecer conexão com o webhook. Instale e execute o ngrok, crie conta caso necessário. Execute o comando ngrok http 3000, e caso necessário copie o link após "Fowarding" (com final ngrok.io) e cole na página de Fulfillment no console do Dialogflow (Fulfillment -> Webhook -> URL*) com a rota "/bot" (Ex: 123-456-789.ngrok.io/bot). Salve no final da página.
Alternativamente, utilize o link (https://astonishing-adaptive-hortensia.glitch.me/bot) na URL de webhook para executar este.
Execute o projeto com node index.js dentro da pasta raiz do projeto.
Após esses passos, o bot estará em execução. É possível executar o bot no painel direito, ou integrar com algum serviço. Para fazer a integração, siga os passos especificados no Console do DialogFlow.