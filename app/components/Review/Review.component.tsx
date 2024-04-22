import { useCanUserReviewQuery, usePostReviewMutation } from '@/redux/api/room.api';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import StarRatings from 'react-star-ratings';

const Review = ({ roomId }: { roomId: string }) => {
    const [review, setReview] = useState({ rating: 0, comment: '' });
    const router = useRouter();

    const { data: { canReview } = {} } = useCanUserReviewQuery(roomId);
    const [postReview, { error, isSuccess }] = usePostReviewMutation();
    useEffect(() => {
        if (error && 'data' in  error) toast.error(error?.data?.message || 'Unkow error');
        if (isSuccess) {
            toast.success('Review posted');
            router.refresh();
        }
    // eslint-disable-next-line
    }, [error, isSuccess]);

    const handleSubmit = () => {
        const reviewData = {
            rating: review.rating,
            comment: review.comment,
            roomId
        };
        postReview(reviewData);
    };

    return (
        <>
            {canReview && (
            <button
                type="button"
                className="btn form-btn mt-4 mb-5"
                data-bs-toggle="modal"
                data-bs-target="#ratingModal"
            >
                Submit Your Review
            </button>
            )}
            <div
                className="modal fade"
                id="ratingModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="ratingModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">
                                Submit Review
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <StarRatings
                                rating={review.rating}
                                starRatedColor="#e61e4d"
                                numberOfStars={5}
                                name="rating"
                                changeRating={(e: number) => setReview(prev => ({ ...prev, rating: e }))}
                            />
                            <div className="form-floating">
                                <textarea
                                    id="review_field"
                                    className="form-control mt-4"
                                    placeholder="Leave your review"
                                    style={{ height: "100px" }}
                                    value={review.comment}
                                    onChange={(e) => setReview(prev => ({ ...prev, comment: e.target.value }))}
                                ></textarea>
                                <label htmlFor="review_field">Comment</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn my-3 form-btn w-100"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Review;
