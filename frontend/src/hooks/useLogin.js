import {useState} from 'react'
import {useAuthContext} from './useAuthContext'

export const useLogin=()=>{
    const[error,seterror]=useState(null) 
    const[isLoading,setisLoading]=useState(null)
    const {dispatch}=useAuthContext()

    const login =async (email,password)=>{
        setisLoading(true)
        seterror(null)
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
        const response=await fetch(`${API_URL}/api/user/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({email,password})

        })
        const json= await response.json()

        if(!response.ok){
            setisLoading(false)
            seterror(json.error)
        }
        if(response.ok)
        { 
            // save the user to local Storage
            localStorage.setItem('user', JSON.stringify(json))
            
            //update the auth context
            dispatch({type:'LOGIN', payload: json})

            setisLoading(false)
        }
    }

    return{login,isLoading, error}

}
