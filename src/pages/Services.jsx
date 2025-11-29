import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../api'; // Your API helper

const Services = () => {
    // 1. Hardcoded data from your 'old' component (used as fallback)
    const staticServices = [
        { _id: 'static-1', title: 'Web Development', description: 'React, Node.js, and Full-Stack MERN applications.' },
        { _id: 'static-2', title: 'Erection & Commissioning Engineering', description: 'Oversight and management of industrial plant start-up.' },
        { _id: 'static-3', title: 'Project Coordination & Site Management', description: 'Efficient planning, execution, and site safety management.' },
        { _id: 'static-4', title: 'Database Management (MongoDB, SQL)', description: 'Designing, maintaining, and optimizing database solutions.' },
        { _id: 'static-5', title: 'Technical Documentation & Reporting', description: 'Creating clear and precise technical guides and reports.' },
        { _id: 'static-6', title: 'Customer Service & Technical Support', description: 'Providing technical assistance and resolving customer issues.' },
        { _id: 'static-7', title: 'AI Agents developer (Chatbots)', description: 'Building and deploying conversational AI and chatbot solutions.' },
    ];

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Function to fetch data from the API
    const fetchServices = async () => {
        try {
            setLoading(true);
            const res = await api.get('/services');
            
            if (res.data && res.data.length > 0) {
                // If API returns data, use it
                setServices(res.data);
            } else {
                // If API returns empty array, use static data
                setServices(staticServices);
                setError("Note: API returned no services. Displaying static fallback data.");
            }
        } catch (err) {
            console.error("API Fetch Error:", err);
            // If API call fails entirely, use static data
            setServices(staticServices);
            setError("Error fetching services from API. Displaying static fallback data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    // 3. Handle Delete (Note: Delete only works on MongoDB items, not static ones)
    const handleDelete = async (id) => {
        if (!id.startsWith('static-')) { // Only try to delete if it's not a static item
            if (window.confirm("Delete this service?")) {
                try {
                    await api.delete(`/services/${id}`);
                    // Re-fetch data instead of reloading the entire page
                    fetchServices();
                } catch (err) {
                    console.error("Delete Error:", err);
                    alert("Error deleting service from the backend.");
                }
            }
        } else {
            alert("Cannot delete hardcoded static service items.");
        }
    };

    return (
        <Container className="py-5 mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Services I Offer</h2>
                {/* The Add button is still functional for API-based services */}
                <Button as={Link} to="/services/add" variant="success">Add Service</Button>
            </div>

            {loading && <div className="text-center"><Spinner animation="border" /> Loading services...</div>}
            
            {/* Display error/fallback message */}
            {error && <Alert variant={error.includes("Note") ? "info" : "danger"}>{error}</Alert>}

            <ListGroup variant="flush" className="shadow-sm">
                {services.map(s => (
                    <ListGroup.Item key={s._id} className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{s.title}</h5>
                            {/* Display description for the new format */}
                            <p className="text-muted mb-0">{s.description || 'No description provided'}</p> 
                        </div>
                        <div>
                            {/* Buttons only appear if we are NOT using the static fallback, 
                                OR if you want to explicitly check if it's a real MongoDB item */}
                            {!s._id.startsWith('static-') && (
                                <>
                                    <Button as={Link} to={`/services/edit/${s._id}`} variant="outline-warning" size="sm" className="me-2">Edit</Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(s._id)}>Delete</Button>
                                </>
                            )}
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default Services;