<template>
  <el-table
    class="table-limit"
    :data="tableData"
    :showSummary="showSummary"
    :summary-method="showSummary ? getSummaries : null"
  >
    <el-table-column
      v-for="(item, index) in tableColumns"
      :key="index"
      :prop="item.name"
      :label="item.value"
    >
      <template slot-scope="scope">
        {{(item.name === 'acceptDate' || item.name === 'confirmDate' || item.name === 'vc_navdate' || item.name === 'startDate' || item.name === 'endDate') ? timeFormatYMD(scope.row[item.name]) : (item.name === 'ratio' || item.name === 'c_benckmark') ? (scope.row[item.name] ? Number(scope.row[item.name]*100).toFixed(1) + '%' : '') : (item.name === 'businFlag') ? (buy.includes(scope.row[item.name]) ? '买入' : sale.includes(scope.row[item.name]) ? '卖出' : '其他') : scope.row[item.name]}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "pdf-table",
  props: {
    tableData: Array,
    showSummary: {
      type: Boolean,
      default: false
    },
    tableColumns: Array
  },
  data () {
    return {
      buy: ['020', '022', 'C05', '039', 'C06'],
      sale: ['024', 'C07', 'C08', '142']
    }
  },
  methods: {
    timeFormatYMD(value) {
      //20201102
      if (!value) {
        return "--";
      }
      const year = value.slice(0, 4)
      const month = value.slice(4, 6)
      const day = value.slice(6, value.length + 1)
      return `${year}-${month}-${day}`;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        let strOut = []
        const values = data.map(item => {
          // let name = ''
          // let num = 0
          if (column.property === 'endDate' || column.property === 'startDate' || column.property === 'c_moneytype') {
            return ''
          }
          // else {
          //   const str = item[column.property]
          //   if (str && str !== 0 && str !== '0' && str !== '0%') {
          //     strOut.push(str)
          //   }
          //   if (typeof str === 'string' && str.includes(',')) {
          //     name = str.replace(/,/gi, '')
          //     num = Number(name)
          //   } else if (typeof str === 'string' && str.includes('%')) {
          //     name = str.replace(/%/gi, '')
          //     num = Number(name)
          //   } else {
          //     num = 0
          //   }
          // }
          return item[column.property]
        });
        console.log(values)
        if (values.every(value => typeof value === "number")) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += '';
          // const s = strOut.length ? strOut[0] : ''
          // if (typeof s === 'string' && s.includes(',')) {
          //   sums[index] = sums[index].replace(/(?=(\B\d{3})+$)/g, ',')
          //   sums[index] = sums[index] + '.00'
          // } else {
          //   sums[index] = sums[index] === '0' ? '0' : sums[index] + '%'
          // }
        } else {
          sums[index] = '--';
        }
      });

      return sums;
    }
  }
}
</script>

<style scoped>

</style>
