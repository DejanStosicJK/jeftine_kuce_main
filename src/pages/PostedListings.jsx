import { useEffect, useState } from "react";
// context
import { useGlobalContext } from "../context.jsx";
// components
import PageLocation from "../components/PageLocation.jsx"
import NoDataAvailableMessage from "../components/NoDataAvailableMessage.jsx";
import PostedListingsOptions from "../components/postedListingsPage/PostedListingsOptions.jsx";
import PostedListingsFilterOptions from "../components/postedListingsPage/PostedListingsFilterOptions.jsx";
import PostedListingsSearchOption from "../components/postedListingsPage/PostedListingsSearchOption.jsx";
import PostedListingsContainer from "../components/postedListingsPage/PostedListingsContainer.jsx";
import PostedListingsPagination from "../components/postedListingsPage/PostedListingsPagination.jsx";


const PostedListings = () => {
  const { fetchListings, listings, condition } = useGlobalContext()

  const [layout, setLayout] = useState('grid')
  const [conditionOption, setConditionOption] = useState('search')

  // Fetch the first page on mount
  useEffect(() => {
    if (condition == undefined) fetchListings();
  }, [condition]);

  return (
    <div className="posted-listings-page">

      {/* page location */}
      <PageLocation />

      <div className="container">
        <section className="text-center mb-5">
          <h1 className="fw-bold mb-3">
            Oglasi
          </h1>
        </section>

        {/* options - layout - search or filter */}
        <PostedListingsOptions layout={layout} setLayout={setLayout} conditionOption={conditionOption} setConditionOption={setConditionOption} />

        {/* search & filter */}
        <section>
          <div className="row">

            {conditionOption == 'search' ? (
              <>
                {/* row item 1 - FILTER component */}
                < div className="col-12 mb-3">
                  <PostedListingsFilterOptions />
                </div>
              </>
            ) : (
              <>
                {/* row item 2 - SEARCH component */}
                <div className="col-12 mb-3">
                  <PostedListingsSearchOption />
                </div>
              </>
            )}
          </div>
        </section >

        {!listings || listings.length == 0 ? (
          <NoDataAvailableMessage text='oglasa' />
        ) : (
          <>
            {/* posted listings - list */}
            <PostedListingsContainer layout={layout} listings={listings} />

            {/* pagination - posted listings */}
            <PostedListingsPagination />
          </>
        )}
      </div>
    </div>
  )
}

export default PostedListings