$(function(){
    var state = false;
    let payoff = {
        gross: 15000,
        hours: 150,
        wage: 100,
        tax: 2320,
        children: 0,
        disability: 0,
        student: 0,
        wageToGross: function () {
            return this.hours*this.wage;
        },
        netWage: function () {
            if((Math.ceil(this.gross/100)*15)<this.tax + parseInt(this.disability) + parseInt(this.student)){
                return this.gross - Math.ceil(this.gross*.065)-Math.ceil(this.gross*.045) + this.children;
            }
            else{
                return this.gross - (this.gross*.15) -(-this.tax - this.children - this.disability - this.student)-Math.ceil(this.gross*.065)-Math.ceil(this.gross*.045);
            }
        }
    }
    $('#unknown').toggle();
    $('#unknownButton').on("click", function () {
        $('#unknown').toggle();
        state=!state;
    });
    $('#calc').on("click", function () {
        if(!state){
            payoff.gross = $('#gross').val();
        }
        else{
            payoff.hours = $('#hours').val();
            payoff.wage = $('#wage').val();
            payoff.gross = payoff.wageToGross();
        }
        if($('#children').val() == 0){
            payoff.children = 0;
        }
        else if($('#children').val() == 1){
            payoff.children = 1267;
        }
        else if($('#children').val() == 2){
            payoff.children = 1267 + 1617;
        }
        else{
            payoff.children = 1267 + 1617 + (($('#children').val()-2)*2017);
        }
        payoff.disability = $('#disability').val();
        payoff.student = $('#no').prop("checked") ? $('#no').val() : $('#yes').val();
        $("#result").html(`Čistá mzda činí: ${payoff.netWage()}`)
    })
})