// repurposed from material ui documentation
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxHeight: 650
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  Typography: {
    marginBottom: 12,
  },
  link: {
    strokeWidth: 2
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          COVID-19 in
        </Typography>
        <Typography variant="h5">
          {props.data.county}
        </Typography>
        <Typography>
          {props.data.date}
        </Typography>
        <br/>
        <Typography variant="h6">
          Today
        </Typography>
        <Typography>
          + {props.data.newcountconfirmed} new cases
        </Typography>
        <Typography>
          + {props.data.newcountdeaths} new deaths
        </Typography>
        <br/>
        <Typography variant="h6">
          Totals
        </Typography>
        <Typography>
          {Number(props.data.totalcountconfirmed)} total cases (current and recovered)
        </Typography>
        <Typography>
          {Number(props.data.totalcountdeaths)} total deaths
        </Typography>
      </CardContent>
      <CardActions className={classes.link}>
        <Typography variant="subtitle1">
          <p>Find out more on the state government's website</p>
          <a href="https://covid19.ca.gov/">https://covid19.ca.gov/</a>
        </Typography>
      </CardActions>
    </Card>
  );
}
