"use strict";(self["webpackChunkstar_client"]=self["webpackChunkstar_client"]||[]).push([[862],{1087:function(e,t,a){a.r(t),a.d(t,{default:function(){return Xe}});var l=a(6768),n=a(6450),o=a(3813),i=a(6756),r=a(5526),s=a(9262),u=a(2542),d=a(6984),c=a(6747),v=a(4663),p=a(4587),m=a(1247),g=a(4600);const f=(0,p.j)({scrollable:Boolean,...(0,s.u)(),...(0,u.X)(),...(0,v.X)({tag:"main"})},"VMain"),h=(0,m.RW)()({name:"VMain",props:f(),setup(e,t){let{slots:a}=t;const{dimensionStyles:n}=(0,u.S)(e),{mainStyles:o}=(0,d.gK)(),{ssrBootStyles:i}=(0,c.K)();return(0,g.C)((()=>(0,l.bF)(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable},e.class],style:[o.value,i.value,n.value,e.style]},{default:()=>[e.scrollable?(0,l.bF)("div",{class:"v-main__scroller"},[a.default?.()]):a.default?.()]}))),{}}}),b={class:"pa-2 mt-4"};function y(e,t,a,s,u,d){const c=(0,l.g2)("LeftSidebar"),v=(0,l.g2)("HeadBar"),p=(0,l.g2)("router-view"),m=(0,l.g2)("RightSidebar");return(0,l.uX)(),(0,l.Wv)(n.E,null,{default:(0,l.k6)((()=>[(0,l.bF)(h,null,{default:(0,l.k6)((()=>[(0,l.bF)(o.I,{fluid:""},{default:(0,l.k6)((()=>[(0,l.bF)(i.L,null,{default:(0,l.k6)((()=>[(0,l.bF)(r.B,{cols:u.leftDrawer?u.leftCol:1,md:u.leftDrawer?3:1,sm:u.leftDrawer?4:1,class:"d-flex"},{default:(0,l.k6)((()=>[(0,l.bF)(c,{user:e.user,drawer:u.leftDrawer,route_data:e.userTeam},null,8,["user","drawer","route_data"])])),_:1},8,["cols","md","sm"]),(0,l.bF)(r.B,{cols:u.mainCol,md:u.leftDrawer?7:9,sm:u.leftDrawer?8:10},{default:(0,l.k6)((()=>[(0,l.bF)(v,{name:e.$route.name,leftDrawer:u.leftDrawer,rightDrawer:u.rightDrawer,user:e.user,onAction:d.updateDrawer},null,8,["name","leftDrawer","rightDrawer","user","onAction"]),(0,l.Lk)("div",b,[(0,l.bF)(p)])])),_:1},8,["cols","md","sm"]),(0,l.bF)(r.B,{cols:u.rightDrawer?u.rightCol:1,md:u.rightDrawer?2:1,sm:u.rightDrawer?3:1,class:"d-flex"},{default:(0,l.k6)((()=>[(0,l.bF)(m,{tasks:e.userTasks,user:e.user,drawer:u.rightDrawer},null,8,["tasks","user","drawer"])])),_:1},8,["cols","md","sm"])])),_:1})])),_:1})])),_:1})])),_:1})}var w=a(5234),_=a(4232);a(7642),a(8004),a(3853),a(5876),a(2475),a(5024),a(1698);const k=(0,p.j)({text:String,...(0,s.u)(),...(0,v.X)()},"VToolbarTitle"),S=(0,m.RW)()({name:"VToolbarTitle",props:k(),setup(e,t){let{slots:a}=t;return(0,g.C)((()=>{const t=!!(a.default||a.text||e.text);return(0,l.bF)(e.tag,{class:["v-toolbar-title",e.class],style:e.style},{default:()=>[t&&(0,l.bF)("div",{class:"v-toolbar-title__placeholder"},[a.text?a.text():e.text,a.default?.()])]})})),{}}});var B=a(9562),F=a(7852),W=a(5126),C=a(9923),x=a(2886),E=a(2858),I=a(7018),D=a(5296),T=a(3240),V=a(7664),L=a(144),H=a(9094);const j=[null,"prominent","default","comfortable","compact"],R=(0,p.j)({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>j.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...(0,C.r)(),...(0,s.u)(),...(0,I.s)(),...(0,T.S)(),...(0,v.X)({tag:"header"}),...(0,V.yx)()},"VToolbar"),M=(0,m.RW)()({name:"VToolbar",props:R(),setup(e,t){let{slots:a}=t;const{backgroundColorClasses:n,backgroundColorStyles:o}=(0,x.z6)((0,L.lW)(e,"color")),{borderClasses:i}=(0,C.M)(e),{elevationClasses:r}=(0,I.j)(e),{roundedClasses:s}=(0,T.v)(e),{themeClasses:u}=(0,V.NX)(e),{rtlClasses:d}=(0,D.IA)(),c=(0,L.IJ)(!(!e.extended&&!a.extension?.())),v=(0,l.EW)((()=>parseInt(Number(e.height)+("prominent"===e.density?Number(e.height):0)-("comfortable"===e.density?8:0)-("compact"===e.density?16:0),10))),p=(0,l.EW)((()=>c.value?parseInt(Number(e.extensionHeight)+("prominent"===e.density?Number(e.extensionHeight):0)-("comfortable"===e.density?4:0)-("compact"===e.density?8:0),10):0));return(0,E.Uh)({VBtn:{variant:"text"}}),(0,g.C)((()=>{const t=!(!e.title&&!a.title),m=!(!a.image&&!e.image),g=a.extension?.();return c.value=!(!e.extended&&!g),(0,l.bF)(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},n.value,i.value,r.value,s.value,u.value,d.value,e.class],style:[o.value,e.style]},{default:()=>[m&&(0,l.bF)("div",{key:"image",class:"v-toolbar__image"},[a.image?(0,l.bF)(F.K,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},a.image):(0,l.bF)(W.y,{key:"image-img",cover:!0,src:e.image},null)]),(0,l.bF)(F.K,{defaults:{VTabs:{height:(0,H.Dg)(v.value)}}},{default:()=>[(0,l.bF)("div",{class:"v-toolbar__content",style:{height:(0,H.Dg)(v.value)}},[a.prepend&&(0,l.bF)("div",{class:"v-toolbar__prepend"},[a.prepend?.()]),t&&(0,l.bF)(S,{key:"title",text:e.title},{text:a.title}),a.default?.(),a.append&&(0,l.bF)("div",{class:"v-toolbar__append"},[a.append?.()])])]}),(0,l.bF)(F.K,{defaults:{VTabs:{height:(0,H.Dg)(p.value)}}},{default:()=>[(0,l.bF)(B.Qo,null,{default:()=>[c.value&&(0,l.bF)("div",{class:"v-toolbar__extension",style:{height:(0,H.Dg)(p.value)}},[g])]})]})]})})),{contentHeight:v,extensionHeight:p}}});var N=a(2067),X=a(7354);const A=(0,p.j)({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},"scroll");function P(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{canScroll:a}=t;let n=0,o=0;const i=(0,L.KR)(null),r=(0,L.IJ)(0),s=(0,L.IJ)(0),u=(0,L.IJ)(0),d=(0,L.IJ)(!1),c=(0,L.IJ)(!1),v=(0,l.EW)((()=>Number(e.scrollThreshold))),p=(0,l.EW)((()=>(0,H.qE)((v.value-r.value)/v.value||0))),m=()=>{const e=i.value;if(!e||a&&!a.value)return;n=r.value,r.value="window"in e?e.pageYOffset:e.scrollTop;const t=e instanceof Window?document.documentElement.scrollHeight:e.scrollHeight;o===t?(c.value=r.value<n,u.value=Math.abs(r.value-v.value)):o=t};return(0,l.wB)(c,(()=>{s.value=s.value||r.value})),(0,l.wB)(d,(()=>{s.value=0})),(0,l.sV)((()=>{(0,l.wB)((()=>e.scrollTarget),(e=>{const t=e?document.querySelector(e):window;t?t!==i.value&&(i.value?.removeEventListener("scroll",m),i.value=t,i.value.addEventListener("scroll",m,{passive:!0})):(0,X.OP)(`Unable to locate element with identifier ${e}`)}),{immediate:!0})})),(0,l.xo)((()=>{i.value?.removeEventListener("scroll",m)})),a&&(0,l.wB)(a,m,{immediate:!0}),{scrollThreshold:v,currentScroll:r,currentThreshold:u,isScrollActive:d,scrollRatio:p,isScrollingUp:c,savedScroll:s}}var $=a(1743);const K=(0,p.j)({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...R(),...(0,d.CK)(),...A(),height:{type:[Number,String],default:64}},"VAppBar"),O=(0,m.RW)()({name:"VAppBar",props:K(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t;const n=(0,L.KR)(),o=(0,N.q)(e,"modelValue"),i=(0,l.EW)((()=>{const t=new Set(e.scrollBehavior?.split(" ")??[]);return{hide:t.has("hide"),fullyHide:t.has("fully-hide"),inverted:t.has("inverted"),collapse:t.has("collapse"),elevate:t.has("elevate"),fadeImage:t.has("fade-image")}})),r=(0,l.EW)((()=>{const e=i.value;return e.hide||e.fullyHide||e.inverted||e.collapse||e.elevate||e.fadeImage||!o.value})),{currentScroll:s,scrollThreshold:u,isScrollingUp:v,scrollRatio:p}=P(e,{canScroll:r}),m=(0,l.EW)((()=>i.value.hide||i.value.fullyHide)),f=(0,l.EW)((()=>e.collapse||i.value.collapse&&(i.value.inverted?p.value>0:0===p.value))),h=(0,l.EW)((()=>e.flat||i.value.fullyHide&&!o.value||i.value.elevate&&(i.value.inverted?s.value>0:0===s.value))),b=(0,l.EW)((()=>i.value.fadeImage?i.value.inverted?1-p.value:p.value:void 0)),y=(0,l.EW)((()=>{if(i.value.hide&&i.value.inverted)return 0;const e=n.value?.contentHeight??0,t=n.value?.extensionHeight??0;return m.value?s.value<u.value||i.value.fullyHide?e+t:e:e+t}));(0,$.Y)((0,l.EW)((()=>!!e.scrollBehavior)),(()=>{(0,l.nT)((()=>{m.value?i.value.inverted?o.value=s.value>u.value:o.value=v.value||s.value<u.value:o.value=!0}))}));const{ssrBootStyles:w}=(0,c.K)(),{layoutItemStyles:_}=(0,d.hc)({id:e.name,order:(0,l.EW)((()=>parseInt(e.order,10))),position:(0,L.lW)(e,"location"),layoutSize:y,elementSize:(0,L.IJ)(void 0),active:o,absolute:(0,L.lW)(e,"absolute")});return(0,g.C)((()=>{const t=M.filterProps(e);return(0,l.bF)(M,(0,l.v6)({ref:n,class:["v-app-bar",{"v-app-bar--bottom":"bottom"===e.location},e.class],style:[{..._.value,"--v-toolbar-image-opacity":b.value,height:void 0,...w.value},e.style]},t,{collapse:f.value,flat:h.value}),a)})),{}}});var Y=a(2807);const q=(0,p.j)({...(0,Y.x)({icon:"$menu",variant:"text"})},"VAppBarNavIcon"),J=(0,m.RW)()({name:"VAppBarNavIcon",props:q(),setup(e,t){let{slots:a}=t;return(0,g.C)((()=>(0,l.bF)(Y.D,(0,l.v6)(e,{class:["v-app-bar-nav-icon"]}),a))),{}}});var z=a(1720);function U(e,t,a,n,o,i){return(0,l.uX)(),(0,l.Wv)(O,{app:"",color:"white",flat:"",class:"header d-print-none",elevation:"1"},{default:(0,l.k6)((()=>[(0,l.bF)(J,{variant:"flat",class:"header-icon",size:"small",onClick:t[0]||(t[0]=e=>i.toggleDrawer("left",!a.leftDrawer))}),(0,l.bF)(S,{class:"header-title text-uppercase font-weight-medium"},{default:(0,l.k6)((()=>[(0,l.eW)((0,_.v_)(i.headBarName),1)])),_:1}),(0,l.bF)(z.h),(0,l.bF)(Y.D,{"prepend-icon":"mdi-logout",variant:"flat",class:"header-icon mr-2",size:"small",onClick:t[1]||(t[1]=t=>e.logout(a.user,this.$router))},{default:(0,l.k6)((()=>t[3]||(t[3]=[(0,l.eW)("Logout")]))),_:1}),(0,l.bF)(Y.D,{icon:"mdi-dots-vertical",variant:"flat",class:"header-icon mr-2",size:"small",onClick:t[2]||(t[2]=e=>i.toggleDrawer("right",!a.rightDrawer))})])),_:1})}var Q=a(376),G={name:"Header",props:{name:{type:String,required:!0},user:{type:Object,required:!0},leftDrawer:{type:Boolean,required:!0},rightDrawer:{type:Boolean,required:!0}},methods:{...(0,w.i0)(Q.nc,["logout"]),toggleDrawer(e,t){this.$emit("action",{t:e,value:t})}},computed:{headBarName(){return this.name.split("_").join(" ")}}},Z=a(1241);const ee=(0,Z.A)(G,[["render",U],["__scopeId","data-v-43c8df1a"]]);var te=ee,ae=a(9556),le=a(6449),ne=a(7254),oe=a(7294);function ie(e){let{rootEl:t,isSticky:a,layoutItemStyles:n}=e;const o=(0,L.IJ)(!1),i=(0,L.IJ)(0),r=(0,l.EW)((()=>{const e="boolean"===typeof o.value?"top":o.value;return[a.value?{top:"auto",bottom:"auto",height:void 0}:void 0,o.value?{[e]:(0,H.Dg)(i.value)}:{top:n.value.top}]}));(0,l.sV)((()=>{(0,l.wB)(a,(e=>{e?window.addEventListener("scroll",u,{passive:!0}):window.removeEventListener("scroll",u)}),{immediate:!0})})),(0,l.xo)((()=>{window.removeEventListener("scroll",u)}));let s=0;function u(){const e=s>window.scrollY?"up":"down",a=t.value.getBoundingClientRect(),l=parseFloat(n.value.top??0),r=window.scrollY-Math.max(0,i.value-l),u=a.height+Math.max(i.value,l)-window.scrollY-window.innerHeight,d=parseFloat(getComputedStyle(t.value).getPropertyValue("--v-body-scroll-y"))||0;a.height<window.innerHeight-l?(o.value="top",i.value=l):"up"===e&&"bottom"===o.value||"down"===e&&"top"===o.value?(i.value=window.scrollY+a.top-d,o.value=!0):"down"===e&&u<=0?(i.value=0,o.value="bottom"):"up"===e&&r<=0&&(d?"top"!==o.value&&(i.value=-r+d+l,o.value="top"):(i.value=a.top+r,o.value="top")),s=window.scrollY}return{isStuck:o,stickyStyles:r}}a(4114);const re=100,se=20;function ue(e){const t=1.41421356237;return(e<0?-1:1)*Math.sqrt(Math.abs(e))*t}function de(e){if(e.length<2)return 0;if(2===e.length)return e[1].t===e[0].t?0:(e[1].d-e[0].d)/(e[1].t-e[0].t);let t=0;for(let a=e.length-1;a>0;a--){if(e[a].t===e[a-1].t)continue;const l=ue(t),n=(e[a].d-e[a-1].d)/(e[a].t-e[a-1].t);t+=(n-l)*Math.abs(n),a===e.length-1&&(t*=.5)}return 1e3*ue(t)}function ce(){const e={};function t(t){Array.from(t.changedTouches).forEach((a=>{const l=e[a.identifier]??(e[a.identifier]=new H.CZ(se));l.push([t.timeStamp,a])}))}function a(t){Array.from(t.changedTouches).forEach((t=>{delete e[t.identifier]}))}function l(t){const a=e[t]?.values().reverse();if(!a)throw new Error(`No samples for touch id ${t}`);const l=a[0],n=[],o=[];for(const e of a){if(l[0]-e[0]>re)break;n.push({t:e[0],d:e[1].clientX}),o.push({t:e[0],d:e[1].clientY})}return{x:de(n),y:de(o),get direction(){const{x:e,y:t}=this,[a,l]=[Math.abs(e),Math.abs(t)];return a>l&&e>=0?"right":a>l&&e<=0?"left":l>a&&t>=0?"down":l>a&&t<=0?"up":ve()}}}return{addMovement:t,endTouch:a,getVelocity:l}}function ve(){throw new Error}function pe(e){let{el:t,isActive:a,isTemporary:n,width:o,touchless:i,position:r}=e;(0,l.sV)((()=>{window.addEventListener("touchstart",y,{passive:!0}),window.addEventListener("touchmove",w,{passive:!1}),window.addEventListener("touchend",_,{passive:!0})})),(0,l.xo)((()=>{window.removeEventListener("touchstart",y),window.removeEventListener("touchmove",w),window.removeEventListener("touchend",_)}));const s=(0,l.EW)((()=>["left","right"].includes(r.value))),{addMovement:u,endTouch:d,getVelocity:c}=ce();let v=!1;const p=(0,L.IJ)(!1),m=(0,L.IJ)(0),g=(0,L.IJ)(0);let f;function h(e,t){return("left"===r.value?e:"right"===r.value?document.documentElement.clientWidth-e:"top"===r.value?e:"bottom"===r.value?document.documentElement.clientHeight-e:me())-(t?o.value:0)}function b(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];const a="left"===r.value?(e-g.value)/o.value:"right"===r.value?(document.documentElement.clientWidth-e-g.value)/o.value:"top"===r.value?(e-g.value)/o.value:"bottom"===r.value?(document.documentElement.clientHeight-e-g.value)/o.value:me();return t?Math.max(0,Math.min(1,a)):a}function y(e){if(i.value)return;const t=e.changedTouches[0].clientX,l=e.changedTouches[0].clientY,c=25,p="left"===r.value?t<c:"right"===r.value?t>document.documentElement.clientWidth-c:"top"===r.value?l<c:"bottom"===r.value?l>document.documentElement.clientHeight-c:me(),y=a.value&&("left"===r.value?t<o.value:"right"===r.value?t>document.documentElement.clientWidth-o.value:"top"===r.value?l<o.value:"bottom"===r.value?l>document.documentElement.clientHeight-o.value:me());(p||y||a.value&&n.value)&&(f=[t,l],g.value=h(s.value?t:l,a.value),m.value=b(s.value?t:l),v=g.value>-20&&g.value<80,d(e),u(e))}function w(e){const t=e.changedTouches[0].clientX,a=e.changedTouches[0].clientY;if(v){if(!e.cancelable)return void(v=!1);const l=Math.abs(t-f[0]),n=Math.abs(a-f[1]),o=s.value?l>n&&l>3:n>l&&n>3;o?(p.value=!0,v=!1):(s.value?n:l)>3&&(v=!1)}if(!p.value)return;e.preventDefault(),u(e);const l=b(s.value?t:a,!1);m.value=Math.max(0,Math.min(1,l)),l>1?g.value=h(s.value?t:a,!0):l<0&&(g.value=h(s.value?t:a,!1))}function _(e){if(v=!1,!p.value)return;u(e),p.value=!1;const t=c(e.changedTouches[0].identifier),l=Math.abs(t.x),n=Math.abs(t.y),o=s.value?l>n&&l>400:n>l&&n>3;a.value=o?t.direction===({left:"right",right:"left",top:"down",bottom:"up"}[r.value]||me()):m.value>.5}const k=(0,l.EW)((()=>p.value?{transform:"left"===r.value?`translateX(calc(-100% + ${m.value*o.value}px))`:"right"===r.value?`translateX(calc(100% - ${m.value*o.value}px))`:"top"===r.value?`translateY(calc(-100% + ${m.value*o.value}px))`:"bottom"===r.value?`translateY(calc(100% - ${m.value*o.value}px))`:me(),transition:"none"}:void 0));return(0,$.Y)(p,(()=>{const e=t.value?.style.transform??null,a=t.value?.style.transition??null;(0,l.nT)((()=>{t.value?.style.setProperty("transform",k.value?.transform||"none"),t.value?.style.setProperty("transition",k.value?.transition||null)})),(0,L.jr)((()=>{t.value?.style.setProperty("transform",e),t.value?.style.setProperty("transition",a)}))})),{isDragging:p,dragProgress:m,dragStyles:k}}function me(){throw new Error}var ge=a(86),fe=a(8353),he=a(6314),be=a(2876),ye=a(5130),we=a(6892);const _e=["start","end","left","right","top","bottom"],ke=(0,p.j)({color:String,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,modelValue:{type:Boolean,default:null},permanent:Boolean,rail:{type:Boolean,default:null},railWidth:{type:[Number,String],default:56},scrim:{type:[Boolean,String],default:!0},image:String,temporary:Boolean,persistent:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},location:{type:String,default:"start",validator:e=>_e.includes(e)},sticky:Boolean,...(0,C.r)(),...(0,s.u)(),...(0,ge.e)(),...(0,fe.hx)({mobile:null}),...(0,I.s)(),...(0,d.CK)(),...(0,T.S)(),...(0,v.X)({tag:"nav"}),...(0,V.yx)()},"VNavigationDrawer"),Se=(0,m.RW)()({name:"VNavigationDrawer",props:ke(),emits:{"update:modelValue":e=>!0,"update:rail":e=>!0},setup(e,t){let{attrs:a,emit:n,slots:o}=t;const{isRtl:i}=(0,D.IA)(),{themeClasses:r}=(0,V.NX)(e),{borderClasses:s}=(0,C.M)(e),{backgroundColorClasses:u,backgroundColorStyles:v}=(0,x.z6)((0,L.lW)(e,"color")),{elevationClasses:p}=(0,I.j)(e),{displayClasses:m,mobile:f}=(0,fe._F)(e),{roundedClasses:h}=(0,T.v)(e),b=(0,he.rd)(),y=(0,N.q)(e,"modelValue",null,(e=>!!e)),{ssrBootStyles:w}=(0,c.K)(),{scopeId:_}=(0,be.b)(),k=(0,L.KR)(),S=(0,L.IJ)(!1),{runOpenDelay:B,runCloseDelay:H}=(0,ge.Z)(e,(e=>{S.value=e})),j=(0,l.EW)((()=>e.rail&&e.expandOnHover&&S.value?Number(e.width):Number(e.rail?e.railWidth:e.width))),R=(0,l.EW)((()=>(0,we.dO)(e.location,i.value))),M=(0,l.EW)((()=>e.persistent)),X=(0,l.EW)((()=>!e.permanent&&(f.value||e.temporary))),A=(0,l.EW)((()=>e.sticky&&!X.value&&"bottom"!==R.value));(0,$.Y)((()=>e.expandOnHover&&null!=e.rail),(()=>{(0,l.wB)(S,(e=>n("update:rail",!e)))})),(0,$.Y)((()=>!e.disableResizeWatcher),(()=>{(0,l.wB)(X,(t=>!e.permanent&&(0,l.dY)((()=>y.value=!t))))})),(0,$.Y)((()=>!e.disableRouteWatcher&&!!b),(()=>{(0,l.wB)(b.currentRoute,(()=>X.value&&(y.value=!1)))})),(0,l.wB)((()=>e.permanent),(e=>{e&&(y.value=!0)})),null!=e.modelValue||X.value||(y.value=e.permanent||!f.value);const{isDragging:P,dragProgress:K}=pe({el:k,isActive:y,isTemporary:X,width:j,touchless:(0,L.lW)(e,"touchless"),position:R}),O=(0,l.EW)((()=>{const t=X.value?0:e.rail&&e.expandOnHover?Number(e.railWidth):j.value;return P.value?t*K.value:t})),Y=(0,l.EW)((()=>["top","bottom"].includes(e.location)?0:j.value)),{layoutItemStyles:q,layoutItemScrimStyles:J}=(0,d.hc)({id:e.name,order:(0,l.EW)((()=>parseInt(e.order,10))),position:R,layoutSize:O,elementSize:Y,active:(0,l.EW)((()=>y.value||P.value)),disableTransitions:(0,l.EW)((()=>P.value)),absolute:(0,l.EW)((()=>e.absolute||A.value&&"string"!==typeof z.value))}),{isStuck:z,stickyStyles:U}=ie({rootEl:k,isSticky:A,layoutItemStyles:q}),Q=(0,x.z6)((0,l.EW)((()=>"string"===typeof e.scrim?e.scrim:null))),G=(0,l.EW)((()=>({...P.value?{opacity:.2*K.value,transition:"none"}:void 0,...J.value})));return(0,E.Uh)({VList:{bgColor:"transparent"}}),(0,g.C)((()=>{const t=o.image||e.image;return(0,l.bF)(l.FK,null,[(0,l.bF)(e.tag,(0,l.v6)({ref:k,onMouseenter:B,onMouseleave:H,class:["v-navigation-drawer",`v-navigation-drawer--${R.value}`,{"v-navigation-drawer--expand-on-hover":e.expandOnHover,"v-navigation-drawer--floating":e.floating,"v-navigation-drawer--is-hovering":S.value,"v-navigation-drawer--rail":e.rail,"v-navigation-drawer--temporary":X.value,"v-navigation-drawer--persistent":M.value,"v-navigation-drawer--active":y.value,"v-navigation-drawer--sticky":A.value},r.value,u.value,s.value,m.value,p.value,h.value,e.class],style:[v.value,q.value,w.value,U.value,e.style,["top","bottom"].includes(R.value)?{height:"auto"}:{}]},_,a),{default:()=>[t&&(0,l.bF)("div",{key:"image",class:"v-navigation-drawer__img"},[o.image?(0,l.bF)(F.K,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{alt:"",cover:!0,height:"inherit",src:e.image}}},o.image):(0,l.bF)(W.y,{key:"image-img",alt:"",cover:!0,height:"inherit",src:e.image},null)]),o.prepend&&(0,l.bF)("div",{class:"v-navigation-drawer__prepend"},[o.prepend?.()]),(0,l.bF)("div",{class:"v-navigation-drawer__content"},[o.default?.()]),o.append&&(0,l.bF)("div",{class:"v-navigation-drawer__append"},[o.append?.()])]}),(0,l.bF)(ye.eB,{name:"fade-transition"},{default:()=>[X.value&&(P.value||y.value)&&!!e.scrim&&(0,l.bF)("div",(0,l.v6)({class:["v-navigation-drawer__scrim",Q.backgroundColorClasses.value],style:[G.value,Q.backgroundColorStyles.value],onClick:()=>{M.value||(y.value=!1)}},_),null)]})])})),{isStuck:z}}}),Be={class:"d-flex align-center"};function Fe(e,t,a,n,o,i){return a.drawer?((0,l.uX)(),(0,l.Wv)(Se,{key:0,app:"",permanent:"",Left:"",class:"left-sidebar py-1 px-5 d-print-none"},{default:(0,l.k6)((()=>[(0,l.bF)(ae.x8,null,{default:(0,l.k6)((()=>[(0,l.Lk)("div",null,[(0,l.bF)(le.w,{class:"text-uppercase dashboard-title"},{default:(0,l.k6)((()=>t[0]||(t[0]=[(0,l.eW)("Dashboard")]))),_:1}),((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(i.roleBasedMenu,((t,a)=>((0,l.uX)(),(0,l.Wv)(ne.g,{key:a,nav:"",active:t.name===e.$route.name,to:i.getRoute(t),"prepend-icon":t.icon},{default:(0,l.k6)((()=>[(0,l.Lk)("div",Be,[(0,l.bF)(oe.U,null,{default:(0,l.k6)((()=>[(0,l.eW)((0,_.v_)(t.title),1)])),_:2},1024)])])),_:2},1032,["active","to","prepend-icon"])))),128))])])),_:1})])),_:1})):(0,l.Q3)("",!0)}var We={name:"LeftSidebar",props:{user:{type:Object,required:!0},route_data:{type:Object,required:!1},drawer:{type:Boolean,required:!0}},data(){return{menu:[{title:"Home",icon:"mdi-home",name:"home",allow:[2,4]},{title:"Project",icon:"mdi-file-document-multiple-outline",name:"moderate_projects",allow:[2]},{title:"Project",icon:"mdi-file-document-multiple-outline",name:"projects",allow:[4]},{title:"Tasks",icon:"mdi-format-list-bulleted",name:"tasks",allow:[4]},{title:"Tasks",icon:"mdi-format-list-bulleted",name:"moderate_tasks",allow:[2]},{title:"Reports",icon:"mdi-file-import-outline",name:"reports",allow:[4],route_resolver:e=>{}},{title:"Reports",icon:"mdi-file-import-outline",name:"moderate_reports",allow:[2]},{title:"Community",icon:"mdi-forum-outline",name:"community",allow:[4]},{title:"Evaluations",icon:"mdi-clipboard-edit-outline",name:"evaluations",allow:[2,3]},{title:"Evaluations",icon:"mdi-clipboard-edit-outline",name:"team_evaluation",allow:[4],route_resolver:e=>e.id},{title:"Home",icon:"mdi-home",name:"home_management",allow:[1]},{title:"Users",icon:"mdi-account-multiple-outline",name:"user_management",allow:[1]},{title:"Team",icon:"mdi-account-group-outline",name:"team_management",allow:[1]},{title:"Project",icon:"mdi-file-document-multiple-outline",name:"project_management",allow:[1]},{title:"Reports",icon:"mdi-file-import-outline",name:"report_management",allow:[1]},{title:"Evaluations",icon:"mdi-clipboard-edit-outline",name:"evaluations_management",allow:[1]}]}},methods:{getRoute(e){if(e.route_resolver&&this.route_data){const t=e.route_resolver(this.route_data);if(t)return{name:e.name,params:{team_id:t}}}return{name:e.name}}},computed:{roleBasedMenu(){const e=[],t=e=>t=>!!t.allow.includes(e)&&!!(!t.route_resolver||this.route_data&&this.route_data.id);if(this.menu.length)switch(e.push(...this.menu.filter(t(-1))),this.user.role_id){case 1:case 2:case 3:case 4:e.push(...this.menu.filter(t(this.user.role_id)));break}return e}}};const Ce=(0,Z.A)(We,[["render",Fe],["__scopeId","data-v-534ced3a"]]);var xe=Ce,Ee=a(4189),Ie=a(1606),De=a(7511),Te=a(9669),Ve=a(7505);function Le(e,t,a,n,o,s){const u=(0,l.g2)("VCalendar");return a.drawer?((0,l.uX)(),(0,l.Wv)(Se,{key:0,permanent:"",location:"right",width:"300",class:"py-1 d-print-none"},{default:(0,l.k6)((()=>[(0,l.bF)(i.L,{align:"center"},{default:(0,l.k6)((()=>[(0,l.bF)(r.B,{cols:"9"},{default:(0,l.k6)((()=>[(0,l.bF)(ne.g,{lines:"two",title:a.user.full_name,"prepend-avatar":e.getImage(a.user.image),subtitle:s.activeUserRole,nav:""},null,8,["title","prepend-avatar","subtitle"])])),_:1}),(0,l.bF)(r.B,{cols:"3"},{default:(0,l.k6)((()=>[(0,l.bF)(Y.D,{icon:"mdi-logout",size:"x-small",onClick:t[0]||(t[0]=t=>e.logout(a.user,this.$router))})])),_:1})])),_:1}),(0,l.bF)(De.G),(0,l.bF)(i.L,null,{default:(0,l.k6)((()=>[(0,l.bF)(r.B,null,{default:(0,l.k6)((()=>[(0,l.bF)(Ee.J,{class:"calendar-card ma-4",outlined:""},{default:(0,l.k6)((()=>[(0,l.bF)(u,{borderless:"","title-position":"left",attributes:s.populateCalendar()},null,8,["attributes"])])),_:1})])),_:1})])),_:1}),s.pendingTasks.length&&e.isStudent?((0,l.uX)(),(0,l.Wv)(i.L,{key:0},{default:(0,l.k6)((()=>[(0,l.bF)(r.B,null,{default:(0,l.k6)((()=>[(0,l.bF)(Ee.J,{class:"tasks-card ma-4",outlined:""},{default:(0,l.k6)((()=>[(0,l.bF)(Ie.r,{class:"dashboard-title"},{default:(0,l.k6)((()=>t[1]||(t[1]=[(0,l.eW)("Pending Tasks")]))),_:1}),(0,l.bF)(ae.x8,null,{default:(0,l.k6)((()=>[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(s.pendingTasks,((t,a)=>((0,l.uX)(),(0,l.Wv)(ne.g,{key:a,class:"pb-4"},{default:(0,l.k6)((()=>[(0,l.bF)(oe.U,null,{default:(0,l.k6)((()=>[(0,l.eW)((0,_.v_)(t.task_name),1)])),_:2},1024),(0,l.bF)(Ve.w,null,{default:(0,l.k6)((()=>[new Date(t.task_ends_at)>=new Date?((0,l.uX)(),(0,l.Wv)(Te.w,{key:0,class:"mr-1",color:"warning",icon:"mdi-clock-outline"})):(0,l.Q3)("",!0),new Date(t.task_ends_at)<=new Date?((0,l.uX)(),(0,l.Wv)(Te.w,{key:1,class:"mr-1",color:"red",icon:"mdi-clock-alert-outline"})):(0,l.Q3)("",!0),(0,l.eW)(" "+(0,_.v_)(e.$parseDateTime(t.task_ends_at)),1)])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})])),_:1})])),_:1})):(0,l.Q3)("",!0)])),_:1})):(0,l.Q3)("",!0)}var He={name:"RightSidebar",components:{},props:{tasks:{type:Array,required:!1},user:{type:Object,required:!0},drawer:{type:Boolean,required:!0}},data(){return{attributes:[]}},methods:{...(0,w.i0)(Q.nc,["logout"]),populateCalendar(){if(this.attributes=[{highlight:{color:"blue",fillMode:"outline"},key:"today",popover:{label:"Another beautiful day!"},dates:[new Date]}],this.tasks&&this.tasks.length)for(const e of this.tasks)e.task_submitted_at?this.attributes.push({highlight:"green",dates:[e.task_assigned_at],popover:{label:`${e.task_name} submitted!`}}):new Date(e.task_ends_at)<=new Date?this.attributes.push({highlight:"red",dates:[e.task_ends_at],popover:{label:`${e.task_name} exceeded deadline!`}}):this.attributes.push({dot:"orange",dates:[[e.task_assigned_at,e.task_ends_at]],popover:{label:`${e.task_name} ends soon!`}});return this.attributes}},computed:{...(0,w.aH)(Q.nc,["isStudent"]),...(0,w.aH)(Q.sk,["getImage"]),...(0,w.aH)(Q.sk,["getRoleName"]),pendingTasks(){return this.tasks&&this.tasks.length?this.tasks.filter((e=>!e.task_submitted_at)):[]},activeUserRole(){return this.getRoleName(this.user.role_id)||"Logged in"}}};const je=(0,Z.A)(He,[["render",Le],["__scopeId","data-v-e28f9714"]]);var Re=je,Me={name:"Main",data(){return{leftCol:3,rightCol:2,mainCol:7,leftDrawer:!0,rightDrawer:!1}},components:{HeadBar:te,LeftSidebar:xe,RightSidebar:Re},methods:{...(0,w.i0)(Q.sk,["getUserTasks","getProjects","getTeamByMember","getProjectReports","getProjectByTeam"]),updateDrawer(e){"left"===e.t&&(this.leftDrawer=e.value),"right"===e.t&&(this.rightDrawer=e.value)}},async created(){if(await this.getProjects(),this.isStudent){await this.getUserTasks(this.user.id);const e=await this.getTeamByMember(this.user.id);if(e){const t=await this.getProjectByTeam(e.id);await this.getProjectReports(t.project_id)}}},computed:{...(0,w.aH)(Q.kH,["user"]),...(0,w.aH)(Q.sk,["userTasks","userTeam"]),...(0,w.aH)(Q.nc,["isStudent"])}};const Ne=(0,Z.A)(Me,[["render",y],["__scopeId","data-v-45007702"]]);var Xe=Ne},2807:function(e,t,a){a.d(t,{D:function(){return H},x:function(){return L}});var l=a(6768),n=a(9923),o=a(9262),i=a(2858),r=a(2191),s=a(7018),u=a(3240),d=a(4663),c=a(7664),v=a(2428),p=a(144),m=a(4587),g=a(1247),f=a(4600);const h=(0,m.j)({baseColor:String,divided:Boolean,...(0,n.r)(),...(0,o.u)(),...(0,r.r)(),...(0,s.s)(),...(0,u.S)(),...(0,d.X)(),...(0,c.yx)(),...(0,v.gI)()},"VBtnGroup"),b=(0,g.RW)()({name:"VBtnGroup",props:h(),setup(e,t){let{slots:a}=t;const{themeClasses:o}=(0,c.NX)(e),{densityClasses:d}=(0,r.Q)(e),{borderClasses:v}=(0,n.M)(e),{elevationClasses:m}=(0,s.j)(e),{roundedClasses:g}=(0,u.v)(e);(0,i.Uh)({VBtn:{height:"auto",baseColor:(0,p.lW)(e,"baseColor"),color:(0,p.lW)(e,"color"),density:(0,p.lW)(e,"density"),flat:!0,variant:(0,p.lW)(e,"variant")}}),(0,f.C)((()=>(0,l.bF)(e.tag,{class:["v-btn-group",{"v-btn-group--divided":e.divided},o.value,v.value,d.value,m.value,g.value,e.class],style:e.style},a)))}});var y=a(4690);const w=Symbol.for("vuetify:v-btn-toggle"),_=(0,m.j)({...h(),...(0,y.gL)()},"VBtnToggle");(0,g.RW)()({name:"VBtnToggle",props:_(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t;const{isSelected:n,next:o,prev:i,select:r,selected:s}=(0,y.dB)(e,w);return(0,f.C)((()=>{const t=b.filterProps(e);return(0,l.bF)(b,(0,l.v6)({class:["v-btn-toggle",e.class]},t,{style:e.style}),{default:()=>[a.default?.({isSelected:n,next:o,prev:i,select:r,selected:s})]})})),{next:o,prev:i,select:r}}});var k=a(7852),S=a(9669),B=a(6106),F=a(2542),W=a(4581),C=a(9296),x=a(9788),E=a(8184),I=a(6314);function D(e,t){(0,l.wB)((()=>e.isActive?.value),(a=>{e.isLink.value&&a&&t&&(0,l.dY)((()=>{t(!0)}))}),{immediate:!0})}var T=a(3378),V=a(759);const L=(0,m.j)({active:{type:Boolean,default:void 0},activeColor:String,baseColor:String,symbol:{type:null,default:w},flat:Boolean,icon:[Boolean,String,Function,Object],prependIcon:W.TX,appendIcon:W.TX,block:Boolean,readonly:Boolean,slim:Boolean,stacked:Boolean,ripple:{type:[Boolean,Object],default:!0},text:String,...(0,n.r)(),...(0,o.u)(),...(0,r.r)(),...(0,F.X)(),...(0,s.s)(),...(0,y.TX)(),...(0,C.gi)(),...(0,x.M)(),...(0,E.S)(),...(0,u.S)(),...(0,I.WC)(),...(0,T.k)(),...(0,d.X)({tag:"button"}),...(0,c.yx)(),...(0,v.gI)({variant:"elevated"})},"VBtn"),H=(0,g.RW)()({name:"VBtn",props:L(),emits:{"group:selected":e=>!0},setup(e,t){let{attrs:a,slots:o}=t;const{themeClasses:i}=(0,c.NX)(e),{borderClasses:d}=(0,n.M)(e),{densityClasses:p}=(0,r.Q)(e),{dimensionStyles:m}=(0,F.S)(e),{elevationClasses:g}=(0,s.j)(e),{loaderClasses:h}=(0,C.pn)(e),{locationStyles:b}=(0,x.z)(e),{positionClasses:w}=(0,E.J)(e),{roundedClasses:_}=(0,u.v)(e),{sizeClasses:W,sizeStyles:L}=(0,T.X)(e),H=(0,y.aO)(e,e.symbol,!1),j=(0,I.iE)(e,a),R=(0,l.EW)((()=>void 0!==e.active?e.active:j.isLink.value?j.isActive?.value:H?.isSelected.value)),M=(0,l.EW)((()=>R.value?e.activeColor??e.color:e.color)),N=(0,l.EW)((()=>{const t=H?.isSelected.value&&(!j.isLink.value||j.isActive?.value)||!H||j.isActive?.value;return{color:t?M.value??e.baseColor:e.baseColor,variant:e.variant}})),{colorClasses:X,colorStyles:A,variantClasses:P}=(0,v.rn)(N),$=(0,l.EW)((()=>H?.disabled.value||e.disabled)),K=(0,l.EW)((()=>"elevated"===e.variant&&!(e.disabled||e.flat||e.border))),O=(0,l.EW)((()=>{if(void 0!==e.value&&"symbol"!==typeof e.value)return Object(e.value)===e.value?JSON.stringify(e.value,null,0):e.value}));function Y(e){$.value||j.isLink.value&&(e.metaKey||e.ctrlKey||e.shiftKey||0!==e.button||"_blank"===a.target)||(j.navigate?.(e),H?.toggle())}return D(j,H?.select),(0,f.C)((()=>{const t=j.isLink.value?"a":e.tag,a=!(!e.prependIcon&&!o.prepend),n=!(!e.appendIcon&&!o.append),r=!(!e.icon||!0===e.icon);return(0,l.bo)((0,l.bF)(t,(0,l.v6)({type:"a"===t?void 0:"button",class:["v-btn",H?.selectedClass.value,{"v-btn--active":R.value,"v-btn--block":e.block,"v-btn--disabled":$.value,"v-btn--elevated":K.value,"v-btn--flat":e.flat,"v-btn--icon":!!e.icon,"v-btn--loading":e.loading,"v-btn--readonly":e.readonly,"v-btn--slim":e.slim,"v-btn--stacked":e.stacked},i.value,d.value,X.value,p.value,g.value,h.value,w.value,_.value,W.value,P.value,e.class],style:[A.value,m.value,b.value,L.value,e.style],"aria-busy":!!e.loading||void 0,disabled:$.value||void 0,tabindex:e.loading||e.readonly?-1:void 0,onClick:Y,value:O.value},j.linkProps),{default:()=>[(0,v.wN)(!0,"v-btn"),!e.icon&&a&&(0,l.bF)("span",{key:"prepend",class:"v-btn__prepend"},[o.prepend?(0,l.bF)(k.K,{key:"prepend-defaults",disabled:!e.prependIcon,defaults:{VIcon:{icon:e.prependIcon}}},o.prepend):(0,l.bF)(S.w,{key:"prepend-icon",icon:e.prependIcon},null)]),(0,l.bF)("span",{class:"v-btn__content","data-no-activator":""},[!o.default&&r?(0,l.bF)(S.w,{key:"content-icon",icon:e.icon},null):(0,l.bF)(k.K,{key:"content-defaults",disabled:!r,defaults:{VIcon:{icon:e.icon}}},{default:()=>[o.default?.()??e.text]})]),!e.icon&&n&&(0,l.bF)("span",{key:"append",class:"v-btn__append"},[o.append?(0,l.bF)(k.K,{key:"append-defaults",disabled:!e.appendIcon,defaults:{VIcon:{icon:e.appendIcon}}},o.append):(0,l.bF)(S.w,{key:"append-icon",icon:e.appendIcon},null)]),!!e.loading&&(0,l.bF)("span",{key:"loader",class:"v-btn__loader"},[o.loader?.()??(0,l.bF)(B.x,{color:"boolean"===typeof e.loading?void 0:e.loading,indeterminate:!0,width:"2"},null)])]}),[[V.n,!$.value&&e.ripple,"",{center:!!e.icon}]])})),{group:H}}})},1720:function(e,t,a){a.d(t,{h:function(){return n}});a(5792);var l=a(2586);const n=(0,l.G)("v-spacer","div","VSpacer")},9562:function(e,t,a){a.d(t,{Qo:function(){return m},SM:function(){return g},mM:function(){return v},QG:function(){return p}});var l=a(5130),n=a(6768),o=a(4587),i=a(1247);const r=(0,o.j)({disabled:Boolean,group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:String,origin:String},"transition");function s(e,t,a){return(0,i.RW)()({name:e,props:r({mode:a,origin:t}),setup(t,a){let{slots:o}=a;const i={onBeforeEnter(e){t.origin&&(e.style.transformOrigin=t.origin)},onLeave(e){if(t.leaveAbsolute){const{offsetTop:t,offsetLeft:a,offsetWidth:l,offsetHeight:n}=e;e._transitionInitialStyles={position:e.style.position,top:e.style.top,left:e.style.left,width:e.style.width,height:e.style.height},e.style.position="absolute",e.style.top=`${t}px`,e.style.left=`${a}px`,e.style.width=`${l}px`,e.style.height=`${n}px`}t.hideOnLeave&&e.style.setProperty("display","none","important")},onAfterLeave(e){if(t.leaveAbsolute&&e?._transitionInitialStyles){const{position:t,top:a,left:l,width:n,height:o}=e._transitionInitialStyles;delete e._transitionInitialStyles,e.style.position=t||"",e.style.top=a||"",e.style.left=l||"",e.style.width=n||"",e.style.height=o||""}}};return()=>{const a=t.group?l.F:l.eB;return(0,n.h)(a,{name:t.disabled?"":e,css:!t.disabled,...t.group?void 0:{mode:t.mode},...t.disabled?{}:i},o.default)}}})}function u(e,t){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"in-out";return(0,i.RW)()({name:e,props:{mode:{type:String,default:a},disabled:Boolean,group:Boolean},setup(a,o){let{slots:i}=o;const r=a.group?l.F:l.eB;return()=>(0,n.h)(r,{name:a.disabled?"":e,css:!a.disabled,...a.disabled?{}:t},i.default)}})}var d=a(4232);function c(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const a=t?"width":"height",l=(0,d.PT)(`offset-${a}`);return{onBeforeEnter(e){e._parent=e.parentNode,e._initialStyle={transition:e.style.transition,overflow:e.style.overflow,[a]:e.style[a]}},onEnter(t){const n=t._initialStyle;t.style.setProperty("transition","none","important"),t.style.overflow="hidden";const o=`${t[l]}px`;t.style[a]="0",t.offsetHeight,t.style.transition=n.transition,e&&t._parent&&t._parent.classList.add(e),requestAnimationFrame((()=>{t.style[a]=o}))},onAfterEnter:o,onEnterCancelled:o,onLeave(e){e._initialStyle={transition:"",overflow:e.style.overflow,[a]:e.style[a]},e.style.overflow="hidden",e.style[a]=`${e[l]}px`,e.offsetHeight,requestAnimationFrame((()=>e.style[a]="0"))},onAfterLeave:n,onLeaveCancelled:n};function n(t){e&&t._parent&&t._parent.classList.remove(e),o(t)}function o(e){const t=e._initialStyle[a];e.style.overflow=e._initialStyle.overflow,null!=t&&(e.style[a]=t),delete e._initialStyle}}s("fab-transition","center center","out-in"),s("dialog-bottom-transition"),s("dialog-top-transition");const v=s("fade-transition"),p=(s("scale-transition"),s("scroll-x-transition"),s("scroll-x-reverse-transition"),s("scroll-y-transition"),s("scroll-y-reverse-transition"),s("slide-x-transition"),s("slide-x-reverse-transition"),s("slide-y-transition")),m=(s("slide-y-reverse-transition"),u("expand-transition",c())),g=u("expand-x-transition",c("",!0))},86:function(e,t,a){a.d(t,{Z:function(){return i},e:function(){return o}});var l=a(4587),n=a(9094);const o=(0,l.j)({closeDelay:[Number,String],openDelay:[Number,String]},"delay");function i(e,t){let a=()=>{};function l(l){a?.();const o=Number(l?e.openDelay:e.closeDelay);return new Promise((e=>{a=(0,n.v6)(o,(()=>{t?.(l),e(l)}))}))}function o(){return l(!0)}function i(){return l(!1)}return{clearDelay:a,runOpenDelay:o,runCloseDelay:i}}},2876:function(e,t,a){a.d(t,{b:function(){return n}});var l=a(7861);function n(){const e=(0,l.nI)("useScopeId"),t=e.vnode.scopeId;return{scopeId:t?{[t]:""}:void 0}}}}]);
//# sourceMappingURL=862.e91e8b0b.js.map