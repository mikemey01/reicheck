import utils from '@/scripts/utilities/utils';

export default class IncomeExpenseCalculator{
    incomeTotal = 0.0;
    incomeRent = 0;
    incomeOther = 0;
    expenseMortgage = 0;
    expenseInsurance = 0;
    expenseTax = 0;
    expenseMaintenance = 0;
    expenseOtherCost = 0;
    expenseVacancy = 0;
    expenseHoa = 0;
    expenseOperatingTotal = 0;
    expenseTotal = 0;

    cashFlow = 0;
    netOperatingIncome = 0;
    capRate = 0;
    irr = 0;
    cashOnCash = 0;
    totalProfit = 0;

    ie = {};
    mortgageSchedules = {};
    mortgageData = {};

    updateIEData(newData){
        this.ie = newData;
        this.reCalculate();
    }

    updateMortgageData(newData){
        this.mortgageData = newData;
        this.reCalculate();
    }

    updateMortageSchedules(newData){
        this.mortgageSchedules = newData;
        this.reCalculate();
    }

    reCalculate(){

        // check if we should recalc (all three objects are present).
        if(utils.isEmpty(this.mortgageData) || utils.isEmpty(this.ie) || utils.isEmpty(this.mortgageSchedules)){
            return;
        }

        if(!utils.isEmpty(this.ie)){
            this.incomeRent = this.ie.monthlyRent;
            this.incomeOther = this.ie.monthlyOtherIncome;
            this.incomeTotal = this.incomeRent + this.incomeOther;
            this.expenseInsurance = this.getMonthlyInsurance(this.ie.annualInsurance);
            this.expenseTax = this.getMonthlyTax(this.ie.annualPropertyTax);
            this.expenseMaintenance = this.getMonthlyMaintenace(this.ie.annualMaintenance);
            this.expenseOtherCost = this.getMonthlyOtherCosts(this.ie.annualOtherCosts);
            this.expenseVacancy = this.getVacancy(this.incomeRent, this.ie.vacancyRate);
            this.expenseHoa = this.getMonthlyHoa(this.ie.annualHoaFee);
            this.expenseOperatingTotal = this.expenseInsurance + this.expenseTax + this.expenseMaintenance + this.expenseOtherCost + this.expenseVacancy + this.expenseHoa;
            this.expenseTotal = this.expenseOperatingTotal;
            this.netOperatingIncome = this.incomeTotal - this.expenseOperatingTotal;
        }
        
        if(!utils.isEmpty(this.mortgageSchedules)){
            let mortgagePi = this.getMortgagePi(this.mortgageSchedules.monthlySchedule[0]);
            this.expenseMortgage = mortgagePi;
            this.expenseTotal += mortgagePi;
        }

        // cashflow is inclusive of mort p/i, NOI is not
        this.cashFlow = this.incomeTotal - this.expenseTotal;

        // cap rate
        this.capRate = this.getCapRate(this.netOperatingIncome, this.mortgageData.homePrice);

        // irr
        this.irr = this.getIrr().toFixed(2);

        // cash on cash
        this.cashOnCash = this.getCashOnCash().toFixed(2);

        // total profit
        this.totalProfit = this.getTotalProfit().toFixed(2);
    }

    getMortgagePi(monthlyMort){
        if(utils.isNullUndefinedEmpty(monthlyMort)) return 0;
        return monthlyMort.PrincipalAmount + monthlyMort.InterestAmount;
    }
    getMonthlyInsurance(annualInsurance){
        if (isNaN(annualInsurance))return 0;
        return annualInsurance / 12;
    }
    getMonthlyTax(annualTax){
        if (isNaN(annualTax)) return 0;
        return annualTax / 12;
    }
    getMonthlyMaintenace(maintenance){
        if(isNaN(maintenance)) return 0;
        return maintenance / 12;
    }
    getMonthlyOtherCosts(costs){
        if(isNaN(costs)) return 0;
        return costs / 12;
    }
    getVacancy(vac, rent){
        if(isNaN(rent)) rent = 0;
        if(isNaN(vac)) return 0;
        return rent * (vac/100);
    }
    getMonthlyHoa(hoa){
        if(isNaN(hoa)) return 0;
        return hoa / 12;
    }
    getCapRate(noi, price){
        if(isNaN(noi)) return 0;
        if(isNaN(price)) return 0;

        return (((noi*12) / price)*100).toFixed(2);
    }

    // irr
    getIrr(){
        // try to get NPV of $0
        const downpayment = Number(this.mortgageData.homePrice - this.mortgageData.loanAmount);
        const neededRepairs = Number(this.ie.neededRepairs);
        const initialClosingCosts = Number(this.ie.closingCosts);
        const sellingCosts = this.ie.costToSell;
        const balanceAtSell = this.getBalanceAtSell(this.mortgageSchedules.monthlySchedule);
        const finalAmount = this.ie.valueAtSell - balanceAtSell - sellingCosts;
        let initialOutflow = (downpayment+neededRepairs+initialClosingCosts) * -1;

        // console.log(`downpayment: ${downpayment}, needed repairs: ${neededRepairs}, initialClosing costs: ${initialClosingCosts}`);
        // console.log(`initial outflow: ${initialOutflow}, final amount: ${finalAmount}`);

        let currentnpv = 0;

        for(var i = 1; i < 100; i++){
            let testRate = i / 100;
            let yearlyPVTotal = this.calculateYearlyPV(testRate, finalAmount);
            currentnpv = initialOutflow + yearlyPVTotal;
            // if found a point that gets us negative,
            // start digging into decimals
            if(currentnpv < 0){
                let major = i - 1;
                // loop through .1, .2 etc..
                for (var j = major; j <= major+1; j += .1){
                    testRate = j / 100;
                    let yearlyPVTotal = this.calculateYearlyPV(testRate, finalAmount);
                    currentnpv = initialOutflow + yearlyPVTotal;
                    if(currentnpv < 0){
                        let irr = j - .1;
                        return irr;
                    }
                }
                return major+1;
            }
        }
        return 0;
    }

    getBalanceAtSell(monthlySchedule){
        const yearsHeld = this.ie.yearsHeld - 1;
        const index = yearsHeld * 12;
        if(monthlySchedule.length > index){
            return monthlySchedule[index].PrincipalBalance;
        }

        return 0;
    }

    calculateYearlyPV(rate, finalPayment){
        // should be cashflows/year
        const yearsHeld = this.ie.yearsHeld;
        const monthlyCashFlow = this.cashFlow;
        const yearlyCashFlow = monthlyCashFlow * 12;
        let totalAmount = 0;

        // loop through and calculate PV for all rental years
        for (var i = 0; i < yearsHeld; i++) {
            let currAmount = yearlyCashFlow / Math.pow((1 + rate), i + 1);
            totalAmount += currAmount;
        }

        totalAmount += finalPayment / Math.pow((1+rate), yearsHeld);

        return totalAmount;
    }

    getCashOnCash(){
        if(isNaN(this.netOperatingIncome)) return;
        const initialOutflow = this.getInitialCashOutflow();
        return (Number(this.netOperatingIncome) / initialOutflow)*100;
    }

    getInitialCashOutflow(){
        const downpayment = Number(this.mortgageData.homePrice - this.mortgageData.loanAmount);
        const neededRepairs = Number(this.ie.neededRepairs);
        const initialClosingCosts = Number(this.ie.closingCosts);
        const initialOutflow = (downpayment + neededRepairs + initialClosingCosts);

        return initialOutflow;
    }

    getTotalProfit(){
        // in
        const yearsHeld = this.ie.yearsHeld;
        const monthlyCashFlow = this.cashFlow;
        const yearlyCashFlow = monthlyCashFlow * 12;
        const totalCashFlow = yearlyCashFlow * yearsHeld;

        // out
        const sellingCosts = this.ie.costToSell;
        const balanceAtSell = this.getBalanceAtSell(this.mortgageSchedules.monthlySchedule);
        const finalAmount = this.ie.valueAtSell - balanceAtSell - sellingCosts;

        // initial out flow
        const initialOutflow = this.getInitialCashOutflow();

        let totalProfit = totalCashFlow + finalAmount - initialOutflow;

        return totalProfit;
    }

}