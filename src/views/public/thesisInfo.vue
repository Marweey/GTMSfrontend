<template>
  <!-- <el-button plain @click="dialogVisible = true">
      Click to open the Dialog
    </el-button> -->
  <!-- <el-dropdown @command="handleCommand" size="large">
      <el-dropdown-item command="editProfile">个人中心</el-dropdown-item>
    </el-dropdown> -->
  <el-button type="primary" plain @click="handleCommand">详情</el-button>

  <el-dialog v-model="dialogVisible" title="论文详情" width="60%" :before-close="handleClose" center :append-to-body="true"
    align-center>
    <el-descriptions class="margin-top" :column="2" :size="size" border>
      <!-- <template #extra>
        <el-button type="primary">Operation</el-button>
      </template> -->
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
              <View />
            </el-icon>
            答辩次数
          </div>
        </template>
        {{ tableData?.defenseTimes }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <View />
            </el-icon>
            删除该论文
          </div>
        </template>
        <el-button type="danger" @click="handleDelete">确认删除</el-button>
      </el-descriptions-item>

      <el-descriptions-item v-if="tableData && tableData.status === '待答辩'">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <View />
            </el-icon>
            设置答辩前定稿
          </div>
        </template>
        <el-button type="primary" @click="handleBeforeDefense">确认答辩前定稿</el-button>
      </el-descriptions-item>

      <el-descriptions-item v-if="tableData && tableData.status === '通过答辩'">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <View />
            </el-icon>
            设置答辩后定稿
          </div>
        </template>
        <el-button type="primary" @click="handleAfterDefense">确认答辩后定稿</el-button>
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
            论文简评
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
            导师意见
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
            导师意见附件
          </div>
        </template>
        <Download :id="thesis_id" type="opinion" />
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Link />
            </el-icon>
            开题报告附件
          </div>
        </template>
        <Download :id="thesis_id" type="proposal" />
      </el-descriptions-item>
    </el-descriptions>

    <!-- <Upload id="20240001" type="opinion" />
    <Download id="20240001" type="opinion" /> -->
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue'
import Upload from '@/components/public/upload.vue'
import Download from '@/components/public/download.vue'
import { Link, Tickets, User, Comment, ChatLineRound, View } from '@element-plus/icons-vue'
import { getThesisDetail, finishDelete, finishBeforeDefense, finishAfterDefense } from '@/services/teacher'; // 导入获取教师相关论文的方法
import { ElMessage, ElMessageBox } from 'element-plus';

const props = defineProps({
  thesis_id: String,
});

const loading = ref(true)
const dialogVisible = ref(false)
const handleCommand = (command: string | number | object) => {
  dialogVisible.value = true
}

const handleClose = (done: () => void) => {
  // ElMessageBox.confirm('Are you sure to close this dialog?')
  //   .then(() => {
  //     done()
  //   })
  //   .catch(() => {
  //     // catch error
  //   })
  done()
}

const handleDelete = async () => {
  ElMessageBox.confirm(
    '您确认要删除该论文?删除后无法恢复！',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      FinishDelete();
      ElMessage({
        type: 'success',
        message: '成功删除',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}

const FinishDelete = async () => {
  try {
    const thesis_id = props.thesis_id || ''; // 获取 props 中的 thesis_id
    await finishDelete(thesis_id);
    dialogVisible.value = false;
    fetchData();
    location.reload();
  } catch (error) {
    ElMessage.error("删除错误")
  }
}

const handleBeforeDefense = async () => {
  ElMessageBox.confirm(
    '您确认设置为答辩前定稿？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      FinishBeforeDefense();
      ElMessage({
        type: 'success',
        message: '成功设置',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消设置',
      })
    })
}

const FinishBeforeDefense = async () => {
  try {
    const thesis_id = props.thesis_id || ''; // 获取 props 中的 thesis_id
    await finishBeforeDefense(thesis_id);
    dialogVisible.value = false;
    fetchData();
    location.reload();
  } catch (error) {
    ElMessage.error("设置错误")
  }
}

const handleAfterDefense = async () => {
  ElMessageBox.confirm(
    '您确认设置为答辩后定稿？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      FinishAfterDefense();
      ElMessage({
        type: 'success',
        message: '成功设置',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消设置',
      })
    })
}

const FinishAfterDefense = async () => {
  try {
    const thesis_id = props.thesis_id || ''; // 获取 props 中的 thesis_id
    await finishAfterDefense(thesis_id);
    dialogVisible.value = false;
    fetchData();
    location.reload();
  } catch (error) {
    ElMessage.error("设置错误")
  }
}

interface Thesis {
  title: string
  thesisId: string
  studentName: string
  studentId: string
  teacherName: string
  teacherId: string
  status: string
  defenseTimes: string
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