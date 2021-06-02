import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useEffect, useState, useCallback } from "react";
import * as api from "../../api";
import { useAuth } from "../../auth";
import useSpinner from "../../utils/useSpinner";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Home = () => {
  const classes = useStyles();
  const auth = useAuth();

  const onLogOut = () => {
    auth.setSession(null);
  };

  const [productList, setProductList] = useState([]);
  const { setProcessing, component: spinner } = useSpinner();

  const getProductList = useCallback(async () => {
    try {
      setProcessing(true);
      const response = await api.listProduct();
      setProductList(response.data);
    } catch (error) {
      alert(error.message);
    } finally {
      setProcessing(false);
    }
  }, [setProcessing]);

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  console.log({ productList });

  return (
    <Box padding={4}>
      <Box marginBottom={3} display="flex" justifyContent="space-between">
        <Typography variant={"h2"}>Home</Typography>
        <Button startIcon={<ExitToAppIcon />} onClick={onLogOut}>
          Log out
        </Button>
      </Box>
      <Grid container spacing={4}>
        {spinner ? (
          <Grid item>{spinner}</Grid>
        ) : (
          productList.map(({ id, image, content, description, price }) => {
            return (
              <Grid item xs={3} key={id}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={image}
                      title={content}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {content}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      ${price}
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default Home;
