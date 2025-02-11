function compareObjects(obj1: any, obj2: any, visited = new WeakSet()): boolean {
  // Check if the objects are the same object
  if (obj1 === obj2) {
    return true;
  }

  // Check for circular references
  if (visited.has(obj1) || visited.has(obj2)) {
    return false; 
  }

  // Check if the objects have different constructors
  if (obj1?.constructor !== obj2?.constructor) {
    return false;
  }

  // Check if one of the objects is null or undefined
  if (obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined) {
    return obj1 === obj2; 
  }

  visited.add(obj1);
  visited.add(obj2);

  // Iterate over the properties of the first object
  for (let prop in obj1) {
    if (obj2.hasOwnProperty(prop)) {
      if (!compareObjects(obj1[prop], obj2[prop], visited)) {
        return false;
      }
    } else {
      return false;
    }
  }

  // Check if the second object has additional properties
  for (let prop in obj2) {
    if (!obj1.hasOwnProperty(prop)) {
      return false;
    }
  }

  return true;
}

const obj1 = { a: 1, b: { c: 3 } };
const obj2 = { a: 1, b: { c: 3 } };
const obj3 = { a: 1, b: { c: 4 } };
const circularObj = {};
circularObj.self = circularObj;

console.log(compareObjects(obj1, obj2)); // true
console.log(compareObjects(obj1, obj3)); // false
console.log(compareObjects(obj1, null)); // false
console.log(compareObjects(null, null)); // true
console.log(compareObjects(circularObj, circularObj)); //false