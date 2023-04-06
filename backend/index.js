import { listen } from "./server.js";

if(process.env.NODE_ENV === "test"){
  listen(3000, () => {
    console.log(
      "Capstone Project Backend is running on http://localhost:3000"
    );
  });
  }else{
  listen(8080, () => {
    console.log(
      "Capstone Project Backend is running on http://localhost:8080"
    );
  });
}