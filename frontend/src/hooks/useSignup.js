import {useState} from 'react'
import {useAuthContext} from './useAuthContext'

export const useSignup=()=>{
    const[error,seterror]=useState(null) 
    const[isLoading,setisLoading]=useState(null)
    const {dispatch}=useAuthContext()

    const signup =async (email,password)=>{
        setisLoading(true)
        seterror(null)

        const response=await fetch('/api/user/signup',{
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

    return{signup,isLoading, error}

}
