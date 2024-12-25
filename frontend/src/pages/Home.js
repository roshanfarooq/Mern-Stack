import { useEffect }from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()
  const {user}=useAuthContext()
 
  useEffect(() => {
    toast.success("Succesfully Logged in...."); // Test toast
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts',{
        headers:{'Authorization': `Bearer ${user.token}`}
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
       
      }
    }
    if(user){
      fetchWorkouts()
    }
    
  }, [dispatch,user])

  return (
    <div>
      <ToastContainer></ToastContainer>
      <div className="home">
     <div className="workouts">
       {workouts && workouts.map((workout) => (
         <WorkoutDetails key={workout._id} workout={workout} />
       ))}
     </div>
     <WorkoutForm />
   </div>

    </div>
     
  
   
  )
}

export default Home