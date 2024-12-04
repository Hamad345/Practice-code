import { useState } from "react";

import { v4 as uuidv4 } from 'uuid';

import useBookStore from "../../stores/books/BookStore";

import formatDate from "../../utils/dateUtils";

import { FaStar, FaRegStar } from "react-icons/fa";



export const Ratings = ({ bookId, styles, addStarStyles }) => {

    const { addRating } = useBookStore((state) => ({
        addRating: state.addRating,
    }));

    const [rating, setRating] = useState(null);

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    const formattedDate = formatDate();

    const handleRating = async (currentRating) => {
        try {
            const newRating = {
                id: uuidv4(),
                bookId: bookId,
                userId: loggedInUser.userId,
                rating: currentRating,
                ratingDate: formattedDate,
            };

            setRating(currentRating);

            await addRating(newRating);
            
        } catch (err) {
            alert("An error occured: " + JSON.stringify(err.message, null, 2));
        }
    };


    return (
        <div className={`ratings flex items-center gap-[0.2rem] my-2 mb-2.5 ${styles}`}>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;

                return (
                    <label key={index}>
                        <input
                            className="hidden"
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onClick={() => handleRating(currentRating)}
                        />
                        <span
                        >
                            {
                                currentRating <= rating
                                    ? <FaStar className={`${addStarStyles} cursor-pointer`} />
                                    : <FaRegStar className={`${addStarStyles} cursor-pointer`} />
                            }
                        </span>
                    </label>
                )
            })}
        </div>
    );
};






