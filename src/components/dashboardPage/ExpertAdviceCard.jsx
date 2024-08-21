import { Link } from "react-router-dom"
// utils func
import scrollToTop from "../../utils/scrollToTop"
// react icons
import { FaArrowRight, FaRegFolderOpen } from "react-icons/fa"


const ExpertAdviceCard = ({ cardImg, cardMonth }) => {
    return (
        <div className="col-12 col-lg-4 mb-4 mb-lg-0">
            <div className="box-content">

                {/* image */}
                <div className="box-image-content mb-5 position-relative overflow-hidden">
                    <Link to="/blog" onClick={() => scrollToTop()}>
                        <img src={cardImg} alt="house-img-one" className="box-image img-fluid" />

                        <div className="box-image-text fw-bold position-absolute d-flex align-items-center justify-content-center">
                            <p className="text-muted mb-0 me-3">
                                {cardMonth}
                            </p>
                            <FaRegFolderOpen size={15} className="text-muted me-1" />
                            <span>
                                Housing
                            </span>
                        </div>
                    </Link>
                </div>

                {/* link */}
                <div className="box-link">
                    <Link to="/blog" className="fw-bold d-flex align-items-center justify-content-center" onClick={() => scrollToTop()}>
                        <span className="me-2">
                            Pročitajte više
                        </span>
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ExpertAdviceCard