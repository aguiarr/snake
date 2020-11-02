window.onload = function(){
    //get HTML element 
    var $stage = document.getElementById('stage');

    //get the canvas context
    var $context = stage.getContext('2d');
    document.addEventListener("keydown", keyPush);

    //call a function at a time interval
    setInterval(game, 80);

    //set the snake velocity
    velocity = 80;

    //show the velocity in the HTML elemnet
    document.getElementById('level').innerHTML = 80;


    var score = 0;
    const vel = 1;
    var velocityX = velocityY = 0;
    //set the position of snake in the canvas
    var positionX = positionY = 0;
    var size = 15;
    var qnt = 33;

    //set the position of the fuit in the canvas
    var fruitX = fruitY = 0;
    //snake size
    var trail = [];
    //tail size
    tail = 5;

    //fruit colors
    var colors = ['red', 'blue', 'white', 'green', 'purple', 'orange','yellow','grey','black','pink'];

    //generate the random color
    function colorsRandom(){
        let i  = Math.floor(Math.random()*6);
        return colors[i];
    }

    //make the snake back on otherside canvas whem she hits a side
    function game(){
        positionX += velocityX;
        positionY += velocityY;

        if(positionX < 0){
            positionX = qnt -1;
        }
        if(positionX > qnt -1){
            positionX = 0;
        }
        if(positionY < 0){
            positionY = qnt -1;
        }
        if(positionY > qnt -1){
            positionY = 0;
        }


        //set the white color on snake
        $context.fillStyle = 'white';
        $context.fillRect(0,0, $stage.width, $stage.height);


        let color = colorsRandom();
        //set the random colors on the fruit
        $context.fillStyle = color;
        $context.fillRect(fruitX*size, fruitY*size, size, size);

        //set the canvas color
        $context.fillStyle = 'black';

        for(let i = 0; i < trail.length; i++){
            $context.fillRect(trail[i].x*size, trail[i].y*size , size, size);

            //reset the velocity and size from snake
            if(trail[i].x == positionX && trail[i].y == positionY){
                velocityX = velocityY = 0;
                tail = 5;
                score = 0;
                velocity = 80;

                //reset the values of the HTML elements
                document.getElementById('score').innerHTML = score;
                document.getElementById('level').innerHTML = velocity;
            }
        }

        trail.push({x:positionX, y:positionY});
        while(trail.length > tail){
            trail.shift();
        }

        
        if(fruitX == positionX && fruitY == positionY){
            //add more size to snake
            tail++;
            //change the fruit position in a random position
            fruitX = Math.floor(Math.random()*qnt);
            fruitY = Math.floor(Math.random()*qnt);
            //add one more score point
            score++;
            //add one more velocity point
            velocity++;

            //set values on HTML elements
            document.getElementById('score').innerHTML = score;
            document.getElementById('level').innerHTML = velocity;
            console.log(score);
            console.log(velocity);
            
        }
    }

    function keyPush(e){
        switch(e.keyCode){

            //right 
            case 37:
                if (velocityY == 0 && velocityX == vel) {
                    return;
                }else{
                    velocityX = -vel;
                    velocityY = 0;
                 }
                break

            //top 
            case 38:
                if (velocityY == vel && velocityX == 0) {
                    return;
                }else{
                     velocityX = 0;
                     velocityY = -vel;
                }
                break

            //left 
            case 39:
                if (velocityY == 0 && velocityX == -vel) {
                    return;
                }
                else{
                    velocityX = vel;
                    velocityY = 0;
                }
                break

            //bottom 
            case 40:
                if(velocityY == -vel && velocityX == 0){
                    return;
                }else{
                    velocityX = 0;
                    velocityY = vel;    
                }
                break

        }
    }
}