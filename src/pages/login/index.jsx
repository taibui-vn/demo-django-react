import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import * as api from "../../api";
import { useAuth } from "../../auth";
import useSpinner from "../../utils/useSpinner";

const Login = () => {
  const auth = useAuth();
  const history = useHistory();
  const { setProcessing, component: spinner } = useSpinner();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    try {
      setProcessing(true);
      const response = await api.login(values);
      auth.setSession(response.data);
      history.replace("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Box display="flex" flex="1" justifyContent="center" marginTop={4}>
      <Box width="30%">
        <Grid
          component="form"
          container
          spacing={4}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item xs={12}>
            <Typography variant="h2">Login</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Email" {...register("email")} />
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
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              endIcon={spinner}
            >
              Log in
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              href="/register"
              fullWidth
              type="button"
              variant="contained"
              color="secondary"
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
