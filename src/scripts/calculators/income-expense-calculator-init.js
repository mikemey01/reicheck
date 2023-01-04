import utils from '../utilities/utils'

export class InitializeIncomeExpense{
    purchasePrice = 0;
    closingCosts = 0;
    neededRepairs = 0;
    afterRehabValue = 0;
    annualAppreciation = 1;
    yearsHeld = 20;
    costToSell = 0;
    monthlyRent = 2600;
    monthlyOtherIncome = 0;
    vacancyRate = 3;
    monthlyManagementFee = 0;
    annualPropertyTax = 0;
    annualInsurance = 0;
    annualHoaFee = 0;
    annualMaintenance = 200;
    annualOtherCosts = 0;
    valueAtSell = 0;

    constructor(incomeExpense){
        if(!utils.isEmpty(incomeExpense)){
            this.purchasePrice = incomeExpense.purchasePrice;
            this.closingCosts = incomeExpense.closingCosts;
            this.neededRepairs = incomeExpense.neededRepairs;
            this.afterRehabValue = incomeExpense.afterRehabValue;
            this.annualAppreciation = incomeExpense.annualAppreciation;
            this.yearsHeld = incomeExpense.yearsHeld;
            this.costToSell = incomeExpense.costToSell;
            this.monthlyRent = incomeExpense.monthlyRent;
            this.monthlyOtherIncome = incomeExpense.monthlyOtherIncome;
            this.vacancyRate = incomeExpense.vacancyRate;
            this.monthlyManagementFee = incomeExpense.monthlyManagementFee;
            this.annualPropertyTax = incomeExpense.annualPropertyTax;
            this.annualInsurance = incomeExpense.annualInsurance;
            this.annualHoaFee = incomeExpense.annualHoaFee;
            this.annualMaintenance = incomeExpense.annualMaintenance;
            this.annualOtherCosts = incomeExpense.annualOtherCosts;
            this.valueAtSell = incomeExpense.valueAtSell;
        }
    }

    getIncomeExpenseObj(){
        let obj = {
            purchasePrice: this.purchasePrice,
            closingCosts: this.closingCosts,
            neededRepairs: this.neededRepairs,
            afterRehabValue: this.afterRehabValue,
            annualAppreciation: this.annualAppreciation,
            yearsHeld: this.yearsHeld,
            costToSell: this.costToSell,
            monthlyRent: this.monthlyRent,
            monthlyOtherIncome: this.monthlyOtherIncome,
            vacancyRate: this.vacancyRate,
            monthlyManagementFee: this.monthlyManagementFee,
            annualPropertyTax: this.annualPropertyTax,
            annualInsurance: this.annualInsurance,
            annualHoaFee: this.annualHoaFee,
            annualMaintenance: this.annualMaintenance,
            annualOtherCosts: this.annualOtherCosts,
            valueAtSell: this.valueAtSell
        };

        return obj;
    }

    setMortgageData(mortgage){
        this.purchasePrice = mortgage.homePrice;
        this.closingCosts = (mortgage.homePrice * .02).toFixed(2);
        this.annualPropertyTax = mortgage.annualPropertyTax;
        this.annualInsurance = mortgage.annualInsurance;
        this.annualHoaFee = mortgage.annualHoaFee;
        this.valueAtSell = this.setValueAtSell(mortgage.homePrice);
        this.costToSell = (this.valueAtSell * .06).toFixed(2);
    }

    setValueAtSell(homePrice){
        const appreciation = this.annualAppreciation / 100;
        const yearsHeld = this.yearsHeld;
        let appreciatedValue = homePrice;
        for(var i = 0; i < yearsHeld; i++){
            appreciatedValue = appreciatedValue + (appreciatedValue * appreciation);
        }

        return appreciatedValue;
    }

    setIncomeExpenseDataFromApi(apiData){
        this.monthlyRent = utils.getDeepNumber(apiData, 'rent', 2700);
    }
}