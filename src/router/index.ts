import { createRouter, createWebHistory } from "vue-router";
import { ROLE, PATH } from "../common/const";

//public
import login from "@/views/public/login.vue";
import dashboard from "@/views/public/dashboard.vue";
import error from "@/views/public/Error.vue";

//管理员
import AccountManagement from "@/views/admin/AccountManagement.vue";
import LoginLogs from "@/views/admin/LoginLogs.vue";
import adminDashboard from "@/views/admin/AdminDashboard.vue";
//教务员
import AllThesisRegistrar from "@/views/registrar/thesismanagement/AllThesisRegistrar.vue";
import ArrangeDefense from "@/views/registrar/thesismanagement/ArrangeDefense.vue";
import ArrangePrinting from "@/views/registrar/thesismanagement/ArrangePrinting.vue";
import ArrangeReview from "@/views/registrar/thesismanagement/ArrangeReview.vue";
import GenerateEvaluation from "@/views/registrar/thesismanagement/GenerateEvaluation.vue";
import PlagiarismCheck from "@/views/registrar/thesismanagement/PlagiarismCheck.vue";
import AdvisorAssignment from "@/views/registrar/AdvisorAssignment.vue";
import EnterStudentInfo from "@/views/registrar/informationManagement/EnterStudentInfo.vue";
import EnterTeacherInfo from "@/views/registrar/informationManagement/EnterTeacherInfo.vue";
import registrarDashboard from "@/views/registrar/RegistrarDashboard.vue";
import ReviewRule from "@/views/registrar/ReviewRule.vue";
//老师
import DeferredApproval from "@/views/teacher/defensemanagement/DeferredApproval.vue";
import FormalSubmission from "@/views/teacher/defensemanagement/FormalSubmission.vue";
import ModifyResolution from "@/views/teacher/defensemanagement/ModifyResolution.vue";
import PreliminaryResolution from "@/views/teacher/defensemanagement/PreliminaryResolution.vue";
import AllThesisTeacher from "@/views/teacher/studentthesistracking/AllThesisTeacher.vue";
import ApproveDefense from "@/views/teacher/studentthesistracking/ApproveDefense.vue";
import ApproveDeferred from "@/views/teacher/studentthesistracking/ApproveDeferred.vue";
import ApproveDraft from "@/views/teacher/studentthesistracking/ApproveDraft.vue";
import ApproveProposal from "@/views/teacher/studentthesistracking/ApproveProposal.vue";
import ReviewResult from "@/views/teacher/studentthesistracking/ReviewResult.vue";
import PersonalInfo from "@/views/teacher/PersonalInfo.vue";
import ReviewManagement from "@/views/teacher/ReviewManagement.vue";
import teacherDashboard from "@/views/teacher/TeacherDashboard.vue";
import DefenseResolution from "@/views/teacher/studentthesistracking/DefenseResolution.vue";
import StudentList from "@/views/teacher/StudentList.vue";
//学生
import StudentDashboard from "@/views/student/StudentDashboard.vue";
import AllThesisStudent from "@/views/student/AllThesisStudent.vue";
//会话
import LaunchSession from "@/views/session/LaunchSession.vue";
import ResponseSession from "@/views/session/ResponseSession.vue";
import LaunchSessionStudent from "@/views/session/LaunchSessionStudent.vue";
import ResponseSessionStudent from "@/views/session/ResponseSessionStudent.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/login",
      component: login,
    },
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/dashboard",
      component: dashboard,
    },
    {
      path: "/error",
      component: error,
    },
    //管理员
    {
      path: PATH.admin_Dashboard.path,
      component: adminDashboard,
      meta: { requiresAuth: PATH.admin_Dashboard.requiresAuth },
      children: [
        {
          path: PATH.Account_Management.path,
          component: AccountManagement,
          meta: { requiresAuth: PATH.Account_Management.requiresAuth },
        },
        {
          path: PATH.Login_Logs.path,
          component: LoginLogs,
          meta: { requiresAuth: PATH.Login_Logs.requiresAuth },
        },
      ],
    },
    //教务员
    {
      path: PATH.registrar_Dashboard.path,
      component: registrarDashboard,
      meta: { requiresAuth: PATH.registrar_Dashboard.requiresAuth },
      children: [
        {
          path: PATH.AllThesis_Registrar.path,
          component: AllThesisRegistrar,
          meta: { requiresAuth: PATH.AllThesis_Registrar.requiresAuth },
        },
        {
          path: PATH.Arrange_Defense.path,
          component: ArrangeDefense,
          meta: { requiresAuth: PATH.Arrange_Defense.requiresAuth },
        },
        {
          path: PATH.Arrange_Printing.path,
          component: ArrangePrinting,
          meta: { requiresAuth: PATH.Arrange_Printing.requiresAuth },
        },
        {
          path: PATH.Arrange_Review.path,
          component: ArrangeReview,
          meta: { requiresAuth: PATH.Arrange_Review.requiresAuth },
        },
        {
          path: PATH.Generate_Evaluation.path,
          component: GenerateEvaluation,
          meta: { requiresAuth: PATH.Generate_Evaluation.requiresAuth },
        },
        {
          path: PATH.Plagiarism_Check.path,
          component: PlagiarismCheck,
          meta: { requiresAuth: PATH.Plagiarism_Check.requiresAuth },
        },
        {
          path: PATH.Advisor_Assignment.path,
          component: AdvisorAssignment,
          meta: { requiresAuth: PATH.Advisor_Assignment.requiresAuth },
        },
        {
          path: PATH.Enter_Student_Info.path,
          component: EnterStudentInfo,
          meta: { requiresAuth: PATH.Enter_Student_Info.requiresAuth },
        },
        {
          path: PATH.Enter_Teacher_Info.path,
          component: EnterTeacherInfo,
          meta: { requiresAuth: PATH.Enter_Teacher_Info.requiresAuth },
        },
        {
          path: PATH.Review_Rule.path,
          component: ReviewRule,
          meta: { requiresAuth: PATH.Review_Rule.requiresAuth },
        },
      ],
    },
    //老师
    {
      path: PATH.teacher_Dashboard.path,
      component: teacherDashboard,
      meta: { requiresAuth: PATH.teacher_Dashboard.requiresAuth },
      children: [
        {
          path: PATH.AllThesis_Teacher.path,
          component: AllThesisTeacher,
          meta: { requiresAuth: PATH.AllThesis_Teacher.requiresAuth },
        },
        {
          path: PATH.Approve_Proposal.path,
          component: ApproveProposal,
          meta: { requiresAuth: PATH.Approve_Proposal.requiresAuth },
        },
        {
          path: PATH.Deferred_Approval.path,
          component: DeferredApproval,
          meta: { requiresAuth: PATH.Deferred_Approval.requiresAuth },
        },
        {
          path: PATH.Formal_Submission.path,
          component: FormalSubmission,
          meta: { requiresAuth: PATH.Formal_Submission.requiresAuth },
        },
        {
          path: PATH.Modify_Resolution.path,
          component: ModifyResolution,
          meta: { requiresAuth: PATH.Modify_Resolution.requiresAuth },
        },
        {
          path: PATH.Preliminary_Resolution.path,
          component: PreliminaryResolution,
          meta: { requiresAuth: PATH.Preliminary_Resolution.requiresAuth },
        },
        {
          path: PATH.Approve_Defense.path,
          component: ApproveDefense,
          meta: { requiresAuth: PATH.Approve_Defense.requiresAuth },
        },
        {
          path: PATH.Approve_Deferred.path,
          component: ApproveDeferred,
          meta: { requiresAuth: PATH.Approve_Deferred.requiresAuth },
        },
        {
          path: PATH.Approve_Draft.path,
          component: ApproveDraft,
          meta: { requiresAuth: PATH.Approve_Draft.requiresAuth },
        },
        {
          path: PATH.Review_Result.path,
          component: ReviewResult,
          meta: { requiresAuth: PATH.Review_Result.requiresAuth },
        },
        {
          path: PATH.Personal_Info.path,
          component: PersonalInfo,
          meta: { requiresAuth: PATH.Personal_Info.requiresAuth },
        },
        {
          path: PATH.Review_Management.path,
          component: ReviewManagement,
          meta: { requiresAuth: PATH.Review_Management.requiresAuth },
        },
        {
          path: PATH.Launch_Session.path,
          component: LaunchSession,
          meta: { requiresAuth: PATH.Launch_Session.requiresAuth },
          name: "TeacherLaunchSession",
        },
        {
          path: PATH.Response_Session.path,
          component: ResponseSession,
          meta: { requiresAuth: PATH.Response_Session.requiresAuth },
          name: "TeacherResponseSession",
        },
        {
          path: PATH.Defense_Resolution.path,
          component: DefenseResolution,
          meta: { requiresAuth: PATH.Defense_Resolution.requiresAuth },
        },
        {
          path: PATH.Student_List.path,
          component: StudentList,
          meta: { requiresAuth: PATH.Student_List.requiresAuth },
        },
      ],
    },
    //学生
    {
      path: PATH.Student_Dashboard.path,
      component: StudentDashboard,
      meta: { requiresAuth: PATH.Student_Dashboard.requiresAuth },
      children: [
        {
          path: PATH.AllThesis_Student.path,
          component: AllThesisStudent,
          meta: { requiresAuth: PATH.AllThesis_Student.requiresAuth },
        },
        {
          path: PATH.Launch_Session_Student.path,
          component: LaunchSessionStudent,
          meta: { requiresAuth: PATH.Launch_Session_Student.requiresAuth },
          name: "StudentLaunchSession",
        },
        {
          path: PATH.Response_Session_Student.path,
          component: ResponseSessionStudent,
          meta: { requiresAuth: PATH.Response_Session_Student.requiresAuth },
          name: "StudentResponseSession",
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("token");
  let role = sessionStorage.getItem("role");
  console.log(token);
  if (to.path === "/login" || to.path === "/error") {
    next();
  } else if (to.path === "/dashboard") {
    if (token == null || role == null) {
      next("/login");
    } else {
      next();
    }
  } else if (to.meta.requiresAuth) {
    //有权限
    if (to.meta.requiresAuth.includes(role.toString())) {
      console.log("有权限");
      next();
    } else {
      //无权限
      console.log("无权限");
      alert("无权限");
      next("/dashboard");
    }
  } else {
    next("/error");
  }
});

export default router;
