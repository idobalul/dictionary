# Dictionary

## Intro
This is a dictionary app that uses dynamoDB. The database don't contains all the words in the world so when you search a word you might not find it.  

## How to run the app
1. Clone or fort this repo
2. Open the repo in your IDE of choice
3. Enter the following commands int the terminal: 
    ```
    cd back
    npm i
    npm start
    ```
4. Now the server runs on 'localhost:8080' and you can use the app there (the front is statically served from the server)

## How to use
After you run the app you can enter http://localhost:8080 and you will see the app's home page.
![image of the home page](/assets/home-page.png "Home Page")  
<br>  

You can search a words in general or search a word with a specific part of speech.  
General search:
![image of search by word](/assets/word.png "localhost:8080/food")  
<br>  
Search with part of speech:
![image of word with part of speech](/assets/word-with-pos.png "localhost:8080/food/n.")  
<br>  
  
You can also random a word by part of speech by using the bottom inputs at the home page.  
![image of random word by POS](/assets/random-by-pos.png "localhost:8080/part-of-speech/noun")  
<br>  
Or if you want a random word that starts in se specific letter it will look like this:  
![image of random word by POS with letter](/assets/random-with-letter.png "localhost:8080/part-of-speech/verb?letter=f")

Link to the site: http://dictionary-app-idobalul.s3-website.eu-central-1.amazonaws.com