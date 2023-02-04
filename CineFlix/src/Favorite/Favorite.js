import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Favorite(props) {

//     const [FavoriteNumber, setFavoriteNumber] = useState(0)
//     const [Favorited, setFavorited] = useState(false)

//     useEffect(() => {

//         const variable = {
//             userFrom: props.userFrom,
//             movieId: props.movieId,
//             // movieTitle: props.movieTitle,
//             // movieImage: props.currentMovieDetail.backdrop_path,
//             // movieRunTime: props.currentMovieDetail.runtime
//         }


//         // axios.post('http://localhost:4000/', variable)
//         //     .then(response => {
//         //         if (response.data.success) {
//         //             console.log(response.data.favoriteNumber)
//         //             setFavoriteNumber(response.data.favoriteNumber)
//         //         } else {
//         //             // alert('Failed to get favoriteNumber')
//         //         }
//         //     })

//         axios.post('http://localhost:4000/favorite/favorited', variable)
//             .then(response => {
//                 if (response.data.success) {
//                     setFavorited(response.data.favorited)
//                 } else {
//                     // alert('Failed to get Favorite Info')
//                 }
//             })

//     }, [])
    const AddToFav = () => {
        const variable = {
            userFrom: props.userFrom,
            movieId: props.movieId,
            movieTitle: props.movieTitle,
            movieImage: props.currentMovieDetail.backdrop_path,
            movieRunTime: props.currentMovieDetail.runtime}
    }

    const onClickFavorite = () =>{

        axios.post('http://localhost:4000/addFav', variable)
        {
            if (res.status === 200) {
                console.log("suceess");
            }

            else{
                console.log("failed");
            }
        }
    }

    return (
        <div>
            <button onClick={addToFav()}>ADD TO FAV</button>
            

        </div>
    )
}

export default Favorite