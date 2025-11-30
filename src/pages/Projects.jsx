import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../api';

// 1. IMPORT ALL THREE PROJECT IMAGES

import proj1 from '../assets/proj1.png';
import proj2 from '../assets/proj2.png'; 
import proj3 from '../assets/proj3.png'; 
import proj4 from '../assets/proj4.jpg';

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

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. CREATE AN ARRAY OF IMAGES TO CYCLE THROUGH
    const projectImages = [proj1, proj2, proj3, proj4];

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
                    fetchProjects(); 
                } catch (err) {
                    console.error(err);
                    alert("Error deleting project from the backend.");
                }
            }
        } else {
            alert("Cannot delete hardcoded static project items.");
        }
    };

    return (
        <Container className="py-5 mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>My Projects</h2>
                <Button as={Link} to="/projects/add" variant="success">Add New Project</Button>
            </div>
            
            {loading && <div className="text-center"><Spinner animation="border" /> Loading projects...</div>}
            
            {error && <Alert variant={error.includes("Note") ? "info" : "danger"}>{error}</Alert>}

            <Row>
                {/* 3. ADD 'index' TO THE MAP FUNCTION */}
                {projects.map((p, index) => (
                    <Col md={4} key={p._id} className="mb-4">
                        <Card className="h-100 shadow-sm">
                            
                            {/* 4. USE THE MATH TRICK TO CYCLE IMAGES */}
                            <Card.Img
                                variant="top"
                                src={projectImages[index % projectImages.length]}
                                style={{ height: '200px', objectFit: 'cover'}}
                            />

                            <Card.Body>
                                <Card.Title>{p.title}</Card.Title>
                                <Card.Text>{p.description}</Card.Text>
                                {p.role && <small className="text-muted d-block mb-1">Role: {p.role}</small>}
                                {p.completion && <small className="text-muted d-block">Completed: {new Date(p.completion).toLocaleDateString()}</small>}
                                
                                <div className="mt-3">
                                    {!p._id.startsWith('static-') && (
                                        <>
                                            <Button as={Link} to={`/projects/edit/${p._id}`} variant="warning" className="me-2">Edit</Button>
                                            <Button variant="danger" onClick={() => handleDelete(p._id)}>Delete</Button>
                                        </>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Projects;