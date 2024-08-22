// api func
import fetchUserListingsFromFirebase from '../api/fetchUserListingsFromFirebase.js'
// context
import { useGlobalContext } from "../context.jsx"
// components
import PageLocation from "../components/PageLocation.jsx"
import UserNotLoggedIn from "../components/profilePage/UserNotLoggedIn.jsx"
import UserLoggedIn from "../components/profilePage/UserLoggedIn.jsx"
import UserPostedListingsContainer from "../components/profilePage/UserPostedListingsContainer.jsx"


// LOADER
export const loader = async () => {
    const allUserPostedListings = await fetchUserListingsFromFirebase()      

    return allUserPostedListings
}

const Profile = () => {
    const { userData } = useGlobalContext()

    return (
        <div className="profile-page">
            {/* page location component */}
            <PageLocation />

            <div className="container">
                {!userData.userName ? (
                    <UserNotLoggedIn />
                ) : (
                    <>
                        {/* user logged in component */}
                        <UserLoggedIn />

                        {/* user posted offers component */}
                        <UserPostedListingsContainer />
                    </>
                )}
            </div>
        </div>
    )
}

export default Profile