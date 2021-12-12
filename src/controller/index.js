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
          
        res.json({ "fulfillmentText": "Uma pizza de " + order.pizza[0].PizzaTipo + ", " + order.pizza[0].PizzaTamanho + ", certo?"})
        break
        case "Order Intent - next":
          res.json( { "fulfillmentText": "Deseja adicionar algo para beber com seu pedido?" } )
        break
        case "Order Intent - next - yes":
          order.drink = []
          orderDrink()
          res.json( { "fulfillmentText": "Tudo ok! Seu pedido ficou "+ orderSummary() + ", total de R$" + orderTotal() + ". Deseja concluir seu pedido?"} )
        break
        case "Order Intent - next - no":
          res.json( { "fulfillmentText": "Tudo ok! Seu pedido ficou "+ orderSummary() + ", total de R$" + orderTotal()  + ". Deseja concluir seu pedido?"} )
        break
        case "Order Intent - next - yes - yes":
          res.json( { "fulfillmentText": "Pedido concluído!"} )
        break
    }

    function orderPizza() {
        let param = req.body.queryResult.parameters
        Object.keys(param).forEach(e => {
          if(param[e] !== ""){
            data[e] = `${param[e]}`
          }  
      }) 
          order.pizza.push(data);
          data = {}
    }

    function orderDrink() {
      let param = req.body.queryResult.parameters
      Object.keys(param).forEach(e => {
        if(param[e] !== ""){
          data[e] = `${param[e]}`
        }  
    }) 
        order.drink.push(data)
        data = {}
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

    function orderSummary() {
      let bebida = ""
      let pizza = order.pizza[0].Quantidade + " pizza(s) de " + order.pizza[0].PizzaTipo + " e borda " + order.pizza[0].Bordas
      if(order.drink !== undefined)
        bebida = order.drink[0].number + " " + order.drink[0].Bebidas + "(s)"
    
          if(bebida !== "") {
            return pizza + " e " + bebida
          }
          else
            return pizza
        }
    
    function orderTotal() {
      total = 0; 

      order.pizza.forEach(e => {
        //size modifier
        switch (e.PizzaTamanho) {
          case 'broto' :
            total += menu.sabores.tamanho.broto
            break
          case 'media' :
            total += menu.sabores.tamanho.media
            break
          case 'grande' :
            total += menu.sabores.tamanho.grande
            break
          case 'familia' :
            total += menu.sabores.tamanho.familia
            break
        }
        //flavour modifier
        switch (e.PizzaTipo) {
          case 'brigadeiro':
            total += menu.sabores.doces.brigadeiro
            break
          case 'banana':
            total += menu.sabores.doces.banana
            break
          case 'doce de leite':
            total += menu.sabores.doces.doceDeLeite
            break
          case 'atum':
            total += menu.sabores.salgadas.atum
            break
          case 'calabresa':
            total += menu.sabores.salgadas.calabresa
            break
          case 'camarão':
            total += menu.sabores.salgadas.camarao
            break
          case 'frango':
            total += menu.sabores.salgadas.frango
            break
          case 'quatro queijos':
            total += menu.sabores.salgadas.quatroQueijos
            break
        }
        //Crust check
        if(e.Bordas === "recheada")
          total += 5;
        
        //quantity modifier
        total *= e.Quantidade
        
          //only iterate if ordered drink
          if(order.drink !== undefined) {
            order.drink.forEach(e => {
              switch (e.Bebidas) {
                case 'refrigerante':
                  total += menu.bebidas.refrigerante * e.number
                  break
                case 'suco':
                  total += menu.bebidas.suco * e.number
                  break
                case 'água':
                  total += menu.bebidas.agua * e.number
                  break
                case 'água de coco':
                  total += menu.bebidas.aguaCoco * e.number
              }
            })
          }
        
      })
      return total;
    }
}

module.exports = {
  entities
}