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
        // console.log(index);
        const updatedRatings = [];
        for (let i = 0; i < ratings.length; i++) {
            if (i !== index) {
                updatedRatings.push(ratings[i]);
            }
        }
        setRatings(updatedRatings);
    };
    

    const handleEdit = (index) => {
        // console.log(index);
        setEditing(index);
        setSelectedRating(ratings[index].rating);
        setMessage(ratings[index].message);
    };

    let totalRating = 0;
    for (let i = 0; i < ratings.length; i++) {
        totalRating += ratings[i].rating;
    }
    
    const averageRating = ratings.length ? (totalRating / ratings.length).toFixed(1) : 0;
    // console.log(averageRating);
    // console.log(ratings);

    return (
        <div
            style={{
                color: 'blue',
                background: 'rgb(20, 21, 80)',
                padding: '20px',
                fontFamily: 'Arial',
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            
            <div style={{ flex: 3 }}>

                <div
                    style={{
                        padding: '15px',
                        background: '#f7f5f5',
                        borderRadius: '10px',
                    }}
                >
                    <p
                        style={{
                            color: '#3d3c3c',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: '20px',
                        }}
                    >How would you rate your service with us?</p>

                    <div
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        {[...Array(10)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setSelectedRating(i + 1)}
                                style={{
                                    background: selectedRating === i + 1 ? 'deeppink' : '#f0eded',
                                    color: selectedRating === i + 1 ? 'white' : 'black',
                                    // border: '.2px solid blue',
                                    border: 'none',
                                    borderRadius: '50%',
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                    width: '40px',
                                    height: '40px',
                                    margin: '7px',
                                    fontWeight: '600',
                                }}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <div
                        style={{
                            padding: '0px', 
                            margin: '15px 120px', 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fff', 
                            border: '1.5px solid lightgray',
                            borderRadius: '8px',
                            maxWidth: '700px', 
                            width: '100%',
                        }}
                    >
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write a review"
                            style={{
                                width: '100%',
                                // margin: '10px 0',
                                padding: '15px',
                                // background: '#f0eded',
                                color: 'black',
                                border: 'none',
                                outline: 'none',
                            }}
                        ></input>
                        <button
                            onClick={handleSubmit}
                            style={{ 
                                padding: '10px 20px', 
                                marginRight: '5px',
                                background: '#f0eded', 
                                color: 'black', 
                                border: 'none',
                                borderRadius: '5px',
                            }}
                        >
                            {editing !== null ? 'Update' : 'Send'}
                        </button>
                    </div>
                </div>

                <div>
                    {ratings.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                // border: '1px solid white',
                                background: '#f7f5f5',
                                borderRadius: '8px',
                                padding: '10px',
                                margin: '10px 0',
                                textAlign: 'center',
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
                    // border: '1px solid blue',
                    background: '#f7f5f5',
                    borderRadius: '5px',
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