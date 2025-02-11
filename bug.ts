function compareObjects(obj1: any, obj2: any): boolean {
  // Check if the objects are the same object
  if (obj1 === obj2) {
    return true;
  }

  // Check if the objects have different constructors
  if (obj1.constructor !== obj2.constructor) {
    return false;
  }

  // Check if one of the objects is null or undefined
  if (obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined) {
    return obj1 === obj2; 
  }

  // Iterate over the properties of the first object
  for (let prop in obj1) {
    // Check if the property exists in both objects
    if (obj2.hasOwnProperty(prop)) {
      // Check if the values of the property are equal
      if (!compareObjects(obj1[prop], obj2[prop])) {
        return false;
      }
    } else {
      // If the property is not in the second object, return false
      return false;
    }
  }

  // Check if the second object has additional properties
  for (let prop in obj2) {
    if (!obj1.hasOwnProperty(prop)) {
      // If the property is not in the first object, return false
      return false;
    }
  }

  // If all checks pass, return true
  return true;
}

const obj1 = { a: 1, b: { c: 3 } };
const obj2 = { a: 1, b: { c: 3 } };
const obj3 = { a: 1, b: { c: 4 } };

console.log(compareObjects(obj1, obj2)); // true
console.log(compareObjects(obj1, obj3)); // false
console.log(compareObjects(obj1, null)); // false
console.log(compareObjects(null, null)); // true