const ramdomNum = () =>{
   return Math.random() * 2
//    return 350
}

const periodPopDetailData = []
const periodIncomeData = []
const hisIncomeData = []
const dealRecordData = []

for(let n = 0;n < ramdomNum();n ++){
    periodPopDetailData.push( {'vc_fundname': n + '--yer1111'})
}
for(let n = 0;n < ramdomNum();n ++){
    periodIncomeData.push( {'vc_fundcode': n + '--sdaesw222'})
}

for(let n = 0;n < ramdomNum();n ++){
    hisIncomeData.push( {'vc_fundcode': n + '--yef3333'})
}

for(let n = 0;n < ramdomNum();n ++){
    dealRecordData.push( {'fundName': n + '--rygr4444'})
}




export const periodPopDetail = periodPopDetailData
export const periodIncome = periodIncomeData
export const hisIncome = hisIncomeData
export const dealRecord = dealRecordData
