class User {
    constructor(name, surname,pets, books){
     this.name = name;
     this.surname = surname;
     this.pets = pets;
     this.books = books;
    }
 
    getFullName(){
     return `El nombre del usuario es: ${this.name } y el apellido es: ${this.surname}`;
    }
 
    addPets(pet){
     this.pets.push(pet)
     void this.pets;
    }
 
    countPets(){
     let count = this.pets.length;
      return count;
    }
 
    addBooks(title,author){
     this.books.push({
       Titulo: title,
       autor: author
     });
     void this.books;
    }
 
    getBookName(){
      let titleBook = [];
      for (let i = 0; i < this.books.length; i++) {
        titleBook.push(this.books[i].Titulo)
      }
      return `Titulos de libros: ${titleBook}`
    }
 }
 
 const user1 = new User('anto', 'battistoni',['perro', 'gato'],[{Titulo:'El señor de los anillos', autor:'Golding'},{Titulo:'Fundacion',autor:'Asimov'}]);
 
 console.log(user1.getFullName());
 console.log(user1.addPets('cobayo'));
 console.log(user1.countPets());
 console.log(user1.addBooks('Lo que el viento se llevo','Lorca'));
 console.log(user1.getBookName());

