var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Generic function
function createPipeline(validator) {
    var transformations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        transformations[_i - 1] = arguments[_i];
    }
    // This function returns the data after all the transformations
    var pipe = function (initialData) {
        var result = initialData;
        // Transforming the input data and generating output data after each transformation
        transformations.forEach(function (transform) { return (result = transform(result)); });
        // validating the input data
        return !validator(result) ? new Error("Invalid Type") : result;
    };
    return pipe;
}
// Validator function
var isProcessedUser = function (data) {
    return (typeof data === "object" &&
        data !== null &&
        "name" in data &&
        "email" in data &&
        "phoneNumber" in data &&
        "locality" in data &&
        "city" in data &&
        "state" in data &&
        "address" in data);
};
// Defining sample transformations
var firstPass = function (data) {
    return __assign(__assign({}, data), { email: "", address: "" });
};
var secondPass = function (data) {
    return __assign(__assign({}, data), { email: data.name + "@gmail.com", address: data.locality + " " + data.city + " " + data.state });
};
var pipeline = createPipeline(isProcessedUser, firstPass, secondPass);
// Defining the raw user
var rawUser = {
    name: "Anirban",
    phoneNumber: "123456",
    locality: "Street No. 2",
    city: "Kolkata",
    state: "West Bengal",
};
var result = pipeline(rawUser);
console.log(result);
