var app = angular.module("HangmanApp",[]);

app.controller("GameController",['$scope','$timeout',function($scope, $timeout){
    $scope.demo = "somestring";

    var words = ["rat", "cat", "mat", "network", "maya","soya", "ball"];

    $scope.incorrectLettersChosen=[];
    $scope.correctLettersChosen=[];

    var guesses = 6;
    $scope.guesses = guesses;
    $scope.displayWord = '';
    $scope.input = {
        letter:''
    }

    var selectRandomWord = function(){
        console.log("selectRandomWord called...");
        
        console.log(words.length);
        
        var index = Math.round(Math.random()*(words.length-1));
        
        console.log(index);
        console.log(words[index]);

        return words[index];
    }

    var newGame = function(){
        //starting new game 
        console.log("new game called....")
        
        $scope.incorrectLettersChosen =[];
        $scope.correctLettersChosen=[];
        var guesses = 6;
        $scope.guesses = guesses;
        $scope.displayWord = '';
        
        selectedWord = selectRandomWord();
        console.log(selectedWord);

        var tempDisplayWord = '';
        for(var i=0;i<selectedWord.length;i++){
            tempDisplayWord += '*'
        }
        $scope.displayWord = tempDisplayWord;

    }

    $scope.letterChosen = function(){
        console.log("letters chosen calle");
      
        //check in earlier correct letters
        for(var i=0;i< $scope.correctLettersChosen.length;i++){
            if($scope.correctLettersChosen[i].toLowerCase()== $scope.input.letter.toLowerCase()){
                $scope.input.letter = '';
                return;
            }
        }

        //check in earlier incorrect letters
        for(var i=0;i< $scope.incorrectLettersChosen.length;i++){
            if($scope.incorrectLettersChosen[i].toLowerCase()== $scope.input.letter.toLowerCase()){
                $scope.input.letter = '';
                return;
            }
        }

        //check if correct and display letter in selected word
        var correct = false;
        for (var i=0;i<selectedWord.length;i++){
            if(selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()){
                $scope.displayWord = $scope.displayWord.slice(0,i)+$scope.input.letter.toLowerCase()+$scope.displayWord.slice(i+1);
                correct = true;
            }
        }
        if(correct){
            $scope.correctLettersChosen.push($scope.input.letter.toLowerCase());
        }else {
            $scope.guesses--;
            $scope.incorrectLettersChosen.push($scope.input.letter.toLowerCase());
        }
        $scope.input.letter = "";

        if($scope.guesses==0){
            alert("you lost !");
            $timeout(function(){
                newGame();
            }, 1000);
        }

        if($scope.displayWord.indexOf("*") == -1){
            alert("You Won !");
            $timeout(function(){
                newGame();
            }, 1000);
        }


    }

    newGame();

}]);