function Person() {
  this.fullName = "Yaakov";
  this.fav = "Cookies";

  this.describe = function () {
    console.log('this is: ', this);
    console.log(this.fullName + " likes " + this.fav);
  };
}

var yaakov = new Person();
yaakov.describe();

// With the below code, we actually took the method out of its context, therefore, the below code will have its context became the window
var describe = yaakov.describe;
describe();

// To solve the out of cotext, we can use the javascript solution which is the call method and invoke the call method with an object, so the 'this' variable that is in the Person function will be pointing to that object
describe.call(yaakov);
