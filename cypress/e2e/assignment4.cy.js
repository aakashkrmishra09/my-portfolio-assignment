describe('Portfolio Assignment 4 Tests', () => {
  // Use a unique ID to prevent "Ghost Data" collisions
  const uniqueId = Date.now();
  
  const testUser = {
    firstname: 'Cypress',
    lastname: 'TestUser',
    email: `test${uniqueId}@test.com`, 
    password: 'Password123!'
  };

  const projectData = {
    title: `Auto Project ${uniqueId}`, 
    description: 'This project was created by a robot',
    completion: '2025-12-01'
  };

  const updatedProjectData = {
    title: `EDITED Project ${uniqueId}`, 
    description: 'This description has been updated'
  };

  it('1. Should Sign Up a new user', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('input[name="firstname"]').type(testUser.firstname);
    cy.get('input[name="lastname"]').type(testUser.lastname);
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();
    
    // Verify redirect
    cy.url().should('include', '/login');
  });

  it('2. Should Sign In, Add Project, and Sign Out', () => {
    // Login
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();
    
    // Wait for Login
    cy.contains('Logout', { timeout: 10000 }).should('be.visible');

    // Add Project
    cy.visit('http://localhost:3000/projects/add');
    cy.get('input[name="title"]').type(projectData.title);
    cy.get('textarea[name="description"]').type(projectData.description);
    cy.get('input[name="completion"]').type(projectData.completion);
    cy.get('button[type="submit"]').click();

    // Check URL redirect
    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/projects');
    
    // FORCE RELOAD to ensure we get fresh data from slow DB
    cy.wait(2000); 
    cy.reload();   

    // Verify Content
    cy.contains(projectData.title, { timeout: 10000 }).should('be.visible');

    // Sign Out
    cy.contains('Logout').click();
  });

  it('3. Should Sign In, Edit the Project, and Sign Out', () => {
    // Login
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();
    cy.contains('Logout', { timeout: 10000 }).should('be.visible');

    // Edit Project
    cy.visit('http://localhost:3000/projects');
    
    // Find specific card and click Edit
    cy.contains('.card', projectData.title).find('a.btn-warning').click();

    // --- CRITICAL FIX START ---
    // 1. Wait until the form has fully loaded the OLD data from the DB
    // This prevents React from overwriting our new text
    cy.get('input[name="title"]', { timeout: 10000 }).should('have.value', projectData.title);
    
    // 2. Now safe to Clear and Type
    cy.get('input[name="title"]').clear().type(updatedProjectData.title);

    // 3. Do the same for Description
    cy.get('textarea[name="description"]', { timeout: 10000 }).should('have.value', projectData.description);
    cy.get('textarea[name="description"]').clear().type(updatedProjectData.description);
    // --- CRITICAL FIX END ---

    cy.get('button[type="submit"]').click();

    // Check URL redirect
    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/projects');

    // FORCE RELOAD to get fresh data
    cy.wait(2000); 
    cy.reload();

    // Verify Content
    cy.contains(updatedProjectData.title, { timeout: 10000 }).should('be.visible');

    // Sign Out
    cy.contains('Logout').click();
  });

  it('4. Should Sign In, Delete the Project, and Sign Out', () => {
    // Login
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();
    cy.contains('Logout', { timeout: 10000 }).should('be.visible');

    // Delete Project
    cy.visit('http://localhost:3000/projects');

    // Handle Alert
    cy.on('window:confirm', () => true);
    
    // Find EDITED project and delete
    cy.contains('.card', updatedProjectData.title).find('button.btn-danger').click();

    // Wait and Reload
    cy.wait(2000);
    cy.reload(); 

    // Verify it is gone
    cy.contains(updatedProjectData.title).should('not.exist');

    // Sign Out
    cy.contains('Logout').click();
  });
});