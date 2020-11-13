export const detailTableColumn = [
  {
    value: "产品名称",
    name: "vc_fundname",
  },
  {
    value: "份额",
    name: "en_totalshare",
  },
  {
    value: "净值",
    name: "en_nav",
  },
  {
    value: "净值日期",
    name: "vc_navdate",
  },
  {
    value: "市值",
    name: "en_totalamt",
  },
  {
    value: "比例",
    name: "ratio",
  },
  {
    value: "资产类型",
    name: "a_assetype",
  },
  {
    value: "投资期限",
    name: "c_duration",
  },
  {
    value: "业绩基准",
    name: "c_benckmark",
  },
]
export const periodIncomeColumn = [
  { name: "vc_fundcode", value: "产品名称" },
  { name: "en_startamt", value: "期初市值" },
  { name: "en_input", value: "转入金额" },
  { name: "output", value: "流出金额" },
  { name: "en_endamt", value: "期末市值" },
  { name: "en_income", value: "区间投资收益" },
  { name: "en_incomerate", value: "区间收益率" },
  { name: "en_xirrrate", value: "年化回报率" },
]
export const hisIncomeColumn = [
  { name: "vc_fundcode", value: "产品名称" },
  { name: "startDate", value: "起始日期" },
  { name: "endDate", value: "退出日期" },
  { name: "en_input", value: "投资金额" },
  { name: "output", value: "分配金额" },
  { name: "en_income", value: "投资收益" },
  { name: "en_incomerate", value: "绝对回报率" },
  { name: "en_xirrrate", value: "年化回报率" },
]
export const dealRecordColumn = [
  { name: "fundName", value: "产品名称" },
  { name: "businFlag", value: "交易类型" },
  { name: "acceptDate", value: "交易日期" },
  { name: "confirmShare", value: "份额" },
  { name: "confirmDateNav", value: "净值" },
  { name: "confirmDate", value: "净值日期" },
  { name: "confirmAmount", value: "金额" },
]


export const periodAssetColumn = [
  { name: "allAsset", value: "总资产" },
  { name: "enNav", value: "净值型" },
  { name: "aAssetType", value: "类固收" },
  { name: "stockType", value: "股权类" },
]