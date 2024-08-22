import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// firebase/firestore funcs
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
// custom hook
import usePostedListings from "./hooks/usePostedListings";
// toastify
import { toast } from 'react-toastify'


const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const auth = getAuth()

    // user details
    const [userData, setUserData] = useState({
        userID: '',
        userName: '',
        userVerified: false
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                auth.currentUser ? (
                    setUserData({
                        userID: user.uid,
                        userName: user.displayName,
                        userVerified: user.emailVerified
                    })
                ) : (
                    setUserData({
                        userID: '',
                        userName: '',
                        userVerified: false
                    })
                )
            }
        })
    }, [])

    // log out user
    const navigate = useNavigate()

    const logOutUser = async () => {
        if (window.confirm('Da li ste sigurni da želite da se odjavite?')) {
            try {
                await signOut(auth)

                setUserData({
                    userID: '',
                    userName: ''
                })

                // success message
                toast.success('Odjavili ste se')

                // after the user has logged out, the user is redirected to the Dashboard page
                navigate('/')
            } catch (error) {
                //error message
                toast.error('Greška prilikom odjave')
            }
        }
    }

    // display listings
    const itemsPerPage = 9;
    const { listings, fetchListings, page } = usePostedListings(itemsPerPage); 
    
    // filter option
    const [condition, setCondition] = useState()
    const [disableOption, setDisableOption] = useState(false)

    const handleSelectedFilterOption = e => {
        setCondition(curState => ({
            ...curState,
            [e.target.id]: e.target.value
        }))
    }

    const handleSubmittedFilterOptions = e => {
        e.preventDefault()

        if(condition != undefined){
            setDisableOption(true)
    
            fetchListings(0, condition)
        }

        if(window.location.pathname != '/oglasi') navigate('/oglasi')        
    }

    const handleReset = () => {        
        setDisableOption(false)
    
        setCondition()
    
        fetchListings()
      } 

    return <AppContext.Provider value={{
        userData, //Profile, NavbarUserOnboarding, UserLoggedIn, PostNewListingModal
        logOutUser, // NavbarUserOnboarding, UserLoggedIn

        listings, // PostedListings, PostedListingsPagination
        fetchListings, // PostedListings, PostedListingsSearchOption, PostedListingsPagination
        page, // PostedListingsPagination

        condition, // PostedListings, FilterOptions, PostedListingsSearchOption
        setCondition, // PostedListingsSearchOption, DashboardFilterOptions
        disableOption, // PostedListingsFilterOptions, FilterOptions, PostedListingsSearchOption
        setDisableOption, // PostedListingsSearchOption, DashboardFilterOptions

        handleSelectedFilterOption, // FilterOptions
        handleSubmittedFilterOptions, // PostedListingsFilterOptions, DashboardFilterOptions
        handleReset, // PostedListingsFilterOptions, PostedListingsSearchOption
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => useContext(AppContext)