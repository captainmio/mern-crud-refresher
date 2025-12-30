import React, { useState } from "react";
import { use, Suspense } from 'react';
import Loading from "../components/loading";
import WorkoutDetail from "../components/WorkoutDetail";
import WorkoutForm from "../components/WorkoutForm";
import { getAllWorkouts } from "../services/workoutApi";

const dataPromise = getAllWorkouts();

const Home = () => {
  const [workouts, setWorkouts] = useState(dataPromise);
  const data = use(workouts)

  const refetch = async () => {
    setWorkouts(getAllWorkouts());
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="home">
        <div className="workouts" >
          { data && data.map((workout) => {
            return(
              <WorkoutDetail workout={workout} key={workout._id} />
            )
          })}
        </div>
        <WorkoutForm handleRefresh={refetch}/>
      </div>
    </Suspense>
  );
};

export default Home;
