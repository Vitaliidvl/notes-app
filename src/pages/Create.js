import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined';
import { FormControlLabel, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup  from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { useHistory } from 'react-router-dom';

const useStyle = makeStyles({
  field: {
    marginBottom: 20,
    marginTop: 20,
    display: 'block',
  },
});

export default function Create() {
  const history = useHistory()
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();

    setTitleError(false);
    setDetailsError(false);

    // eslint-disable-next-line eqeqeq
    if (titleError == '') {
      setTitleError(true);
    }

    // eslint-disable-next-line eqeqeq
    if (detailsError == '') {
      setDetailsError(true);
    }

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({title, details, category})
      })
      .then(() => history.push('/'))
     }
  };

  const classes = useStyle();
  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Create a New Note
      </Typography>

      <form autoComplete="off" noValidate onSubmit={submitHandler}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Details"
          multiline
          rows={4}
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={detailsError}
        />

        <FormControl className={classes.field}>

        <FormLabel>Note Category</FormLabel>
        <RadioGroup value={category} onChange={e => setCategory(e.target.value)}> 
           <FormControlLabel value="money" control={<Radio/>} label="Money" />
           <FormControlLabel value="todos" control={<Radio/>} label="Todos" />
           <FormControlLabel value="reminder" control={<Radio/>} label="Reminder" />
           <FormControlLabel value="work" control={<Radio/>} label="Work" />
        </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightOutlinedIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
