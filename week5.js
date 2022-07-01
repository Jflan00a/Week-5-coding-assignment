class Animal {
    constructor(name, breed) {
        this.name = name;
        this.breed = breed;
    }

    describe() {
        return `${this.name} is a ${this.breed}.`;
    }
}

class Type {
    constructor(name) {
        this.name = name;
        this.animals = [];
    }

    addAnimal(animal){
        if (animal instanceof Animal) {
            this.animals.push(animal);
        }   else {
            throw new Error(`Argument is not an animal: ${animal}`)
        }
    }

    describe() {
     return `${this.name} has ${this.animals.length} animals.`   
    }
}

class Menu {
    constructor() {
        this.types = [];
        this.selectedType = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection){
                case '1':
                    this.createType();
                    break;
                case '2':
                    this.viewType();
                    break;
                case '3':
                    this.deleteType();
                    break;
                case '4':
                    this.displayType();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        
        alert("Goodbye!");
    }

    showMainMenuOptions(){
        return prompt(`
        0) exit
        1) create new type
        2) view type
        3) delete type
        4) dispay all types
        `);
    }
    showTypeMenuOptions(typeInfo) {
        return prompt(`
        0) back
        1) create animal
        2) delete animal
        
        ${typeInfo}`);
    }


    displayType() {
        let typeString = '';
        for (let i = 0; i < this.types.length; i++) {
            typeString += i + ') ' + this.types[i].name + `\n`;
        }
        alert(typeString);
    }

    createType() {
        let name = prompt('Enter name for new type:');
        this.types.push(new Type(name));
    }

    viewType() {
        let index = prompt('Enter the index of the type you wish to view');
        if (index > -1 && index < this.types.length) {
            this.selectedType = this.types[index];
            let description = 'Type Name: ' + this.selectedType.name + '\n';
            for (let i = 0; i < this.selectedType.animals.lenghth; i++) {
                description += i + '( ' + this.selectedType.animals[i].name + ' - ' + 
                this.selectedType.animals.breed + '\n';
            }
            let selection = this.showTypeMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createAnimal();
                    break;
                case '2':
                    this.deleteAnimal();
            }
        }
    }
    
    deleteType() {
        let index = prompt('Enter the index of the type you wish to delete:');
        if (index > -1 && index < this.types.length) {
            this.types.splice(index, 1);
        }
    }

    createAnimal() {
        let name = prompt("Enter name for new animal:");
        let breed = prompt("Enter breed for new animal:");
        this.selectedType.animals.push(new Animal(name, breed));
    }

    deleteAnimal() {
        let index = prompt('Enter the index of the animal you wish to delete:');
        if (index > -1 && index < this.selectedType.animals.lenghth) {
            this.selectedType.animals.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();