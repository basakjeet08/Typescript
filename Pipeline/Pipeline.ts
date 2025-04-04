// Generic type for transformation
type Transformation<Input, Output> = (data: Input) => Output;

// Generic function
function createPipeline<InputType, OutputType>(
  validator: (data: unknown) => data is OutputType,
  ...transformations: Transformation<any, any>[]
): (initialData: InputType) => OutputType | Error {
  // This function returns the data after all the transformations
  const pipe = (initialData: InputType): OutputType | Error => {
    let result: any = initialData;

    // Transforming the input data and generating output data after each transformation
    transformations.forEach((transform) => (result = transform(result)));

    // validating the input data
    return !validator(result) ? new Error("Invalid Type") : result;
  };

  return pipe;
}

// Defining the Raw User data
type RawUser = {
  name: string;
  phoneNumber: string;
  locality: string;
  city: string;
  state: string;
};

// Defining the processed User data
type ProcessedUser = {
  name: string;
  email: string;
  phoneNumber: string;
  locality: string;
  city: string;
  state: string;
  address: string;
};

// Validator function
const isProcessedUser = (data: unknown): data is ProcessedUser => {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "email" in data &&
    "phoneNumber" in data &&
    "locality" in data &&
    "city" in data &&
    "state" in data &&
    "address" in data
  );
};

// Defining sample transformations
const firstPass: Transformation<RawUser, ProcessedUser> = (data) => {
  return { ...data, email: "", address: "" };
};

const secondPass: Transformation<ProcessedUser, ProcessedUser> = (data) => {
  return {
    ...data,
    email: data.name + "@gmail.com",
    address: data.locality + ", " + data.city + ", " + data.state,
  };
};

const pipeline = createPipeline<RawUser, ProcessedUser>(
  isProcessedUser,
  firstPass,
  secondPass
);

// Defining the raw user
const rawUser: RawUser = {
  name: "Anirban",
  phoneNumber: "123456",
  locality: "Street No. 2",
  city: "Kolkata",
  state: "West Bengal",
};

const result = pipeline(rawUser);
console.log(result);

export {};
