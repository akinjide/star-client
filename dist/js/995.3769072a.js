"use strict";(self["webpackChunkstar_client"]=self["webpackChunkstar_client"]||[]).push([[995],{8995:function(e,l,t){t.d(l,{x:function(){return N}});var a=t(6768),n=t(5130),o=t(9562),s=t(3416),i=t(9669),u=t(9262),r=t(8353),c=t(7308),v=t(4690),d=t(4581),p=t(5296),f=t(5399),b=t(4663),h=t(144);function g(e){let{selectedElement:l,containerElement:t,isRtl:a,isHorizontal:n}=e;const o=I(n,t),s=F(n,a,t),i=I(n,l),u=C(n,l),r=.4*i;return s>u?u-r:s+o<u+i?u-o+i+r:s}function y(e){let{selectedElement:l,containerElement:t,isHorizontal:a}=e;const n=I(a,t),o=C(a,l),s=I(a,l);return o-n/2+s/2}function m(e,l){const t=e?"scrollWidth":"scrollHeight";return l?.[t]||0}function k(e,l){const t=e?"clientWidth":"clientHeight";return l?.[t]||0}function F(e,l,t){if(!t)return 0;const{scrollLeft:a,offsetWidth:n,scrollWidth:o}=t;return e?l?o-n+a:a:t.scrollTop}function I(e,l){const t=e?"offsetWidth":"offsetHeight";return l?.[t]||0}function C(e,l){const t=e?"offsetLeft":"offsetTop";return l?.[t]||0}var x=t(4587),w=t(1247),S=t(6993),W=t(9094),E=t(4600);const _=Symbol.for("vuetify:v-slide-group"),A=(0,x.j)({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:_},nextIcon:{type:d.TX,default:"$next"},prevIcon:{type:d.TX,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>"boolean"===typeof e||["always","desktop","mobile"].includes(e)},...(0,u.u)(),...(0,r.hx)({mobile:null}),...(0,b.X)(),...(0,v.gL)({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),V=(0,w.RW)()({name:"VSlideGroup",props:A(),emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:t}=l;const{isRtl:n}=(0,p.IA)(),{displayClasses:s,mobile:u}=(0,r._F)(e),d=(0,v.dB)(e,e.symbol),b=(0,h.IJ)(!1),C=(0,h.IJ)(0),x=(0,h.IJ)(0),w=(0,h.IJ)(0),_=(0,a.EW)((()=>"horizontal"===e.direction)),{resizeRef:A,contentRect:V}=(0,f.w)(),{resizeRef:B,contentRect:R}=(0,f.w)(),z=(0,c.pP)(),M=(0,a.EW)((()=>({container:A.el,duration:200,easing:"easeOutQuart"}))),T=(0,a.EW)((()=>d.selected.value.length?d.items.value.findIndex((e=>e.id===d.selected.value[0])):-1)),X=(0,a.EW)((()=>d.selected.value.length?d.items.value.findIndex((e=>e.id===d.selected.value[d.selected.value.length-1])):-1));if(S.ZK){let l=-1;(0,a.wB)((()=>[d.selected.value,V.value,R.value,_.value]),(()=>{cancelAnimationFrame(l),l=requestAnimationFrame((()=>{if(V.value&&R.value){const e=_.value?"width":"height";x.value=V.value[e],w.value=R.value[e],b.value=x.value+1<w.value}if(T.value>=0&&B.el){const l=B.el.children[X.value];L(l,e.centerActive)}}))}))}const K=(0,h.IJ)(!1);function L(e,l){let t=0;t=l?y({containerElement:A.el,isHorizontal:_.value,selectedElement:e}):g({containerElement:A.el,isHorizontal:_.value,isRtl:n.value,selectedElement:e}),H(t)}function H(e){if(!S.ZK||!A.el)return;const l=I(_.value,A.el),t=F(_.value,n.value,A.el),a=m(_.value,A.el);if(!(a<=l||Math.abs(e-t)<16)){if(_.value&&n.value&&A.el){const{scrollWidth:l,offsetWidth:t}=A.el;e=l-t-e}_.value?z.horizontal(e,M.value):z(e,M.value)}}function O(e){const{scrollTop:l,scrollLeft:t}=e.target;C.value=_.value?t:l}function P(e){if(K.value=!0,b.value&&B.el)for(const l of e.composedPath())for(const e of B.el.children)if(e===l)return void L(e)}function j(e){K.value=!1}let D=!1;function G(e){D||K.value||e.relatedTarget&&B.el?.contains(e.relatedTarget)||$(),D=!1}function J(){D=!0}function N(e){function l(l){e.preventDefault(),$(l)}B.el&&(_.value?"ArrowRight"===e.key?l(n.value?"prev":"next"):"ArrowLeft"===e.key&&l(n.value?"next":"prev"):"ArrowDown"===e.key?l("next"):"ArrowUp"===e.key&&l("prev"),"Home"===e.key?l("first"):"End"===e.key&&l("last"))}function $(e){if(!B.el)return;let l;if(e)if("next"===e){if(l=B.el.querySelector(":focus")?.nextElementSibling,!l)return $("first")}else if("prev"===e){if(l=B.el.querySelector(":focus")?.previousElementSibling,!l)return $("last")}else"first"===e?l=B.el.firstElementChild:"last"===e&&(l=B.el.lastElementChild);else{const e=(0,W.OW)(B.el);l=e[0]}l&&l.focus({preventScroll:!0})}function q(e){const l=_.value&&n.value?-1:1,t=("prev"===e?-l:l)*x.value;let a=C.value+t;if(_.value&&n.value&&A.el){const{scrollWidth:e,offsetWidth:l}=A.el;a+=e-l}H(a)}const Q=(0,a.EW)((()=>({next:d.next,prev:d.prev,select:d.select,isSelected:d.isSelected}))),U=(0,a.EW)((()=>{switch(e.showArrows){case"always":return!0;case"desktop":return!u.value;case!0:return b.value||Math.abs(C.value)>0;case"mobile":return u.value||b.value||Math.abs(C.value)>0;default:return!u.value&&(b.value||Math.abs(C.value)>0)}})),Z=(0,a.EW)((()=>Math.abs(C.value)>1)),Y=(0,a.EW)((()=>{if(!A.value)return!1;const e=m(_.value,A.el),l=k(_.value,A.el),t=e-l;return t-Math.abs(C.value)>1}));return(0,E.C)((()=>(0,a.bF)(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!_.value,"v-slide-group--has-affixes":U.value,"v-slide-group--is-overflowing":b.value},s.value,e.class],style:e.style,tabindex:K.value||d.selected.value.length?-1:0,onFocus:G},{default:()=>[U.value&&(0,a.bF)("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!Z.value}],onMousedown:J,onClick:()=>Z.value&&q("prev")},[t.prev?.(Q.value)??(0,a.bF)(o.mM,null,{default:()=>[(0,a.bF)(i.w,{icon:n.value?e.nextIcon:e.prevIcon},null)]})]),(0,a.bF)("div",{key:"container",ref:A,class:"v-slide-group__container",onScroll:O},[(0,a.bF)("div",{ref:B,class:"v-slide-group__content",onFocusin:P,onFocusout:j,onKeydown:N},[t.default?.(Q.value)])]),U.value&&(0,a.bF)("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!Y.value}],onMousedown:J,onClick:()=>Y.value&&q("next")},[t.next?.(Q.value)??(0,a.bF)(o.mM,null,{default:()=>[(0,a.bF)(i.w,{icon:n.value?e.prevIcon:e.nextIcon},null)]})])]}))),{selected:d.selected,scrollTo:q,scrollOffset:C,focus:$,hasPrev:Z,hasNext:Y}}});var B=t(2858),R=t(7664),z=t(2428);const M=Symbol.for("vuetify:v-chip-group"),T=(0,x.j)({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:W.bD},...A(),...(0,u.u)(),...(0,v.gL)({selectedClass:"v-chip--selected"}),...(0,b.X)(),...(0,R.yx)(),...(0,z.gI)({variant:"tonal"})},"VChipGroup");(0,w.RW)()({name:"VChipGroup",props:T(),emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:t}=l;const{themeClasses:n}=(0,R.NX)(e),{isSelected:o,select:s,next:i,prev:u,selected:r}=(0,v.dB)(e,M);return(0,B.Uh)({VChip:{color:(0,h.lW)(e,"color"),disabled:(0,h.lW)(e,"disabled"),filter:(0,h.lW)(e,"filter"),variant:(0,h.lW)(e,"variant")}}),(0,E.C)((()=>{const l=V.filterProps(e);return(0,a.bF)(V,(0,a.v6)(l,{class:["v-chip-group",{"v-chip-group--column":e.column},n.value,e.class],style:e.style}),{default:()=>[t.default?.({isSelected:o,select:s,next:i,prev:u,selected:r.value})]})})),{}}});var X=t(7852),K=t(9923),L=t(2191),H=t(7018),O=t(2067),P=t(3240),j=t(6314),D=t(3378),G=t(759);const J=(0,x.j)({activeClass:String,appendAvatar:String,appendIcon:d.TX,closable:Boolean,closeIcon:{type:d.TX,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:d.TX,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:(0,W.uR)(),onClickOnce:(0,W.uR)(),...(0,K.r)(),...(0,u.u)(),...(0,L.r)(),...(0,H.s)(),...(0,v.TX)(),...(0,P.S)(),...(0,j.WC)(),...(0,D.k)(),...(0,b.X)({tag:"span"}),...(0,R.yx)(),...(0,z.gI)({variant:"tonal"})},"VChip"),N=(0,w.RW)()({name:"VChip",directives:{Ripple:G.n},props:J(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,l){let{attrs:t,emit:u,slots:r}=l;const{t:c}=(0,p.Ym)(),{borderClasses:d}=(0,K.M)(e),{colorClasses:f,colorStyles:b,variantClasses:h}=(0,z.rn)(e),{densityClasses:g}=(0,L.Q)(e),{elevationClasses:y}=(0,H.j)(e),{roundedClasses:m}=(0,P.v)(e),{sizeClasses:k}=(0,D.X)(e),{themeClasses:F}=(0,R.NX)(e),I=(0,O.q)(e,"modelValue"),C=(0,v.aO)(e,M,!1),x=(0,j.iE)(e,t),w=(0,a.EW)((()=>!1!==e.link&&x.isLink.value)),S=(0,a.EW)((()=>!e.disabled&&!1!==e.link&&(!!C||e.link||x.isClickable.value))),W=(0,a.EW)((()=>({"aria-label":c(e.closeLabel),onClick(e){e.preventDefault(),e.stopPropagation(),I.value=!1,u("click:close",e)}})));function E(e){u("click",e),S.value&&(x.navigate?.(e),C?.toggle())}function _(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),E(e))}return()=>{const l=x.isLink.value?"a":e.tag,t=!(!e.appendIcon&&!e.appendAvatar),u=!(!t&&!r.append),c=!(!r.close&&!e.closable),v=!(!r.filter&&!e.filter)&&C,p=!(!e.prependIcon&&!e.prependAvatar),A=!(!p&&!r.prepend),V=!C||C.isSelected.value;return I.value&&(0,a.bo)((0,a.bF)(l,(0,a.v6)({class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":S.value,"v-chip--filter":v,"v-chip--pill":e.pill},F.value,d.value,V?f.value:void 0,g.value,y.value,m.value,k.value,h.value,C?.selectedClass.value,e.class],style:[V?b.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,tabindex:S.value?0:void 0,onClick:E,onKeydown:S.value&&!w.value&&_},x.linkProps),{default:()=>[(0,z.wN)(S.value,"v-chip"),v&&(0,a.bF)(o.SM,{key:"filter"},{default:()=>[(0,a.bo)((0,a.bF)("div",{class:"v-chip__filter"},[r.filter?(0,a.bF)(X.K,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},r.filter):(0,a.bF)(i.w,{key:"filter-icon",icon:e.filterIcon},null)]),[[n.aG,C.isSelected.value]])]}),A&&(0,a.bF)("div",{key:"prepend",class:"v-chip__prepend"},[r.prepend?(0,a.bF)(X.K,{key:"prepend-defaults",disabled:!p,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},r.prepend):(0,a.bF)(a.FK,null,[e.prependIcon&&(0,a.bF)(i.w,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&(0,a.bF)(s.y,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),(0,a.bF)("div",{class:"v-chip__content","data-no-activator":""},[r.default?.({isSelected:C?.isSelected.value,selectedClass:C?.selectedClass.value,select:C?.select,toggle:C?.toggle,value:C?.value.value,disabled:e.disabled})??e.text]),u&&(0,a.bF)("div",{key:"append",class:"v-chip__append"},[r.append?(0,a.bF)(X.K,{key:"append-defaults",disabled:!t,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},r.append):(0,a.bF)(a.FK,null,[e.appendIcon&&(0,a.bF)(i.w,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&(0,a.bF)(s.y,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),c&&(0,a.bF)("button",(0,a.v6)({key:"close",class:"v-chip__close",type:"button"},W.value),[r.close?(0,a.bF)(X.K,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},r.close):(0,a.bF)(i.w,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}),[[(0,a.gN)("ripple"),S.value&&e.ripple,null]])}}})}}]);
//# sourceMappingURL=995.3769072a.js.map