// context
import { useGlobalContext } from "../../context";


const PostedListingsSearchOption = () => {
    const { condition, setCondition, disableOption, setDisableOption, fetchListings, handleReset } = useGlobalContext()

    const handleSearchTerm = e => {
        e.preventDefault()

        if (condition == undefined || condition.trim().length == 0) return

        setDisableOption(true)

        fetchListings(0, condition.trim().toLowerCase())
    }

    return (
        <form onSubmit={handleSearchTerm}>
            <div className="row">

                {/* row item 1 */}
                <div className="col-12 col-md-9 mb-3">
                    <input type="text" className="form-control" value={typeof condition == 'string' ? condition : ''} placeholder="Unesite naziv mesta" onChange={e => setCondition(e.target.value)} disabled={disableOption} />
                </div>

                {/* row item 2 */}
                {!disableOption && (
                    <div className="col-12 col-md-3 mb-3">
                        <button type="submit" className="fw-bold btn bg-orange-hover text-white w-100">
                            Primeni
                        </button>
                    </div>
                )}

                {disableOption && (
                    <div className="col-12 col-md-3 mb-3">
                        <button type="button" className="fw-bold btn btn-warning w-100 text-white" onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                )}
            </div>
        </form>
    )
}

export default PostedListingsSearchOption