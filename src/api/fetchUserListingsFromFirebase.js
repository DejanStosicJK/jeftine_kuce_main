// firebase/firestore funcs
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore"
import { db } from "../firebase.config";
// toastify
import { toast } from "react-toastify"

const fetchUserListingsFromFirebase = async () => {
    const auth = getAuth()

    if (!auth.currentUser) return null

    try {
        const q = query(collection(db, 'listings'),
            where('userRef', '==', auth.currentUser.uid),
            orderBy('timestamp', 'desc'))

        const querySnapshot = await getDocs(q)

        let allUserPostedListings = []

        querySnapshot.forEach((listing) => {
            return allUserPostedListings.push({
                id: listing.id,
                data: listing.data()
            })
        })

        return allUserPostedListings
    } catch (error) {
        // error message
        toast.error('Greška prilikom prikazivanja Vaših oglasa, molimo Vas probajte ponovo')
    }
}

export default fetchUserListingsFromFirebase