<!-- page name -->
<template>
  <div class="page-container">
    <div class="header-container">
      <van-nav-bar
        title="标题"
        left-text="返回"
        fixed
        left-arrow
        @click-left="gotoBack"
      />
    </div>
    <div class="body-container">
      <van-uploader :after-read="afterRead" :max-count="1">
        <img :src="uploadFile">
      </van-uploader>
    </div>
    <van-overlay :show="scan_show">
      <van-loading style="position:absolute;top: 50%;left: 40%;" color="#ffffff" size="24px"><span style="color:#ffffff;">上传中...</span></van-loading>
    </van-overlay>
  </div>
</template>

<script>
import { uploadImg } from '../../api/base'
import { actionInitEndBack, checkToWxLogin, empty } from '../../utils/common'
import Compressor from 'compressorjs'
import assign from '../../utils/assign' // ios微信分享页面不刷新处理方案,不需要删除即可
import { defalutWxShareBar, setWxBarButton } from '../../utils/wxCommon'

export default {
  mixins: [assign], // ios微信分享页面不刷新处理方案,不需要删除即可
  data() {
    return {
      uploadFileStr: '',
      uploadFile: '默认图片url',
      showPop: false,
      scan_show: false,
      uploadStatus: false,
      maxImageWidth: 2000, // 最大图片宽度
      maxImageHeight: 2000 // 最大图片高度
    }
  },
  computed: {
  },
  mounted() {
    checkToWxLogin(this.$route.fullPath) // 检查微信并跳转
    actionInitEndBack(this.$route.fullPath) // 加入到百度统计
    setWxBarButton('测试微信分享', '测试微信分享', location.href, '', defalutWxShareBar) // 设置微信按钮
  },
  activated() {
    // 需要缓存的页面手动加入滚动条处理 不缓存可删除 activated
    if (this.$route.meta.keepAlive === true) {
      this.gotoScrollPosition()
    }
  },
  /* beforeRouteLeave(to, from, next) {
    // 非缓存页面可直接删除beforeRouteLeave
     if (from.meta.keepAlive === true) { // 由于部分html结构问题导致需要单独处理滚动条位置
       this.setScrollPosition(null, this.$refs.page - scroll - container.scrollTop)
    }
    next()
  },*/
  methods: {
    upload() {
      if (!empty(this.uploadFileStr)) {
        // 保存内容时检查图片是否上传
        /* save({ id: this.id, upload_img: this.uploadFile }).then(res => {
          this.showPop = true
        }).catch(err => { this.showException(err) })*/
      } else {
        this.$dialog.alert({ message: '请先点击图片上传' })
      }
    },
    afterRead(file, imgObj) {
      this.uploadStatus = false
      this.scan_show = true
      var that = this
      new Compressor(file.file, {
        quality: 0.5,
        maxWidth: this.maxImageWidth,
        maxHeight: this.maxImageHeight,
        strict: true,
        success: (result) => {
          uploadImg({ 'file_data': result }, { contentType: 'formData' }).then((res) => {
            this.scan_show = false
            this.uploadFile = res.data.url
            this.uploadFileStr = res.data.url
            this.uploadStatus = true
          }).catch(err => {
            this.scan_show = false
            that.showException(err)
          })
        },
        error(errData) {
          this.scan_show = false
          that.showException(errData)
        }
      })
    },
    init() {
      if (empty(this.id)) {
        this.$dialog.alert({ message: '参数丢失，请返回重试' })
        return
      }

      // 获取详情 如果存在编辑
      /* getDetail({ id: this.id }).then(subRes => {
        if (!empty(subRes.data.upload_img)) {
          this.uploadFile = subRes.data.upload_img
          this.uploadFileStr = subRes.data.upload_img
        }
      }).catch(subErr => {
        this.showException(subErr)
      })*/
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
