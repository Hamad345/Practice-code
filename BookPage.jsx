import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import useBookStore from "../stores/books/BookStore";

import formatRatingCount from "../utils/ratingUtils";

import { Button } from "../components/custom_components/Button";
import { Ratings } from "../components/custom_components/Ratings";
import { BackBtn } from "../components/custom_components/BackBtn";
import { User } from "../components/custom_components/User";
import { BookRating } from "../components/chats_books/books/BookRating";
import { BookReviews } from "../components/chats_books/books/BookReviews";

import { GiBlackBook } from "react-icons/gi";



export const BookPage = () => {
    const { books, fetchBooks, fetchRatings, fetchReviews } = useBookStore((state) => ({
        books: state.books,
        fetchBooks: state.fetchBooks,
        fetchRatings: state.fetchRatings,
        fetchReviews: state.fetchReviews,
    }));

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    const { bid } = useParams();

    const book = books.find((b) => (b._id || b.id) === bid);

    // To fetch the latest ratings and reviews
    useEffect(() => {
        fetchRatings(bid);
        fetchReviews(bid);

        console.log("BookPage called...");
    }, []);


    if (!book) {
        return <div>Book not found</div>;
    }


    return (
        <motion.div id="book-page"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{
                duration: 0.4,
                // ease: [0.68, -0.55, 0.27, 1.55],
                ease: "anticipate"
            }}
            className="-mx-3.5 pb-5 pt-[0.02rem] px-[1.15rem] text-slate-800 dark:text-slate-100"
        >
            <span onClick={fetchBooks}>
                <BackBtn destination={"/app"} />
            </span>

            <div className="top flex justify-between max-[1035px]:flex-col max-[1035px]:gap-10 duration-300 ease-linear">
                <div className="top-left flex gap-4 max-[343px]:gap-3 max-w-[48%] max-[1100px]:max-w-[53%] max-[1035px]:max-w-[70%] max-[850px]:max-w-[78%] max-[707px]:max-w-[80%] max-[640px]:max-w-[84%] max-[560px]:max-w-[86%] max-[522px]:max-w-[90%] max-[464px]:max-w-[100%]">
                    <div className="book-open-img duration-300 ease-linear max-w-[33%] max-[1220px]:max-w-[38%] max-[1000px]:max-w-[35%] max-[872px]:max-w-[40%] max-[690px]:max-w-[38.5%] max-[640px]:max-w-[43%] max-[570px]:max-w-[41%] max-[522px]:max-w-[43%] max-[482px]:max-w-[42%] max-[343px]:max-w-[41%]">
                        <img className="max-w-full min-h-full object-cover rounded-lg border border-slate-900/20 dark:border-slate-50/[13%]" src={book.bookImg} alt="" />
                    </div>
                    <div className="book-text flex-1 flex flex-col justify-between">
                        <div>
                            {/* max-[590px]:line-clamp-3 max-[522px]:line-clamp-4 max-[500px]:line-clamp-3 max-[464px]:line-clamp-4 */}
                            <h1 className="text-[2.3rem] min-[1035px]:max-[1100px]:text-[2.1rem] max-[850px]:text-[2.17rem] max-[785px]:text-[2.6rem] max-[640px]:text-[2.4rem] max-[522px]:text-[2.1rem] max-[384px]:text-[1.8rem] max-[343px]:text-[1.6rem] leading-[2.8rem] min-[1000px]:max-[1100px]:leading-[2.7rem] max-[850px]:leading-[2.6rem] max-[785px]:leading-[3.33rem] max-[640px]:leading-[2.9rem] max-[522px]:leading-[2.6rem] max-[384px]:leading-[2.25rem] max-[343px]:leading-[2rem] line-clamp-3 max-[522px]:line-clamp-4 max-[482px]:line-clamp-3 duration-200 ease-linear font-bold dark:font-semibold">{book.bookName}</h1>
                            <p className="text-[1.3rem] min-[1035px]:max-[1100px]:text-[1.2rem] max-[850px]:text-[1.2rem] max-[785px]:text-[1.3rem] max-[640px]:text-[1.25rem] max-[522px]:text-[1.1rem] max-[384px]:text-[1rem] max-[343px]:text-[0.962rem] duration-200 ease-linear font-semibold dark:font-medium mt-0.5 max-[850px]:mt-1 max-[785px]:mt-1.5 max-[343px]:mt-1 line-clamp-2 max-[407px]:leading-[1.55rem] max-[384px]:leading-[1.45rem] max-[358px]:leading-[1.4rem] dark:max-[358px]:leading-[1.45rem] max-[343px]:leading-[1.35rem]">{book.author}</p>
                        </div>

                        <div className="flex items-center gap-x-2 gap-y-0 flex-wrap">
                            {
                                book.usersRatings.find((rating) => rating.userId === loggedInUser.userId) ?
                                    <BookRating
                                        bookRatings={book.bookRating}
                                        addStarStyles={"text-[1.41rem] max-[850px]:text-[1.35rem] max-[785px]:text-[1.62rem] max-[640px]:text-[1.41rem] max-[522px]:text-[1.35rem] max-[384px]:text-[1.15rem] max-[343px]:text-[1.05rem]"}
                                    /> :
                                    <Ratings
                                        bookId={book._id || book.id}
                                        addStarStyles={"text-[hsl(51,100%,49%)] dark:text-[hsl(51,100%,60%)] text-[1.41rem] max-[850px]:text-[1.35rem] max-[785px]:text-[1.62rem] max-[640px]:text-[1.41rem] max-[522px]:text-[1.35rem] max-[384px]:text-[1.15rem] max-[343px]:text-[1.05rem] duration-200 ease-linear"}
                                    />
                            }
                            <p className="text-[0.85rem] max-[354px]:text-[0.771rem] font-semibold dark:font-normal tracking-widest duration-200 ease-linear">{`(${formatRatingCount(book.usersRatings.length)})`}</p>
                        </div>
                    </div>
                </div>

                <div className="top-right mr-3 py-1 flex flex-col justify-between max-[1035px]:space-y-10 max-[464px]:w-[100%]">
                    <div className="space-y-4">
                        <Link to={loggedInUser.userId === book.userId ? `/app/profile` : `/app/other_user_profile/${book.userId}`}>
                            <User
                                styles={"user flex items-center gap-2"}
                                userImg={book.userImg}
                                userName={book.userName}
                                addImgStyles={"max-w-11 min-[1000px]:max-[1100px]:max-w-[2.63rem] max-[464px]:max-w-[2.53rem] max-[415px]:max-w-[2.4rem] max-[384px]:max-w-[2.3rem] max-[343px]:max-w-[2.1rem]"}
                                addUsernameStyles={"text-[1.1rem] min-[1000px]:max-[1100px]:text-[1.04rem] max-[522px]:text-[1rem] max-[464px]:text-[0.97rem] max-[415px]:text-[0.95rem] max-[384px]:text-[0.91rem] max-[343px]:text-[0.86rem]"}
                            />
                        </Link>

                        <div className="flex items-center gap-1.5 ml-1">
                            <GiBlackBook className="text-2xl min-[1000px]:max-[1100px]:text-[1.4rem] max-[522px]:text-[1.25rem] max-[464px]:text-[1.2rem] max-[415px]:text-[1.15rem] max-[384px]:text-[1.1rem] max-[343px]:text-[0.99rem]" />
                            <p className="font-medium dark:font-normal min-[1000px]:max-[1100px]:text-[0.95rem] max-[522px]:text-[0.92rem] max-[464px]:text-[0.9rem] max-[415px]:text-[0.875rem] max-[384px]:text-[0.855rem] max-[343px]:text-[0.81rem]">On: {book.listedOn}</p>
                        </div>
                    </div>
                    <Button btnText={"Exchange"} addStyles={"py-2.5 w-72 max-[464px]:w-full text-[1.05rem] max-[522px]:text-[1rem] max-[384px]:text-[0.96rem] max-[343px]:text-[0.925rem]"} />
                </div>
            </div>

            <div className="bottom mt-12">
                <div id="description" className="mb-8">
                    <h2 className="text-[1.875rem] max-[1100px]:text-[1.73rem] max-[850px]:text-[1.62rem] max-[785px]:text-[1.975rem] max-[640px]:text-[1.855rem] max-[522px]:text-[1.62rem] max-[384px]:text-[1.43rem] max-[343px]:text-[1.345rem] max-[320px]:text-[1.315rem] font-semibold dark:font-medium mb-1"
                    >
                        Description:
                    </h2>
                    <p className="font-medium dark:font-normal max-[522px]:text-[0.96rem] max-[384px]:text-[0.93rem]">{book.description}</p>
                </div>

                <BookReviews book={book} />
            </div>
        </motion.div>
    );
};




// parent div : rounded-lg border border-slate-900/20 dark:border-slate-50/20

// h2-desc: before:absolute before:top-[0.63rem] before:-left-1.5 before:w-[0.3rem] before:h-[55%] before:rounded-full before:bg-slate-700 dark:before:bg-slate-200





