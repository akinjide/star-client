"use strict";(self["webpackChunkstar_client"]=self["webpackChunkstar_client"]||[]).push([[208],{6866:function(e,t,i){i.d(t,{A:function(){return k}});var l=i(6768),a=i(4232),s=i(2807),r=i(4189),n=i(697),o=i(3745),u=i(1772);const c={class:"pa-4 text-center"},d={class:"text-h6 font-weight-black"},m={class:"text-medium-emphasis"};function p(e,t,i,p,v,h){return(0,l.uX)(),(0,l.CE)("div",c,[(0,l.bF)(u.p,{"model-value":i.view,"max-width":"600",persistent:""},{default:(0,l.k6)((()=>[(0,l.bF)(r.J,{"prepend-icon":i.header.icon,title:i.header.title},{default:(0,l.k6)((()=>[(0,l.bF)(n.O,null,{default:(0,l.k6)((()=>[(0,l.Lk)("p",d,(0,a.v_)(i.body.name),1),(0,l.Lk)("div",m,(0,a.v_)(i.body.text),1)])),_:1}),(0,l.bF)(o.S,null,{default:(0,l.k6)((()=>[i.body.url?((0,l.uX)(),(0,l.Wv)(s.D,{key:0,color:"orange",text:"Preview",href:i.body.url,target:"_blank"},null,8,["href"])):(0,l.Q3)("",!0),(0,l.bF)(s.D,{onClick:t[0]||(t[0]=e=>h.close(!i.view)),text:"Ok"})])),_:1})])),_:1},8,["prepend-icon","title"])])),_:1},8,["model-value"])])}var v={name:"PreviewDialog",props:{view:{type:Boolean,required:!0},header:{type:Object,required:!0},body:{type:Object,required:!0}},methods:{close(e){this.$emit("close",e)}}},h=i(1241);const f=(0,h.A)(v,[["render",p]]);var k=f},3208:function(e,t,i){i.r(t),i.d(t,{default:function(){return Q}});var l=i(6768),a=i(4232),s=i(3416),r=i(4189),n=i(8995),o=i(3813),u=i(6756),c=i(5526),d=i(1286),m=i(3260),p=i(3948);const v={class:"d-flex justify-end"},h={class:"mx-4"},f={class:"pl-4 d-flex align-center justify-space-between"},k={class:"text-body-2"};function g(e,t,i,g,b,y){const _=(0,l.g2)("IconButton"),w=(0,l.g2)("PreviewDialog");return(0,l.uX)(),(0,l.CE)(l.FK,null,[(0,l.bF)(o.I,{fluid:""},{default:(0,l.k6)((()=>[(0,l.bF)(u.L,null,{default:(0,l.k6)((()=>[(0,l.bF)(c.B,{cols:"4"},{default:(0,l.k6)((()=>[(0,l.bF)(d.d4,{"prepend-inner-icon":"mdi-filter-outline",density:"compact",modelValue:b.filterQuery,"onUpdate:modelValue":t[0]||(t[0]=e=>b.filterQuery=e),items:y.filters,label:"Filter By","max-width":"200"},null,8,["modelValue","items"])])),_:1}),(0,l.bF)(c.B,{cols:"4"},{default:(0,l.k6)((()=>[(0,l.bF)(p.W,{"append-inner-icon":"mdi-magnify",density:"compact",label:"Search",variant:"underlined","hide-details":"","single-line":"",modelValue:b.searchQuery,"onUpdate:modelValue":t[1]||(t[1]=e=>b.searchQuery=e)},null,8,["modelValue"])])),_:1}),(0,l.bF)(c.B,{cols:"4"},{default:(0,l.k6)((()=>[(0,l.Lk)("div",v,[(0,l.Lk)("h4",h,(0,a.v_)(y.teamsCount)+" Teams(s)",1)])])),_:1})])),_:1}),(0,l.bF)(u.L,null,{default:(0,l.k6)((()=>[(0,l.bF)(c.B,{cols:"12"},{default:(0,l.k6)((()=>[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(y.resultQuery,((i,o)=>((0,l.uX)(),(0,l.Wv)(r.J,{key:o,title:i.name,subtitle:i.description,"prepend-avatar":e.getImage(i.image),elevation:"4",class:"pa-4 mb-6"},{default:(0,l.k6)((()=>[(0,l.Lk)("div",f,[(0,l.Lk)("div",null,[(0,l.Lk)("p",k,[t[3]||(t[3]=(0,l.eW)("Supervised by ")),(0,l.Lk)("strong",null,(0,a.v_)(y.getTeamSupervisor(i)),1)])]),(0,l.Lk)("div",null,[y.hasEvaluation(i)||y.ownTeam(i)?(0,l.Q3)("",!0):((0,l.uX)(),(0,l.Wv)(_,{key:0,tooltipText:"Add Evaluation",color:"green",icon:"mdi-pencil-plus-outline",onAction:e=>y.goToPage(i,"add_team_evaluation")},null,8,["onAction"])),(0,l.bF)(_,{tooltipText:"View Evaluation",color:"blue-grey",icon:"mdi-eye-outline",onAction:e=>y.goToPage(i,"team_evaluation")},null,8,["onAction"]),(0,l.bF)(_,{tooltipText:"View Topic",color:"blue-grey",icon:"mdi-file-eye-outline",onAction:e=>y.select(i,"view_topic")},null,8,["onAction"])])]),y.hasMembers(i)?((0,l.uX)(),(0,l.Wv)(m.Z,{key:0,"min-height":"500px","fixed-header":""},{default:(0,l.k6)((()=>[t[6]||(t[6]=(0,l.Lk)("thead",null,[(0,l.Lk)("tr",null,[(0,l.Lk)("th",{class:"text-left text-uppercase"}),(0,l.Lk)("th",{class:"text-left text-uppercase"},"Full Name"),(0,l.Lk)("th",{class:"text-left text-uppercase"},"Student Number"),(0,l.Lk)("th",{class:"text-left text-uppercase"},"Department"),(0,l.Lk)("th",{class:"text-left text-uppercase"},"Position")])],-1)),(0,l.Lk)("tbody",null,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(i.members,((i,r)=>((0,l.uX)(),(0,l.CE)("tr",{key:r},[(0,l.Lk)("td",null,[(0,l.bF)(s.y,{image:e.getImage(i.image)},null,8,["image"])]),(0,l.Lk)("td",null,(0,a.v_)(i.full_name),1),(0,l.Lk)("td",null,(0,a.v_)(i.student_number),1),(0,l.Lk)("td",null,(0,a.v_)(i.department),1),(0,l.Lk)("td",null,[i.is_lead?((0,l.uX)(),(0,l.Wv)(n.x,{key:0,"prepend-icon":"mdi-star",class:"ma-2",color:"orange",size:"x-small"},{default:(0,l.k6)((()=>t[4]||(t[4]=[(0,l.eW)(" Lead ")]))),_:1})):(0,l.Q3)("",!0),i.is_lead?(0,l.Q3)("",!0):((0,l.uX)(),(0,l.Wv)(n.x,{key:1,class:"ma-2",color:"teal",size:"x-small"},{default:(0,l.k6)((()=>t[5]||(t[5]=[(0,l.eW)(" Member ")]))),_:1}))])])))),128))])])),_:2},1024)):(0,l.Q3)("",!0)])),_:2},1032,["title","subtitle","prepend-avatar"])))),128))])),_:1})])),_:1})])),_:1}),(0,l.bF)(w,{view:b.viewTopic,header:{icon:"mdi-information",title:"Topic Information"},body:{name:e.project.topic_name,text:e.project.topic_description,url:e.getDocument(e.project.topic_url)},onClose:t[2]||(t[2]=e=>b.viewTopic=!1)},null,8,["view","body"])],64)}i(4114);var b=i(5234),y=i(7103),_=i(6866),w=i(376),x=i(3283),L={name:"Evaluations",data(){return{searchQuery:null,viewTopic:!1,filterQuery:x.SC[0]}},components:{IconButton:y.A,PreviewDialog:_.A},methods:{...(0,b.i0)(w.sk,["getUsers"]),...(0,b.i0)(w.sk,["getTeams"]),...(0,b.i0)(w.sk,["getEvaluations"]),...(0,b.i0)(w.sk,["getProjects"]),...(0,b.i0)(w.sk,["getProjectByTeam"]),async select(e,t){"view_topic"===t&&(await this.getProjectByTeam(e.id),this.viewTopic=!0)},goToPage(e,t){this.$router.push({name:t,params:{team_id:e.id}})},hasMembers(e){return e.members&&e.members.length>0&&e.members[0]},getTeamSupervisor(e){return e.supervisor_full_name?e.supervisor_title+" "+e.supervisor_full_name:"No supervisor assigned yet"},ownTeam(e){return e.supervisor_id===this.user.id},hasEvaluation(e){if(this.evaluations&&this.evaluations.length)for(const t of this.evaluations)if(e.id===t.team_id&&t.evaluations)return!0;return!1}},async created(){await this.getUsers(),await this.getTeams(),await this.getProjects(),await this.getEvaluations()},computed:{...(0,b.aH)(w.kH,["user"]),...(0,b.aH)(w.sk,["teams"]),...(0,b.aH)(w.sk,["project"]),...(0,b.aH)(w.sk,["getStudents"]),...(0,b.aH)(w.sk,["getSupervisors"]),...(0,b.aH)(w.sk,["getImage"]),...(0,b.aH)(w.sk,["getDocument"]),...(0,b.aH)(w.sk,["evaluations"]),teamsCount(){return this.teams?this.teams.length:0},resultQuery(){return this.searchQuery?this.teams.filter((e=>this.searchQuery.toLowerCase().split(" ").every((t=>!!e.name.toLowerCase().includes(t)||!!e.supervisor_full_name.toLowerCase().includes(t))))):this.filterQuery?this.filterQuery===this.filters[0]?this.teams:this.teams.filter((e=>!(this.filterQuery!==this.filters[1]||!this.hasEvaluation(e))||this.filterQuery===this.filters[2]&&!this.hasEvaluation(e))):this.teams},filters(){return x.SC}}},F=i(1241);const T=(0,F.A)(L,[["render",g],["__scopeId","data-v-459d4fbc"]]);var Q=T}}]);
//# sourceMappingURL=208.919d41fc.js.map