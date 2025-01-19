(function(){"use strict";var e={1175:function(e,t,r){r.d(t,{A:function(){return d}});var a=r(4373),n=r(3283),s=r(14);const o=a.A.create({baseURL:n.vN});o.interceptors.request.use((function(e){const t=(0,s.n)();return t.accessToken&&e.headers&&(e.headers.Authorization=`Bearer ${t.accessToken}`),e})),o.interceptors.response.use((e=>(console.log(e),e)),(async e=>{const{config:t}=e;if(e.response&&401===e.response.status){const e=await d.auth.requestNewAccessToken();if(e){const r=(0,s.n)();return r.accessToken=e,t.headers.Authorization=`Bearer ${e}`,o(t)}}return console.log(e.response?.data,"catastropic error when accessing API"),Promise.reject(e.response)}));var i=o,u={async login(e,t){return i.post("/auth/login",{email:e,passwd:t})},async requestNewAccessToken(){}};const c=e=>{if(e&&e.data){const{data:{data:t}}=e;return{errorMessage:null,data:t}}return l()},l=e=>{let t=null;if(e&&e.data){const{data:{errorMessage:r}={}}=e;t=r}return{errorMessage:t||"Unknown error. Try again",data:null}};var d={unwrap:c,handleError:l,auth:u,users:{get:async e=>i.get(`users/${e}`),all:async()=>i.get("users"),create:async e=>i.post("/auth/create",{...e,passwd:e.password}),update:async(e,t)=>i.put(`users/${e}`,{...t,passwd:t.password}),delete:async e=>i.delete(`users/${e}`)},teams:{all:async()=>i.get("teams"),get:async e=>i.get(`tasks/${e}`),create:async e=>i.post("teams",e),update:async(e,t)=>i.put(`teams/${e}`,t),getByMember:async e=>i.get(`teams/members/${e}`),addMember:async(e,t)=>i.put(`teams/${e}/members`,t),removeMember:async(e,t)=>i.delete(`teams/${e}/members/${t}`),remove:async e=>i.delete(`teams/${e}`)},messages:{all:async()=>i.get("messages"),create:async e=>i.post("messages",{message:e})},upload:{create:async(e,t,r)=>{const a=new FormData;return a.append("blob",e),a.append("upload_type",t),i.post("blob/upload",a,{params:{upload_type:t},headers:{"Content-Type":"multipart/form-data"},onUploadProgress:r})}},topics:{all:async e=>i.get("topics"),get:async e=>i.get(`topics/${e}`),create:async e=>i.post("topics",e),update:async(e,t)=>i.put(`topics/${e}`,t)},projects:{all:async()=>i.get("projects"),create:async e=>i.post("projects",{...e,name:e.topic_name,description:e.topic_description}),update:async(e,t)=>i.put(`projects/${e}`,t)},tasks:{get:async e=>i.get(`tasks/${e}`),create:async e=>i.post("tasks",e),all:async()=>i.get("tasks"),complete:async e=>i.put(`tasks/${e}/complete`),remove:async e=>i.delete(`tasks/${e}`),update:async(e,t)=>i.put(`tasks/${e}`,t)},evaluations:{get:async e=>i.get(`evaluations/projects/${e}/download`),create:async e=>i.post("evaluations",e),all:async()=>i.get("evaluations")},rubrics:{all:async()=>i.get("rubrics")},reports:{create:async e=>i.post("reports",e),all:async()=>i.get("reports"),get:async e=>i.get(`reports/projects/${e}`),remove:async e=>i.delete(`reports/${e}`),update:async(e,t)=>i.put(`reports/${e}`,t)}}},8027:function(e,t,r){var a=r(5130),n=r(5234),s=r(1999),o=r(6768),i=r(6450);function u(e,t,r,a,n,s){const u=(0,o.g2)("router-view");return(0,o.uX)(),(0,o.Wv)(i.E,null,{default:(0,o.k6)((()=>[(0,o.bF)(u)])),_:1})}var c={name:"App"},l=r(1241);const d=(0,l.A)(c,[["render",u]]);var m=d,p=r(1387),h=r(14);const f=[{path:"/",name:"login",component:()=>Promise.all([r.e(673),r.e(907),r.e(615)]).then(r.bind(r,5466)),meta:{title:"Star - Login"}},{path:"/dashboard",name:"dashboard",component:()=>Promise.all([r.e(673),r.e(189),r.e(595),r.e(556),r.e(966)]).then(r.bind(r,9103)),meta:{title:"Star - Dashboard",requiresAuth:!0},children:[{path:"",name:"home",component:()=>Promise.all([r.e(673),r.e(189),r.e(995),r.e(353)]).then(r.bind(r,8628))},{path:"evaluations",children:[{path:"",name:"evaluations",component:()=>Promise.all([r.e(673),r.e(189),r.e(595),r.e(530),r.e(907),r.e(556),r.e(995),r.e(745),r.e(971),r.e(208)]).then(r.bind(r,3208)),meta:{title:"Star - Evaluations",requiresAuth:!0,requireAdmin:!1}},{path:":team_id",name:"team_evaluation",component:()=>Promise.all([r.e(673),r.e(189),r.e(595),r.e(530),r.e(919),r.e(698)]).then(r.bind(r,3919)),meta:{title:"Star - Team Evaluation",requiresAuth:!0,requireAdmin:!1}},{path:":team_id/add",name:"add_team_evaluation",component:()=>Promise.all([r.e(673),r.e(189),r.e(595),r.e(530),r.e(907),r.e(745),r.e(241)]).then(r.bind(r,7617)),meta:{title:"Star - Team Evaluation",requiresAuth:!0,requireAdmin:!1}}]},{path:"tasks",name:"tasks",component:()=>Promise.all([r.e(673),r.e(189),r.e(595),r.e(530),r.e(65)]).then(r.bind(r,8489)),meta:{title:"Star - Tasks",requiresAuth:!0,requireAdmin:!1}},{path:"projects",name:"projects",component:()=>Promise.all([r.e(673),r.e(189),r.e(595),r.e(530),r.e(907),r.e(995),r.e(358)]).then(r.bind(r,3710)),meta:{title:"Star - Project",requiresAuth:!0,requireAdmin:!1}},{path:"reports",name:"reports",component:()=>Promise.all([r.e(673),r.e(189),r.e(595),r.e(530),r.e(907),r.e(556),r.e(995),r.e(745),r.e(971),r.e(928)]).then(r.bind(r,1928)),meta:{title:"Star - Reports",requiresAuth:!0,requireAdmin:!1}},{path:"community",name:"community",component:()=>Promise.all([r.e(673),r.e(189),r.e(907),r.e(556),r.e(995),r.e(593)]).then(r.bind(r,5587)),meta:{title:"Star - Community",requiresAuth:!0,requireAdmin:!1}},{path:"moderate/projects",name:"moderate_projects",component:()=>Promise.all([r.e(673),r.e(189),r.e(595),r.e(530),r.e(907),r.e(556),r.e(995),r.e(745),r.e(971),r.e(851)]).then(r.bind(r,8851)),meta:{title:"Star - Project",requiresAuth:!0,requireAdmin:!1}},{path:"moderate/reports",name:"moderate_reports",component:()=>Promise.all([r.e(673),r.e(189),r.e(595),r.e(530),r.e(907),r.e(556),r.e(136)]).then(r.bind(r,5933)),meta:{title:"Star - Reports",requiresAuth:!0,requireAdmin:!1}},{path:"moderate/tasks",name:"moderate_tasks",component:()=>Promise.all([r.e(673),r.e(189),r.e(595),r.e(530),r.e(907),r.e(556),r.e(995),r.e(745),r.e(971),r.e(142)]).then(r.bind(r,1142)),meta:{title:"Star - Tasks",requiresAuth:!0,requireAdmin:!1}},{path:"manage/users",name:"user_management",component:()=>Promise.all([r.e(673),r.e(189),r.e(595),r.e(530),r.e(907),r.e(556),r.e(995),r.e(745),r.e(971),r.e(781)]).then(r.bind(r,8781)),meta:{title:"Star - Manage Users",requiresAuth:!0,requireAdmin:!0}},{path:"manage/team",name:"team_management",component:()=>Promise.all([r.e(673),r.e(189),r.e(595),r.e(530),r.e(907),r.e(556),r.e(995),r.e(745),r.e(971),r.e(489)]).then(r.bind(r,489)),meta:{title:"Star - Manage Teams",requiresAuth:!0,requireAdmin:!0}},{path:"manage/projects",name:"project_management",component:()=>Promise.all([r.e(673),r.e(189),r.e(595),r.e(530),r.e(907),r.e(556),r.e(995),r.e(745),r.e(971),r.e(514)]).then(r.bind(r,8514)),meta:{title:"Star - Manage Projects",requiresAuth:!0,requireAdmin:!0}},{path:"manage/reports",name:"report_management",component:()=>Promise.all([r.e(673),r.e(189),r.e(595),r.e(530),r.e(556),r.e(824)]).then(r.bind(r,4012)),meta:{title:"Star - Manage Reports",requiresAuth:!0,requireAdmin:!0}},{path:"manage/evaluations",children:[{path:"",name:"evaluations_management",component:()=>Promise.all([r.e(673),r.e(189),r.e(595),r.e(530),r.e(907),r.e(556),r.e(995),r.e(745),r.e(971),r.e(839)]).then(r.bind(r,6839)),meta:{title:"Star - Evaluations Management",requiresAuth:!0,requireAdmin:!0}},{path:":team_id",name:"team_evaluation_management",component:()=>Promise.all([r.e(673),r.e(189),r.e(595),r.e(530),r.e(919),r.e(698)]).then(r.bind(r,3919)),meta:{title:"Star - Team Evaluation Management",requiresAuth:!0,requireAdmin:!0}}]}]},{path:"/home",name:"home_management",component:()=>Promise.all([r.e(673),r.e(189),r.e(790)]).then(r.bind(r,6790)),meta:{title:"Star - Home",requiresAuth:!0,requireAdmin:!0}}],g=(0,p.aE)({history:(0,p.LA)(),routes:f});g.beforeEach(((e,t)=>{const r=(0,h.n)();return e.meta.requiresAuth&&!r.isAuthenticated?{path:"/",query:{redirect:e.fullPath}}:r.isAuthenticated&&e.meta.requireAdmin&&!r.isAdministrator?{path:"/dashboard"}:"/"===e.path&&r.isAuthenticated?r.isAdministrator?{path:"/home"}:{path:"/dashboard"}:void 0})),g.afterEach((e=>{(0,o.dY)((()=>{document.title=e.meta.title||"Star"}))}));var y=g,A=(r(5524),r(5790)),b=(0,A.$N)();async function v(){const e=await r.e(53).then(r.t.bind(r,8874,23));e.load({google:{families:["Roboto:100,300,400,500,700,900&display=swap"]}})}var w=r(1737),k=r(153),_={install:(e,t)=>{e.config.globalProperties.$timeAgo=e=>(0,w.uN2)(e),e.config.globalProperties.$parseDateTime=e=>e?(0,k.NR)(e,t.pattern):""}},T=r(376);v();const S=(0,n.Ey)(),j=(0,a.Ef)(m);j.use(S),j.use(y),j.use(b),j.use(_,{pattern:"ddd, YYYY-MM-DD HH:mm"}),j.use(s.Ay,{}),j.mount("#app");const E=(0,T.nc)(),P=(0,T.kH)(),q=(0,T.sk)();E.$onAction((({name:e,args:t,onError:r})=>{"logout"===e&&(P.reset(),q.reset()),r((e=>{console.log(e)}))}))},14:function(e,t,r){r.d(t,{n:function(){return i}});var a=r(1737),n=r(5234),s=r(1175),o=r(3283);const i=(0,n.nY)("auth",{state:()=>({isAdmin:(0,a.rXt)("auth.isAdmin",!1),isAuth:(0,a.rXt)("auth.isAuth",!1),auth:(0,a.rXt)("auth.user",{}),accessToken:(0,a.rXt)("auth.accessToken","")}),getters:{isAuthenticated(e){return e.isAuth},isAdministrator(e){return!(!e.auth.role_id||e.auth.role_id!==o.uZ)},isSupervisor(e){return!(!e.auth.role_id||e.auth.role_id!==o.VW)},isCommitteeMember(e){return!(!e.auth.role_id||e.auth.role_id!==o.XI)},isStudent(e){return!(!e.auth.role_id||e.auth.role_id!==o.Ge)}},actions:{async authenticate(e,t){try{const r=await s.A.auth.login(e,t),a=s.A.unwrap(r),{data:n}=a;if(n){const{role_id:e,token:t}=n;this.auth=n,this.accessToken=t,this.isAuth=!0,this.isAdmin=e===o.uZ}return a}catch(r){return s.A.handleError(r)}},logout(e,t){return this.accessToken="",this.isAdmin=!1,this.isAuth=!1,this.auth={},t.replace({path:"/"}),!0}}})},3283:function(e,t,r){r.d(t,{Bo:function(){return p},Ge:function(){return o},Jc:function(){return A},QT:function(){return b},S$:function(){return m},SC:function(){return v},VW:function(){return n},Vp:function(){return y},XI:function(){return s},cF:function(){return f},dE:function(){return g},eW:function(){return h},uZ:function(){return a},vN:function(){return d}});const a=1,n=2,s=3,o=4,i="Administrator",u="Supervisor",c="Committee Member",l="Student",d="http://18.234.226.68:3000",m="https",p="http",h={[a]:i,[n]:u,[s]:c,[o]:l},f=8,g=["2024","2025","2026","2027","2028","2029","2030"],y=["I","II","III","IV"],A=["PPM Report","Final Report","Progress Report"],b=[{title:"PPM Report Template",description:'<a href="/docs/1-SOFTWARE_PLANNING.docx" class="text-primary">Click to download 1-SOFTWARE_PLANNING.docx</a>'},{title:"Final Report Template",description:'<a href="/docs/3-SOFTWARE_FINAL.docx" class="text-primary">Click to download 3-SOFTWARE_FINAL.docx</a>'},{title:"Progress Report Template",description:'<a href="/docs/2-SOFTWARE_PROGRESS.docx" class="text-primary">Click to download 2-SOFTWARE_PROGRESS.docx</a>'}],v=["All","Evaluated","Unevaluated"]},376:function(e,t,r){r.d(t,{nc:function(){return a.n},sk:function(){return c},kH:function(){return i}});var a=r(14),n=r(1737),s=r(5234),o=r(1175);const i=(0,s.nY)("user",{state:()=>({id:"",data:(0,n.rXt)("user.data",{})}),getters:{user(e){return e.data}},actions:{reset(){this.id="",this.data={}},async getUser(e){try{const t=await o.A.users.get(e),r=o.A.unwrap(t),{data:a}=r;return a&&(this.data=a),r}catch(t){return o.A.handleError(t)}}}});r(4114);var u=r(3283);const c=(0,s.nY)("main",{state:()=>({userTasks:[],tasks:[],users:[],messages:[],teams:[],team:{},userTeam:{},topics:[],projects:[],project:{},projectReports:[],evaluations:[],evaluation:{},rubrics:[],reports:[],supervisorStudents:[],rolesmap:u.eW}),getters:{getImage(e){return e=>{if(e)return e.startsWith(u.Bo)||e.startsWith(u.S$)?e:`${u.vN}/${e}`}},getDocument(e){return e=>{if(e)return e.startsWith(u.Bo)||e.startsWith(u.S$)?e:`${u.vN}/${e}`}},getRoles(e){const t=[];for(const r in e.rolesmap)t.push({id:Number(r),name:e.rolesmap[r]});return t},getRoleName(e){return t=>e.rolesmap[t]},getRoleMap(e){return e.rolesmap},getStudents(e){return e.users.filter((e=>e.role_id===u.Ge))},getAdministrators(e){return e.users.filter((e=>e.role_id===u.uZ))},getCommitteeMembers(e){return e.users.filter((e=>e.role_id===u.XI))},getSupervisors(e){return e.users.filter((e=>e.role_id===u.VW))},getUser(e){return t=>{if(t&&e.users.length)for(const r of e.users)if(r.id===t)return r.full_name;return""}}},actions:{reset(){this.userTasks=[],this.tasks=[],this.users=[],this.messages=[],this.teams=[],this.team={},this.userTeam={},this.topics=[],this.projects=[],this.project={},this.projectReports=[],this.evaluations=[],this.evaluation={},this.rubrics=[],this.reports=[],this.supervisorStudents=[]},ruleRequired(e,t){return t?[]:[t=>!!t||`${e} is required`]},ruleMinMax(e,t,r,a){const n=[...this.ruleRequired(e,a)];return t>-1&&n.push((r=>r&&r.length>=t||`${e} should be above ${t}`)),r>-1&&n.push((t=>t&&t.length<=r||`${e} should be below ${r}`)),n},ruleIntMinMax(e,t,r,a){const n=[...this.ruleRequired(e,a)];return t>-1&&n.push((r=>r&&r>=t||`${e} should be above ${t}`)),r>-1&&n.push((t=>t&&t<=r||`${e} should be below ${r}`)),n},async getTopics(){try{const e=await o.A.topics.all(),t=o.A.unwrap(e),{data:r}=t;return this.topics=r,t}catch(e){return o.A.handleError(e)}},async getProjects(){try{const e=await o.A.projects.all(),t=o.A.unwrap(e),{data:r}=t;return this.projects=r,t}catch(e){return o.A.handleError(e)}},async getProjectByTeam(e){if(this.projects&&this.projects.length)for(const t of this.projects)if(t.team_id&&t.team_id===e){this.project=t;break}return this.project},async getSupervisorStudents(e){const t=await this.getTeamBySupervisor(e);if(this.supervisorStudents=[],t&&Object.keys(t).length)for(const r of t.members)this.supervisorStudents.push({...r,id:r.member_id})},async getTeam(e){if(this.teams&&this.teams.length)for(const t of this.teams)if(t.id===e){this.team=t;break}return this.team},async getTeamBySupervisor(e){if(this.teams&&this.teams.length)for(const t of this.teams)if(t.supervisor_id===e){this.team=t;break}return this.team},async getTeamByMember(e){try{const t=await o.A.teams.getByMember(e),r=o.A.unwrap(t),{data:a}=r;return this.userTeam=a,this.userTeam}catch(t){return o.A.handleError(t)}},async getTeams(){try{const e=await o.A.teams.all(),t=o.A.unwrap(e),{data:r}=t;return this.teams=r,t}catch(e){return o.A.handleError(e)}},async getMessages(){try{const e=await o.A.messages.all(),t=o.A.unwrap(e),{data:r}=t;return this.messages=r,t}catch(e){return o.A.handleError(e)}},async createMessage(e){try{const t=await o.A.messages.create(e),r=o.A.unwrap(t);return r}catch(t){return o.A.handleError(t)}},async getUsers(){try{const e=await o.A.users.all(),t=o.A.unwrap(e),{data:r}=t;return this.users=r,t}catch(e){return o.A.handleError(e)}},async getUserTasks(e){try{const t=await o.A.tasks.get(e),r=o.A.unwrap(t),{data:a}=r;return this.userTasks=a,r}catch(t){return o.A.handleError(t)}},async getTasks(){try{const e=await o.A.tasks.all(),t=o.A.unwrap(e),{data:r}=t;this.tasks=r}catch(e){return o.A.handleError(e)}},async createUser(e){try{const t=await o.A.users.create(e),r=o.A.unwrap(t);return r}catch(t){return o.A.handleError(t)}},async updateUser(e,t){try{const r=await o.A.users.update(e,t),a=o.A.unwrap(r);return a}catch(r){return o.A.handleError(r)}},async deleteUser(e){try{const t=await o.A.users.delete(e),r=o.A.unwrap(t);return r}catch(t){return o.A.handleError(t)}},async getRubrics(){const{data:{data:e}}=await o.A.rubrics.all();this.rubrics=e},async createEvaluation(e,t,r,a){const{data:{data:n}}=await o.A.evaluations.create({project_id:a,evaluator_id:r,originality:t,evaluation:e});return console.log(n),!0},async getEvaluation(e){const{data:{data:t}}=await o.A.evaluations.get(e);this.evaluation=t},async getEvaluations(){const{data:{data:e}}=await o.A.evaluations.all();this.evaluations=e},async createTeam(){},async updateTeam(){},async addTask(e){const t=await this.getTeamByMember(e.user_id),r=await this.getProjectByTeam(t.id),{data:{data:a}}=await o.A.tasks.create({...e,team_id:t.id,project_id:r.project_id,assigned_at:new Date});return console.log(a),!0},async updateTask(e,t){const{data:{data:r}}=await o.A.tasks.update(e,t);return console.log(r),!0},async completeTask(e){const{data:{data:t}}=await o.A.tasks.complete(e);return console.log(t),!0},async removeTask(e){const{data:{data:t}}=await o.A.tasks.remove(e);return console.log(t),!0},async getReports(){const{data:{data:e}}=await o.A.reports.all();this.reports=e},async getProjectReports(e){const{data:{data:t}}=await o.A.reports.get(e);this.projectReports=t},async deleteReport(e){const{data:{data:t}}=await o.A.reports.remove(e);return t},async updateReport(e,t){const{data:{data:r}}=await o.A.reports.update(e,t);return console.log(r),!0}}})}},t={};function r(a){var n=t[a];if(void 0!==n)return n.exports;var s=t[a]={exports:{}};return e[a].call(s.exports,s,s.exports,r),s.exports}r.m=e,function(){var e=[];r.O=function(t,a,n,s){if(!a){var o=1/0;for(l=0;l<e.length;l++){a=e[l][0],n=e[l][1],s=e[l][2];for(var i=!0,u=0;u<a.length;u++)(!1&s||o>=s)&&Object.keys(r.O).every((function(e){return r.O[e](a[u])}))?a.splice(u--,1):(i=!1,s<o&&(o=s));if(i){e.splice(l--,1);var c=n();void 0!==c&&(t=c)}}return t}s=s||0;for(var l=e.length;l>0&&e[l-1][2]>s;l--)e[l]=e[l-1];e[l]=[a,n,s]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};r.t=function(a,n){if(1&n&&(a=this(a)),8&n)return a;if("object"===typeof a&&a){if(4&n&&a.__esModule)return a;if(16&n&&"function"===typeof a.then)return a}var s=Object.create(null);r.r(s);var o={};e=e||[null,t({}),t([]),t(t)];for(var i=2&n&&a;"object"==typeof i&&!~e.indexOf(i);i=t(i))Object.getOwnPropertyNames(i).forEach((function(e){o[e]=function(){return a[e]}}));return o["default"]=function(){return a},r.d(s,o),s}}(),function(){r.d=function(e,t){for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){r.f={},r.e=function(e){return Promise.all(Object.keys(r.f).reduce((function(t,a){return r.f[a](e,t),t}),[]))}}(),function(){r.u=function(e){return"js/"+(53===e?"webfontloader":e)+"."+{53:"3d584e3e",65:"6cc5128c",136:"8e317622",142:"f57a0fed",179:"01201f02",189:"8e2ae060",208:"919d41fc",241:"d747a3c7",353:"120ef1f8",358:"7cb0c589",427:"76d0ce21",489:"e9c49c32",514:"1a13c19f",530:"ccf2c3a9",556:"016373de",593:"191d22bd",595:"c8985bf7",615:"ce299a07",673:"86769878",698:"ccc0d6b1",745:"871cb9e3",781:"6b73319c",790:"203aa4b9",824:"00eb3d3e",839:"af1ad6e4",851:"0fd76bfc",907:"6282c8a3",919:"265941ec",928:"f5e878d8",966:"e836ed7a",971:"9a063e8a",995:"3769072a"}[e]+".js"}}(),function(){r.miniCssF=function(e){return"css/"+e+"."+{65:"4d69ec7c",136:"e74a7f7e",142:"bf74765f",208:"874a06a5",241:"7d7f0087",353:"09749314",358:"99b75a29",489:"83e4cfc0",514:"3609251b",593:"227993fa",595:"c969f3c6",615:"d6893c85",673:"0e842919",698:"7bb7b4f7",781:"d0b31e6a",790:"4b9acdc8",824:"e59c0da2",839:"302f9dc3",851:"dde137cd",907:"855e54aa",928:"7717f624",966:"ab1bd34f",971:"13725a2c"}[e]+".css"}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="star-client:";r.l=function(a,n,s,o){if(e[a])e[a].push(n);else{var i,u;if(void 0!==s)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var d=c[l];if(d.getAttribute("src")==a||d.getAttribute("data-webpack")==t+s){i=d;break}}i||(u=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,r.nc&&i.setAttribute("nonce",r.nc),i.setAttribute("data-webpack",t+s),i.src=a),e[a]=[n];var m=function(t,r){i.onerror=i.onload=null,clearTimeout(p);var n=e[a];if(delete e[a],i.parentNode&&i.parentNode.removeChild(i),n&&n.forEach((function(e){return e(r)})),t)return t(r)},p=setTimeout(m.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=m.bind(null,i.onerror),i.onload=m.bind(null,i.onload),u&&document.head.appendChild(i)}}}(),function(){r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){r.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,a,n,s){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css",r.nc&&(o.nonce=r.nc);var i=function(r){if(o.onerror=o.onload=null,"load"===r.type)n();else{var a=r&&r.type,i=r&&r.target&&r.target.href||t,u=new Error("Loading CSS chunk "+e+" failed.\n("+a+": "+i+")");u.name="ChunkLoadError",u.code="CSS_CHUNK_LOAD_FAILED",u.type=a,u.request=i,o.parentNode&&o.parentNode.removeChild(o),s(u)}};return o.onerror=o.onload=i,o.href=t,a?a.parentNode.insertBefore(o,a.nextSibling):document.head.appendChild(o),o},t=function(e,t){for(var r=document.getElementsByTagName("link"),a=0;a<r.length;a++){var n=r[a],s=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(s===e||s===t))return n}var o=document.getElementsByTagName("style");for(a=0;a<o.length;a++){n=o[a],s=n.getAttribute("data-href");if(s===e||s===t)return n}},a=function(a){return new Promise((function(n,s){var o=r.miniCssF(a),i=r.p+o;if(t(o,i))return n();e(a,i,null,n,s)}))},n={524:0};r.f.miniCss=function(e,t){var r={65:1,136:1,142:1,208:1,241:1,353:1,358:1,489:1,514:1,593:1,595:1,615:1,673:1,698:1,781:1,790:1,824:1,839:1,851:1,907:1,928:1,966:1,971:1};n[e]?t.push(n[e]):0!==n[e]&&r[e]&&t.push(n[e]=a(e).then((function(){n[e]=0}),(function(t){throw delete n[e],t})))}}}(),function(){var e={524:0};r.f.j=function(t,a){var n=r.o(e,t)?e[t]:void 0;if(0!==n)if(n)a.push(n[2]);else if(/^(595|698)$/.test(t))e[t]=0;else{var s=new Promise((function(r,a){n=e[t]=[r,a]}));a.push(n[2]=s);var o=r.p+r.u(t),i=new Error,u=function(a){if(r.o(e,t)&&(n=e[t],0!==n&&(e[t]=void 0),n)){var s=a&&("load"===a.type?"missing":a.type),o=a&&a.target&&a.target.src;i.message="Loading chunk "+t+" failed.\n("+s+": "+o+")",i.name="ChunkLoadError",i.type=s,i.request=o,n[1](i)}};r.l(o,u,"chunk-"+t,t)}},r.O.j=function(t){return 0===e[t]};var t=function(t,a){var n,s,o=a[0],i=a[1],u=a[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(n in i)r.o(i,n)&&(r.m[n]=i[n]);if(u)var l=u(r)}for(t&&t(a);c<o.length;c++)s=o[c],r.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return r.O(l)},a=self["webpackChunkstar_client"]=self["webpackChunkstar_client"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=r.O(void 0,[504],(function(){return r(8027)}));a=r.O(a)})();
//# sourceMappingURL=app.04d2896b.js.map