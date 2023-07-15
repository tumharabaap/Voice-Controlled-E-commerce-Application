const menuItems = [
  { name: "Angus Burger", price: 8.99, category: "burger" },
  { name: "Tuna steak Burger", price: 19.99, category: "burger" },
  { name: "Bacon Burger", price: 21.99, category: "burger" },
  { name: "SouthWest Chicken Burger", price: 8.99, category: "burger" },
  { name: "Mozzarella Salad", price: 23.99, category: "salad" },
  { name: "Ceaser Salad", price: 3.99, category: "salad" },
  { name: "BBQ Salad", price: 14.99, category: "salad" },
  { name: "Garden Salad", price: 4.99, category: "pasta" },
  { name: "Veggie Lasagna", price: 12.99, category: "pasta" },
]

intent('show me the menu' , p => {
    p.play({command: 'getMenu', data: menuItems});
    p.play("Here's the menu");
});
intent('order by $(ORDER_BY name|price|category)', p => {
    
    const orderByField = p.ORDER_BY.value;
    let orderedMenuItems = menuItems;
    switch(orderByField) {
        case 'name':
            orderedMenuItems = menuItems.sort((p1,p2) => p1.name.localeCompare(p2.name));
            break;
        case 'price':
            orderedMenuItems = menuItems.sort((p1,p2) => p1.price - p2.price);
            break;
        case 'category':
            orderedMenuItems = menuItems.sort((p1,p2) => p1.category.localeCompare(p2.category));
            break;
    }
    p.play({command: 'getMenu', data: menuItems});
    p.play(`Ordering by ${p.ORDER_BY.value}`);
});

const menuItemsSlotList = menuItems.map(item => item.name).join("|")
intent(`Add $(ITEM ${menuItemsSlotList}) to the cart` ,
      'Add $(UNAVAILABLE_ITEM* .*) to the cart',
      p => {
   
    
    if(p.UNAVAILABLE_ITEM) {
        p.play(`That item is unavailable`);
    } else {
        const itemName = p.ITEM.value;
        const itemToGoInCart = menuItems.find((menuItem) =>{
            return menuItem.name.toLowerCase() === itemName.toLowerCase();
        })
        p.play({command: 'addToCart', data: itemToGoInCart});
        p.play(`Adding ${p.ITEM.value} to the cart. Do you confirm?`);
         p.then(confirmOrder);
    }
    
});

let confirmOrder = context(() => {
    follow('Yes', p => {
        p.play('Your order is confirmed');
    });
    
    follow('No', p => {
        p.play('Your order is cancelled');
    });
});