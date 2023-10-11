import React, { useState, useEffect } from "react";
import Pagination from "./components/Pagination.js";
function App() {
 

//    "build": "react-scripts build",

    const loadData = async () => {
       // let response = await fetch("/cities"); // in case of 5000
        let response =await fetch("https://map-api-6psm.onrender.com/cities"); 
        response = await response.json();
        setCity(response.cities);
        // console.log(response.cities);
    }

    useEffect(() => {
        loadData();
    }, [])

    //Get current Page.
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = city.slice(indexOfFirstPost, indexOfLastPost);

    //change page .
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <> 
       
        
            {/* <div className="container mx-auto " style={{marginTop:"20px"}}>
                <Pagination postsPerPage={postsPerPage} totalPosts={city.length} paginate={paginate} />

            </div> */}
          



        </>
    );
}

export default App;



