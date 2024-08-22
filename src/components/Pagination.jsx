import { useEffect, useState } from "react"
// utils func 
import scrollToTop from "../utils/scrollToTop.js"
// React Icons
import { GrNext, GrPrevious } from "react-icons/gr"


let pointA = 0
let pointB = 9

const Pagination = ({ dataLength, setDisplayedContent }) => {
    const [currentPageNumber, setCurrentPageNumber] = useState(1)

    useEffect(()=>{
        pointA = 0
        pointB = 9
    },[])

    const paginationOption = (term) => {
        if (term === 'plus') {
            pointA += 9
            pointB += 9
            setCurrentPageNumber(curPageNum => curPageNum + 1)
        }

        if (term === 'minus') {
            pointA -= 9
            pointB -= 9
            setCurrentPageNumber(curPageNum => curPageNum - 1)
        }

        if (pointB == 0) {
            setDisplayedContent(currData => ({
                ...currData,
                displayedDataList: currData.totalDataList.slice(0, 9)
            }))
            pointA = 0
            pointB = 9
            setCurrentPageNumber(1)
        } else if (pointB > dataLength.length && pointA >= dataLength.length) {
            setDisplayedContent(currData => ({
                ...currData,
                displayedDataList: currData.totalDataList.slice(0, 9)
            }))
            pointA = 0
            pointB = 9
            setCurrentPageNumber(1)
        } else if (pointB > dataLength.length) {
            const lastPostedListings = dataLength.length - pointA
            setDisplayedContent(currData => ({
                ...currData,
                displayedDataList: currData.totalDataList.slice(-lastPostedListings)
            }))
            setCurrentPageNumber(Math.ceil(dataLength.length / 9))
        } else {
            setDisplayedContent(currData => ({
                ...currData,
                displayedDataList: currData.totalDataList.slice(pointA, pointB)
            }))
        }

        scrollToTop()
    }

    return (
        <section className="pagination pb-4 d-flex align-items-center justify-content-between">
            <div className="number-of-pages">
                <p className="mb-0 fw-bold text-muted">
                    Broj stranice:
                    <span className="mx-1 text-dark">
                        {currentPageNumber}
                    </span>
                    /
                    <span className="ms-1 text-dark">
                        {Math.ceil(dataLength.length / 9)}
                    </span>
                </p>
            </div>

            <div className="pagination-btn-container text-end">
                <button className="btn px-3 me-3 btn-prev" onClick={() => paginationOption('minus')}>
                    <GrPrevious className="text-white" />
                </button>
                <button className="btn px-3 btn-next" onClick={() => paginationOption('plus')}>
                    <GrNext className="text-white" />
                </button>
            </div>
        </section>
    )
}

export default Pagination