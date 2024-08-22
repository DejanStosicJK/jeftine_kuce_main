import { useState } from "react"
import { useLoaderData } from "react-router-dom"
// firebase/firestore funcs
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase.config"
// api func 
import deleteUploadedImageFromDB from "../../api/deleteUploadedImageFromDB.js"
// utils func
import scrollToTop from "../../utils/scrollToTop.js"
// components
import AllPostedListingsGridView from "../AllPostedListingsGridView.jsx"
import Pagination from "../Pagination.jsx"
// toastify
import { toast } from "react-toastify"


const UserPostedListingsContainer = () => {
    const allUserPostedListings = useLoaderData()

    const [displayedListingsList, setDisplayedListingsList] = useState({
        totalDataList: allUserPostedListings || [],
        displayedDataList: allUserPostedListings?.length >= 10 ? allUserPostedListings.slice(0, 9) : allUserPostedListings || []
    });

    const deleteUserPostedListing = async (userPostedListingID) => {
        if (window.confirm('Are you sure you want to delete?')) {
            try {
                const selectedListing = allUserPostedListings.filter(listing => listing.id == userPostedListingID)

                // delete image/images from storage
                Array.from(selectedListing[0].data.imageUrls).forEach(imageUrl => {
                    deleteUploadedImageFromDB(imageUrl)
                })

                // delete listing from firebase
                await deleteDoc(doc(db, 'listings', userPostedListingID))

                // update state
                const updatedListOfUserPostedListings = allUserPostedListings.filter(listing => listing.id !== userPostedListingID)

                setDisplayedListingsList({
                    totalDataList: updatedListOfUserPostedListings,
                    displayedDataList: updatedListOfUserPostedListings?.length >= 10 ? updatedListOfUserPostedListings.slice(0, 9) : updatedListOfUserPostedListings
                })

                // success message after listing removal 
                toast.success('Uspešno ste obrisali Vaš oglas');

                scrollToTop()
            } catch (error) {
                //error message
                toast.error('Greška prilikom uklanjanja Vašeg oglasa, molimo Vas probajte ponovo')
            }
        }
    }

    return (
        <>
            <section className="user-posted-listings mb-4">
                {!displayedListingsList.totalDataList || displayedListingsList.totalDataList.length == 0 ? (
                    <h2 className="fw-bold text-center">
                        Trenutno nemate postavljenih oglasa
                    </h2>
                ) : (
                    <>
                        <h2 className="fw-bold text-center mb-5">
                            Moji oglasi
                        </h2>

                        {/* AllPostedListingsGridView component */}
                        <AllPostedListingsGridView displayedListingsList={displayedListingsList.displayedDataList} deleteUserPostedListing={deleteUserPostedListing} />
                    </>
                )}
            </section>

            {/* Pagination */}
            {(displayedListingsList.totalDataList && displayedListingsList.totalDataList?.length >= 10) && (
                <Pagination dataLength={displayedListingsList.totalDataList} setDisplayedContent={setDisplayedListingsList} />
            )}
        </>
    )
}

export default UserPostedListingsContainer