interface IKey {
    getSignature(): number;
}

interface IPerson {
    getKey(): IKey;
}

class Key implements IKey {
    private signature: number;
    constructor() {
        this.signature = Math.random()
    }

    getSignature(): number {
        return this.signature
    }
}

class Person implements IPerson {
    constructor(private key: Key) {
        this.key = key
    }
    getKey(): IKey {
        return this.key
    }
}

abstract class House {
    protected door: boolean = false;
    protected key: IKey;
    protected tenants: Person[] = [];

    constructor(key: IKey) {
        this.key = key
    }

    comeIn(person: Person): void {
        if(this.door) {
            this.tenants.push(person);
            console.log(`${person.getKey().getSignature()} came in.`);
        } else {
            console.log('Door is closed. Cannot come in.');
        }
    }
    abstract openDoor(key: IKey): void;
}

class MyHouse extends House {
    openDoor(key: IKey): void {
        if (key.getSignature() === this.key.getSignature()) {
            this.door = true;
            console.log('Door is now open.');
        } else {
            console.log('Wrong key. Door remains closed.');
        }
    }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);


export {};