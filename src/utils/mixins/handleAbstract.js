export const handleAbstractDetail = {
  methods: {
    handleAbstractDetail (datas, dataAbstractUI) {
      let abstractData = {
        'title': {
          'value': '',
          'hide': '',
        },
        'stressOne': {
          'name': '',
          'value': '',
          'hide': ''
        },
        'stressTwo': {
          'name': '',
          'value': '',
          'hide': ''
        },
        'assistOne': {
          'name': '',
          'value': '',
          'hide': ''
        },
        'assistTwo': {
          'name': '',
          'value': '',
          'hide': ''
        },
        'assistThree': {
          'name': '',
          'value': '',
          'hide': ''
        },
        "other": {
          'stateStr': '',
          'state': '',
          'labels': [],
          'summer': ''
        }
      }
      for (let i = 0; i < dataAbstractUI.length; i++) {
        let item = dataAbstractUI[i]
        if (item.fieldCode === 'title') { // 标题
          abstractData.title.value = datas[item.fieldKey + 'Str'] || datas[item.fieldKey]
          abstractData.title.hide = item.hide
        }
        if (item.fieldCode === 'stress_one' || item.fieldCode === 'stress') { // 强调字段1
          abstractData.stressOne.name = item.fieldName
          abstractData.stressOne.value = datas[item.fieldKey + 'Str'] || datas[item.fieldKey]
          abstractData.stressOne.hide = item.hide
        }
        if (item.fieldCode === 'stress_two') { // 强调字段2
          abstractData.stressTwo.name = item.fieldName
          abstractData.stressTwo.value = datas[item.fieldKey + 'Str'] || datas[item.fieldKey]
          abstractData.stressTwo.hide = item.hide
        }
        if (item.fieldCode === 'assist_one' && datas[item.fieldKey]) { // 辅助字段1
          abstractData.other.labels[0] = datas[item.fieldKey + 'Str'] || datas[item.fieldKey]
          abstractData.assistOne.name = item.fieldName
          abstractData.assistOne.value = datas[item.fieldKey + 'Str'] || datas[item.fieldKey]
          abstractData.assistOne.hide = item.hide
        }
        if (item.fieldCode === 'assist_two' && datas[item.fieldKey]) { // 辅助字段2
          abstractData.other.labels[1] = datas[item.fieldKey + 'Str'] || datas[item.fieldKey]
          abstractData.assistTwo.name = item.fieldName
          abstractData.assistTwo.value = datas[item.fieldKey + 'Str'] || datas[item.fieldKey]
          abstractData.assistTwo.hide = item.hide
        }
        if (item.fieldCode === 'assist_three' &&  datas[item.fieldKey]) { // 辅助字段3
          abstractData.other.labels[2] = datas[item.fieldKey + 'Str'] || datas[item.fieldKey]
          abstractData.assistThree.name = item.fieldName
          abstractData.assistThree.value = datas[item.fieldKey + 'Str'] || datas[item.fieldKey]
          abstractData.assistThree.hide = item.hide
        }
        if (item.fieldCode === 'long_field') { // 长字段
          abstractData.other.summer = datas[item.fieldKey + 'Str'] || datas[item.fieldKey]
        }
      }
      abstractData.other.labels = abstractData.other.labels.filter((item) => {
        return item
      })
      return abstractData
    }
  }
}
