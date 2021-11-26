import type {FC} from 'react';
import {AppBar, Toolbar} from '@material-ui/core';
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
    return (
        <AppBar className={styles.nav}>
            <Toolbar className={styles.root}>
                <div className="ad-nav-title">
                    AdminDash...
                </div>

                <div className="ad-nav-items">
                    <div className="ad-nav-item">Cook</div>
                    <div className="ad-nav-item">Orders</div>
                </div>

            </Toolbar>
        </AppBar>
    )
}

export default Compoenent;