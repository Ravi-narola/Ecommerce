import { useContext,createContext,useState } from "react";


let AuthContext = createContext(null)



export const AuthProvider = ({children}) =>{

    let [data,setdata] = useState({isLoggedIn:false,currentUserName:null,currentUserId:null,currentUserRole:'user'})

    console.log(data);

    let logout=()=>{
        setdata({isLoggedIn:false,currentUserName:null,currentUserId:null,currentUserRole:'user'})
    }

    return <AuthContext.Provider value={{data,setdata,logout}}>
        {children}
    </AuthContext.Provider>
}


//use context

export const useAuth = () => useContext(AuthContext)