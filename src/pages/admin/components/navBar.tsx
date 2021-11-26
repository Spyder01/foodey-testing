import type {FC} from 'react';
import {AppBar, Toolbar} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles'
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