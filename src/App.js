import React, {useEffect, useState} from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/Header';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import firebase from 'firebase';
import db from './firebase';
import { Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function createData(title, author, genre) {
  return { title, author, genre };
}

const data = [
  createData('1984', 'George Orwell', 'Fiction, Dystopian'),
  createData('1985', 'George Orwell', 'Fiction, Dystopian'),
];



function App() {

  useEffect(() => {
    db.collection("books").orderBy('timestamp').onSnapshot((snapshot) => {
        setBooks(
            snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        })));
        //setLoading(true);
    });
  }, []);
  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [comment, setComment] = useState("");
  const [books, setBooks] = useState([]);
  
  const sendBook = (e) => {
    e.preventDefault();
    db.collection("books").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        bookTitle: title,
        bookAuthor: author,
        bookGenre: genre,
        bookComment: comment,
    });
    setTitle("");
    setAuthor("");
    setGenre("");
    setComment("");
  };

  const classes = useStyles();
  return (
    <div className="app">
      <Header/>
      <div className="app__input">
                <h4>Finished another book?</h4>
                <form>
                    <input
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                    placeholder="Title" type="text"/>
                    <input
                    value={author}
                    onChange={(e) => {setAuthor(e.target.value)}}
                    placeholder="Author" type="text"/>
                    <input
                    value={genre}
                    onChange={(e) => {setGenre(e.target.value)}}
                    placeholder="Genre" type="text"/>
                    <input
                    className='app__input__big'
                    value={comment}
                    onChange={(e) => {setComment(e.target.value)}}
                    placeholder="Thoughts?" type="text"/>

                    <button onClick={sendBook}></button>
                </form>
      </div>
      <div className='app__accordion'>
      {books.map(({id, data: { timestamp, bookTitle, bookAuthor, bookGenre, bookComment } }) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}><h4><strong>{bookTitle}</strong></h4></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            <div className='app__accordion__info'>
              <div className='app__accordion__infoLeft'>
                  <small>Added: {new Date(timestamp?.toDate()).toLocaleString()}</small> <br></br>
                  <p><span><strong>Author: </strong></span>{bookAuthor}</p>
                  <p><span><strong>Genre : </strong></span>{bookGenre}</p>
                </div>
                <Card>
                <div className='app__accordion__infoRight'>
                  <CardContent>
                      <h3>Thoughts:</h3>
                      <p className='app__bookComment'>{bookComment}</p>
                  </CardContent>
                </div>
                </Card>
                
            </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
       ))} 
      </div>
      
    </div>
  );
}

export default App;

/*
{data.map((row) => (
          <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{row.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {row.author} 
              {row.genre}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
*/