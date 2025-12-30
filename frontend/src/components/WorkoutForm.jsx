import React from "react";
import { useForm } from "react-hook-form"
import Textbox from "./Textbox";
import SubmitButton from "./SubmitButton";
import ErrorMessage from "./ErrorMessage";
import { createWorkouts } from "../services/workoutApi";

  import { ToastContainer, toast } from 'react-toastify';


const WorkoutForm = ({handleRefresh}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()


  const onSubmit = async (data) => {
    const response = await createWorkouts(data);

    if(response.error) {
      toast.error(`Error creating workout: ${response.message}`);
    } else {

      toast.success(`Workout successfully created`);
      reset();
      return await handleRefresh();
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Add a new workout</h3>
      <label>Exercise title: {errors && errors.title && (
         <ErrorMessage message={errors.title.message} />
      )}</label>
      <Textbox type="text" placeholder="Enter title" {...register("title", { required: "This field is required." })} />
      <label>Load in KG: {errors && errors.load && (
        <ErrorMessage message={errors.load.message} />
      )}</label>
      <Textbox type="number" {...register("load", { required: "This field is required." })} />
      <label># of Reps: {errors && errors.reps && (
         <ErrorMessage message={errors.reps.message} />
      )}</label>
      <Textbox type="number" {...register("reps", { required: "This field is required." })} />
      <SubmitButton label="Add Workout" className="submitBtn" />
      <ToastContainer />
    </form>
  );
};

export default WorkoutForm;
