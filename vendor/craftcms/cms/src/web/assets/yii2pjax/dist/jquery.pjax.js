/*! For license information please see jquery.pjax.js.LICENSE.txt */
!function(t){function e(e,a,r){r=y(a,r);var i=function(e){var a=r;a.container||((a=t.extend({history:!0},r)).container=t(this).attr("data-pjax")),n(e,a)};return t(e).removeClass("data-pjax"),this.off("click.pjax",e,i).on("click.pjax",e,i)}function n(e,n,a){a=y(n,a);var i=e.currentTarget,o=t(i);if(0!==parseInt(o.data("pjax"))){if("A"!==i.tagName.toUpperCase())throw"$.fn.pjax or $.pjax.click requires an anchor element";if(!(e.which>1||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||location.protocol!==i.protocol||location.hostname!==i.hostname||i.href.indexOf("#")>-1&&x(i)==x(location)||e.isDefaultPrevented())){var s={url:i.href,container:o.attr("data-pjax"),target:i},c=t.extend({},s,a),l=t.Event("pjax:click");o.trigger(l,[c]),l.isDefaultPrevented()||(r(c),e.preventDefault(),o.trigger("pjax:clicked",[c]))}}}function a(e,n,a){if(!1===e.result)return!1;a=y(n,a);var i=e.currentTarget,o=t(i);if("FORM"!==i.tagName.toUpperCase())throw"$.pjax.submit requires a form element";var s={type:(o.attr("method")||"GET").toUpperCase(),url:o.attr("action"),container:o.attr("data-pjax"),target:i};if("GET"!==s.type&&void 0!==window.FormData)s.data=new FormData(i),s.processData=!1,s.contentType=!1;else{if(o.find(":file").length)return;s.data=o.serializeArray()}r(t.extend({},s,a)),e.preventDefault()}function r(e){e=t.extend(!0,{},t.ajaxSettings,r.defaults,e),t.isFunction(e.url)&&(e.url=e.url());var n=v(e.url).hash,a=t.type(e.container);if("string"!==a)throw"expected string value for 'container' option; got "+a;var i,s,c,l=e.context=t(e.container);if(!l.length)throw"the container selector '"+e.container+"' did not match anything";function u(n,a,r){r||(r={}),r.relatedTarget=e.target;var i=t.Event(n,r);return l.trigger(i,a),!i.isDefaultPrevented()}if(e.data||(e.data={}),t.isArray(e.data)?(e.data=t.grep(e.data,(function(t){return"_pjax"!==t.name})),e.data.push({name:"_pjax",value:e.container})):e.data._pjax=e.container,e.beforeSend=function(t,a){if("GET"!==a.type&&(a.timeout=0),t.setRequestHeader("X-PJAX","true"),t.setRequestHeader("X-PJAX-Container",e.container),a.ieRedirectCompatibility){var r=window.navigator.userAgent;(r.indexOf("MSIE ")>0||r.indexOf("Trident/")>0||r.indexOf("Edge/")>0)&&t.setRequestHeader("X-Ie-Redirect-Compatibility","true")}if(!u("pjax:beforeSend",[t,a]))return!1;a.timeout>0&&(i=setTimeout((function(){u("pjax:timeout",[t,e])&&t.abort("timeout")}),a.timeout),a.timeout=0);var o=v(a.url);n&&(o.hash=n),e.requestUrl=m(o),void 0===e.async||e.async||(u("pjax:start",[t,e]),u("pjax:send",[t,e]))},e.complete=function(t,n){i&&clearTimeout(i),u("pjax:complete",[t,n,e]),u("pjax:end",[t,e])},e.error=function(t,n,a){var r=w("",t,e),i=t.status>=301&&t.status<=303,s=i||u("pjax:error",[t,n,a,e]);(i||"GET"==e.type&&"abort"!==n&&s)&&(e.replaceRedirect?o(r.url):e.pushRedirect&&(window.history.pushState(null,"",r.url),window.location.replace(r.url)))},e.success=function(a,i,s){var c=r.state,p="function"==typeof t.pjax.defaults.version?t.pjax.defaults.version():t.pjax.defaults.version,f=s.getResponseHeader("X-PJAX-Version"),h=w(a,s,e),m=v(h.url);if(n&&(m.hash=n,h.url=m.href),p&&f&&p!==f)o(h.url);else if(h.contents){if(r.state={id:e.id||d(),url:h.url,title:h.title,container:e.container,fragment:e.fragment,timeout:e.timeout,cache:e.cache},e.history&&(e.push||e.replace)&&window.history.replaceState(r.state,h.title,h.url),t.contains(l,document.activeElement))try{document.activeElement.blur()}catch(t){}h.title&&(document.title=h.title),u("pjax:beforeReplace",[h.contents,e],{state:r.state,previousState:c}),l.html(h.contents);var x=l.find("input[autofocus], textarea[autofocus]").last()[0];if(x&&document.activeElement!==x&&x.focus(),function(e,n){if(e){var a=t("script[src]"),r=function(e){var r=this.src;a.filter((function(){return this.src===r})).length?e():r?(t.getScript(r).done(e).fail(e),document.head.appendChild(this)):(n.append(this),e())},i=0,o=function(){if(!(i>=e.length)){var t=e[i];i++,r.call(t,o)}};o()}}(h.scripts,l),function(e){if(e){var n=t("link[href]");e.each((function(){var t=this.href;n.filter((function(){return this.href===t})).length||document.head.appendChild(this)}))}}(h.links),"function"==typeof e.scrollTo)var y=e.scrollTo(l,n);else if(y=e.scrollTo,n||!0===y){var g=decodeURIComponent(n.slice(1)),j=!0===y?l:document.getElementById(g)||document.getElementsByName(g)[0];j&&(y=t(j).offset().top)}if("function"==typeof e.scrollOffset)var b=e.scrollOffset(y);else b=e.scrollOffset;"number"==typeof y&&((y+=b)<0&&(y=0),t(window).scrollTop(y)),u("pjax:success",[a,i,s,e])}else o(h.url)},r.state||(r.state={id:d(),url:window.location.href,title:document.title,container:e.container,fragment:e.fragment,timeout:e.timeout,cache:e.cache},e.history&&window.history.replaceState(r.state,document.title)),!(r.xhr&&r.xhr.readyState<4&&r.options.skipOuterContainers)){f(r.xhr),r.options=e;var p=r.xhr=t.ajax(e);return p.readyState>0&&(e.history&&e.push&&!e.replace&&(s=r.state.id,c=[e.container,h(l)],r.options.cache&&(b[s]=c,E.push(s),S(T,0),S(E,r.defaults.maxCacheLength)),window.history.pushState(null,"",e.requestUrl)),(void 0===e.async||e.async)&&(u("pjax:start",[p,e]),u("pjax:send",[p,e]))),r.xhr}}function i(e,n){var a={url:window.location.href,push:!1,replace:!0,scrollTo:!1};return r(t.extend(a,y(e,n)))}function o(t){r.options.history&&(window.history.replaceState(null,"",r.state.url),window.location.replace(t))}var s=!0,c=window.location.href,l=window.history.state;function u(e){s||f(r.xhr);var n,a=r.state,i=e.state;if(i&&i.container){if(s&&c==i.url)return;if(a){if(a.id===i.id)return;n=a.id<i.id?"forward":"back"}var l=b[i.id]||[],u=l[0]||i.container,p=t(u),d=l[1];if(p.length){var m={id:i.id,url:i.url,container:u,push:!1,fragment:i.fragment,timeout:i.timeout,cache:i.cache,scrollTo:!1};a&&m.cache&&function(t,e,n){var a,i;b[e]=n,"forward"===t?(a=E,i=T):(a=T,i=E),a.push(e),(e=i.pop())&&delete b[e],S(a,r.defaults.maxCacheLength)}(n,a.id,[u,h(p)]);var v=t.Event("pjax:popstate",{state:i,direction:n});if(p.trigger(v),d){p.trigger("pjax:start",[null,m]),r.state=i,i.title&&(document.title=i.title);var x=t.Event("pjax:beforeReplace",{state:i,previousState:a});p.trigger(x,[d,m]),p.html(d),p.trigger("pjax:end",[null,m])}else r(m);p[0].offsetHeight}else o(location.href)}s=!1}function p(e){var n=t.isFunction(e.url)?e.url():e.url,a=e.type?e.type.toUpperCase():"GET",r=t("<form>",{method:"GET"===a?"GET":"POST",action:n,style:"display:none"});"GET"!==a&&"POST"!==a&&r.append(t("<input>",{type:"hidden",name:"_method",value:a.toLowerCase()}));var i=e.data;if("string"==typeof i)t.each(i.split("&"),(function(e,n){var a=n.split("=");r.append(t("<input>",{type:"hidden",name:a[0],value:a[1]}))}));else if(t.isArray(i))t.each(i,(function(e,n){r.append(t("<input>",{type:"hidden",name:n.name,value:n.value}))}));else if("object"==typeof i){var o;for(o in i)r.append(t("<input>",{type:"hidden",name:o,value:i[o]}))}t(document.body).append(r),r.submit()}function f(e){e&&e.readyState<4&&(e.onreadystatechange=t.noop,e.abort())}function d(){return(new Date).getTime()}function h(e){var n=e.clone();return n.find("script").each((function(){this.src||t._data(this,"globalEval",!1)})),n.contents()}function m(t){return t.search=t.search.replace(/([?&])(_pjax|_)=[^&]*/g,"").replace(/^&/,""),t.href.replace(/\?($|#)/,"$1")}function v(t){var e=document.createElement("a");return e.href=t,e}function x(t){return t.href.replace(/#.*/,"")}function y(e,n){return e&&n?((n=t.extend({},n)).container=e,n):t.isPlainObject(e)?e:{container:e}}function g(t,e){return t.filter(e).add(t.find(e))}function j(e){return t.parseHTML(e,document,!0)}function w(e,n,a){var r,i,o={},s=/<html/i.test(e),c=n.getResponseHeader("X-PJAX-URL");if(o.url=c?m(v(c)):a.requestUrl,s){i=t(j(e.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));var l=e.match(/<head[^>]*>([\s\S.]*)<\/head>/i);r=null!=l?t(j(l[0])):i}else r=i=t(j(e));if(0===i.length)return o;if(o.title=g(r,"title").last().text(),a.fragment){var u=i;"body"!==a.fragment&&(u=g(u,a.fragment).first()),u.length&&(o.contents="body"===a.fragment?u:u.contents(),o.title||(o.title=u.attr("title")||u.data("title")))}else s||(o.contents=i);return o.contents&&(o.contents=o.contents.not((function(){return t(this).is("title")})),o.contents.find("title").remove(),o.scripts=g(o.contents,"script").remove(),o.contents=o.contents.not(o.scripts),o.links=g(o.contents,"link[href]").remove(),o.contents=o.contents.not(o.links)),o.title&&(o.title=t.trim(o.title)),o}l&&l.container&&(r.state=l),"state"in window.history&&(s=!1);var b={},T=[],E=[];function S(t,e){for(;t.length>e;)delete b[t.shift()]}function C(){return t("meta").filter((function(){var e=t(this).attr("http-equiv");return e&&"X-PJAX-VERSION"===e.toUpperCase()})).attr("content")}function R(){t.fn.pjax=e,t.pjax=r,t.pjax.enable=t.noop,t.pjax.disable=k,t.pjax.click=n,t.pjax.submit=a,t.pjax.reload=i,t.pjax.defaults={history:!0,cache:!0,timeout:650,push:!0,replace:!1,type:"GET",dataType:"html",scrollTo:0,scrollOffset:0,maxCacheLength:20,version:C,pushRedirect:!1,replaceRedirect:!0,skipOuterContainers:!1,ieRedirectCompatibility:!0},t(window).on("popstate.pjax",u)}function k(){t.fn.pjax=function(){return this},t.pjax=p,t.pjax.enable=R,t.pjax.disable=t.noop,t.pjax.click=t.noop,t.pjax.submit=t.noop,t.pjax.reload=function(){window.location.reload()},t(window).off("popstate.pjax",u)}t.event.props&&t.inArray("state",t.event.props)<0?t.event.props.push("state"):"state"in t.Event.prototype||t.event.addProp("state"),t.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/),t.support.pjax?R():k()}(jQuery);