const BASE_URL = "http://localhost:5279/orders";

const defaultOrder = {
    id: 1,
    name: "asd",
    foodType: "My Ass",
    email: "asd@edgind",
    phoneNumber: "asd",
    date: new Date(Date.now())
}

interface Order{
    id: number,
    name: string,
    foodType: string,
    email?: string
    phoneNumber?: string
    date: Date
}

export async function ReadAllUncompleted(){
    try{
        const raw = await fetch(`${BASE_URL}/all?completed=false`,{
            method: "GET",
        });
        let orderList: Order[] = await raw.json();
        mapOrderListDates(orderList);
        return orderList;
    }
    catch(e){
        console.log(e);
    }
}

export async function ReadAll(){
    try{
        const raw = await fetch(`${BASE_URL}/all`,{
            method: "GET",
        });
        let orderList: Order[] = await raw.json();
        mapOrderListDates(orderList);
        return orderList;
    }
    catch(e){
        console.log(e);
    }
}

export async function ReadAllCompleted(){
    try{
        const raw = await fetch(`${BASE_URL}/all?completed=true`,{
            method: "GET",
        });
        let orderList: Order[] = await raw.json();
        mapOrderListDates(orderList);
        return orderList;
    }
    catch(e){
        console.log(e);
    }
}

export async function ReadOrder(id: number){
    try{
        const raw = await fetch(`${BASE_URL}/id`,{
            method: "GET",
        });
        let order: Order = await raw.json();
        order.date = new Date(order.date);
        return order;
    }
    catch(e){
        console.log(e);
    }
}




function mapOrderListDates(orders: Order[]) {
  orders.map((order, index) => 
    orders[index] = {...order, "date": new Date(order.date)}); 
}

export async function ReadAllFiltered(filter: string){

}
