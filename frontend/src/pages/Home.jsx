import React from "react";
import { use, Suspense } from 'react';
import Loading from "../components/loading";
import WorkoutDetail from "../components/WorkoutDetail";

const getAllWorkouts = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const res = await fetch(`${apiUrl}/workouts`);
  const response = res.json();

  return response;
}

const dataPromise = getAllWorkouts();

const Home = () => {
  const data = use(dataPromise)
  const workouts = data;

  return (
    <Suspense fallback={<Loading />}>
      <div className="home">
        <div className="workouts" >
          { workouts && workouts.map((workout) => {
            return(
              <WorkoutDetail workout={workout} />
            )
          })}
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
