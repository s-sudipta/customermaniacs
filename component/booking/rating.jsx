import { useState } from 'react';
const Rating = ({ onChildValue }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value)
    onChildValue(value);
  };

  return (<>
    <style jsx>{`
        #star{
            font-size: 30px;
            color: yellow;
        }
    `}
    </style>
      {[...Array(5)].map((_, index) => (
        <span
            id="star"
          key={index}
          style={{ cursor: 'pointer' }}
          onClick={() => handleRating(index + 1)}
        >
          {index + 1 <= rating ? '★' : '☆'}
        </span>
        
      ))}
    </>
  );
};

export default Rating;
