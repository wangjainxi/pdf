const ramdomNum = () =>{
    return Math.random() * 3
 //    return 350
 }

 let periodPopDetailData = []
 let periodIncomeData = []
 let hisIncomeData = []
 let dealRecordData = []

 for(let n = 1;n < ramdomNum();n ++){
     periodPopDetailData.push( {'vc_fundname': n  + '--yer1111'})
 }
 for(let n = 1;n < ramdomNum();n ++){
     periodIncomeData.push( {'vc_fundcode': n  + '--sdaesw222'})
 }

 for(let n = 1;n <  ramdomNum();n ++){
     hisIncomeData.push( {'vc_fundcode': n + '--yef3333'})
 }

 for(let n = 1;n <  ramdomNum();n ++){
     dealRecordData.push( {'fundName': n  + '--rygr4444'})
 }


//  for(let n = 1;n < 15;n ++){
//     periodPopDetailData.push( {'vc_fundname': n  + '--yer1111'})
// }
// for(let n = 1;n <62;n ++){
//     periodIncomeData.push( {'vc_fundcode': n  + '--sdaesw222'})
// }

// for(let n = 1;n < 38;n ++){
//     hisIncomeData.push( {'vc_fundcode': n + '--yef3333'})
// }

// for(let n = 1;n < 99;n ++){
//     dealRecordData.push( {'fundName': n  + '--rygr4444'})
// }



 export const periodPopDetail = periodPopDetailData
 export const periodIncome = periodIncomeData
 export const hisIncome = hisIncomeData
 export const dealRecord = dealRecordData
