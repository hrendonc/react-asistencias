const Tabla = ({data})=>{

    const listData = data.map(item=>(
        <tr key={item._id}>
            <td>{item.fecha}</td>
            <td className="text-danger fst-italic fw-semibold">
                {item.in != '' ? item.in : 'Sin registro'}
                {item.in.substr(-2,2) > 15 ? ' Retardo' : ''}                
            </td>
            <td>
                {item.out !='' ? item.out : 'Sin registro'}
                
            </td>
        </tr>
        ))

    return(
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Entradas</th>
                        <th>Salidas</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length >0 ? listData : <tr><td>No hay datos que mostrar</td></tr>}                                                               
                </tbody>
            </table>
        </>
    )
}

export default Tabla