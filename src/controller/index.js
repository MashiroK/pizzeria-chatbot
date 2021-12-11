const menu = require('../menu');
let orderModel = require('../model');

let order = new orderModel();
let data = new orderModel();

const entities = (req, res) => {

    let intent = req.body.queryResult.intent.displayName
    switch (intent) {
      case "See Menu Intent":
        showMenu()
        break
      case "Order Intent":
          order.pizza = []
          data = {}
          let counter = 0;
          while (counter < req.body.queryResult.parameters["Quantidade"]) {
            orderPizza()
            counter++;
          }
          
        res.json({ "fulfillmentText": ""})
        break
        case "Order Intent - next":
          res.json( { "fulfillmentText": "Deseja adicionar algo para beber com seu pedido?" } )
        break
    }

    function showMenu() {
      res.json({"fulfillmentText": `Certo, aqui está o nosso cardápio:
            Tamanhos:
              Broto:           +$${menu.sabores.tamanho.broto},
              Média:           +$${menu.sabores.tamanho.media},
              Grande:          +$${menu.sabores.tamanho.grande},
              Família:         +$${menu.sabores.tamanho.familia},
            
            Preço Base Pizzas Salgadas:
              Quatro queijos:  $${menu.sabores.salgadas.quatroQueijos},
              Camarão:         $${menu.sabores.salgadas.camarao},
              Atum:            $${menu.sabores.salgadas.atum},
              Calabresa:       $${menu.sabores.salgadas.calabresa},
              Frango:          $${menu.sabores.salgadas.frango}.

            Preço Base Pizzas Doces:
              Brigadeiro:      $${menu.sabores.doces.brigadeiro},
              Banana:          $${menu.sabores.doces.banana},
              Doce de Leite:   $${menu.sabores.doces.doceDeLeite}.

            Bebidas:
              Refrigerante:    $${menu.bebidas.refrigerante},
              Água:            $${menu.bebidas.agua},
              Suco:            $${menu.bebidas.suco},
              Água de Coco:    $${menu.bebidas.aguaCoco}.
        `})
    }

}
    
module.exports = {
  entities
}