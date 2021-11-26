import {db} from '../../../firebase/firebaseConfig';


const getCooks = async ()=>{
    const snapshot = await db.collection ("Cooks").get ();
    const data = await snapshot.docs.map(doc=>{
    return { ...doc.data(),
                id: doc.id
        }
    });
    console.log(data)
    return data;
}

const getUsers = async ()=>{
    const snapshot = await db.collection ("Users"). get ();
    const data = await snapshot.docs.map (doc=>{
        return {
            ...doc.data (),
            id: doc.id
        }
    });
    console.log (data);
    return data;
}

const getCook = async (id:string)=>{
    const snapshot = await db.collection ("Cooks").doc(`${id}`).get();
    console.log (snapshot.data())
    const data = await snapshot.data();
    if (data) {
        // data will never be undefined here, because we just checked that.
        const foo = data.foo
    }
    if (data!==undefined)
        return data;
}

const getOrders = async (id:string)=>{
  try {  
    const snapshot = await db.collection ("Users").doc (`${id}`).collection ("orders").get ();
    const sre = await snapshot.docs.map (async doc=>{
        const data = await doc.data ();
        const cookdetails:any = await getCook (data.cookId);
        return {
            ...data, 
            name: cookdetails.Name,
            id: data.id
        }
    }

        );
        return sre;
} catch (err) {
    return null;
}
}

const verifyOrder = (id:string, orderId:string, result:boolean) => {
try {
    const snapshot = db.collection ("Users").doc (`${id}`).collection ("orders").doc (`${orderId}`);
    snapshot.get ().then (doc=>snapshot.set ({
        ...doc,
        verified: result
    }));
} catch (err) {
    console.log (err);
}
    
}

const deleteOrder = (id:string, orderId:string) => {
    db.collection ("Users").doc (`${id}`).collection ("orders").doc (`${orderId}`).delete ().then (()=>console.log ("deleted"));
}

const verifyUsers = async (username:string, password:string) => {

   const data = await db.collection ("admins").doc (`${username}`).get ();
   const credentials:any = await data.data ();

   if (credentials.email == username && credentials.password == password)
    return true;
    else return false;

}

const getMenu = async (id:string)=>{
    const snapshot = await db.collection ("Cooks").doc (`${id}`).collection ("Menu").get ();
    const data = await snapshot.docs.map (doc=>doc.data ()) ;
    return data;

}

const addCook = (cookData:any) => db.collection ("Cooks").doc ().set (cookData);

const deleteCook = (id:string) => db.collection ("Cooks").doc (`${id}`).delete ().then (()=>console.log ("Deleted"));



export {getCooks, getUsers, getOrders, verifyOrder, deleteOrder, verifyUsers, addCook, getMenu, deleteCook};