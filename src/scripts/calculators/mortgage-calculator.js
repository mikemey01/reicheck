export default class MortgageCalculator{

    homePrice = 348000;
    downpayment = 20;
    isMoneyDownpayment = false;
    isPercentDownpayment = true;
    loanAmount = 313000;
    interestRate = 4.25;
    loanYears = 30;
    annualPropertyTax = 2100;
    annualInsurance = 1800;
    monthlyPmi = 0;
    monthlyHoa = 0;

    // private
    monthlyAmount = 0;

    constructor(mortgage){
        this.homePrice = mortgage.homePrice;
        this.downpayment = mortgage.downpayment;
        this.isMoneyDownpayment = mortgage.isMoneyDownpayment;
        this.isPercentDownpayment = mortgage.isPercentDownpayment;
        this.loanAmount = mortgage.loanAmount;
        this.interestRate = mortgage.interestRate;
        this.loanYears = mortgage.loanYears > 100 ? 100 : mortgage.loanYears;
        this.annualPropertyTax = mortgage.annualPropertyTax;
        this.annualInsurance = mortgage.annualInsurance;
        this.monthlyPmi = mortgage.monthlyPmi;
        this.monthlyHoa = mortgage.monthlyHoa;
    }

    calculateMortgage(){
        this.monthlyAmount = this.calculateMonthlyPI();
        let monthlySchedule = this.calculatePaymentSchedule();
        let annualSchedule = this.calculateAnnualSchedule(monthlySchedule);
        let totalSchedule = this.calculateTotalRepayment(annualSchedule);
        let everythingObj = {
            monthlySchedule: monthlySchedule,
            annualSchedule: annualSchedule,
            totalSchedule: totalSchedule
        }
        
        return everythingObj;
    }

    calculateMonthlyPI(){
        let rate = this.interestRate;
        let periods = this.loanYears;
        let pv = this.loanAmount;

        rate = (rate / 100) / 12;
        periods = periods * 12;
        let pmt = (pv * rate * Math.pow((1 + rate), periods)) / (Math.pow((1 + rate), periods) - 1)

        return pmt;
    }

    getAdditionalMonthlyPayments(){
        let insurance = this.annualInsurance / 12;
        let hoa = this.monthlyHoa;
        let propertyTax = this.annualPropertyTax / 12;
        let pmi = this.monthlyPmi;
        let total = insurance + hoa + propertyTax + pmi;

        let monthlyObj = {
            monthlyInsurance: insurance,
            monthlyHoa: hoa,
            monthlyPropertyTax: propertyTax,
            monthlyPmi: pmi,
            monthlyTotal: total
        };

        return monthlyObj;
    }

    calculatePaymentSchedule(){
        let schedule = [];
        let periods = this.loanYears * 12;
        let rate = (this.interestRate / 100) / 12;

        // get monthlys
        var monthlyObj = this.getAdditionalMonthlyPayments();

        for (var i = 0; i < periods; i++) {
            let additional = 0;
            let interest = schedule.length === 0 ? this.loanAmount * rate : schedule[i - 1].PrincipalBalance * rate;
            let principal = this.monthlyAmount - interest;
            let balance = schedule.length === 0 ? this.loanAmount - principal - additional : schedule[i - 1].PrincipalBalance - principal;
            let totalMonthly = this.monthlyAmount + monthlyObj.monthlyTotal;
            let scheduleObj = {
                PaymentNumber: i+1,
                PaymentAmount: totalMonthly,
                InterestAmount: interest,
                PrincipalAmount: principal,
                PrincipalBalance: balance,
                additionalMonthlyAmounts: monthlyObj
            }
            schedule.push(scheduleObj);
        }

        return schedule;
    }

    calculateAnnualSchedule(schedule){
        let annualSchedule = [];
        let count = 1;

        for (var i = 1; i <= schedule.length; i += 12) {
            let filter = schedule.filter(item => item.PaymentNumber >= i && item.PaymentNumber < i + 12);
            let sumInterest = filter.reduce((sum, item) => sum + item.InterestAmount, 0).toFixed(2);
            let sumPrincipal = filter.reduce((sum, item) => sum + item.PrincipalAmount, 0).toFixed(2);
            let sum
            let totalRepayment = (Number(sumInterest) + Number(sumPrincipal)).toFixed(2);

            let yearObj = {
                year: count,
                interest: sumInterest,
                principal: sumPrincipal,

                total: totalRepayment
            }

            count++;
            annualSchedule.push(yearObj);
        }

        return annualSchedule;
    }

    calculateTotalRepayment(schedule){
        let total = schedule.reduce((sum, item) => sum + Number(item.total), 0).toFixed(2);
        return total;
    }

}