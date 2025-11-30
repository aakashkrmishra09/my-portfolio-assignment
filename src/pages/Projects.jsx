import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../api';
import proj1 from '../assets/proj1.png'; // Assuming you have placeholder images

// --- TEMPORARY FALLBACK DATA ---
const staticProjects = [
    { 
        _id: "static-1", 
        title: "2.4 MLD Sewage Treatment Plant – DLF Project", 
        description: "Worked as a Site Incharge, overseeing erection of clarifiers, blowers, and control panels. Managed commissioning activities including electrical testing, mechanical alignment, and process optimization to meet environmental regulations.", 
        role: "Process Engineer",
        completion: new Date().toISOString()
    },
    { 
        _id: "static-2", 
        title: "Jio World Convention Centre (JWCC) Water Management System", 
        description: "The Jio World Convention Centre (JWCC) in Mumbai's Bandra Kurla Complex (BKC) features a highly advanced and integrated water management system, including RO and Ozonator, contributing to its LEED Platinum compliance.", 
        role: "Commissioning Engineer",
        completion: new Date().toISOString()
    },
    { 
        _id: "static-3", 
        title: "Rana Sugar Mills - Ethanol & DM Water Plant (Punjab)", 
        description: "The Rana Sugar Mills site operates an integrated complex for sugar production, co-generation power, and a modern distillery for ethanol production, a key contributor to India's EBP.", 
        role: "Site Incharge",
        completion: new Date().toISOString()
    }
];
// --- END TEMPORARY FALLBACK DATA ---

// You will need to pass the 'isLoggedIn' prop from App.js to this component
const Projects = ({ isLoggedIn }) => { 
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch projects when page loads
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await api.get('/projects');

            if (res.data && res.data.length > 0) {
                setProjects(res.data);
            } else {
                setProjects(staticProjects);
                setError("Note: API returned no projects. Displaying static fallback data.");
            }
        } catch (err) {
            console.error("API Fetch Error:", err);
            setProjects(staticProjects);
            setError("Error fetching projects from API. Displaying static fallback data.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!id.startsWith('static-')) {
            if (window.confirm("Are you sure you want to delete this project?")) {
                try {
                    await api.delete(`/projects/${id}`);
                    fetchProjects(); // Refresh list
                } catch (err) {
                    console.error(err);
                    alert("Error deleting project from the backend. (Are you logged in?)");
                }
            }
        } else {
            alert("Cannot delete hardcoded static project items.");
        }
    };

    return (
        <Container className="py-5 mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ fontFamily: 'Satisfy' }}>Projects: Locations Revealed</h2>
                
                {/* Admin Button: Only show if logged in */}
                {isLoggedIn && (
                  <Button as={Link} to="/projects/add" variant="outline-dark">Conjure New Project</Button>
                )}
            </div>
            
            {loading && <div className="text-center"><Spinner animation="border" /> Unfolding the Map...</div>}
            
            {error && <Alert variant={error.includes("Note") ? "info" : "danger"}>{error}</Alert>}

            <Row>
                {projects.map((p) => (
                    <Col md={4} key={p._id} className="mb-4">
                        {/* --- START THEME STYLING --- */}
                        <Card 
                            className="h-100 shadow-none" 
                            style={{ 
                            backgroundColor: 'transparent', 
                            border: '3px solid #4a2c2a',
                            position: 'relative'
                          }}
                        >
                            {/* Corner Decorations */}
                            <div style={{ position: 'absolute', top: 2, left: 2, width: 10, height: 10, borderTop: '2px solid #4a2c2a', borderLeft: '2px solid #4a2c2a', zIndex: 10 }}></div>
                            <div style={{ position: 'absolute', top: 2, right: 2, width: 10, height: 10, borderTop: '2px solid #4a2c2a', borderRight: '2px solid #4a2c2a', zIndex: 10 }}></div>
                            
                            <Card.Img 
                                variant="top" 
                                src={proj1} 
                                style={{ height: '200px', objectFit: 'cover', filter: 'sepia(100%)', borderBottom: '2px solid #4a2c2a'}} 
                            /> 
                            
                            <Card.Body>
                                <Card.Title style={{ fontFamily: 'Satisfy', fontSize: '1.8rem', textAlign: 'center' }}>
                                    {p.title}
                                </Card.Title>
                                <hr style={{ borderColor: '#4a2c2a', opacity: 1 }} />
                                <Card.Text style={{ textAlign: 'justify' }}>
                                    {p.description}
                                </Card.Text>
                                
                                <div className="text-center mt-3">
                                    {/* Admin Buttons */}
                                    {!p._id.startsWith('static-') && isLoggedIn && ( // Only show if dynamic AND logged in
                                        <>
                                            {/* Thematic Edit Button */}
                                            <Button 
                                                variant="outline-dark" 
                                                as={Link} 
                                                to={`/projects/edit/${p._id}`} 
                                                className="me-2"
                                            >
                                                Respell
                                            </Button>
                                            {/* Thematic Delete Button */}
                                            <Button 
                                                variant="outline-danger" 
                                                onClick={() => handleDelete(p._id)}
                                            >
                                                Vanish
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                        {/* --- END THEME STYLING --- */}
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Projects;