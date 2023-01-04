import utils from "@/scripts/utilities/utils";
import { InsuranceByState } from '@/scripts/calculators/enums'
export class InitializeMortgageData{

    homePrice = 348000;
    downpayment = 20;
    downpaymentMoney = 20.00;
    downpaymentPercent = 20.00;
    isMoneyDownpayment = false;
    isPercentDownpayment = true;
    loanAmount = 313200;
    interestRate = 3.69;
    loanYears = 30;
    annualPropertyTax = 1900;
    annualInsurance = 1800;
    monthlyPmi = 0;
    monthlyHoa = 0;

    getMortgageObj(){
        let obj = {
            homePrice: this.homePrice,
            downpayment: this.downpayment,
            downpaymentMoney: this.downpaymentMoney,
            downpaymentPercent: this.downpaymentPercent,
            isMoneyDownpayment: this.isMoneyDownpayment,
            isPercentDownpayment: this.isPercentDownpayment,
            loanAmount: this.loanAmount,
            interestRate: this.interestRate,
            loanYears: this.loanYears,
            annualPropertyTax: this.annualPropertyTax,
            annualInsurance: this.annualInsurance,
            monthlyPmi: this.monthlyPmi,
            monthlyHoa: this.monthlyHoa
        }

        return obj;
    }

    setMortgageDataFromApi(apiData){
        
        if (apiData.length <= 0) return;
        const data = apiData[0];

        this.homePrice = utils.getDeepNumber(data, 'valuation.value', this.homePrice);
        this.annualPropertyTax = utils.getDeepNumber(data, 'assessments[0].tax_amount', this.annualPropertyTax);
        // set annual insurance amount for state
        let st = utils.getDeep(data, 'addresses[0].state', 'CO');
        this.annualInsurance = InsuranceByState[st];
    }
}