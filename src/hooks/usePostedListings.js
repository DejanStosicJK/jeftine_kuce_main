import { useState, useCallback } from "react";
// firebase func
import { collection, query, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore";
import { db } from "../firebase.config";
// toastify
import { toast } from "react-toastify";


const usePostedListings = (itemsPerPage) => {
    const [listings, setListings] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [page, setPage] = useState(0);

    const fetchListings = useCallback(async (pageNumber = 0, condition = '', reset = false) => {       
        try {            
            let constraints = [
                orderBy('timestamp', 'desc'),
                limit(itemsPerPage)
            ]

            if (typeof condition == 'string' && condition.length > 0) {
                constraints.push(where('propertyLocation', '==', condition));
            }

            const { selectedListingType, selectedPropertyType, selectedDistrict } = condition

            if (selectedListingType && selectedListingType !== "Svi oglasi") {
                constraints.push(where('listingType', '==', selectedListingType));
            }
            if (selectedPropertyType && selectedPropertyType !== "Svi tipovi imovine") {
                constraints.push(where('propertyType', '==', selectedPropertyType));
            }
            if (selectedDistrict && selectedDistrict !== "Svi okruzi") {
                constraints.push(where('propertyDistrict', '==', selectedDistrict));
            }        

            let q;

            if (reset || pageNumber === 0) {
                // Fetch the first page or reset to the first page
                q = query(
                    collection(db, 'listings'),
                    ...constraints,
                );

                // Reset the last visible document when looping back
                setLastVisible(null);
            } else {
                // Fetch the next set based on the last visible document
                if (lastVisible) {
                    q = query(
                        collection(db, 'listings'),
                        ...constraints,
                        startAfter(lastVisible),
                    );
                }else{
                    return
                }
            }

            const querySnapshot = await getDocs(q);

            // Check if the end of the collection is reached
            if (querySnapshot.docs.length == 0 && pageNumber !== 0) {
                // Loop back to the first page
                fetchListings(0, condition, true);
                return;
            }

            // Update the last visible document for the next page
            const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            setLastVisible(newLastVisible);           

            // Replace the listings with the new set of documents for the current page
            setListings(querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
            setPage(pageNumber);
        } catch (error) {
            //error message
            toast.error('Greška prilikom prikazivanja svi objavljenih oglasa, molimo Vas probajte ponovo')
        }
    }, [itemsPerPage, lastVisible])
    
    return { listings, fetchListings, page };
}

export default usePostedListings