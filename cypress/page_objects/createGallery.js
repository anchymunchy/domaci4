class CreateGallery {
    get loginBtn(){
        return cy.get('.nav-link').eq(1);
    }

    get emailInput(){
        return cy.get('#email');
    }

    get passwordInput (){
        return cy.get('#password');
    }

    get submitBtn() {
        return cy.get('button')
    }

    login(email, password) {
        this.loginBtn.click()
        this.emailInput.type(email)
        this.passwordInput.type(password)
        this.submitBtn.click()
    }
    

    get createGalleryBtn(){
        return cy.get('.nav-link').eq(2);
    }
    
    get createTitle(){
        return cy.get('h1.title-style')
    }
    
    get allGalleriesTitle(){
        return cy.get('h1.title-style')

    }
    
    get titleInput(){
        return cy.get('#title');
    }

    get descriptionInput (){
        return cy.get('#description');
    }
    
    get imagesInput (){
        return cy.get('.form-control').eq(2);
    }

    get galleryInputParent() {
        return cy.get('.form-group')
    
    }
    get trashGalleryBtn (){
        return this.galleryInputParent
        .find('button')
        .first()
    }

    get arrowUpBtn (){
        return this.galleryInputParent
        .find('button')
        .eq(1)
    }
    get arrowDownBtn (){
        return this.galleryInputParent
        .find('button')
        .last()
    }

     get arrowBtnEq() {
         return cy.get('i').eq(0);
     }
    

    get addImageBtn(){
        return cy.get('button').eq(2);
    }

    get submitBtn2() {
        return cy.get('.btn').eq(0);
    }

    get cancelBtn(){
        return cy.get('.btn').eq(1);
    }

    get newImgUrl(){
        return cy.get('.form-control').eq(3)
    }

    get errorMessage(){
        return cy.get('p[class="alert alert-danger"]');
    }
    
    createGallery(title, description,image) {
        this.createGalleryBtn.click()
        this.titleInput.type(title)
        this.descriptionInput.type(description)
        this.imagesInput.type(image)
        this.submitBtn2.click()
    }

    withoutTitle(description,image){
        this.createGalleryBtn.click();
        this.descriptionInput.type(description);
        this.imagesInput.type(image);
        this.submitBtn2.click();
    }

    titleWithOneCharacter(title,description, image){
        this.createGalleryBtn.click();
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imagesInput.type(image);
        this.submitBtn2.click();
    }

    titleWith256Character(title,description, image){
        this.createGalleryBtn.click();
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imagesInput.type(image);
        this.submitBtn2.click();
    }

    galleryWithoutDescription(title,image){
        this.createGalleryBtn.click();
        this.titleInput.type(title);
        this.imagesInput.type(image);
        this.submitBtn2.click();
    }

    descriptionWith1001Char(title, description, image){
        this.createGalleryBtn.click();
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imagesInput.type(image);
        this.submitBtn2.click();
    }
    createWithWrongUrl(title,description,image){
        this.createGalleryBtn.click();
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imagesInput.type(image);
        this.submitBtn2.click();
    }
    allEmptyFields(submitBtn){
        this.createGalleryBtn.click();
        this.submitBtn2.click();
    }

    galleryWithTwoImages(title,description,image){
        this.createGalleryBtn.click();
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imagesInput.type(image);
        this.addImageBtn.click();
        this.newImgUrl.type(image);
        this.submitBtn2.click();

    }
}

export const createGallery = new CreateGallery();