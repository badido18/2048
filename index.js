const matrix2DInit5 = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,2,0,0,0],
    [0,0,0,2,0],
    [0,0,0,0,0]
]

class Matrix{

    constructor(init = matrix2DInit5){
        this.state = init
        this.dimen = init.length
        this.lastState = []
        this.free = []
        this.score = 0
    }

    fillRandomTiles(){
        // here there will be filling after action made
        // 2 or 4
        if (this.lastState == this.state){
            //Do nothing
        }
        else{
            this.lastState = this.state // save state
            let numb = 2 + (2 * Math.floor(Math.random() * 2) )
            this.updateFreeSpaces() 
            let sp = Math.floor(Math.random() * (this.free.length - 1))
            this.state[this.free[sp][0]][this.free[sp][1]] = numb
        }

    }

    updateFreeSpaces(){
        for(let x=0;x<this.dimen;x++){
            for(let y=0;y<this.dimen;y++){
                if(this.state[x][y] == 0){
                    this.free.push([x,y])
                }
            }
        }
    }

    shiftUpY(y){
        let shift = 0
        let x=0
        let prec = -1
        while(x<this.dimen){
            if(this.state[x][y] == 0){
                x++
            }
            else{
                if(prec == this.state[x][y]){
                    this.state[shift-1][y] *=2
                    this.score += this.state[shift-1][y]
                    shift--
                    prec = -1
                }else{
                    this.state[shift][y] = this.state[x][y]
                    prec = this.state[shift][y]
                }
                if(shift !=x)
                    this.state[x][y] = 0
                shift++
                x=shift
            }
        }
    }

    shiftDownY(y){
        let shift = this.dimen-1
        let x= this.dimen-1
        let prec = -1
        while(x>-1){
            if(this.state[x][y] == 0){
                x--
            }
            else{
                if(prec == this.state[x][y]){
                    this.state[shift+1][y] *=2
                    this.score += this.state[shift+1][y]
                    shift++
                    prec = -1
                }else{
                    this.state[shift][y] = this.state[x][y]
                    prec = this.state[shift][y]
                }
                if(shift !=x)
                    this.state[x][y] = 0
                shift--
                x=shift
            }
        }
    }

    shiftRightX(x){
        let shift = this.dimen-1
        let y= this.dimen-1
        let prec = -1
        while(y>-1){
            if(this.state[x][y] == 0){
                y--
            }
            else{
                if(prec == this.state[x][y]){
                    this.state[x][shift+1] *=2
                    this.score += this.state[x][shift+1]
                    shift++
                    prec = -1
                }else{
                    this.state[x][shift]= this.state[x][y]
                    prec = this.state[x][shift]
                }
                if(shift !=y)
                    this.state[x][y] = 0
                shift--
                y=shift
            }
        }
    }

    shiftLeftX(x){
        let shift = 0
        let y = 0
        let prec = -1
        while(y<this.dimen){
            if(this.state[x][y] == 0){
                y++
            }
            else{
                if(prec == this.state[x][y]){
                    this.state[x][shift-1] *=2
                    this.score += this.state[x][shift-1]
                    shift--
                    prec = -1
                }else{
                    this.state[x][shift]= this.state[x][y]
                    prec = this.state[x][shift]
                }
                if(shift !=y)
                    this.state[x][y] = 0
                shift++
                y=shift
            }
        }
    }

    moveUp(){
        for(let y=0;y<this.dimen;y++){
            this.shiftUpY(y)
        }
        this.fillRandomTiles()
    }

    moveDown(){
        for(let y=0;y<this.dimen;y++){
            this.shiftDownY(y)
        }
        this.fillRandomTiles()
    }

    moveLeft(){
        for(let x=0;x<this.dimen;x++){
            this.shiftLeftX(x)
        }
        this.fillRandomTiles()
    }

    moveRight(){
        for(let x=0;x<this.dimen;x++){
            this.shiftRightX(x)
        }
        this.fillRandomTiles()
    }
}

// Testing 

let TestingMatx = [
    [2,0,0,0,0],
    [2,8,16,0,0],
    [4,0,0,0,0],
    [0,8,16,0,0],
    [2,8,16,16,0]
]

var test = new Matrix(TestingMatx)

console.log(test.state)
test.moveLeft()
console.log(test.state)
test.moveLeft()
console.log(test.state)
test.moveLeft()
console.log(test.state)
console.log(test.score)