import { useState } from "react"
import { useLoaderData } from "react-router-dom"
// component
import Pagination from "../Pagination.jsx"
import AllBlogPostsList from "./AllBlogPostsList.jsx"


const BlogPostsContainer = () => {
    const allBlogPosts = useLoaderData()  
    const [blogPostsList, setBlogPostsList] = useState({
        totalDataList: allBlogPosts,
        displayedDataList: allBlogPosts?.length >= 10 ? allBlogPosts.slice(0, 9) : allBlogPosts
    })    

    // Search function
    const handleSearch = e => {
        const searchTerm = e.target.value.toLowerCase()

        const searchResults = allBlogPosts.filter(blogPost => blogPost.data.blogTitle.toLowerCase().includes(searchTerm))

        setBlogPostsList({
            totalDataList: searchResults,
            displayedDataList: searchResults.length >= 10 ? searchResults.slice(0, 9) : searchResults
        })
    }

    return (
        <>
            <section className="mb-5">
                <h1 className="fw-bold text-center">
                    Blog
                </h1>
            </section>

            <section className="pb-5">
                <div className="mb-4">
                    <input type="text" className="form-control" onChange={handleSearch} placeholder="Unesite naziv Blog-a" />
                </div>

                <AllBlogPostsList displayedBlogPostsList={blogPostsList.displayedDataList}/>
            </section>

            {/* Pagination */}
            {(blogPostsList.totalDataList && blogPostsList.totalDataList.length >= 10) && (
                <Pagination dataLength={allBlogPosts} setDisplayedContent={setBlogPostsList} />
            )}
        </>
    )
}

export default BlogPostsContainer