/**
 * fullPage Pure Javascript v.0.0.8 (Alpha) - Not support given until Beta version.
 * https://github.com/alvarotrigo/fullPage.js
 * MIT licensed
 *
 * Copyright (C) 2013 alvarotrigo.com - A project by Alvaro Trigo
 */
(function (n, m, C, v, e) {
    "function" === typeof define && define.amd ? define(function () {
        n.fullpage = v(m, C);
        return n.fullpage
    }) : "object" === typeof exports ? module.exports = v(m, C) : n.fullpage = v(m, C)
})(this, window, document, function (n, m, C) {
    function v(a, b) {
        for (var c in b)b.hasOwnProperty(c) && null !== c && (a.style[c] = b[c]);
        return a
    }

    function e(a, b) {
        b = b || m;
        return b.querySelector(a)
    }

    function p(a, b) {
        b = b || m;
        return b.querySelectorAll(a)
    }

    function q(a) {
        for (var b = 0; a = a.previousSibling;)3 == a.nodeType && /^\s*$/.test(a.data) || b++;
        return b
    }

    function sa(a, b) {
        a.style.display = "undefined" !== typeof b ? b ? "block" : "none" : "block" == a.style.display ? "none" : "block";
        return a
    }

    function w(a, b) {
        return !!a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
    }

    function B(a, b) {
        a && w(a, b) && (a.className = a.className.replace(new RegExp("(\\s|^)" + b + "(\\s|$)"), ""))
    }

    function t(a, b) {
        a && !w(a, b) && (a.className += " " + b)
    }

    function I(a, b) {
        return a && (b(a) ? a : I(a.parentNode, b))
    }

    function R() {
        return "innerHeight" in n ? n.innerHeight : m.documentElement.offsetHeight
    }

    function J(a) {
        a.preventDefault ?
            a.preventDefault() : a.returnValue = !1
    }

    function z(a) {
        var b = {};
        return a && "[object Function]" === b.toString.call(a)
    }

    function K(a, b, c) {
        b = b.split(" ");
        for (var d = 0, e = b.length; d < e; d++)m.addEventListener ? a.addEventListener(b[d], c, !1) : a.attachEvent(b[d], c, !1)
    }

    function ea(a, b, c, d) {
        var e = Ra(a), k = b - e, g = 0;
        S = !0;
        var l = function () {
            if (S) {
                var m = b;
                g += 20;
                m = Math.easeInOutCubic(g, e, k, c);
                ta(a, m);
                g < c ? setTimeout(l, 20) : "undefined" !== typeof d && d()
            } else g < c && d()
        };
        l()
    }

    function fa() {
        var a = m.documentElement;
        return (n.pageYOffset || a.scrollTop) -
            (a.clientTop || 0)
    }

    function ua(a) {
        for (a = a.nextSibling; a && 1 != a.nodeType;)a = a.nextSibling;
        return a
    }

    function va(a) {
        for (a = a.previousSibling; a && 1 != a.nodeType;)a = a.previousSibling;
        return a
    }

    function Ra(a) {
        return a.self != n && w(a, "fp-slides") ? a.scrollLeft : !d.autoScrolling || d.scrollBar ? fa() : a.offsetTop
    }

    function ta(a, b) {
        !d.autoScrolling || d.scrollBar || a.self != n && w(a, "fp-slides") ? a.self != n && w(a, "fp-slides") ? a.scrollLeft = b : a.scrollTo(0, b) : a.style.top = b + "px"
    }

    function wa(a, b) {
        T("autoScrolling", a, b);
        var c = e(".fp-section.active");
        d.autoScrolling && !d.scrollBar ? (v(m.body, {
            overflow: "hidden",
            height: "100%"
        }), v(m.getElementsByTagName("html")[0], {
            overflow: "hidden",
            height: "100%"
        }), ga(d.recordHistory, "internal"), v(r, {
            "-ms-touch-action": "none",
            "touch-action": "none"
        }), c && L(c.offsetTop)) : (v(m.body, {
            overflow: "visible",
            height: "100%"
        }), v(m.getElementsByTagName("html")[0], {
            overflow: "visible",
            height: "100%"
        }), ga(!1, "internal"), v(r, {
            "-ms-touch-action": "",
            "touch-action": ""
        }), L(0), c = U(c.offsetTop), c.element.scrollTo(0, c.options))
    }

    function ga(a,
                b) {
        T("recordHistory", a, b)
    }

    function M(a, b) {
        T("scrollingSpeed", a, b)
    }

    function V() {
        var a = va(e(".fp-section.active"));
        a && A(a, null, !0)
    }

    function ha() {
        var a = ua(e(".fp-section.active"));
        a && A(a, null, !1)
    }

    function W(a, b) {
        var c = xa(a);
        "undefined" !== typeof b ? ia(a, b) : c && A(c)
    }

    function X() {
        ya("next")
    }

    function Y() {
        ya("prev")
    }

    function za(a) {
        if (!w(r, "fp-destroyed")) {
            u = !0;
            Aa = R();
            for (var b = p(".fp-section"), c = 0; c < b.length; ++c) {
                var f = b[c], h = e(".fp-slides", f), f = p(".fp-slide", f);
                h && 1 < f.length && N(h, e(".fp-slide.active", h))
            }
            b =
                e(".fp-section.active");
            q(b) && L(b.offsetTop);
            u = !1;
            z(d.afterResize) && a && d.afterResize.call(r);
            z(d.afterReBuild) && !a && d.afterReBuild.call(r)
        }
    }

    function Sa() {
        var a = m.createElement("div");
        a.setAttribute("id", "fp-nav");
        var b = m.createElement("ul");
        a.appendChild(b);
        m.body.appendChild(a);
        x = e("#fp-nav");
        x.style.color = d.navigationColor;
        t(x, d.navigationPosition);
        d.showActiveTooltip && t(x, "fp-show-active");
        a = "";
        for (b = 0; b < p(".fp-section").length; b++) {
            var c = "";
            d.anchors.length && (c = d.anchors[b]);
            a = a + '<li><a href="#' +
                c + '"><span></span></a>';
            c = d.navigationTooltips[b];
            typeof c !== C && "" !== c && (a += '<div class="fp-tooltip ' + d.navigationPosition + '">' + c + "</div>");
            a += "</li>"
        }
        b = e("ul", x);
        b.innerHTML += a;
        a = p(".fp-slidesNav a");
        for (b = 0; b < a.length; b++)K(a[b], "click onclick touchstart", function (a) {
            a = n.event || a || a.originalEvent;
            J(a);
            a = q(this.parentNode);
            A(p(".fp-section")[a], null, !1)
        })
    }

    function Ta() {
        var a;
        if (!d.autoScrolling || d.scrollBar) {
            for (var b = fa(), c = 0, f = Math.abs(b - p(".fp-section")[0].offsetTop), h = p(".fp-section"), k = 0; k <
            h.length; ++k) {
                var g = Math.abs(b - h[k].offsetTop);
                g < f && (c = k, f = g)
            }
            a = p(".fp-section")[c]
        }
        if (!d.autoScrolling || d.scrollBar) {
            if (!w(a, "active")) {
                ja = !0;
                b = e(".fp-section.active");
                c = q(b) + 1;
                f = Ba(a);
                h = a.getAttribute("data-anchor");
                k = q(a) + 1;
                if (g = e(".fp-slide.active", a))var l = g.getAttribute("data-anchor"), m = q(g);
                E && (B(b, "active"), t(a, "active"), z(d.onLeave) && d.onLeave.call(b, c, k, f), z(d.afterLoad) && d.afterLoad.call(a, h, k), Z(h, 0), d.anchors.length && (F = h, ka(m, l, h, k)));
                clearTimeout(Ca);
                Ca = setTimeout(function () {
                        ja = !1
                    },
                    100)
            }
            d.fitToSection && (clearTimeout(Da), Da = setTimeout(function () {
                if (E && !d.autoScrolling || d.scrollBar) q(e(".fp-section.active")) == q(a) && (u = !0), A(a), u = !1
            }, 1E3))
        }
    }

    function aa(a) {
        "down" == a ? ha() : V()
    }

    function Ua(a) {
        var b = n.event || b || b.originalEvent;
        la(b) && (d.autoScrolling && J(a), a = e(".fp-section.active"), a = p(".fp-slides", a), E && !G && (b = Ea(b), O = b.y, ba = b.x, a && Math.abs(ca - ba) > Math.abs(P - O) ? Math.abs(ca - ba) > ("innerWidth" in n ? n.innerWidth : m.documentElement.offsetWidth) / 100 * d.touchSensitivity && (ca > ba ? X() : Y()) : d.autoScrolling &&
        Math.abs(P - O) > R() / 100 * d.touchSensitivity && (P > O ? aa("down") : O > P && aa("up"))))
    }

    function la(a) {
        return "undefined" === typeof a.pointerType || "mouse" != a.pointerType
    }

    function Va(a) {
        var b = n.event || b || b.originalEvent;
        d.fitToSection && (S = !1);
        la(b) && (a = Ea(b), P = a.y, ca = a.x)
    }

    function Fa(a, b) {
        for (var c = 0, d = a.slice(Math.max(a.length - b, 1)), e = 0; e < d.length; e++)c += d[e];
        return Math.ceil(c / b)
    }

    function Wa(a) {
        var b = (new Date).getTime();
        if (d.autoScrolling) {
            a = n.event || a || a.originalEvent;
            var c = a.wheelDelta || -a.deltaY || -a.detail,
                f = Math.max(-1, Math.min(1, c));
            149 < H.length && H.shift();
            H.push(Math.abs(c));
            d.scrollBar && J(a);
            a = b - Ga;
            Ga = b;
            200 < a && (H = []);
            E && (b = Fa(H, 10), a = Fa(H, 70), b >= a && (0 > f ? aa("down") : aa("up")));
            return !1
        }
        d.fitToSection && (S = !1)
    }

    function ya(a) {
        var b = e(".fp-section.active");
        if ((b = e(".fp-slides", b)) && !G) {
            var c = e(".fp-slide.active", b), f = null, f = "prev" === a ? va(c) : ua(c);
            if (!f) {
                if (!d.loopHorizontal)return;
                for (var f = c.parentNode.firstChild, h = []; f; f = f.nextSibling)1 == f.nodeType && f != c && h.push(f);
                f = "prev" === a ? h[h.length - 1] : h[0]
            }
            G = !0;
            N(b, f)
        }
    }

    function A(a, b, c) {
        if (null !== a && (b = {
                element: a,
                callback: b,
                isMovementUp: c,
                dtop: a.offsetTop,
                yMovement: Ba(a),
                anchorLink: a.getAttribute("data-anchor"),
                sectionIndex: q(a),
                activeSlide: e(".fp-slide.active", a),
                activeSection: e(".fp-section.active"),
                leavingSection: q(e(".fp-section.active")) + 1,
                localIsResizing: u
            }, !(q(b.activeSection) == b.sectionIndex && !u || d.scrollBar && fa() === b.dtop))) {
            if (b.activeSlide)var f = b.activeSlide.getAttribute("data-anchor"), h = q(b.activeSlide);
            c = p(".fp-section");
            for (var k = 0; k < c.length; k++)B(c[k],
                "active");
            t(a, "active");
            E = !1;
            ka(h, f, b.anchorLink, b.sectionIndex);
            z(d.onLeave) && !b.localIsResizing && d.onLeave.call(b.activeSection, b.leavingSection, b.sectionIndex + 1, b.yMovement);
            Xa(b);
            F = b.anchorLink;
            Z(b.anchorLink, b.sectionIndex)
        }
    }

    function Xa(a) {
        if (d.css3 && d.autoScrolling && !d.scrollBar) Ha("translate3d(0px, -" + a.dtop + "px, 0px)", !0), d.scrollingSpeed ? setTimeout(function () {
            ma(a)
        }, d.scrollingSpeed) : ma(a); else {
            var b = U(a.dtop);
            ea(b.element, b.options, d.scrollingSpeed, function () {
                ma(a)
            })
        }
    }

    function U(a) {
        var b =
            {};
        d.autoScrolling && !d.scrollBar ? (b.options = -a, b.element = e(".fullpage-wrapper")) : (b.options = a, b.element = n);
        return b
    }

    function ma(a) {
        z(d.afterLoad) && !a.localIsResizing && d.afterLoad.call(a.element, a.anchorLink, a.sectionIndex + 1);
        E = !0;
        z(a.callback) && a.callback.call(this)
    }

    function Ya() {
        var a = n.location.hash.replace("#", "").split("/"), b = a[0], a = a[1];
        b && ia(b, a)
    }

    function Za(a) {
        var b = this;
        b.self == n && (b = a.target || a.srcElement);
        w(b, "fp-prev") ? Y() : X()
    }

    function Ia() {
        if (!ja) {
            var a = n.location.hash.replace("#", "").split("/"),
                b = a[0], a = a[1];
            if (b.length) {
                var c = "undefined" === typeof F, d = "undefined" === typeof F && "undefined" === typeof a && !G;
                (b && b !== F && !c || d || !G && na != a) && ia(b, a)
            }
        }
    }

    function N(a, b) {
        var c = q(b), f = I(a, function (a) {
            return w(a, "fp-section")
        }), h = q(f), k = f.getAttribute("data-anchor"), g = e(".fp-slidesNav", f), l = Ja(b), m = u;
        if (d.onSlideLeave) {
            var n = e(".fp-slide.active", f), r = q(n), v;
            v = r == c ? "none" : r > c ? "left" : "right";
            m || "none" === v || z(d.onSlideLeave) && d.onSlideLeave.call(n, k, h + 1, r, v)
        }
        n = p(".fp-slide", f);
        for (r = 0; r < n.length; r++)B(n[r],
            "active");
        t(b, "active");
        !d.loopHorizontal && d.controlArrows && (sa(e(".fp-controlArrow.fp-prev", f), 0 !== c), sa(e(".fp-controlArrow.fp-next", f), !b.is(":last-child")));
        w(f, "active") && ka(c, l, k, h);
        var x = function () {
            m || z(d.afterSlideLoad) && d.afterSlideLoad.call(b, k, h + 1, l, c);
            G = !1
        };
        d.css3 ? (f = "translate3d(-" + Math.round(b.offsetLeft) + "px, 0px, 0px)", n = e(".fp-slidesContainer", a), Ka(n, 0 < d.scrollingSpeed), La(n, f), setTimeout(function () {
            x()
        }, d.scrollingSpeed, d.easing)) : ea(a, Math.round(b.offsetLeft), d.scrollingSpeed,
            function () {
                x()
            });
        d.slidesNavigation && (B(e(".active", g), "active"), g = p("li", g)[c], g = e("a", g), t(g, "active"))
    }

    function $a() {
        if (oa) {
            if ("text" !== m.activeElement.getAttribute("type")) {
                var a = R();
                Math.abs(a - pa) > 20 * Math.max(pa, a) / 100 && (za(!0), pa = a)
            }
        } else clearTimeout(Ma), Ma = setTimeout(function () {
            za(!0)
        }, 350)
    }

    function Ka(a) {
        var b = "all " + d.scrollingSpeed + "ms " + d.easingcss3;
        B(a, "fp-notransition");
        v(a, {"-webkit-transition": b, transition: b});
        return a
    }

    function Z(a, b) {
        if (d.menu) {
            var c = e(d.menu);
            c && (B(e(".active", c),
                "active"), t(e('[data-menuanchor="' + a + '"]', c), "active"))
        }
        d.navigation && (B(e(".active", x), "active"), a ? t(e('a[href="#' + a + '"]', x), "active") : (c = p("li", x)[b], t(e("a", c), "active")))
    }

    function Ba(a) {
        var b = q(e(".fp-section.active"));
        a = q(a);
        return b == a ? "none" : b > a ? "up" : "down"
    }

    function Ha(a, b) {
        b ? Ka(r) : t(r, "fp-notransition");
        La(r, a);
        setTimeout(function () {
            B(r, "fp-notransition")
        }, 10)
    }

    function xa(a) {
        var b = e('.fp-section[data-anchor="' + a + '"]');
        b || (b = p(".fp-section")[a - 1]);
        return b
    }

    function ia(a, b) {
        var c = xa(a);
        "undefined" === typeof b && (b = 0);
        a === F || w(c, "active") ? Na(c, b) : A(c, function () {
            Na(c, b)
        })
    }

    function Na(a, b) {
        if ("undefined" !== typeof b) {
            var c = e(".fp-slides", a), d;
            d = e(".fp-slides", a);
            var h = e('.fp-slide[data-anchor="' + b + '"]', d);
            d && !h && (h = p(".fp-slide", d)[b]);
            (d = h) && N(c, d)
        }
    }

    function ka(a, b, c, e) {
        e = "";
        d.anchors.length && (a ? ("undefined" !== typeof c && (e = c), "undefined" === typeof b && (b = a), na = b, Oa(e + "/" + b)) : ("undefined" !== typeof a && (na = b), Oa(c)));
        qa()
    }

    function Oa(a) {
        if (d.recordHistory) location.hash = a; else if (oa || ra) history.replaceState(C,
            C, "#" + a); else {
            var b = n.location.href.split("#")[0];
            n.location.replace(b + "#" + a)
        }
    }

    function Ja(a) {
        var b = a.getAttribute("data-anchor");
        a = q(a);
        b || (b = a);
        return b
    }

    function qa(a) {
        a = e(".fp-section.active");
        var b = e(".fp-slide.active", a), c = a.getAttribute("data-anchor");
        a = q(a);
        a = String(a);
        d.anchors.length && (a = c);
        b && (b = Ja(b), a = a + "-" + b);
        a = a.replace("/", "-").replace("#", "");
        m.body.className = m.body.className.replace(RegExp("\\b\\s?fp-viewing-[^\\s]+\\b", "g"), "");
        t(m.body, "fp-viewing-" + a)
    }

    function da(a, b, c, d, e) {
        a.addEventListener ?
            (a.addEventListener(c, b, !1), "undefined" !== typeof e && a.addEventListener(e, b, !1)) : a.attachEvent(d, b)
    }

    function Ea(a) {
        var b = [];
        b.y = "undefined" !== typeof a.pageY && (a.pageY || a.pageX) ? a.pageY : a.touches[0].pageY;
        b.x = "undefined" !== typeof a.pageX && (a.pageY || a.pageX) ? a.pageX : a.touches[0].pageX;
        ra && la(a) && (b.y = a.touches[0].pageY, b.x = a.touches[0].pageX);
        return b
    }

    function Pa(a, b) {
        M(0, "internal");
        "undefined" !== typeof b && (u = !0);
        var c = I(a, function (a) {
            return w(a, "fp-slides")
        });
        N(c, a);
        "undefined" !== typeof b && (u = !1);
        M(Q.scrollingSpeed, "internal")
    }

    function L(a) {
        d.scrollBar ? (a = U(a), ta(a.element, a.options, 0)) : d.css3 ? Ha("translate3d(0px, -" + a + "px, 0px)", !1) : r.style.top = -a + "px"
    }

    function La(a, b) {
        v(a, {"-webkit-transform": b, "-moz-transform": b, "-ms-transform": b, transform: b})
    }

    function T(a, b, c) {
        d[a] = b;
        "internal" !== c && (Q[a] = b)
    }

    var d, G = !1, oa = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/), ra = "ontouchstart" in n || 0 < navigator.msMaxTouchPoints ||
        navigator.maxTouchPoints, Aa = R(), u = !1, F, na, E = !0, H = [], x, S, Q, r;
    Math.easeInOutCubic = function (a, b, c, d) {
        return 1 > (a /= d / 2) ? c / 2 * a * a * a + b : c / 2 * ((a -= 2) * a * a + 2) + b
    };
    var Ca, Da, ja = !1, P = 0, ca = 0, O = 0, ba = 0, Ga = (new Date).getTime();
    m.addEventListener ? n.addEventListener("hashchange", Ia, !1) : n.attachEvent("onhashchange", Ia);
    var Qa;
    m.onkeydown = function (a) {
        clearTimeout(Qa);
        var b = m.activeElement.tagName;
        if ("SELECT" !== b && "INPUT" !== b && d.keyboardScrolling && d.autoScrolling) {
            a = n.event || a || a.originalEvent;
            for (var c = a.charCode || a.keyCode,
                     b = [40, 38, 32, 33, 34], e = 0; e < b.length; e++)b[e] == c && J(a);
            var h = a.shiftKey;
            Qa = setTimeout(function () {
                switch (c) {
                    case 38:
                    case 33:
                        V();
                        break;
                    case 32:
                        if (h) {
                            V();
                            break
                        }
                    case 40:
                    case 34:
                        ha();
                        break;
                    case 36:
                        W(1);
                        break;
                    case 35:
                        W(p(".fp-section").length);
                        break;
                    case 37:
                        Y();
                        break;
                    case 39:
                        X()
                }
            }, 150)
        }
    };
    null !== e(".fp-slidesNav a") && K(e(".fp-slidesNav a"), "click onclick touchstart", function (a) {
        J(a);
        a = I(this, function (a) {
            return w(e1, "fp-section")
        });
        a = e(".fp-slides", a);
        var b = I(this, function (a) {
                return "li" === a.tagName
            }), b = q(b),
            b = p(".fp-slide", a)[b];
        N(a, b)
    });
    var pa = Aa, Ma;
    return {
        initialize: function (a, b) {
            var c = {
                menu: !1,
                anchors: [],
                navigation: !1,
                navigationPosition: "right",
                navigationColor: "#000",
                navigationTooltips: [],
                showActiveTooltip: !1,
                slidesNavigation: !1,
                slidesNavPosition: "bottom",
                scrollBar: !1,
                css3: !0,
                scrollingSpeed: 700,
                autoScrolling: !0,
                fitToSection: !0,
                easingcss3: "ease",
                loopHorizontal: !0,
                touchSensitivity: 5,
                keyboardScrolling: !0,
                recordHistory: !0,
                controlArrows: !0,
                sectionSelector: ".section",
                slideSelector: ".slide",
                afterLoad: null,
                onLeave: null,
                afterRender: null,
                afterResize: null,
                afterReBuild: null,
                afterSlideLoad: null,
                onSlideLeave: null
            }, f = b;
            "object" !== typeof f && (f = {});
            for (var h in f)c.hasOwnProperty(h) && (c[h] = f[h]);
            d = c;
            c = d;
            if (null === c || "object" !== typeof c) Q = c; else {
                var f = c.constructor(), k;
                for (k in c)c.hasOwnProperty(k) && (f[k] = c[k]);
                Q = f
            }
            r = e(a);
            B(r, "fp-destroyed");
            for (k = 0; k < d.anchors.length; k++)c = d.anchors[k], (m.getElementById("#" + c) || p('[name="' + c + '"]').length) && console && console.error && console.error("fullPage: data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).");
            if (d.css3) {
                k = d;
                var c = m.createElement("p"), g, f = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
                m.body.insertBefore(c, null);
                for (var l in f)c.style[l] !== C && (c.style[l] = "translate3d(1px,1px,1px)", g = n.getComputedStyle(c).getPropertyValue(f[l]));
                m.body.removeChild(c);
                k.css3 = g !== C && 0 < g.length && "none" !== g
            }
            null !== r ? (v(r, {
                height: "100%",
                position: "relative"
            }), t(r, "fullpage-wrapper"), t(e("html"), "fp-enabled")) : console &&
            console.error && console.error("fullPage: Error! Fullpage.js needs to be initialized with a selector. For example: fullpage('#fullpage');");
            da(e(".fullpage-wrapper"), Wa, "mousewheel", "onmousewheel", "wheel");
            if (oa || ra) g = e(".fullpage-wrapper"), m.addEventListener && (l = n.PointerEvent ? {
                down: "pointerdown",
                move: "pointermove"
            } : {
                down: "MSPointerDown",
                move: "MSPointerMove"
            }, g.removeEventListener("touchstart"), g.removeEventListener(l.down), g.removeEventListener("touchmove"), g.removeEventListener(l.move), K(g, "touchstart " +
                l.down, Va), K(g, "touchmove " + l.move, Ua));
            da(n, $a, "resize", "onresize");
            da(n, Ta, "scroll", "onscroll", "onscroll");
            l = p(d.sectionSelector);
            for (g = 0; g < l.length; ++g)t(l[g], "fp-section");
            l = p(d.slideSelector);
            for (g = 0; g < l.length; ++g)t(l[g], "fp-slide");
            d.navigation && Sa();
            l = p(".fp-section");
            for (g = 0; g < l.length; g++)if (f = g, c = l[g], k = p(".fp-slide", c), h = k.length, f || null !== e(".fp-section.active") || t(c, "active"), "undefined" !== typeof d.anchors[f] && (c.setAttribute("data-anchor", d.anchors[f]), w(c, "active") && Z(d.anchors[f],
                    f)), 0 < h) {
                var y = 100 * h, f = 100 / h;
                c.innerHTML = '<div class="fp-slides"><div class="fp-slidesContainer">' + c.innerHTML + "</div></div>";
                k = p(".fp-slide", c);
                e(".fp-slidesContainer", c).style.width = y + "%";
                if (d.controlArrows && 1 < h) {
                    var y = c, u = m.createElement("div");
                    u.className = "fp-controlArrow fp-prev";
                    var D = m.createElement("div");
                    D.className = "fp-controlArrow fp-next";
                    var A = e(".fp-slides", y);
                    A.parentNode.appendChild(u);
                    A.parentNode.appendChild(D);
                    d.loopHorizontal || (e(".fp-controlArrow.fp-prev", y).style.display = "none")
                }
                if (d.slidesNavigation) {
                    y =
                        c;
                    u = m.createElement("div");
                    u.className = "fp-slidesNav";
                    D = m.createElement("ul");
                    u.appendChild(D);
                    y.appendChild(u);
                    y = e(".fp-slidesNav", y);
                    u = e("ul", y);
                    t(y, d.slidesNavPosition);
                    D = "";
                    for (A = 0; A < h; A++)D += '<li><a href="#"><span></span></a></li>';
                    u.innerHTML += D;
                    h = "-" + y.offsetWidth / 2 + "px";
                    y.style["margin-left"] = h;
                    h = p("li", y)[0];
                    t(e("a", h), "active")
                }
                for (h = 0; h < k.length; h++)k[h].style.width = f + "%";
                c = e(".fp-slide.active", c);
                null !== typeof c ? t(k[0], "active") : Pa(c)
            }
            g = p(".fp-controlArrow");
            for (l = 0; l < g.length; l++)K(g[l],
                "click onclick touchstart", Za);
            wa(d.autoScrolling, "internal");
            g = e(".fp-section.active");
            l = e(".fp-slide.active", g);
            k = q(e(".fp-section.active"));
            l && (0 !== k || 0 === k && 0 !== q(l)) && Pa(l);
            d.navigation && (x.style["margin-top"] = "-" + x.offsetHeight / 2 + "px", l = p("li", x)[q(e(".fp-section.active"))], t(e("a", l), "active"));
            l = e(".fp-section.active");
            z(d.afterLoad) && d.afterLoad.call(l, l.getAttribute("data-anchor"), q(l) + 1);
            z(d.afterRender) && d.afterRender.call(r);
            l = n.location.hash.replace("#", "").split("/")[0];
            l.length && (k =
                e('[data-anchor="' + l + '"]'), !d.animateAnchor && k.length && (d.autoScrolling ? L(k.offsetTop) : (L(0), qa(l), c = U(k.offsetTop), ea(c.element, c.options, 0)), Z(l, null), z(d.afterLoad) && d.afterLoad.call(k, l, q(k) + 1), B(g, "active"), t(k, "active")));
            qa();
            da(m, Ya, "DOMContentLoaded", "DOMContentLoaded", "DOMContentLoaded")
        }, moveSectionUp: V, moveSectionDown: ha, moveTo: W, silentMoveTo: function (a, b) {
            M(0, "internal");
            W(a, b);
            M(Q.scrollingSpeed, "internal")
        }, moveSlideRight: X, moveSlideLeft: Y, setAutoScrolling: wa, setFitToSection: function (a,
                                                                                                 b) {
            T("fitToSection", a, b)
        }, setKeyboardScrolling: function (a) {
            d.keyboardScrolling = a
        }, setRecordHistory: ga, setScrollingSpeed: M
    }
});