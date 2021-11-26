import type {FC} from 'react';
import {useState, useEffect, Fragment} from 'react';
import NavBar from './components/navBar';
import {Card, Collapse, IconButton, List, ListItem, ListItemText, Switch} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {ExpandMore, ExpandLess, Delete} from '@material-ui/icons'
import {getUsers, getOrders, verifyOrder, deleteOrder} from './utils';
import './styles/users.css';
//import { devNull } from 'os';

const Page:FC = ()=>{
    const [users, setUsers]:any = useState (null);

    useEffect (():any=>getUsers().then(users => setUsers(users)), [])

if (users===null) return (<></>);

else {
    return (
        <>
        <NavBar />
        <div className="admin-users-page-main">

            {
                users.map ((user:any):any=><Carder user={user} />)
            }
            
        </div>
        </>
    )
        }
}


export default Page;

interface CarderType {
    user: any
}


const Carder:FC<CarderType> = ({user})=>{
    const [orders, setOrders]:any = useState ([{
        name: "Suhan",
        subscription: "week",
        verified: false 
    }]);
    const [expand, setExpand]:any = useState (false);
    

    useEffect (():any=>getOrders (user.id).then(orders=>setOrders (orders)), [orders]);

    const styles = makeStyles ({
        root: {
            padding: "3%",
            marginTop: "5%",
        }
    }) ();




    return (
        <>
            <Card className={styles.root}>
                <div className="admin-users-card-row">
                    <div>
                        Name: {user.name}
                    </div>

                    <div>
                        Email: {user.email}
                    </div>
                </div>

                <div className="admin-users-card-row">
                    <div>
                        Phone: {user.phone}
                    </div>

                    <div>
                        id: {user.id}
                    </div>
                </div>

                <IconButton onClick={()=>setExpand (!expand)}>
                   { !expand?<ExpandMore />:<ExpandLess /> }
                </IconButton>
                <Collapse in={expand}>

                    <List>

                        {
                            orders.map ((order:any)=>{
                                return (
                                    <OrderList order={order} id={user.id} setOrders = {setOrders}/>
                                )
                            })
                        }

                    </List>


                    
                </Collapse>
            </Card>
        </>
    )

}


interface OrderType {
    order: any,
    id: string,
    setOrders: any
}

const OrderList:FC<OrderType> = ({order, id, setOrders})=> {

    const [verified, setVerified] = useState (order.verified);
    const handleChange = ()=> {
        setVerified ((verified:any):any=>!verified)
        verifyOrder (id, order.id, verified)

    }
    const handleDelete = ()=> {
        if (window.confirm ("Delete the item?")) {
        deleteOrder (id, order.id);
        setOrders((Orders:any)=>removeItemOnce (Orders, order));
        }
    }

    const removeItemOnce = (arr:any, value:any) => {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
      }





    return (
        <ListItem>
        <ListItemText primary={order.name} secondary = {
            <Fragment>
                <div>Plan: {order.subscription}</div>
            </Fragment>
        }/>

        <Switch checked={verified} onChange={()=>handleChange} />
        <IconButton onClick={()=>handleDelete}>
            <Delete />
        </IconButton>

    </ListItem>
    )
}