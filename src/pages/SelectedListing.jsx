import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom"
// api funcs
import fetchSelectedListingDetailsFromFirebase from '../api/fetchSelectedListingDetailsFromFirebase.js'
// utils funcs
import priceComma from "../utils/priceComma.js";
import scrollToTop from "../utils/scrollToTop.js";
// component
import ImagesGallery from "../components/selectedListingPage/ImagesGallery.jsx";
// modal
import SelectedImageModal from "../modals/SelectedImageModal.jsx";
// React Icons
import { LiaTapeSolid } from 'react-icons/lia'
import { MdConfirmationNumber, MdOutlineBedroomChild } from 'react-icons/md'
import { PiBathtubLight } from 'react-icons/pi'
import { CiCalendarDate } from "react-icons/ci";


// REACT QUERY
const fetchSelectedListingDetailsFromFirebaseQuery = (id) => {
    return {
        queryKey: ['selectedListingDetails', id],
        queryFn: () => fetchSelectedListingDetailsFromFirebase(id)
    }
}

// LOADER
export const loader = (queryClient) => async ({ params }) => {
    const selectedListingDetails = await queryClient.ensureQueryData(fetchSelectedListingDetailsFromFirebaseQuery(params.id))

    return selectedListingDetails
}

const SelectedListing = () => {
    const selectedListingDetails = useLoaderData()

    useEffect(() => {
        scrollToTop()
    }, [])

    const { listingType, propertyType, propertyName, numRooms, numBathrooms, lotNumber, squareFootage, propertyAddress, propertyLocation, propertyDistrict, imageUrls, askingPrice, listingDescription, listingCreated, contactFullName, contactPhoneNumber, contactEmailAddress } = selectedListingDetails

    const [imageSrc, setImageSrc] = useState('')

    const urlBackPath = window.location.pathname.split('/').includes('oglasi')

    return (
        <>
            <div className="selected-posted-offer-page my-5">
                <div className="container px-5 rounded-4 border bg-white">

                    <section className="d-flex align-items-center justify-content-between my-5">
                        <Link to={urlBackPath ? '/oglasi' : '/nalog'} className="btn bg-orange-hover text-white fw-bold px-4">
                            Nazad
                        </Link>
                        <h2 className="text-orange fw-bold">
                            {listingType === 'izdajem' ? "IZDAJE SE" : 'NA PRODAJU'}
                        </h2>
                    </section>

                    <section className="mb-5 text-center">
                        <h4 className="text-muted fw-bold capitalize">
                            {propertyType}
                        </h4>
                        <h3 className="fw-bold capitalize mb-3">
                            {propertyName}
                        </h3>
                        <h4 className="text-orange fw-bold">
                            {priceComma(askingPrice)} EUR {listingType === 'izdajem' ? 'mesečno' : ''}
                        </h4>
                    </section>

                    <section className="posted-offer-details">
                        <div className="row">

                            {/* row item 1 */}
                            <div className="col-12 col-lg-6 mb-4">
                                <p className='mb-0 fw-bold text-muted'>
                                    Adresa:<span className='ms-1 text-dark capitalize'>{propertyAddress}</span>
                                </p>
                                <p className='mb-0 fw-bold text-muted'>
                                    Mesto:<span className='ms-1 text-dark capitalize'>{propertyLocation}</span>
                                </p>
                                <p className='mb-0 fw-bold text-muted'>
                                    Okrug:<span className='ms-1 text-dark capitalize'>{propertyDistrict}</span>
                                </p>
                            </div>

                            {/* row item 2 */}
                            <div className="col-12 col-lg-6 mb-4">
                                {propertyType === 'plac' ? (
                                    <>
                                        <p className="mb-0 fw-bold text-muted d-flex align-items-center" >
                                            <MdConfirmationNumber className='me-2' />
                                            Broj parcele:<span className="ms-1 fw-bold text-dark">
                                                {lotNumber}
                                            </span>
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="mb-0 fw-bold text-muted d-flex align-items-center" >
                                            <MdOutlineBedroomChild className='me-2' />
                                            Sobe:<span className="ms-1 fw-bold text-dark">{numRooms}</span>
                                        </p>
                                        <p className="mb-0 fw-bold text-muted d-flex align-items-center">
                                            <PiBathtubLight className='me-2' />
                                            Kupatila:<span className="ms-1 fw-bold text-dark">{numBathrooms}</span>
                                        </p>
                                    </>
                                )}
                                <p className="mb-0 fw-bold text-muted d-flex align-items-center">
                                    <LiaTapeSolid className='me-2' />
                                    Prostor:
                                    <span className="ms-1 fw-bold text-dark"> {squareFootage}</span>
                                    <span className="ms-1 fw-bold text-dark">{propertyType == 'plac' ? 'ari' : 'kvadrata'}</span>
                                </p>
                                <p className="mb-0 fw-bold text-muted d-flex align-items-center">
                                    <CiCalendarDate className='me-2' />
                                    Oglas objavljen:<span className="ms-1 fw-bold text-dark"> {listingCreated}</span>
                                </p>
                            </div>

                            {/* row item 3 */}
                            <div className="col-12 pb-4 mb-4 border-bottom">
                                <h5 className="mb-3">
                                    Opis:
                                </h5>
                                <p className='mb-0 fw-bold text-break'>
                                    {listingDescription}
                                </p>
                            </div>

                            {/* row item 4 */}
                            <div className="col-12 pb-4 mb-4 border-bottom">
                                <h4 className="mb-3">
                                    Kontakt informacije:
                                </h4>
                                <p className='mb-0 fw-bold text-muted'>
                                    Ime vlasnika:<span className='ms-1 text-dark'>{contactFullName}</span>
                                </p>
                                <p className='mb-0 fw-bold text-muted'>
                                    Email:<span className='ms-1 text-dark'>{contactEmailAddress}</span>
                                </p>
                                <p className='mb-0 fw-bold text-muted'>
                                    Telefon:<span className='ms-1 text-dark'>+381 {contactPhoneNumber}</span>
                                </p>
                            </div>

                            {/* row item 5 */}
                            <div className="col-12 mb-4">
                                <h6 className="text-center text-muted mb-3">
                                    Kliknite na sliku radi bolje preglednosti
                                </h6>

                                {/* ImgsGallery - component */}
                                <ImagesGallery imageUrls={imageUrls} setImageSrc={setImageSrc} />

                                {/* SelectedImageModal - modal */}
                                <SelectedImageModal imageSrc={imageSrc} />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default SelectedListing