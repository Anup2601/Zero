import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReviewForm.css";

const ReviewForm = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!rating) return; // Ensure rating is selected before submission
        
        const reviewData = {
            rating,
            comment,
            timestamp: new Date().toISOString(),
        };

        // Check if onSubmit is passed as a prop and call it
        if (typeof onSubmit === "function") {
            onSubmit(reviewData);
        }

        navigate(`/room/${value}`); // Redirect to home page after submitting
    };

    const handleClose = () => {
        navigate(`/room/${value}`); // Redirect to home page
    };

    return (
        <div className="review">
            <h1>Rate Your Meeting Experience</h1>
            <div className="rating-container">
                {[1, 2, 3, 4, 5].map((num) => (
                    <button
                        key={num}
                        onClick={() => setRating(num)}
                        onMouseOver={() => setHover(num)}
                        onMouseLeave={() => setHover(rating)}
                        className="star-button"
                    >
                        <span className={`star ${num <= (hover || rating) ? "on" : "off"}`}>
                            &#9733;
                        </span>
                    </button>
                ))}
            </div>
            <textarea
                className="review-textarea"
                rows="3"
                placeholder="Share your feedback about the meeting..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <div className="review-buttons">
                <button onClick={handleClose} className="cancel">Cancel</button>
                <button onClick={handleSubmit} disabled={!rating} className="submit">
                    Submit Review
                </button>
            </div>
        </div>
    );
};

export default ReviewForm;
