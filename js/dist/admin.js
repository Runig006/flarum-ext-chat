module.exports=function(e){var t={};function s(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,s),r.l=!0,r.exports}return s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=33)}({30:function(e,t){e.exports=flarum.core.compat.app},31:function(e,t){e.exports=flarum.core.compat["components/PermissionGrid"]},33:function(e,t,s){"use strict";s.r(t);s(9);var n=s(30),r=s.n(n);s(31);r.a.initializers.add("xelson-chat",(function(e){e.extensionData.for("xelson-chat").registerSetting({setting:"xelson-chat.settings.charlimit",label:e.translator.trans("xelson-chat.admin.settings.charlimit"),type:"number"}).registerSetting({setting:"xelson-chat.settings.floodgate.number",label:e.translator.trans("xelson-chat.admin.settings.floodgate.number"),type:"number"}).registerSetting({setting:"xelson-chat.settings.floodgate.time",label:e.translator.trans("xelson-chat.admin.settings.floodgate.time"),type:"text"}).registerSetting({setting:"xelson-chat.settings.display.minimize",label:e.translator.trans("xelson-chat.admin.settings.display.minimize"),type:"switch"}).registerSetting({setting:"xelson-chat.settings.display.censor",label:e.translator.trans("xelson-chat.admin.settings.display.censor"),type:"switch"}).registerPermission({icon:"fas fa-eye",label:e.translator.trans("xelson-chat.admin.permissions.enabled"),permission:"xelson-chat.permissions.enabled",allowGuest:!0},"view").registerPermission({icon:"fas fa-comment-medical",label:e.translator.trans("xelson-chat.admin.permissions.create.chat"),permission:"xelson-chat.permissions.create"},"start").registerPermission({icon:"fas fa-comment-medical",label:e.translator.trans("xelson-chat.admin.permissions.create.channel"),permission:"xelson-chat.permissions.create.channel"},"start").registerPermission({icon:"fas fa-comments",label:e.translator.trans("xelson-chat.admin.permissions.post"),permission:"xelson-chat.permissions.chat"},"reply").registerPermission({icon:"fas fa-pencil-alt",label:e.translator.trans("xelson-chat.admin.permissions.edit"),permission:"xelson-chat.permissions.edit"},"reply").registerPermission({icon:"far fa-trash-alt",label:e.translator.trans("xelson-chat.admin.permissions.delete"),permission:"xelson-chat.permissions.delete"},"reply").registerPermission({icon:"fas fa-eye",label:e.translator.trans("xelson-chat.admin.permissions.moderate.vision"),permission:"xelson-chat.permissions.moderate.vision"},"moderate").registerPermission({icon:"far fa-trash-alt",label:e.translator.trans("xelson-chat.admin.permissions.moderate.delete"),permission:"xelson-chat.permissions.moderate.delete"},"moderate")}))},9:function(e,t){e.exports=flarum.core.compat.extend}});
//# sourceMappingURL=admin.js.map