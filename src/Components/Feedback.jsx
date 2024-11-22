import React, { useState, useEffect } from 'react';

const Feedback = () => {
    const [ratings, setRatings] = useState([]); 
    const [selectedRating, setSelectedRating] = useState(null);
    const [message, setMessage] = useState('');
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        const storedRatingsLocalStorage = localStorage.getItem('ratings');
        if (storedRatingsLocalStorage) {
            setRatings(JSON.parse(storedRatingsLocalStorage));
        }
        const storedRatingsSession = sessionStorage.getItem('ratings');
        if (storedRatingsSession) {
            setRatings(JSON.parse(storedRatingsSession));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('ratings', JSON.stringify(ratings));
        sessionStorage.setItem('ratings', JSON.stringify(ratings));
    }, [ratings]);

    const handleSubmit = () => {
        if (!selectedRating || !message) return;

        if (editing !== null) {
            setRatings((prev) =>
                prev.map((item, index) =>
                    index === editing ? { ...item, rating: selectedRating, message } : item
                )
            );
            setEditing(null);
        } else {
            setRatings([...ratings, { id: ratings.length + 1, rating: selectedRating, message }]);
        }

        setSelectedRating(null);
        setMessage('');
    };

    const handleDelete = (index) => {
        const updatedRatings = [];
        for (let i = 0; i < ratings.length; i++) {
            if (i !== index) {
                updatedRatings.push(ratings[i]);
            }
        }
        setRatings(updatedRatings);
    };
    

    const handleEdit = (index) => {
        setEditing(index);
        setSelectedRating(ratings[index].rating);
        setMessage(ratings[index].message);
    };

    let totalRating = 0;
    for (let i = 0; i < ratings.length; i++) {
        totalRating += ratings[i].rating;
    }
    
    const averageRating = ratings.length ? (totalRating / ratings.length).toFixed(1) : 0;
    

    return (
        <div
            style={{
                color: 'blue',
                background: 'orange',
                padding: '20px',
                fontFamily: 'Arial',
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            
            <div style={{ flex: 3 }}>
                
                <div>
                    {[...Array(10)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setSelectedRating(i + 1)}
                            style={{
                                background: selectedRating === i + 1 ? 'gray' : 'transparent',
                                border: '1px solid blue',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                margin: '5px',
                                color: 'white',
                            }}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                <div>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write the message"
                        style={{
                            width: '100%',
                            margin: '10px 0',
                            padding: '10px',
                            background: 'orange',
                            color: 'white',
                        }}
                    ></textarea>
                    <button
                        onClick={handleSubmit}
                        style={{ padding: '10px', background: 'gray', color: 'white' }}
                    >
                        {editing !== null ? 'Update' : 'Submit'}
                    </button>
                </div>

                <div>
                    {ratings.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                border: '1px solid white',
                                padding: '10px',
                                margin: '10px 0',
                            }}
                        >
                            <p>Rating: {item.rating}</p>
                            <p>Message: {item.message}</p>
                            <button
                                onClick={() => handleEdit(index)}
                                style={{ margin: '5px', padding: '5px' }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(index)}
                                style={{ margin: '5px', padding: '5px' }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div
                style={{
                    flex: 1,
                    border: '1px solid blue',
                    padding: '20px',
                    marginLeft: '10px',
                    textAlign: 'center',
                }}
            >
                <h3>Average Rating</h3>
                <p style={{ fontSize: '20px' }}>Total: {totalRating}</p>
                <p style={{ fontSize: '20px' }}>Users: {ratings.length}</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Average: {averageRating}</p>
            </div>
        </div>
    );
};

export default Feedback;