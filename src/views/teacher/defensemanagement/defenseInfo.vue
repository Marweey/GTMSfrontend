<template>
  <el-button type="primary" plain @click="handleCommand">详情</el-button>

  <el-dialog v-model="dialogVisible" title="答辩详情" width="60%" :before-close="handleClose" center :append-to-body="true"
             align-center>
    <el-descriptions class="margin-top" :column="2" :size="size" border>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <tickets />
            </el-icon>
            论文ID
          </div>
        </template>
        {{ tableData?.thesisId }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <tickets />
            </el-icon>
            论文状态
          </div>
        </template>
        <el-tag size="big">
          {{ tableData?.status }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            学生姓名
          </div>
        </template>
        {{ tableData?.studentName }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Location />
            </el-icon>
            学生学号
          </div>
        </template>
        {{ tableData?.studentId }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            导师姓名
          </div>
        </template>
        {{ tableData?.teacherName }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Location />
            </el-icon>
            导师ID
          </div>
        </template>
        {{ tableData?.teacherId }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions class="margin-top" :column="1" :size="size" border>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            论文标题
          </div>
        </template>
        {{ tableData?.title }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Comment />
            </el-icon>
            答辩附言
          </div>
        </template>
        {{ tableData?.comment }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <ChatLineRound />
            </el-icon>
            三个一评价
          </div>
        </template>
        {{ tableData?.opinion }}
      </el-descriptions-item>

    </el-descriptions>
    <el-descriptions class="margin-top" :column="3" :size="size" border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Link />
            </el-icon>
            论文附件
          </div>
        </template>
        <Download :id="thesis_id" type="thesis" />
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Link />
            </el-icon>
            答辩附件
          </div>
        </template>
        <Download :id="thesis_id" type="opinion" />
      </el-descriptions-item>

      <el-descriptions-item>
        <el-button type="primary" @click="submit()">同意通过</el-button>
        <el-button @click="rejectForm()">不通过</el-button>
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue'
import Upload from '@/components/public/upload.vue'
import Download from '@/components/public/download.vue'
import { Link, Tickets, User, Comment, ChatLineRound, View } from '@element-plus/icons-vue'
import {getThesisDetail, saveThesisDefense} from '@/services/teacher';
import type {FormInstance} from "element-plus"; // 导入获取教师相关论文的方法

const submit = (done: () => void) => {
  console.log('submit!')
  done()
}
const rejectForm = (done: () => void) => {
  console.log('submit!')
  done()

}


const props = defineProps({
  thesis_id: String,
});

const loading = ref(true)
const dialogVisible = ref(false)
const handleCommand = (command: string | number | object) => {
  dialogVisible.value = true
}

const handleClose = (done: () => void) => {
  done()
}

interface Thesis {
  title: string
  thesisId: string
  studentName: string
  studentId: string
  teacherName: string
  teacherId: string
  status: string
  comment: string
  opinion: string
}

const fetchData = async () => {
  try {
    const thesis_id = props.thesis_id || ''; // 获取 props 中的 thesis_id
    const data = await getThesisDetail(thesis_id); // 调用获取论文详情的方法，并传入参数
    tableData.value = data;
    loading.value = false; // 数据加载完成，loading 状态设为 false
  } catch (error) {
    console.error(error);
    // 处理错误
  }
}

// 在组件挂载后加载数据
onMounted(() => {
  fetchData();
});

// 使用ref创建响应式变量
const tableData = ref<Thesis>();

const size = ref('default')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})

</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}

.cell-item {
  display: flex;
  align-items: center;
}

.margin-top {
  margin-top: 20px;
}
</style>