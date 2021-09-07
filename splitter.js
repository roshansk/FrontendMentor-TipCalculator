class Bill{
    
    constructor(bill,nop,tip,customTip){
        this.bill = bill;
        this.nop = nop;
        this.tip = tip;
        this.customTip = customTip;
    }

    
    calcualteBill(){
        console.log(this.bill , this.nop , this.tip , this.customTip);
        if(this.bill && this.nop && (this.tip || this.customTip)){
            const tipPerPerson = this.tip ? parseFloat( (this.bill*(this.tip/100)) / this.nop ).toFixed(2) : parseFloat(this.customTip/this.nop).toFixed(2);
            const billPerPerson = parseFloat( Number((this.bill/this.nop))  + Number(tipPerPerson)).toFixed(2);
            this.updateBill(billPerPerson,tipPerPerson);
        }
    }

    updateBill(bill,tip){
        document.querySelector('span#tip-amount').innerHTML = tip;
        document.querySelector('span#bill-amount').innerHTML = bill;
        document.querySelector(`#reset`).disabled = false; 
    }

    reset(){
        this.bill = 0;
        this.tip = 0;
        this.nop = 0;
        this.customTip = 0;
    }
}


const clearSelectedtip = () => {
    document.querySelectorAll(`input[type='button'].btn-tip`).forEach( btn => btn.classList.remove('tip-selected') );
}





window.onload = () => {
    
    const newBill = new Bill;
    //Bill input validation
    document.querySelector(`input[name='bill']`).addEventListener('input', (e) => {
        
        const bill = Number(e.target.value);
        
        if( e.target.value.length > 0 && bill < 1 ){
            e.target.parentNode.classList.add('error');
            e.target.classList.add('error');
        }
        else{
            e.target.classList.remove('error');
            e.target.parentNode.classList.remove('error');
            newBill.bill = bill;
            newBill.calcualteBill();
        }

    })

      //Tip input validation
      document.querySelector(`input[name='custom-tip']`).addEventListener('input', (e) => {
        
        clearSelectedtip();
        
        const tip = Number(e.target.value);

        if( e.target.value.length > 0 && tip < 1 ){
            e.target.parentNode.classList.add('error');
            e.target.classList.add('error');
        }
        else{
            e.target.classList.remove('error');
            e.target.parentNode.classList.remove('error');
            newBill.customTip = tip;
            newBill.tip = undefined;
            newBill.calcualteBill();
        }
    })

    //nop - Number of People Validation
    document.querySelector(`input[name='nop']`).addEventListener('input', (e) => {
        
        const nop = Number(e.target.value);

        if( e.target.value.length > 0 &&  nop < 1 ){
            e.target.parentNode.classList.add('error');
            e.target.classList.add('error');
        }
        else{
            e.target.classList.remove('error');
            e.target.parentNode.classList.remove('error');
            newBill.nop = nop;
            newBill.calcualteBill();
        }
    })


    //Tip buttons 
    document.querySelectorAll(`input[type='button'].btn-tip`).forEach( btn => btn.addEventListener('click', (e) => {
        clearSelectedtip();
        document.querySelector(`input[name='custom-tip']`).value="";
        e.target.classList.add('tip-selected');
        const tip = Number(e.target.value.substring(0,e.target.value.length - 1));
        newBill.tip = tip;
        newBill.customTip = undefined;
        newBill.calcualteBill();
    }) )

    //Reset
    document.querySelector(`#reset`).addEventListener('click', (e) => {
        document.querySelectorAll(`input[type='number']`).forEach( input => input.value = "" );
        document.querySelectorAll('.amount').forEach( amount => amount.innerHTML = "0.00" );
        document.querySelectorAll('.btn-tip').forEach( btn => btn.classList.remove('tip-selected'));
        newBill.reset();
        e.target.disabled = true;
    })

}