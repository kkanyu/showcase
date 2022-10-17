// Kaylene-Nhu Nguyen @ Mohawk College, 2022
import {useForm} from 'react-hook-form';    // For structuring forms.
import {yupResolver} from '@hookform/resolvers/yup';    // For validation.
import * as yup from 'yup';   // For validation.
import { useNavigate } from 'react-router-dom';   // For redirecting.

export const Home = ({formData, setFormData}) => {

  let navigate = useNavigate();

  // Schema for the validation process.
  const schema = yup.object().shape({
    firstName: yup.string().required("Your first name is required."),
    lastName: yup.string().required("Your last name is required.")
  }); 

  // For handling the form input.
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });   

  // For form validation; if valid, redirect to next view.
  const onNext = (data) => {
    console.log(formData);
    navigate("/personal");
  }

  // Returning the actual form on the homepage.
  return (
    <>
      <div className="userInformation">
        <p>Please enter your information (all fields required):</p>
        <form>
          <div>
            <label for="firstName">First Name</label>
            <input type="text" name="firstName" {...register("firstName")} onChange={(event) => setFormData({...formData, firstName: event.target.value})}></input>
            <p className="error_message">{errors.firstName?.message}</p>
          </div>
          <div>
            <label for="lastName">Last Name</label>
            <input type="text" name="lastName" {...register("lastName")} onChange={(event) => setFormData({...formData, lastName: event.target.value})}></input>
            <p className="error_message">{errors.lastName?.message}</p>
          </div>
          <button onClick={handleSubmit(onNext)}>Next</button>
        </form>
      </div>
    </>
  )
}

