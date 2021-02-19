import "./styles.css";
import { Formik, Field, Form } from "formik";
import { Box, Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { date, object, string } from "yup";
import {
  getLocaleDateFormat,
  parseDateString,
  getLocaleDateTimeFormat
} from "./date";

// const getLocaleDateFormat = () => {
//   const formatObj = new Intl.DateTimeFormat(navigator.language).formatToParts(
//     new Date()
//   );

//   return formatObj
//     .map((obj: any) => {
//       switch (obj.type) {
//         case "day":
//           return "dd";
//         case "month":
//           return "MM";
//         case "year":
//           return "yyyy";
//         default:
//           return obj.value;
//       }
//     })
//     .join("");
// };

// const getLocaleDateTimeFormat = () => {
//   return `${getLocaleDateFormat()} HH:mm`;
// };

// const parseDateString = (value: any, originalValue: any, format: string) => {
//   if (isDate(originalValue)) return originalValue;

//   if (!isNaN(Date.parse(originalValue))) {
//     return new Date(originalValue);
//   }

//   return parse(originalValue, format, new Date());
// };

const schema = object({
  lastName: string().required("Required"),
  dateOfBirth: date()
    .transform((value, originalValue) => {
      return parseDateString(value, originalValue, getLocaleDateFormat());
    })
    .required(),
  attended: date()
    .transform((value, originalValue) => {
      return parseDateString(value, originalValue, getLocaleDateTimeFormat());
    })
    .required()
    .max(new Date(), "Date time cannot be greater then today")
    .typeError(
      "Invalid date, must be a `date time` type in format - " +
        getLocaleDateTimeFormat().toLowerCase()
    )
});

export default function App() {
  console.log("dateformat", getLocaleDateFormat());
  console.log("datetimeformat", getLocaleDateTimeFormat());

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        validationSchema={schema}
        initialValues={{
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          attended: ""
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          console.log("values", values);
        }}
      >
        <Form>
          <Box paddingBottom={2}>
            <Field
              fullWidth
              component={TextField}
              id="firstName"
              name="firstName"
              placeholder="First Name"
            />
          </Box>

          <Box paddingBottom={2}>
            <Field
              fullWidth
              name="lastName"
              component={TextField}
              label="Last Name"
            />
          </Box>
          <Box paddingBottom={2}>
            <Field
              fullWidth
              name="dateOfBirth"
              component={TextField}
              type="date"
              label="Date of Birth"
              placeholder={getLocaleDateFormat().toLowerCase()}
            />
          </Box>
          <Box paddingBottom={2}>
            <Field
              fullWidth
              name="attended"
              component={TextField}
              type="datetime-local"
              label="Attended"
              placeholder={getLocaleDateTimeFormat().toLowerCase()}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
