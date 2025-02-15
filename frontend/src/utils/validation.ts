export const validateFormField = (name: string, value: string): string => {
  switch (name) {
    case "firstname":
    case "lastname":
      return /^[A-Za-z]{4,}$/.test(value) ? "" : "Must be at least 4 letters";
    case "phonenumber":
      return /^[0-9]{10}$/.test(value) ? "" : "Must be a 10-digit number";
    case "email":
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        ? ""
        : "Invalid email format";
    case "password":
      return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
        ? ""
        : "Min 8 chars, 1 letter & 1 number";
    case "role":
      return value ? "" : "Role is required";
    default:
      return "";
  }
};
