import React, { useState, useEffect } from 'react';

import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import api from '../api';

import proj1 from '../assets/proj1.png'; // Assuming you have placeholder images



// --- TEMPORARY FALLBACK DATA ---

// This array contains your old hardcoded projects.

// They will be displayed if the API call fails or returns an empty list.

const staticProjects = [

    {

        _id: "static-1",

        title: "2.4 MLD Sewage Treatment Plant – DLF Project",

        description: "Worked as a Site Incharge, overseeing erection of clarifiers, blowers, and control panels. Managed commissioning activities including electrical testing, mechanical alignment, and process optimization to meet environmental regulations.",

        role: "Process Engineer",

        completion: new Date().toISOString() // Placeholder date

    },

    {

        _id: "static-2",

        title: "Jio World Convention Centre (JWCC) Water Management System",

        description: "The Jio World Convention Centre (JWCC) in Mumbai's Bandra Kurla Complex (BKC) features a highly advanced and integrated water management system, including RO and Ozonator, contributing to its LEED Platinum compliance.",

        role: "Commissioning Engineer",

        completion: new Date().toISOString() // Placeholder date

    },

    {

        _id: "static-3",

        title: "Rana Sugar Mills - Ethanol & DM Water Plant (Punjab)",

        description: "The Rana Sugar Mills site operates an integrated complex for sugar production, co-generation power, and a modern distillery for ethanol production, a key contributor to India's EBP.",

        role: "Site Incharge",

        completion: new Date().toISOString() // Placeholder date

    }

];

// --- END TEMPORARY FALLBACK DATA ---





const Projects = () => {

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

                // Use data from the API

                setProjects(res.data);

            } else {

                // If API is empty, use static fallback data

                setProjects(staticProjects);

                setError("Note: API returned no projects. Displaying static fallback data.");

            }

        } catch (err) {

            console.error("API Fetch Error:", err);

            // If API call fails entirely, use static data

            setProjects(staticProjects);

            setError("Error fetching projects from API. Displaying static fallback data.");

        } finally {

            setLoading(false);

        }

    };



    const handleDelete = async (id) => {

        // Only allow delete if it's NOT a static project

        if (!id.startsWith('static-')) {

            if (window.confirm("Are you sure you want to delete this project?")) {

                try {

                    await api.delete(`/projects/${id}`);

                    fetchProjects(); // Refresh list

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

           

            {/* Display error/fallback message */}

            {error && <Alert variant={error.includes("Note") ? "info" : "danger"}>{error}</Alert>}



            <Row>

                {projects.map((p) => (

                    <Col md={4} key={p._id} className="mb-4">

                        <Card className="h-100 shadow-sm">

                            {/* Use proj1 as the static placeholder image for now, as defined in your imports */}

                            <Card.Img

                                variant="top"

                                src={proj1}

                                style={{ height: '200px', objectFit: 'cover'}}

                            />

                            <Card.Body>

                                <Card.Title>{p.title}</Card.Title>

                                <Card.Text>{p.description}</Card.Text>

                                {/* Display the role if available (using a smaller text) */}

                                {p.role && <small className="text-muted d-block mb-1">Role: {p.role}</small>}

                                {/* Display the completion date if available */}

                                {p.completion && <small className="text-muted d-block">Completed: {new Date(p.completion).toLocaleDateString()}</small>}

                               

                                <div className="mt-3">

                                    {/* Edit and Delete buttons only show for dynamic (non-static) projects */}

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