import { Fragment, useState } from "react";
import Tabla from "./Tabla";

const List = ({data, check})=>{

    const [checkIn, setCheckIn] = useState(false)
    const [checkOff, setCheckOff] = useState(false)

    const addRegister = async ()=>{

        console.log(check.hour != 8  && check.hour != 15 ? 'Fuera de Tiempo!' : '')

        if(!checkIn && check.hour==8 && check.min>=0 && check.min<=15){

            let setInfoEntrada = {
                fecha: check.year +"-"+ check.month +"-"+ check.day,
                in: check.hour +":"+ check.min
            }

            await fetch("https://miastencia.onrender.com/check", {
            // await fetch("http://localhost:3000/check", {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(setInfoEntrada)
            })
            .then(data=>{return data.json()})
            .then(res=>{console.log(res.body)})
            .catch(error=>{console.log(error)})
        
            setCheckIn(true)            

        }else if(!checkIn && check.hour==8 && check.min>=16 && check.min<=30){

            let setInfoEntrada = {
                fecha: check.year +"-"+ check.month +"-"+ check.day,
                in: check.hour +":"+ check.min
            }

            await fetch("https://miastencia.onrender.com/check", {
            // await fetch("http://localhost:3000/check", {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(setInfoEntrada)
            })
            .then(data=>{return data.json()})
            .then(res=>{console.log(res.body)})
            .catch(error=>{console.log(error)})
            
            setCheckIn(true)
            
        }else if(checkIn){
            console.log('Ya se ha registrado la entrada')
        }

        if(!checkOff && check.hour==15 && check.min>=30 && check.min<=59){

            let setInfoSalida = {
                fecha: check.year +"-"+ check.month +"-"+ check.day,
                out: check.hour +":"+ check.min
            }

            await fetch("https://miastencia.onrender.com/check", {
            // await fetch("http://localhost:3000/check", {
                method: "PUT",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(setInfoSalida)
            })
            .then(data=>{return data.json()})
            .then(res=>{console.log(res.body)})
            .catch(error=>{console.log(error)})

            setCheckOff(true)

        }else if(checkOff){
            console.log('Ya se registró su salida')
        }else{
            console.log('No se registro su salida')
        }
    }
    
    return(
        <Fragment>
            <button className="btn btn-primary btn-lg" onClick={addRegister}>{check.hour != 8  && check.hour != 15 ? 'Espere a que inicie el horario de registro' : 'CHECAR'}</button>
            
            <h5>{checkIn ? 'Registrada su entrada!' : ''}</h5>
            <h5>{checkOff ? 'Registrada su Salida!' : ''}</h5>
            <hr />
            <Tabla data={data}/>
        </Fragment>
    )
}

export default List