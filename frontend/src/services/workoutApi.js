
// const apiUrl = import.meta.env.VITE_API_URL;

// export const getAllWorkouts = async () => {
//   const res = await fetch(`${apiUrl}/workouts`);

//   if (!res.ok) {
//     return {
//       error: true,
//       message: `HTTP error! status: ${res.status}`

//     }
//   }

//   const result = res.json();

//   return result;
// }

// export const createWorkouts = async (data) => {
//    const res = await fetch(`${apiUrl}/workouts`,{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data) 
//     });

//   if (!res.ok) {
//     return {
//       error: true,
//       message: `HTTP error! status: ${res.status}`

//     }
//   }

//   const result = res.json();

//   return result;
// }


import { api } from "./axios";

export const getAllWorkouts = async () => {
  try {
    const res = await api.get("/workouts");
    return res.data;
  } catch (error) {
    return {
      error: true,
      message:
        error.response
          ? `HTTP error! status: ${error.response.status}`
          : "Network error",
    };
  }
};


export const createWorkouts = async (data) => {
  try {
    const res = await api.post("/workouts", data);
    return res.data;
  } catch (error) {
    return {
      error: true,
      message:
        error.response
          ? `HTTP error! status: ${error.response.status}`
          : "Network error",
    };
  }
};
