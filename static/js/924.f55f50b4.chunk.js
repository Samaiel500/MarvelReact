"use strict";(self.webpackChunkmarvel=self.webpackChunkmarvel||[]).push([[924],{6501:function(e,s,n){n.r(s);var r=n(885),c=n(7689),t=n(2791),a=n(4304),l=n(3957),i=n(2523),o=n(184);s.default=function(e){var s=e.Component,n=e.dataType,u=(0,c.UO)().id,d=(0,t.useState)(null),f=(0,r.Z)(d,2),h=f[0],m=f[1],x=(0,a.Z)(),j=x.getComic,k=x.getCharacter,p=x.clearError,_=x.process,v=x.setProcess;(0,t.useEffect)((function(){N()}),[u]);var N=function(){switch(p(),n){case"comic":j(u).then(w).then((function(){return v("confirmed")}));break;case"character":k(u).then(w).then((function(){return v("confirmed")}))}},w=function(e){m(e)};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l.Z,{}),(0,i.Z)(_,s,h)]})}},2523:function(e,s,n){n.d(s,{Z:function(){return l}});var r=n(1059),c=n(184),t=function(){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("p",{className:"char__select",children:"Please select a character to see information"}),(0,c.jsxs)("div",{className:"skeleton",children:[(0,c.jsxs)("div",{className:"pulse skeleton__header",children:[(0,c.jsx)("div",{className:"pulse skeleton__circle"}),(0,c.jsx)("div",{className:"pulse skeleton__mini"})]}),(0,c.jsx)("div",{className:"pulse skeleton__block"}),(0,c.jsx)("div",{className:"pulse skeleton__block"}),(0,c.jsx)("div",{className:"pulse skeleton__block"})]})]})},a=n(3394),l=function(e,s,n){switch(e){case"waiting":return(0,c.jsx)(t,{});case"loaded":return(0,c.jsx)(a.Z,{});case"confirmed":return(0,c.jsx)(s,{data:n});case"error":return(0,c.jsx)(r.Z,{});default:throw new Error("Unexpected process state")}}}}]);
//# sourceMappingURL=924.f55f50b4.chunk.js.map