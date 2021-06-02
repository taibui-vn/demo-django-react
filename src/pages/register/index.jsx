import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import * as api from '../../api'
import useCircularProgress from '../../utils/useSpinner';

const Register = () => {
  const history = useHistory()
  const { register, handleSubmit } = useForm();
  const {setProcessing, component: spinner} = useCircularProgress()

  const onSubmit = async (values) => {
    try {
      setProcessing(true)
      const response = await api.register(values);
      alert(JSON.stringify(response.data))
      history.push('/login')
    } catch (error) {
      alert(error.message)
    } finally {
      setProcessing(false)
    } 
  };

  return (
    <Box
      display="flex"
      flex="1"
      justifyContent="center"
      marginTop={4}
    >
      <Box width="30%">
        <Grid
          component="form"
          container
          spacing={4}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item xs={12}>
            <Typography variant="h2">Register</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Email" {...register("email")} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First name"
              {...register("first_name")}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Last name" {...register("last_name")} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register("password")}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm password"
              type="password"
              {...register("password2")}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="secondary"
              endIcon={spinner}
            >
              Register
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              href="/login"
              fullWidth
              type="button"
              variant="contained"
              color="primary"
            >
              Log in
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Register;
