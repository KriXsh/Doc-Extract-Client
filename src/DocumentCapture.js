// DocumentCapture.js
import React, { useState } from 'react';
import axios from 'axios';
import './DocumentCapture.css';

function DocumentCapture() {
    const [frontImg, setFrontImg] = useState(null);
    const [backImg, setBackImg] = useState(null);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // State to manage loading
    const [submitted, setSubmitted] = useState(false); // State to manage form submission

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (frontImg) {
            formData.append('front_img', frontImg);
        }
        if (backImg) {
            formData.append('back_img', backImg);
        }

        setLoading(true); // Start loading
        setSubmitted(true); // Hide upload form

        try {
            const res = await axios.post('https://doc-extract.onrender.com/global/ocr', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResponse(res.data);
            setError(null);
        } catch (err) {
            setError(err.response ? err.response.data.message : 'An error occurred');
            setResponse(null);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleReset = () => {
        setFrontImg(null);
        setBackImg(null);
        setResponse(null);
        setError(null);
        setSubmitted(false); // Reset form submission state
    };

    return (
        <div className="document-capture">
            {!submitted && !loading && (
                <form className="capture-form" onSubmit={handleSubmit}>
                    <h1>Document Capture</h1>
                    <label>Front Image:</label>
                    <input type="file" onChange={(e) => setFrontImg(e.target.files[0])} required />
                    <label>Back Image:</label>
                    <input type="file" onChange={(e) => setBackImg(e.target.files[0])} required />
                    <button type="submit">Upload</button>
                </form>
            )}

            {/* Loader */}
            {loading && (
                <div className="loader">
                    <div>
                        <ul>
                            <li>
                                <svg fill="currentColor" viewBox="0 0 90 120">
                                    <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                                </svg>
                            </li>
                            {/* Add more SVGs if needed */}
                        </ul>
                    </div>
                    <div className="loader-message">Loading...</div>
                </div>
            )}

            {/* Response Section */}
            {response && !loading && (
                <div className="response-container">
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                    <button onClick={handleReset}>Upload Another Document</button>
                </div>
            )}

            {/* Error Section */}
            {error && !loading && (
                <div className="error-container">
                    <h2>Error:</h2>
                    <p>{error}</p>
                    <button onClick={handleReset}>Try Again</button>
                </div>
            )}
        </div>
    );
}

export default DocumentCapture;
