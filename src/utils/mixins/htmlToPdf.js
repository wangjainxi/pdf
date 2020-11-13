// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
let pdf = new JsPDF('', 'pt', 'a4')
export const htmlToPDF = {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    getPdf (title, selectorId) {
      // 导出之前先将滚动条置顶,不然会出现数据不全的现象
      window.pageYOffset = 0;
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0

      let targetDom = document.querySelector(`#${selectorId}`)
      const copyDom = targetDom;
      copyDom.style.width = targetDom.scrollWidth + 'px';
      copyDom.style.height = targetDom.scrollHeight + 'px';
      html2Canvas(copyDom, {
        scale: 2,
        allowTaint: false,
        useCORS: true,
        height: targetDom.scrollHeight,
        width: targetDom.scrollWidth
      }).then((canvas) => {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight
        //设置图片跨域访问
        let pageData = new Image();
        pageData.setAttribute('crossOrigin', 'Anonymous');
        pageData = canvas.toDataURL('image/jpeg', 1.0);
        if (leftHeight < pageHeight) {
          pdf.addPage()
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              pdf.addPage()
            }
          }
        }
        pdf.save(title + '.pdf')
        this.isLoading = false
      })
    }
  }
}
