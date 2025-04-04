function Logger(constructor: Function) {
  console.log("Inside Decorator");

  if (method instanceof ApiConfig) {
    method.setName("Anirban");
  }
}

@Logger
class ApiConfig {
  private name: string;

  constructor() {
    console.log("Inside Class");
  }

  setName(name: string) {
    this.name = name;
  }
}

const api: ApiConfig = new ApiConfig();
