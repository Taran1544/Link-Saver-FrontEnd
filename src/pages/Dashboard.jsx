import React, { useEffect, useState } from 'react';
import SummaryBox from '../components/SummaryBox';
import AddBookmarkForm from '../components/AddBookmarkForm';
import axios from '../api/axios';

const Dashboard = () => {
    const [bookmarks, setBookmarks] = useState([]);

    const fetchBookmarks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/bookmarks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBookmarks([...response.data]);
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
        }
    };

    const handleAdd = async ({ title, url }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                '/bookmarks',
                { title, url },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setBookmarks([response.data, ...bookmarks]);
        } catch (error) {
            console.error('Error adding bookmark:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/bookmarks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchBookmarks();
        } catch (error) {
            console.error('Error deleting bookmark:', error);
        }
    };

    useEffect(() => {
        fetchBookmarks();
    }, []);

    return (
        <div className="dashboard">
            <h2>Your Bookmarks</h2>
            <AddBookmarkForm onAdd={handleAdd} />
            <div className="bookmark-list">
                {bookmarks.length === 0 ? (
                    <p>No bookmarks found.</p>
                ) : (
                    bookmarks.map((bookmark,idx) => (
                        <SummaryBox
                            key={idx}
                            favicon={bookmark.favicon}
                            title={bookmark.title}
                            url={bookmark.url}
                            summary={bookmark.summary}
                            onDelete={() => handleDelete(bookmark._id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
