import type {FC} from 'react';
import {useState, useEffect} from 'react';
import {getCooks, addCook, deleteCook} from './utils';
import {Delete} from "@material-ui/icons"
import {Card, Avatar, Button, Dialog, DialogTitle, TextField, Select, MenuItem, Collapse, IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import NavBar from './components/navBar';
import './styles/index.css';


const Page:FC = ()=>{
    const [cooks, setCooks]:any = useState ([]);
    const [open, setOpen] = useState (false);

    const handleCloseDialog = ()=>setOpen (false);

    useEffect(()=>{ 
        getCooks ().then(cooks=>setCooks (cooks));

    }, [cooks])

    const changeCookList = ()=>setCooks (cooks);

    return (
        <div className="admin-login">
            <NavBar />

            <main className="admin-main-container">
                <Button onClick={()=>setOpen (!open)} style={{backgroundColor: "blue"}}>Add Cook</Button>

                <div className="ad-card-cooks">
                    {
                        cooks.map((cook:any)=><Carder name={cook.Name} rating={cook.Rating} image={cook.Profile_Image} id={cook.Id} region={cook.Region} fun={changeCookList} state={cook.State}/>)
                    }
                </div>

                

            </main>
            <DialogBox open={open} handleCloseDialog={handleCloseDialog} />
        </div>
    )
}


export default Page;

interface CarderType {
    image: string,
    name: string,
    rating: string,
    region: string,
    state: string,
    id: string
    fun: any
}


const useCarderStyles = makeStyles ({ 
    root: {
        marginBottom: 10
    }
})

const Carder:FC<CarderType> = ({name, rating, region, state, image, id, fun})=>{

    const styles = useCarderStyles ();

    return (
        <Card>

            <div className="ad-rows">
            <div className="ad-cooks-name">
                {name}
            </div>

            <Avatar src={image} alt={name}/>
            </div>

            <div className="ad-rows">
                <div className="ad-ratings">
                    Ratings: {rating}
                </div>

                <div className="ad-state">
                    State: {state}
                </div>
            </div>

            <div className="ad-rows">
                <div className="ad-ratings">
                    Region: {region}
                </div>

                <IconButton onClick={()=>{
                    if (window.confirm ("Are you sure you want to delete thiscook") ) {
                            deleteCook (id)
                            fun ()
                    }
                }}>
                    <Delete />
                </IconButton>

            </div>




        </Card>
    )
}

interface DialogBoxTypes {
    open: any,
    handleCloseDialog: any
}


const DialogBox:FC<DialogBoxTypes> = ({open, handleCloseDialog})=> {

    const [name, setName] = useState ('');
    const [state, setState] = useState ('');
    const [region, setRegion] = useState ('');
    const [image, setImage] = useState ('');
    const [ratings, setRatings] = useState (0);
    const [speciality, setSpeciality] = useState ('');
    const [years, setYears] = useState ("");
    const [menu, setMenu]:any = useState ({
        Sunday: {
            Dal: "Suhan",
            Non_Veg_Curry: "",
            Raita_Salad: "",
            Rice: "",
            Roti: "",
            Sabji: "",
            Veg_Curry: ""
        },
        Monday: {
            Dal: "",
            Non_Veg_Curry: "",
            Raita_Salad: "",
            Rice: "",
            Roti: "",
            Sabji: "",
            Veg_Curry: ""
        },
        Tuesday: {
            Dal: "",
            Non_Veg_Curry: "",
            Raita_Salad: "",
            Rice: "",
            Roti: "",
            Sabji: "",
            Veg_Curry: ""
        },
        Wednesday: {
            Dal: "",
            Non_Veg_Curry: "",
            Raita_Salad: "",
            Rice: "",
            Roti: "",
            Sabji: "",
            Veg_Curry: ""
        },
        Thursday: {
            Dal: "",
            Non_Veg_Curry: "",
            Raita_Salad: "",
            Rice: "",
            Roti: "",
            Sabji: "",
            Veg_Curry: ""
        },
        Friday: {
            Dal: "",
            Non_Veg_Curry: "",
            Raita_Salad: "",
            Rice: "",
            Roti: "",
            Sabji: "",
            Veg_Curry: ""
        },
        Saturday: {
            Dal: "",
            Non_Veg_Curry: "",
            Raita_Salad: "",
            Rice: "",
            Roti: "",
            Sabji: "",
            Veg_Curry: ""
        }
    });

    const [items, setItems]:any = useState ({
        Dal: "",
        Non_Veg_Curry: "",
        Raita_Salad: "",
        Rice: "",
        Roti: "",
        Sabji: "",
        Veg_Curry: ""
    });

    const [day, setDay]:any = useState ("Sunday"); 
    const [collapse, setCollapse] = useState (false);

    const handleAddMenu = ()=>{
        var Menu = menu;
        Menu [day] = items;
        setMenu (Menu);
        setItems ({
            Dal: "",
            Non_Veg_Curry: "",
            Raita_Salad: "",
            Rice: "",
            Roti: "",
            Sabji: "",
            Veg_Curry: ""
        });
    }



  
    const useStyles = makeStyles ({

        

    });

    return (

        <Dialog open={open} onClose={handleCloseDialog} >
            
            <Card>
                <DialogTitle>Add Cook</DialogTitle>

                <form className="add-cooks-form" noValidate onSubmit={(e)=>{
                        e.preventDefault ();
                        addCook ({
                            Name: name,
                            Region: region,
                            Profile_Image: image,
                            Ratings: ratings,
                            Speciality: speciality,
                            Years_Of_Experience: years
                        })
                }} >
<div className="add-cooks-form-div">
                    <TextField label="Name" variant="standard" value={name} onChange={(e)=>setName (e.target.value)} required/>
                    <TextField label="State" variant="standard" value={state} onChange={(e)=>setState (e.target.value)} required/>
</div>

<div className="add-cooks-form-div">
                    <TextField label="Image" variant="standard" value={image} onChange={(e)=>setImage (e.target.value)} required/>
                    <TextField label="Region" variant="standard" value={region} onChange={(e)=>setRegion (e.target.value)} required/>
</div>
<div className="add-cooks-form-div">
                    <TextField label="Speciality" variant="standard" value={speciality} onChange={(e)=>setSpeciality (e.target.value)} required/>
                    <TextField label="Ratings" variant="standard" value={ratings} onChange={(e)=>setRatings (parseInt(e.target.value))} />
</div>   
<div className="add-cooks-forn-div">
<TextField label="Years of Experience" variant="standard" value={years} onChange={(e)=>setYears (e.target.value)} required/>
</div>     
<div className="add-cooks-form-div">
                    <Select label="Day" value = {day} onChange={(e):any=>setDay (e.target.value)}>
                        <MenuItem value="Sunday">Sunday</MenuItem>
                        <MenuItem value="Monday">Monday</MenuItem>
                        <MenuItem value="Tuesday">Tuesday</MenuItem>
                        <MenuItem value="Wednesday">Wednesday</MenuItem>
                        <MenuItem value="Thursday">Thursday</MenuItem>
                        <MenuItem value="Friday">Friday</MenuItem>
                        <MenuItem value="Saturday">Saturday</MenuItem>
                    </Select>

                    <Button onClick = {()=>{setCollapse (!collapse)}}>
                        Add Menu
                    </Button>
</div>

<Collapse in={collapse}>
        <TextField label="Dal" value={items.Dal} onChange={(e)=>setMenu ((menu:any)=>{
            const Day = menu[day];
            console.log (menu)
            Day.Dal = e.target.value;
            setItems ({
                ...items,
                Dal: e.target.value
            })
            menu [day] = Day;
            console.log (menu)
            return menu;
        })} />
        <TextField label="Non Veg Curry" value={items.Non_Veg_Curry} onChange={(e)=>setMenu ((menu:any)=>{
            const Day = menu[day];
            Day.Non_Veg_Curry = e.target.value;
            setItems ({
                ...items,
                Non_Veg_Curry: e.target.value
            })
            menu [day] = Day;
            return menu;
        })} />
        <TextField label="Raita" value={items.Raita_Salad} onChange={(e)=>setMenu ((menu:any)=>{
            const Day = menu[day];
            Day.Raita_Salad = e.target.value;
            setItems ({
                ...items,
                Raita_Salad: e.target.value
            })
            menu [day] = Day;
            return menu;
        })} />
        <TextField label="Rice" value={items.Rice} onChange={(e)=>setMenu ((menu:any)=>{
            const Day = menu[day];
            Day.Rice = e.target.value;
            setItems ({
                ...items,
                Rice: e.target.value

            })
            menu [day] = Day;
            return menu;
        })} />
        <TextField label="Roti" value={items.Roti} onChange={(e)=>setMenu ((menu:any)=>{
            const Day = menu[day];
            Day.Roti = e.target.value;
            setItems ({
                ...items,
                Roti: e.target.value
            })
            menu [day] = Day;
            return menu;
        })} />
        <TextField label="Sabji" value={items.Sabji} onChange={(e)=>setMenu ((menu:any)=>{
            const Day = menu[day];
            Day.Sabji = e.target.value;
            setItems ({
                ...items,
                Sabji: e.target.value
            })
            menu [day] = Day;
            return menu;
        })} />
        <TextField label="Veg Curry" value={items.Veg_Curry} onChange={(e)=>setMenu ((menu:any)=>{
            const Day = menu[day];
            
            Day.Veg_Curry = e.target.value;
            setItems ({
                ...items,
                Veg_Curry: e.target.value
            })
            menu [day] = Day;


            
            return menu;
        })} />

        <div>
            <Button onClick={()=>handleAddMenu} color={"primary"}>Add</Button>
        </div>
</Collapse>

        <Button type="submit"

        >Submit</Button>






                    
                </form>
            </Card>

        </Dialog>
    )
}

interface MenuItemGetterType {
    setMenu: any,
    day: any,
    menu: any

}

