/// <reference types="Cypress" />
import { createGallery } from '../page_objects/createGallery';
const faker = require('@faker-js/faker');

describe('Create gallery test', () => {
    let galleryId;
    let galleryData = {
        title: faker.random.alpha({ count:5}),
        invalidTitle: faker.random.alpha({ count:1}),
        invalidTitle2: faker.random.alpha({ count:256}),
        invalidDescription: faker.random.alpha({ count:1001}),
        description: faker.random.alpha({ count:5}),
        image: faker.image.avatar(),
        wrongUrl: 'https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036__340.txt'
    }    

    beforeEach('login via backend', () => {
        cy.loginViaBackend()
        cy.visit('/create');
        cy.url().should('include', '/create');
    });

    it('create gallery', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGallery')

         createGallery.createGallery(
            galleryData.title, 
            galleryData.description, 
            galleryData.image
        )

        cy.wait('@createGallery').then(interception => {
            galleryId = interception.response.body.id

            expect(interception.response.body.title).eq(galleryData.title)
            cy.visit(`/galleries/${galleryId}`)
            // cy.visit('/galleries/' + galleryId)
            cy.get('h1').should('have.text', galleryData.title)
        })
    })

    it('create gallery without title', () =>{
        cy.visit('/create')
        createGallery.createGalleryBtn.click()
        createGallery.withoutTitle(
            galleryData.description, 
            galleryData.image
        )
        cy.url().should('include', '/create')
        createGallery.createTitle.should('have.text', 'Create Gallery')

    })



    it('create gallery with one char in title', () =>{
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('invalidTitle')

        createGallery.titleWithOneCharacter(
            galleryData.invalidTitle, 
            galleryData.description, 
            galleryData.image
        )
        cy.wait('@invalidTitle').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(422)
          })
           
        cy.url().should('include', '/create')
        createGallery.errorMessage.should('be.visible')
        .and('have.text', 'The title must be at least 2 characters.')
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')
     })





     it('create gallery with 256 char in title', () =>{
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('invalidTitle2')

        createGallery.titleWith256Character(
            galleryData.invalidTitle2, 
            galleryData.description, 
            galleryData.image
        )
        cy.wait('@invalidTitle2').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(422)
          })

        cy.url().should('include', '/create')
          createGallery.errorMessage.should('be.visible')
         .and('have.text', 'The title may not be greater than 255 characters.')
         .and('have.css', 'background-color', 'rgb(248, 215, 218)')
    })

   
    


    it('create gallery without description', () =>{
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('withoutDescription')


        createGallery.galleryWithoutDescription(
            galleryData.title, 
            galleryData.image
        )

        cy.wait('@withoutDescription').then(interception => {
            galleryId = interception.response.body.id

            expect(interception.response.body.title).eq(galleryData.title)
            expect(interception.response.body.description).eq(null)
            cy.visit(`/galleries/${galleryId}`)
            // cy.visit('/galleries/' + galleryId)
            cy.get('h1').should('have.text', galleryData.title)
        })
        cy.url().should('not.include', '/create')
        
    })       




    it('create gallery with invalid description', () =>{
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('invalidDescription')


        createGallery.descriptionWith1001Char(
            galleryData.title, 
            galleryData.invalidDescription,
            galleryData.image
        )

        cy.wait('@invalidDescription').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(422)
          })
          cy.url().should('include', '/create')
          createGallery.errorMessage.should('be.visible')
         .and('have.text', 'The description may not be greater than 1000 characters.')
         .and('have.css', 'background-color', 'rgb(248, 215, 218)')
    })
         
    



    it('create gallery with wrong url format', () =>{
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('wrongUrl')

        createGallery.createWithWrongUrl(
            galleryData.title, 
            galleryData.description, 
            galleryData.wrongUrl
        );


        cy.wait('@wrongUrl').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(422)
        })


        cy.url().should('include', '/create');
        createGallery.errorMessage.should('be.visible')
        .and('have.text', 'Wrong format of image')
        .and('have.css', 'background-color', 'rgb(248, 215, 218)')
    })
    


    it('all empty fields', () =>{
        createGallery.allEmptyFields();
        cy.url().should('include', '/create');
        createGallery.createTitle.should('have.text', 'Create Gallery')
    })



    it('create gallery with two images', () =>{
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('twoImages')

        createGallery.galleryWithTwoImages(
            galleryData.title, 
            galleryData.description, 
            galleryData.image
        );
        cy.wait('@twoImages').then(interception => {
            galleryId = interception.response.body.id
            
            expect(interception.response.statusCode).eq(201)
            expect(interception.response.body.title).eq(galleryData.title)
            cy.visit(`/galleries/${galleryId}`)
            // cy.visit('/galleries/' + galleryId)
            cy.get('h1').should('have.text', galleryData.title)
        })

        
    })
    






})