<template>
  <div class="footer-container">
    <div class="copyright">
      &copy; {{ currentYear }} iSparta Web
    </div>
    <div class="links">
      <a href="https://github.com/iSparta/iSparta" target="_blank">GitHub</a>
      <span class="divider">|</span>
      <a href="https://github.com/iSparta/iSparta/issues" target="_blank">{{ $t('footer.reportIssue') }}</a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 计算当前年份
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.links a {
  color: #909399;
  text-decoration: none;
  margin: 0 5px;
}

.links a:hover {
  color: #409EFF;
  text-decoration: underline;
}

.divider {
  margin: 0 5px;
  color: #dcdfe6;
}
</style>