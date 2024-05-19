const express = require('express');
const items = require('./fakeDb');
const router = express.Router();

router.get('/', (req, res) => {
    return res.json({'items':items});
});

router.post('/', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    // console.log(`Name: ${name}, price: ${price}`); // debugging

    const name_price = {name: name.toLowerCase(), price: price};

    // append to items array
    items.push(name_price); 

    res.json(name_price);
});

router.get('/:name', (req, res) => {
    const id = req.params['name'].toLowerCase();
    // const item = items[id] || null;
    for (const item of items){
        if(item['name'] === id){
            console.log(item);
            return res.json(item);
        }
    }
    return res.send('Nothing found');
});

/* testing with curl: curl -X PATCH -H "Content-Type: application/json" -d '{"cat":"2.99}' http://localhost:3000/items/hat */
router.patch('/:name', (req, res) =>{
    const og_name = req.params.name.toLowerCase();
    const req_body = req.body;
    // const new_price = req.body.price;
    const new_name = req_body['name'];
    const new_price = req_body['price'];
    console.log({name:new_name, price:new_price});

    for (const item of items){
        if(item['name'] === og_name){
            if(new_name){
                item['name'] = new_name;
            }
            if(new_price){
                item['price'] = new_price;
            }
            return res.json({"updated":{name:new_name, price:new_price}});
        }
    }
    return res.send('No Match Found');
});
// testing DELETE with curl: curl -X PATCH -H "Content-Type: application/json" -d '{"cat":"2.99}' http://localhost:3000/items/hat
router.delete('/:name', (req, res) =>{
    const name_to_delete = req.params.name.toLowerCase();

    for(let i=0; i<items.length; i++){
        if(items[i].name === name_to_delete){
            items.splice(i, 1);
            return res.json({"message":"Deleted"});
        }
    }
    return res.send("Couldn't find name");

})

module.exports = router;