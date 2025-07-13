import React, {JSX, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { fetchProductsReview } from './ReviewSlice';

// SVG
import GenericAvatar from '../../assets/generic-avatar.svg';

interface ReviewProps {
    total_reviews: number;
    average_rating: number;
    countStars: (rating: number) => JSX.Element[];
    stars_5: number;
    stars_4: number;
    stars_3: number;
    stars_2: number;
    stars_1: number;
    have_comment: number;
    have_image: number;
}

const Review: React.FC<ReviewProps> = ({ total_reviews, average_rating, countStars, stars_5, stars_4, stars_3, stars_2, stars_1, have_comment, have_image }) => {
    const [currentReviews, setCurrentReviews] = React.useState<'all' | '5' | '4' | '3' | '2' | '1' | 'comment' | 'image'>('all');
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const { reviews: AllReviews, reviews_5_stars, reviews_4_stars, reviews_3_stars, reviews_2_stars, reviews_1_stars, reviews_have_comment, reviews_have_image, offset, offset_5_stars, offset_4_stars, offset_3_stars, offset_2_stars, offset_1_stars, offset_have_comment, offset_have_image } = useSelector((state: RootState) => state.review);

    const reviewTemplate = (profile_img: string, user_name: string, stars: number, created_at: string, comment: string | null, img_url: string | null,  ) : JSX.Element => {
        return (
            <div>
                <div>
                    <img src={profile_img ?? GenericAvatar} alt="Profile" />
                    <div>
                        <p>{user_name}</p>
                        <div>{countStars(stars)}</div>
                        <p>{created_at}</p>
                    </div>
                </div>
                {comment && <p>{comment}</p>}
                {img_url && <img src={img_url} alt="Review" />}
            </div>
        )
    }

    const loadingTemplate = () : JSX.Element => {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    const handleReviewTypeChange = (type: 'all' | '5' | '4' | '3' | '2' | '1' | 'comment' | 'image') => {
        setCurrentReviews(type);
        switch (type) {
            case 'all':
                if (AllReviews.length === 0) {
                    dispatch(fetchProductsReview({ productId: Number(id), offset: 0 }));
                }
                break;
            case '5':
                if (reviews_5_stars.length === 0) {
                    dispatch(fetchProductsReview({ productId: Number(id), offset: 0 }));
                }
                break;
            case '4':
                if (reviews_4_stars.length === 0) {
                    dispatch(fetchProductsReview({ productId: Number(id), offset: 0 }));
                }
                break;
            case '3':
                if (reviews_3_stars.length === 0) {
                    dispatch(fetchProductsReview({ productId: Number(id), offset: 0 }));
                }
                break;
            case '2':
                if (reviews_2_stars.length === 0) {
                    dispatch(fetchProductsReview({ productId: Number(id), offset: 0 }));
                }
                break;
            case '1':
                if (reviews_1_stars.length === 0) {
                    dispatch(fetchProductsReview({ productId: Number(id), offset: 0 }));
                }
                break;
            case 'comment':
                if (reviews_have_comment.length === 0) {
                    dispatch(fetchProductsReview({ productId: Number(id), offset: 0 }));
                }
                break;
            case 'image':
                if (reviews_have_image.length === 0) {
                    dispatch(fetchProductsReview({ productId: Number(id), offset: 0 }));
                }
                break;
        }
        
    };

    useEffect(() => {
        if(AllReviews.length === 0){
            const promise = dispatch(fetchProductsReview({ productId: Number(id), offset: 0 }));
            return () => {
                promise.abort(); // Clean up the promise if the component unmounts
            }
        }
    }, []);

  return (
    <div>
        <h2>Ratings</h2>
        {/* Rating bar */}
        <div className='flex items-center justify-between bg-blue-100'>
            <div className='flex flex-col'>
                <p>{average_rating} out of 5</p>
                <div>{countStars(average_rating)}</div>
            </div>

            <div>
                <button className='' onClick={() => handleReviewTypeChange('all')}>All</button>
                <button className='' onClick={() => handleReviewTypeChange('5')}>5 stars ({stars_5})</button>
                <button className='' onClick={() => handleReviewTypeChange('4')}>4 stars ({stars_4})</button>
                <button className='' onClick={() => handleReviewTypeChange('3')}>3 stars ({stars_3})</button>
                <button className='' onClick={() => handleReviewTypeChange('2')}>2 stars ({stars_2})</button>
                <button className='' onClick={() => handleReviewTypeChange('1')}>1 star ({stars_1})</button>
                <button className='' onClick={() => handleReviewTypeChange('comment')}>Have comments ({have_comment})</button>
                <button className='' onClick={() => handleReviewTypeChange('image')}>Have image ({have_image})</button>
            </div>
        </div>

        {/* Reviews */}
        {AllReviews.length > 0 ? (currentReviews === 'all' ? AllReviews.map((review) => reviewTemplate(
            review.profile_img,
            review.username,
            review.rating,
            review.created_at,
            review.comment,
            review.img_url
        )) : loadingTemplate()) : null}

        {reviews_5_stars.length > 0 ? (currentReviews === '5' ? reviews_5_stars.map((review) => reviewTemplate(
            review.profile_img,
            review.username,
            review.rating,
            review.created_at,
            review.comment,
            review.img_url
        )) : loadingTemplate()) : null}

        {reviews_4_stars.length > 0 ? (currentReviews === '4' ? reviews_4_stars.map((review) => reviewTemplate(
            review.profile_img,
            review.username,
            review.rating,
            review.created_at,
            review.comment,
            review.img_url
        )) : loadingTemplate()) : null}

        {reviews_3_stars.length > 0 ? (currentReviews === '3' ? reviews_3_stars.map((review) => reviewTemplate(
            review.profile_img,
            review.username,
            review.rating,
            review.created_at,
            review.comment,
            review.img_url
        )) : loadingTemplate()) : null}

        {reviews_2_stars.length > 0 ? (currentReviews === '2' ? reviews_2_stars.map((review) => reviewTemplate(
            review.profile_img,
            review.username,
            review.rating,
            review.created_at,
            review.comment,
            review.img_url
        )) : loadingTemplate()) : null}

        {reviews_1_stars.length > 0 ? (currentReviews === '1' ? reviews_1_stars.map((review) => reviewTemplate(
            review.profile_img,
            review.username,
            review.rating,
            review.created_at,
            review.comment,
            review.img_url
        )) : loadingTemplate()) : null}

        {reviews_have_comment.length > 0 ? (currentReviews === 'comment' ? reviews_have_comment.map((review) => reviewTemplate(
            review.profile_img,
            review.username,
            review.rating,
            review.created_at,
            review.comment,
            review.img_url
        )) : loadingTemplate()) : null}

        {reviews_have_image.length > 0 ? (currentReviews === 'image' ? reviews_have_image.map((review) => reviewTemplate(
            review.profile_img,
            review.username,
            review.rating,
            review.created_at,
            review.comment,
            review.img_url
        )): loadingTemplate()) : null}
    </div>
  )
}

export default Review