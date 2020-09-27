<template>
  <div class="card-panel">
    <span v-if="title" class="title">{{ title }}</span>
    <div class="content">
      <div class="chart">
        <slot></slot>
      </div>
      <div
        class="code"
        :class="{
          'is-show': isShowCode,
        }"
      >
        <codemirror :value="codeResult" :options="cmOptions" />
      </div>
      <div class="footer" @click="click">
        <span class="show-code-btn">
          <span
            class="triangle"
            :class="{
              'is-show': isShowCode,
            }"
          ></span>
          <span class="text">{{ isShowCode ? '隐藏代码' : '展开代码' }}</span>
        </span>
        <span v-show="isShowCode" class="copy" @click.stop="copy">
          复制代码
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'

// import base style
import 'codemirror/lib/codemirror.css'

export default {
  name: 'CardPanel',
  props: {
    title: String,
    code: {
      type: Array,
      default: () => [],
    },
  },
  components: { codemirror },
  data() {
    return {
      cmOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: false,
        line: true,
      },
      isShowCode: false,
    }
  },
  computed: {
    codeResult() {
      return JSON.stringify(this.code, null, 2)
    },
  },
  methods: {
    click() {
      this.isShowCode = !this.isShowCode
    },
    copy() {
      // 创建元素用于复制
      let ele = document.createElement('input')

      // 设置元素内容
      ele.setAttribute('value', this.codeResult)

      // 将元素插入页面进行调用
      document.body.append(ele)

      // 复制内容
      ele.select()

      // 将内容复制到剪贴板
      document.execCommand('copy')

      // 删除创建元素
      document.body.removeChild(ele)

      //提示
      alert('已成功复制到粘贴板')
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-panel {
  margin-bottom: 15px;
  margin-right: 6px;
  margin-left: 6px;
  &:hover {
    .content {
      .footer {
        .show-code-btn {
          transform: translateX(0px);
          .text {
            opacity: 1;
          }
        }
      }
    }
  }
  .code {
    height: 0;
    overflow: hidden;
    transition: height 0.2s ease-in-out;

    &.is-show {
      border-top: 1px solid #e3e3e3;
      height: 300px;
    }
  }
  .title {
    position: relative;
    display: inline-block;
    margin-left: 8px;
    font-size: 14px;
    margin-bottom: 5px;
    &::before {
      position: absolute;
      top: 50%;
      left: -8px;
      transform: translateY(-50%);
      content: '';
      display: inline-block;
      width: 3px;
      height: 15px;
      background-color: #0885ff;
    }
  }
  .content {
    width: 400px;

    border: 1px solid #e4e7ed;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    .chart {
      height: 300px;
    }
    .footer {
      padding: 10px 0;
      text-align: center;
      font-size: 12px;
      border-top: 1px solid #e3e3e3;
      cursor: pointer;
      position: relative;
      .show-code-btn {
        display: inline-block;
        transform: translateX(30px);
        transition: all 0.2s ease-in-out;
        &:hover {
          .triangle {
            border-bottom-color: #0885ff;
          }
          .text {
            color: #0885ff;
          }
        }
        .triangle {
          display: inline-block;
          width: 0;
          height: 0;
          border-width: 0 6px 8px;
          border-style: solid;
          border-color: transparent transparent #909399;
          margin-right: 10px;
          &.is-show {
            transform: rotate(180deg);
          }
        }
        .text {
          opacity: 0;
          color: #909399;
          transition: opacity 0.2s ease-in-out;
        }
      }
      .copy {
        position: absolute;
        right: 10px;
        color: #909399;
        &:hover {
          color: #0885ff;
        }
      }
    }
  }
}
</style>
