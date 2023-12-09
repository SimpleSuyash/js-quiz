# JavaScript Coding Quiz
A quiz about coding made using JavaScript, CSS and HTML only

## Description
The JavaScript Coding Quiz is a quiz where 5 questions are asked one after another, and result/feedback of the question is instantly displayed after. The first page of the program consists of the instructions/rules about the quiz. The rule of the quiz is:
* Time limit is 75 secconds
* The time left at the end of the quiz is the score
* Incorrect answers penalize the score/time by 15 seconds!
  
Screenshot showing the landing /instruction page
![image](./assets/image/landing-page.png)
* * *

Pressing the '*Start Quiz*' button starts the quiz. As soon as the quiz starts, the timer is started with 75 seconds limit and will reduce by a second per second.
Only one question is displayed at a time. The user has to click the correct button as his answer to the question. As soon as one of the four buttons (possible answers) is pressed, another question is displayed, and underneath it, the feedback/result of the user's response to the previous question is displayed either as '*Right!*' or '*Wrong!*'.
 
Screenshot showing the result/feedback
![image](./assets/image/question.png)
* * *

If the answer is correct, the timer will continue normally, however, if the answer is wrong, the timer will instantaneously be deducted by 15 seconds. So the quiz will end either when all the questions are answered, or when the time limit is reached i.e. the timer is finished (after 75 seconds have elapsed), also thereby effectively setting the score to 0, when it is the case, as at the end of the quiz, the time left on the clock is the user's score for that game. After the quiz is finished, the user is taken to another page where, the end of the quiz is displayed along with the user score for the game. The user can enter his initials and submit his current score. The user input for initials are validated against several criteria. The user must type in 2 letters only.

Screenshot showing the validation of initials
![image](./assets/image/result-page.png)
* * *

 



The user's recent score is only added to the record, if it is his/her first record or if it is higher than his/her previous high score. When the correct user input is submitted, the final page - leaderboard is displayed where all the users' high scores is displayed in a list.  In this page an user can clear the leaderboard. He/she can also go back to corresponding previous pages. Clicking the '*View high scores*' link will take the user to the leaderboard page. And, pressing the '*Go back*' button on the leaderboard page will take the user back to the page he/she was on. If the user had pressed the 'view high scores' button while in the middle of the quiz, the timer will be paused until the user returns back to the quiz from the leaderboard page, and when he/she is back, the timer will ressume, and the same question will displayed where he/she initially was.

Screenshot showing the leaderboard
![image](./assets/image/result-page.png)
* * *

All the events triggered by clicking the buttons or pressing the Enter key are, for simplicity sake, called with inline HTML 'Onclick' and "onkeyup' functions. The questions are dynamically created in the DOM, not hardcodded in the HTML. Similarly, the 'Right!' and 'Wrong!' responses are also dynamically created in this program. And, so is the order list of high scores in the leaderboard.

All the users data i.e. initials and scores are directly injected to the local storage, but unfortunately, in the process of learning, at the latter stage of this projet,  I realized that the local storage is shared by other programs/projects. So simply saving initial and score as key and value pair is not a good idea. Due to time limit, I left it as it is, and at this stage, as long as the local storage is not being shared or used by other programs, this program's data retrieving and saving should not be a problem. I highly recommend that the user data is stored in an array of user objects and then Jason stringfy and save in the local store. 

## Link to deployed application
[Link to JavaScript coding quiz challenge](https://simplesuyash.github.io/password-generator/)


