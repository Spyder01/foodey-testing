import type {FC} from 'react';
import {AppBar, Toolbar} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {makeStyles} from '@material-ui/core/styles'
import Store from '../../../store';
import '../styles/navBar.css';


const useStyles = makeStyles({
    nav: {
        background: 'white',
        color: 'orange'

    },
    root: {
        display: 'flex',
        justifyContent: "space-between",
    }
})


const Compoenent:FC = ()=>{
    const styles = useStyles ();
    const History = useHistory ();
    const Admin = useRecoilValue (Store.isAdmin);

    if (!Admin) History.push ("/");

    return (
        <AppBar className={styles.nav}>
            <Toolbar className={styles.root}>
                <div className="ad-nav-title">
                    AdminDash...
                </div>

                <div className="ad-nav-items">
                    <div className="ad-nav-item" onClick={()=>History.push ('/admin/cooks')}>Cook</div>
                    <div className="ad-nav-item" onClick={()=>History.push ('/admin/customers')}>Orders</div>
                </div>

            </Toolbar>
        </AppBar>
    )
}

export default Compoenent;