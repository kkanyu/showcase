// Kaylene-Nhu Nguyen @ Mohawk College, 2022
import {useForm} from 'react-hook-form';    // For structuring forms.
import {yupResolver} from '@hookform/resolvers/yup';    // For validation.
import * as yup from 'yup';   // For validation.
import { useNavigate } from 'react-router-dom';   // For redirecting.

export const Personal = ({formData, setFormData}) => {

  let navigate = useNavigate();

  // Health card length validation.
  yup.addMethod(yup.number, 'healthCardLength', function() {
    return this.test('length', 'Invalid health card number.', value => value.toString().length === 10)
  })

  // Health card validation (mod10).
  yup.addMethod(yup.number, 'healthCardVerification', function() {
    return this.test('validate', 'Invalid check digit. Invalid health card number.', value => {
     let payload = value.toString();
     //console.log(payload);
     let checkArray = [];   // Array to check for the verification.
     // Making the array for the checking validation.
     for (var i = 0; i < payload.length; i++) {
      value = payload.charAt(i);
      checkArray.push(parseInt(value));
     }
     //console.log(checkArray);

     for (var j = 8; j >= 0; j-=2) {
      checkArray[j] = checkArray[j] * 2;    // Multiply every other value by 2.

      if (checkArray[j] > 9) {    // If double-digit, sum the digits (or minus 9)
        checkArray[j] = checkArray[j] - 9;
        //console.log(checkArray[j]);
      }
     }

     var checkSum = 0;

     checkArray.map( (check) => {
      return checkSum += check;
     })

     var validate = checkSum % 10;
     if (validate === 0) {
      return true;
     }

    })
  })

  // Schema for the validation process.
  const schema = yup.object().shape({
    dob: yup.date().required().typeError("Please enter your birthdate."),
    hcn: yup.number().required().healthCardLength().typeError("Please enter your health card number.").healthCardVerification()
  }); 

  // For handling the form input.
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });   

  // For form validation; if valid, redirect to next view.
  const onSubmit = (data) => {
    console.log(formData)
    navigate("/summary");
  }

  // onChange sets value to change the formData array for output in the summary page.
  return (
    <>
      <div className="userInformation">
        <p>Please enter your personal information (all fields required):</p>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label for="dob">Date of Birth</label>
          <input type="date" name="dob" {...register("dob")} onChange={(event) => setFormData({...formData, dob: event.target.value})}></input>
          <p className="error_message">{errors.dob?.message}</p>
        </div>
        <div>
          <label for="healthCardNumber">Health Card #</label>
          <input type="text" name="healthCardNumber" maxlength="10" {...register("hcn")} onChange={(event) => setFormData({...formData, hcn: event.target.value})}></input>
          <p className="error_message">{errors.hcn?.message}</p>
        </div>
        <div>
          <label for="gender">Gender</label>
          <select name="gender" {...register("gender")} onChange={(event) => setFormData({...formData, gender: event.target.value})}>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="FTM">Transgender Male/Female-to-Male (FTM)</option>
            <option value="MTF">Transgender Female/Male-to-Female (MTF)</option>
            <option value="X">Genderqueer</option>
            <option value="OTHER">Other</option>
            <option value="UNDISCLOSED">Choose not to disclose</option>
          </select>
        </div>
        <input type="submit" value="Submit"></input>
        </form>

      </div>
    </>
  )
}

