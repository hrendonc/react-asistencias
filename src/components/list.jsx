import { Fragment, useState, useEffect } from "react";

const List = ()=>{

    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('https://back-asistencias.onrender.com/check')
        .then((response)=>response.json())
        .then((data)=>setData(data.body))
    }, [])

    const time = new Date()
    const year = time.getFullYear()
    const month = time.getMonth()
    const day = time.getDate()

    const hour = time.getHours()
    const min = time.getMinutes()
    // const hour = 15
    // const min = 36

    const check = {
        y: year,
        mo: month+1,
        d: day,
        h: hour,
        m: min
    } 

    const [checkIn, setCheckIn] = useState(false)
    const [checkOff, setCheckOff] = useState(false)

    const addRegister = async ()=>{

        console.log(hour != 8  && hour != 15 ? 'Fuera de Tiempo!' : '')

        if(!checkIn && hour==8 && min>=0 && min<=15){

            let setInfoEntrada = {
                fecha: check.y +"-"+ check.mo +"-"+ check.d,
                in: check.h +":"+ check.m
            }

            let miEntrada = await fetch("https://back-asistencias.onrender.com/check", {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(setInfoEntrada)
            })
        
            console.log( miEntrada.ok ? 'Registro Exitoso' : 'Fallo el registro')

            setCheckIn(true)            
            console.log('Se registro la entrada')

        }else if(!checkIn && hour==8 && min>=16 && min<=30){

            let setInfoEntrada = {
                fecha: check.y +"-"+ check.mo +"-"+ check.d,
                in: check.h +":"+ check.m
            }

            let miEntrada = await fetch("https://back-asistencias.onrender.com/check", {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(setInfoEntrada)
            })

            console.log( miEntrada.ok ? 'Registro de entrada con Retardo' : 'Fallo el registro')
            setCheckIn(true)
            
        }else if(checkIn){
            console.log('Ya se ha registrado la entrada')
        }

        if(!checkOff && hour==15 && min>=30 && min<=59){

            let setInfoSalida = {
                fecha: check.y +"-"+ check.mo +"-"+ check.d,
                out: check.h +":"+ check.m
            }

            let miSalida = await fetch("https://back-asistencias.onrender.com/check", {
                method: "PUT",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(setInfoSalida)
            })

            console.log( miSalida.ok ? 'Registro Exitoso' : 'Fallo el registro')        
            setCheckOff(true)

        }else if(checkOff){
            console.log('Ya se registró su salida')
        }else{
            console.log('No se registro su salida')
        }
    }

    const listarData = data.map( item => <li key={item._id}>{item.fecha} - {item.in} - {item.out}</li>)
    
    return(
        <Fragment>
            <button onClick={addRegister}>Registrar</button>
            <hr />
            <h1>{hour != 8  && hour != 15 ? 'Espere a que inicie el horario de registro' : ''}</h1>
            <h1>{checkIn ? 'Registrada su entrada!' : ''}</h1>
            <h1>{checkOff ? 'Registrada su Salida!' : ''}</h1>
            <hr />
            <ul>
                {listarData}
            </ul>
        </Fragment>
    )
}

export default List