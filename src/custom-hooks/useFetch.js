
import { useState, useEffect } from "react";

export const useFetch =(url)=>{
const[data, setData] = useState(null)
useEffect(()=>{
    fetch (url)
    .then (respuesta => respuesta.json())
    .then (jsonData=> setData(jsonData))
    .catch (error=>(error))
},[url])
return data
}
