import { ref, watch, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext, onMounted, computed, openBlock, createBlock, Fragment, renderList, withModifiers, withDirectives, vModelText, createCommentVNode, vModelCheckbox, vModelSelect, renderSlot, isRef, toHandlers, vModelRadio, createSSRApp, h as h$1 } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderSlot, ssrLooseContain } from "vue/server-renderer";
import { usePage, useForm, Head, Link, router, createInertiaApp } from "@inertiajs/vue3";
import QRCodeVue3 from "qrcode-vue3";
import moment from "moment/moment.js";
import { toast } from "vue3-toastify";
import moment$1 from "moment";
import VOtpInput from "vue3-otp-input";
import axios$1 from "axios";
import { truncate, sortBy, startCase } from "lodash";
import GiGridImages from "@chinhpd/vue3-grid-images";
import { QuillEditor } from "@vueup/vue-quill";
import "autolinker";
import { register } from "swiper/element/bundle";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
import InfiniteLoading from "v3-infinite-loading";
import VueSelect from "vue-select";
import VCalendar from "v-calendar";
const formatStartEndDate = (date) => {
  let [prefix, suffix] = date ? date.split(" - ").map((e2) => e2.trim()) : [];
  if (prefix) {
    return `${moment(prefix).format("MMMM, YYYY")} - ${suffix.toLowerCase() === "current" ? "Current" : moment(suffix).format("MMMM, YYYY")}`;
  }
};
const stripHtml = (html) => {
  let tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};
const _btoa = (data) => {
  return btoa(JSON.stringify(data));
};
const _sfc_main$K = {
  __name: "SideBar",
  __ssrInlineRender: true,
  setup(__props) {
    let invitation_type = ref("peer");
    let invitation_link = ref(null);
    watch(() => invitation_type, (value) => {
      let url = `${usePage().props.ziggy.url}/register?hook=${_btoa(JSON.stringify({
        user_id: usePage().props.auth.user.id,
        type: value
      }))}`;
      invitation_link.value = url;
    }, { immediate: true, deep: true });
    let menus = [
      { title: "Home", icon: "fa-house fa-duotone", href: route("feeds"), active: ["Dashboard", "Feeds/Post", "Feeds/PostEdit"].includes(usePage().component) },
      { title: "Appointments", icon: "fad fa-calendar-star", href: route("appointment.index"), active: ["Appointments/Index"].includes(usePage().component) },
      { title: "Messages", icon: "fad fa-comment-dots", href: route("messages.index"), active: ["Messages/Conversation", "Messages/Index"].includes(usePage().component) },
      { title: "People", icon: "fad fa-people-group", href: route("search.people"), active: ["People"].includes(usePage().component) },
      { title: "Profile", icon: "fad fa-user-edit", href: route("profile.index", { slug: usePage().props.auth.user.slug }), active: ["Profile/Index"].includes(usePage().component) },
      { title: "Connections", icon: "fad fa-users", href: route("profile.connections", { slug: usePage().props.auth.user.slug }), active: ["Profile/Networks"].includes(usePage().component) }
      // { title: "Learning Box", icon: "fa-duotone fa-folder-closed", href: route( 'learning-box' ) },
      // { title: "Community", icon: "fad fa-users", href: route( 'community' ) },
      // { title: "Ranking", icon: "fad fa-chart-line", href: route( 'ranking' ) },
      // { title: "Analytics", icon: "fad fa-chart-column", href: route( 'analytics' ) },
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "vertical-menu" }, _attrs))}><div class="navbar-brand-box"><a href="/" class="logo logo-dark"><span class="logo-sm"><img loading="lazy" src="/favicon.png" alt="" width="30"></span><span class="logo-lg"><img loading="lazy" src="/logo.png" alt="" width="130"></span></a></div><button type="button" class="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"><i class="fa fa-fw fa-bars"></i></button><div data-simplebar class="sidebar-menu-scroll"><div id="sidebar-menu"><ul class="metismenu list-unstyled mt-3" id="side-menu"><!--[-->`);
      ssrRenderList(unref(menus), (menu) => {
        _push(`<li class="${ssrRenderClass({ "mm-active": menu.active })}">`);
        _push(ssrRenderComponent(_component_Link, {
          href: menu.href
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="${ssrRenderClass(menu.icon)}"${_scopeId}></i> <span${_scopeId}>${ssrInterpolate(menu.title)}</span>`);
            } else {
              return [
                createVNode("i", {
                  class: menu.icon
                }, null, 2),
                createTextVNode(),
                createVNode("span", null, toDisplayString(menu.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--><li>`);
      _push(ssrRenderComponent(_component_Link, { href: "#" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fad fa-chart-pie"${_scopeId}></i> <span${_scopeId}>Skill Meter</span><span class="badge bg-primary font-size-10 rounded-pill float-end"${_scopeId}>Coming Soon</span>`);
          } else {
            return [
              createVNode("i", { class: "fad fa-chart-pie" }),
              createTextVNode(),
              createVNode("span", null, "Skill Meter"),
              createVNode("span", { class: "badge bg-primary font-size-10 rounded-pill float-end" }, "Coming Soon")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul><div class="d-none d-md-block" style="${ssrRenderStyle({ "height": "5vh" })}"></div><hr><div class="py-1 logo" style="${ssrRenderStyle({ "line-height": "unset" })}"><span class="logo-lg"><div class="text-start mx-2"><p class="mb-0">Save QRcode to invite friends as:</p><!--[-->`);
      ssrRenderList(["peer", "protege", "mentor"], (i2) => {
        _push(`<div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="type"${ssrRenderAttr("id", i2)}${ssrRenderAttr("value", i2)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(invitation_type), i2)) ? " checked" : ""}><label class="form-check-label small text-capitalize"${ssrRenderAttr("for", i2)}>${ssrInterpolate(i2)}</label></div>`);
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(unref(QRCodeVue3), {
        class: "shadow",
        width: 235,
        height: 235,
        value: unref(invitation_link),
        image: "/logo.png",
        dotsOptions: {
          type: "dots",
          color: "#26249a"
        }
      }, null, _parent));
      _push(`<div class="text-center"><button class="btn btn-light btn-sm"><i class="fas fa-copy me-2"></i> Copy invitation link </button></div></div></span></div></div></div></div>`);
    };
  }
};
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/SideBar.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const _sfc_main$J = {
  __name: "TopBar",
  __ssrInlineRender: true,
  setup(__props) {
    ref();
    onMounted(() => {
      document.querySelector("body").classList.remove("sidebar-enable");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<header${ssrRenderAttrs(mergeProps({ id: "page-topbar" }, _attrs))}><div class="navbar-header"><div class="d-flex"><div class="navbar-brand-box"><a href="/" class="logo logo-dark"><span class="logo-sm"><img loading="lazy" src="/logo.png" alt="" width="100"></span></a></div><button type="button" class="btn btn-sm font-size-16 header-item waves-effect vertical-menu-btn"><i class="fa fa-fw fa-bars"></i></button></div><div class="d-flex"><form class="app-search d-none d-lg-block"><div class="position-relative"><input type="text" class="form-control" placeholder="Search"><span class="fad fa-search"></span></div></form><div class="dropdown d-inline-block d-lg-none ms-2"><button type="button" class="btn header-item noti-icon waves-effect" id="page-header-search-dropdown" data-bs-toggle="dropdown"><i class="fad fa-search"></i></button><div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown"><form class="p-3"><div class="form-group m-0"><div class="input-group"><input type="text" class="form-control" placeholder="Search"><div class="input-group-append"><button class="btn btn-primary" type="submit"><i class="fad fa-search"></i></button></div></div></div></form></div></div><div class="dropdown d-inline-block"><button type="button" class="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fad fa-bell"></i><span style="${ssrRenderStyle(_ctx.$page.props.auth.unread_notifications.length > 0 ? null : { display: "none" })}" class="badge bg-danger rounded-pill">${ssrInterpolate(_ctx.$page.props.auth.unread_notifications.length)}</span></button><div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown"><div class="p-3"><div class="row align-items-center"><div class="col"><h5 class="m-0 font-size-16"> Notifications</h5></div><div class="col-auto">`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("notifications.read.all"),
        class: "small"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Mark all as read`);
          } else {
            return [
              createTextVNode(" Mark all as read")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div data-simplebar style="${ssrRenderStyle({ "max-height": "230px" })}"><!--[-->`);
      ssrRenderList(_ctx.$page.props.auth.unread_notifications, (i2) => {
        _push(`<a href="#" class="text-reset notification-item"><div class="d-flex align-items-start"><div class="avatar-xs me-3 flex-shrink-0"><span class="avatar-title bg-light rounded-circle font-size-16">`);
        if (i2.data.icon) {
          _push(`<i class="${ssrRenderClass(i2.data.icon)}"></i>`);
        } else if (i2.data.image) {
          _push(`<img class="avatar rounded-circle header-profile-user"${ssrRenderAttr("src", i2.data.image ?? "/assets/images/no-profilepics.png")}>`);
        } else {
          _push(`<i class="fas fa-question text-primary"></i>`);
        }
        _push(`</span></div><div class="flex-grow-1"><div class="text-muted"><p class="mb-0">${i2.data.content}</p><p class="mb-0 small">${ssrInterpolate(unref(moment$1)(i2.created_at).fromNow())} `);
        _push(ssrRenderComponent(_component_Link, {
          method: "POST",
          href: _ctx.route("notification.read"),
          "preserve-scroll": true,
          "preserve-state": true,
          data: { id: i2.id },
          class: "float-end text-muted"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Mark as read `);
            } else {
              return [
                createTextVNode("Mark as read ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</p></div></div></div></a>`);
      });
      _push(`<!--]--></div><div class="p-2 border-top d-grid"><a class="btn btn-sm btn-link font-size-14 text-center" href="javascript:void(0)"><i class="fa fa-arrow-circle-right me-1"></i> View More </a></div></div></div><div class="dropdown"><button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img loading="lazy" class="rounded-circle header-profile-user"${ssrRenderAttr("src", _ctx.$page.props.auth.user.usermeta.avatar ?? "/assets/images/no-profilepics.png")} alt="Header Avatar"><i class="far fa-angle-down d-none d-xl-inline-block font-size-15"></i></button><div class="dropdown-menu">`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("profile.index", _ctx.$page.props.auth.user.slug),
        class: "dropdown-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fal fa-user-circle font-size-18 me-2"${_scopeId}></i>View Profile `);
          } else {
            return [
              createVNode("i", { class: "fal fa-user-circle font-size-18 me-2" }),
              createTextVNode("View Profile ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="dropdown-item"><i class="fal fa-power-off font-size-18 me-2"></i> Sign Out</button></div></div></div></div></header>`);
    };
  }
};
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/TopBar.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
function initLeftMenuCollapse() {
  var currentSIdebarSize = document.body.getAttribute("data-sidebar-size");
  $(window).on("load", function() {
    if (window.innerWidth >= 1024 && window.innerWidth <= 1366) {
      document.body.setAttribute("data-sidebar-size", "sm");
    }
  });
  $(".vertical-menu-btn").on("click", function(event) {
    event.preventDefault();
    $("body").toggleClass("sidebar-enable");
    if ($(window).width() >= 992) {
      if (currentSIdebarSize == null) {
        document.body.getAttribute("data-sidebar-size") == null || document.body.getAttribute("data-sidebar-size") == "lg" ? document.body.setAttribute("data-sidebar-size", "sm") : document.body.setAttribute("data-sidebar-size", "lg");
      } else if (currentSIdebarSize == "md") {
        document.body.getAttribute("data-sidebar-size") == "md" ? document.body.setAttribute("data-sidebar-size", "sm") : document.body.setAttribute("data-sidebar-size", "md");
      } else {
        document.body.getAttribute("data-sidebar-size") == "sm" ? document.body.setAttribute("data-sidebar-size", "lg") : document.body.setAttribute("data-sidebar-size", "sm");
      }
    }
  });
}
function init() {
  initLeftMenuCollapse();
  Waves.init();
}
const _sfc_main$I = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    onMounted(() => {
      init();
    });
    let message = computed(() => usePage().props.flash.message);
    watch(message, (value) => {
      if (value) {
        toast[value.status](value.content);
      }
    }, { deep: true, immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "layout-wrapper" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$J, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$K, null, null, _parent));
      _push(`<div class="main-content"><div class="page-content"><div class="container-fluid">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const AppointmentItem_vue_vue_type_style_index_0_scoped_4328b1fb_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$H = {
  __name: "AppointmentItem",
  __ssrInlineRender: true,
  props: { item: Object, mode: String },
  setup(__props) {
    const props = __props;
    let isHost = computed(() => {
      let current_user = usePage().props.auth.user.id;
      return props.item.host == current_user;
    });
    let user = computed(() => {
      return isHost.value ? props.item.friend_user : props.item.host_user;
    });
    ref(null);
    let date = ref(moment$1(props.item.appointment_timestamp, "X").format("ll"));
    let start_time = ref(moment$1(props.item.appointment_timestamp, "X"));
    ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["card card-body list-group-items", __props.item.status]
      }, _attrs))} data-v-4328b1fb><div class="d-flex justify-content-between" data-v-4328b1fb><div class="d-flex flex-shrink-0" data-v-4328b1fb><div class="me-3" data-v-4328b1fb><img${ssrRenderAttr("src", unref(user).avatar ?? "assets/images/no-profilepics.png")} class="avatar avatar-md rounded-circle img-thumbnail" data-v-4328b1fb></div></div><div class="flex-grow-1" data-v-4328b1fb><div class="row align-items-center" data-v-4328b1fb><div class="col-md-4" data-v-4328b1fb><p class="fw-bold font-size-16 mb-1" data-v-4328b1fb>`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("profile.index", { slug: unref(user).slug })
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(user).fullname)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(user).fullname), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div><div class="col-md-4" data-v-4328b1fb><label class="d-none d-md-block" data-v-4328b1fb>Schedule Details</label><div class="d-flex flex-column" data-v-4328b1fb><p class="mb-1 me-3" data-v-4328b1fb><i class="fad fa-calendar-check me-1" data-v-4328b1fb></i> ${ssrInterpolate(unref(date))}</p><p class="mb-1" data-v-4328b1fb><i class="fad fa-clock me-1" data-v-4328b1fb></i> ${ssrInterpolate(unref(start_time).format("hh:mm a"))} - ${ssrInterpolate(unref(start_time).add(__props.item.duration, "minutes").format("hh:mm a"))}</p></div></div><div class="col-md-4" data-v-4328b1fb>`);
      if (__props.item.status == "pending") {
        _push(`<!--[-->`);
        if (unref(moment$1)(__props.item.appointment_timestamp) < unref(moment$1)().format("X")) {
          _push(`<p class="mb-0 text-primary fw-bold" data-v-4328b1fb><i class="fas fa-stopwatch" data-v-4328b1fb></i> Expired Schedule</p>`);
        } else if (!unref(isHost)) {
          _push(`<!--[--><button class="btn btn-sm fw-bold btn-outline-success rounded-pill px-3 me-2" data-v-4328b1fb><i class="fas fa-check me-1" data-v-4328b1fb></i> Accept</button><button class="btn btn-sm text-danger fw-bold rounded-pill px-3" data-v-4328b1fb><i class="fas fa-times me-1" data-v-4328b1fb></i> Decline</button><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (unref(isHost)) {
          _push(`<button class="btn btn-sm btn-danger rounded-pill px-3" data-v-4328b1fb><i class="fal fa-trash me-1" data-v-4328b1fb></i> Delete</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else if (__props.item.status == "accepted") {
        _push(`<strong class="d-flex align-items-center text-success" data-v-4328b1fb><i class="fas fa-check-circle me-2" data-v-4328b1fb></i>Confirmed</strong>`);
      } else if (__props.item.status == "declined") {
        _push(`<strong class="d-flex align-items-center text-danger" data-v-4328b1fb><i class="fas fa-check-circle me-2" data-v-4328b1fb></i>Declined</strong>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.status !== "pending") {
        _push(`<small data-v-4328b1fb>Last activity: ${ssrInterpolate(unref(moment$1)(__props.item.updated_at).fromNow())}</small>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="d-flex flex-column align-items-start justify-content-start" data-v-4328b1fb>`);
      if (!unref(isHost)) {
        _push(`<a${ssrRenderAttr("href", `tel:${unref(user).phone}`)} class="btn text-primary" data-v-4328b1fb><i class="fad fa-phone" data-v-4328b1fb></i></a>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("messages.index", { id: unref(_btoa)({ type: "user", id: unref(user).id }) }),
        class: "btn text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fad fa-comments" data-v-4328b1fb${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fad fa-comments" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button data-bs-toggle="collapse"${ssrRenderAttr("href", `#appointment_note_${__props.item.id}`)} class="btn text-primary" data-v-4328b1fb><i class="fad fa-sticky-note" data-v-4328b1fb></i></button></div></div><div class="collapse"${ssrRenderAttr("id", `appointment_note_${__props.item.id}`)} data-v-4328b1fb>${ssrInterpolate(__props.item.content)}</div></div>`);
    };
  }
};
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AppointmentItem.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const AppointmentItem = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__scopeId", "data-v-4328b1fb"]]);
const _sfc_main$G = {
  __name: "Index",
  __ssrInlineRender: true,
  props: { title: String, appointments: Object, segment: String, stats: Object },
  setup(__props) {
    const props = __props;
    let menu = ref([
      { name: "Upcoming", href: "?segment=upcoming", active: props.segment == "upcoming", count: props.stats["upcoming"] },
      { name: "Requests", href: "?segment=requests", active: props.segment == "requests", count: props.stats["requests"] },
      { name: "All Active", href: "?segment=active", active: props.segment == "active", count: props.stats["active"] },
      { name: "Expired", href: "?segment=expired", active: props.segment == "expired", count: props.stats["expired"] },
      { name: "Archived", href: "?segment=archived", active: props.segment == "archived", count: props.stats["archived"] }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      const _component_VCalendar = resolveComponent("VCalendar");
      _push(ssrRenderComponent(_sfc_main$I, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, { title: __props.title }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4 page-title-box d-flex align-items-center justify-content-between"${_scopeId}><h3 class="mb-0 fw-bold"${_scopeId}>${ssrInterpolate(__props.title)}</h3><div class="page-title-right"${_scopeId}><ol class="breadcrumb m-0"${_scopeId}><li class="breadcrumb-item"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Link, { href: "/" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="fa fa-home"${_scopeId2}></i>`);
                } else {
                  return [
                    createVNode("i", { class: "fa fa-home" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li class="breadcrumb-item active"${_scopeId}>${ssrInterpolate(__props.title)}</li></ol></div></div><div class="row"${_scopeId}><div class="col-lg-9"${_scopeId}><div class="card card-body px-3 p-2 mb-3"${_scopeId}><div class="nav nav-pills rounded-pill p-0"${_scopeId}><!--[-->`);
            ssrRenderList(unref(menu), (i2) => {
              _push2(ssrRenderComponent(_component_Link, {
                class: ["nav-item btn rounded-pill", { "active": i2.active }],
                href: i2.href
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(i2.name)} <span class="badge badge-pill text-bg-light ms-1"${_scopeId2}>${ssrInterpolate(i2.count)}</span>`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(i2.name) + " ", 1),
                      createVNode("span", { class: "badge badge-pill text-bg-light ms-1" }, toDisplayString(i2.count), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div>`);
            if (__props.appointments.length) {
              _push2(`<div class="list-group list-group-flush"${_scopeId}><!--[-->`);
              ssrRenderList(__props.appointments, (item) => {
                _push2(ssrRenderComponent(AppointmentItem, {
                  item,
                  key: item
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="card card-body d-flex flex-column justify-content-center text-center align-items-center" style="${ssrRenderStyle({ "min-height": "40vh" })}"${_scopeId}><img loading="lazy" src="/assets/images/coming-soon-img.png" alt="" style="${ssrRenderStyle({ "width": "300px", "object-fit": "cover" })}"${_scopeId}><h4 class="my-3"${_scopeId}>No Result returned</h4></div>`);
            }
            _push2(`</div><div class="col-lg-3 d-none d-md-block"${_scopeId}><div class="card card-body p-2 pb-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_VCalendar, {
              borderless: "",
              mode: "date",
              expanded: "",
              "title-position": "left"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(_component_Head, { title: __props.title }, null, 8, ["title"]),
              createVNode("div", { class: "mb-4 page-title-box d-flex align-items-center justify-content-between" }, [
                createVNode("h3", { class: "mb-0 fw-bold" }, toDisplayString(__props.title), 1),
                createVNode("div", { class: "page-title-right" }, [
                  createVNode("ol", { class: "breadcrumb m-0" }, [
                    createVNode("li", { class: "breadcrumb-item" }, [
                      createVNode(_component_Link, { href: "/" }, {
                        default: withCtx(() => [
                          createVNode("i", { class: "fa fa-home" })
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("li", { class: "breadcrumb-item active" }, toDisplayString(__props.title), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-lg-9" }, [
                  createVNode("div", { class: "card card-body px-3 p-2 mb-3" }, [
                    createVNode("div", { class: "nav nav-pills rounded-pill p-0" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(menu), (i2) => {
                        return openBlock(), createBlock(_component_Link, {
                          key: i2,
                          class: ["nav-item btn rounded-pill", { "active": i2.active }],
                          href: i2.href
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(i2.name) + " ", 1),
                            createVNode("span", { class: "badge badge-pill text-bg-light ms-1" }, toDisplayString(i2.count), 1)
                          ]),
                          _: 2
                        }, 1032, ["class", "href"]);
                      }), 128))
                    ])
                  ]),
                  __props.appointments.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "list-group list-group-flush"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.appointments, (item) => {
                      return openBlock(), createBlock(AppointmentItem, {
                        item,
                        key: item
                      }, null, 8, ["item"]);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "card card-body d-flex flex-column justify-content-center text-center align-items-center",
                    style: { "min-height": "40vh" }
                  }, [
                    createVNode("img", {
                      loading: "lazy",
                      src: "/assets/images/coming-soon-img.png",
                      alt: "",
                      style: { "width": "300px", "object-fit": "cover" }
                    }),
                    createVNode("h4", { class: "my-3" }, "No Result returned")
                  ]))
                ]),
                createVNode("div", { class: "col-lg-3 d-none d-md-block" }, [
                  createVNode("div", { class: "card card-body p-2 pb-0" }, [
                    createVNode(_component_VCalendar, {
                      borderless: "",
                      mode: "date",
                      expanded: "",
                      "title-position": "left"
                    })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Appointments/Index.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$G
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$F = {
  __name: "Schedule",
  __ssrInlineRender: true,
  props: { user: Object, modal: Object },
  emits: "close",
  setup(__props, { emit }) {
    const props = __props;
    let config = ref({
      durations: [{ label: "30 minutes", value: 30 }, { label: "45 minutes", value: 45 }, { label: "1 hour", value: 60 }, { label: "2 hours", value: 120 }],
      start: "09:00",
      end: "17:00"
    });
    const masks = ref({
      modelValue: "YYYY-MM-DD"
    });
    let timeslots = computed(() => {
      let slots = [moment$1(config.value.start, "HH:mm").format("hh:mm A")];
      let start = moment$1(config.value.start, "HH:mm");
      let end = moment$1(config.value.end, "HH:mm");
      while (start.format("X") < end.format("X")) {
        let x2 = start;
        let y2 = moment$1(x2).add(form.duration, "minutes");
        slots.push(y2.format("hh:mm A"));
        start = y2;
      }
      return slots;
    });
    computed(() => moment$1(`${form.appointment_date} ${form.appointment_time}`).format("X"));
    let form = useForm({
      duration: 60,
      appointment_date: null,
      appointment_time: null,
      content: null,
      host: usePage().props.auth.user.id,
      friend: props.user.id
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _component_VDatePicker = resolveComponent("VDatePicker");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><form class="row"><div class="col-md-12" style="${ssrRenderStyle({ "height": "100px", "background": "#d7d6f4" })}">`);
      if (unref(form).content) {
        _push(`<button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="submit" class="btn btn-primary float-end px-3 rounded-pill">`);
        if (unref(form).processing) {
          _push(`<span class="spinner-border me-2 spinner-border-sm"></span>`);
        } else {
          _push(`<i class="fal fa-calendar-plus me-2"></i>`);
        }
        _push(` Book Request <i class="fat fa-long-arrow-right ms-1"></i></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-lg-3"><div class="card mt-n5 card-body shadow-lg align-items-center text-center"><img${ssrRenderAttr("src", __props.user.avatar ?? "assets/images/no-profilepics.png")} class="mt-n5 mb-3 avatar avatar-xl rounded-circle img-thumbnail"><p class="fw-bold font-size-18">${ssrInterpolate(__props.user.fullname)}</p>`);
      _push(ssrRenderComponent(_component_Link, {
        onClick: ($event) => _ctx.$emit("close"),
        href: _ctx.route("messages.index", { id: unref(_btoa)({ type: "user", id: __props.user.id }) }),
        type: "button",
        class: "btn btn-primary w-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Send Message`);
          } else {
            return [
              createTextVNode("Send Message")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="col-lg-9"><div class="card card-body mt-lg-n5 shadow-lg"><div class="row">`);
      if (unref(form).hasErrors) {
        _push(`<div class="col-12"><div class="alert alert-danger alert-dismissible fade show" role="alert"><button type="button" class="btn-close"></button> There seems to be an error on your form. </div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="col-lg-6"><div class="form-group mb-3"><label for="">Select an appointment date</label>`);
      _push(ssrRenderComponent(_component_VDatePicker, {
        mode: "date",
        modelValue: unref(form).appointment_date,
        "onUpdate:modelValue": ($event) => unref(form).appointment_date = $event,
        modelModifiers: { string: true },
        expanded: "",
        "title-position": "left",
        masks: masks.value,
        "min-date": /* @__PURE__ */ new Date()
      }, null, _parent));
      if (unref(form).errors.appointment_date) {
        _push(`<small class="text-danger">${ssrInterpolate(unref(form).errors.appointment_date)}</small>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-floating mb-3"><select class="form-select"><!--[-->`);
      ssrRenderList(unref(config).durations, (i2) => {
        _push(`<option${ssrRenderAttr("value", i2.value)}>${ssrInterpolate(i2.label)}</option>`);
      });
      _push(`<!--]--></select><label>Duration</label></div></div>`);
      if (unref(form).appointment_date) {
        _push(`<div class="col-lg-6"><div class="mb-3"><label for="">Choose Time</label><div class="row g-2"><!--[-->`);
        ssrRenderList(unref(timeslots), (i2) => {
          _push(`<div class="col-md-3 col-4"><button class="${ssrRenderClass([{ "text-bg-primary": unref(form).appointment_time == i2 }, "btn btn-sm btn-outline-primary w-100"])}">${ssrInterpolate(i2)}</button></div>`);
        });
        _push(`<!--]-->`);
        if (unref(form).errors.appointment_time) {
          _push(`<small class="text-danger col-12">${ssrInterpolate(unref(form).errors.appointment_time)}</small>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (unref(form).appointment_time) {
          _push(`<div class="form-group mb-3"><label>Meeting Details</label><textarea required class="form-control" rows="7" placeholder="Include additional information / Purpose(s) of the meeting">${ssrInterpolate(unref(form).content)}</textarea></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></form></div>`);
    };
  }
};
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Appointments/Schedule.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$F
}, Symbol.toStringTag, { value: "Module" }));
const GuestLayout_vue_vue_type_style_index_0_lang = "";
const _sfc_main$E = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Link = resolveComponent("Link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-fluid p-0 auth-bg" }, _attrs))}><div class="row gx-0"><div class="col-lg-5 col-md-6 col-sm-8 sidepanel"><div class="blur"></div><div class="p-5 unblurred w-100 text-black">`);
  _push(ssrRenderComponent(_component_Link, { href: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img loading="lazy" class="mb-5" src="/logo.png" height="50"${_scopeId}>`);
      } else {
        return [
          createVNode("img", {
            loading: "lazy",
            class: "mb-5",
            src: "/logo.png",
            height: "50"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div></div></div>`);
}
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const GuestLayout = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$D = {
  __name: "CreatePassword",
  __ssrInlineRender: true,
  props: { title: String },
  setup(__props) {
    const form = useForm({
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route("register"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(ssrRenderComponent(GuestLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, { title: __props.title }, null, _parent2, _scopeId));
            _push2(`<nav class="breadcrumb justify-content-center text-muted" style="${ssrRenderStyle({ "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")` })}"${_scopeId}><span class="breadcrumb-item text-primary fw-bold"${_scopeId}><span class="badge badge-pill border border-2 border-primary fw-bold text-white bg-primary me-1"${_scopeId}><i class="fa fa-check"${_scopeId}></i></span> Create an Account</span><span class="breadcrumb-item text-primary fw-bold"${_scopeId}><span class="badge badge-pill border border-2 border-primary fw-bold text-white bg-primary me-1"${_scopeId}><i class="fa fa-check"${_scopeId}></i></span>Verify Phone Number</span><span class="breadcrumb-item"${_scopeId}><span class="badge badge-pill border border-primary text-primary me-1"${_scopeId}>3</span>Create Password</span></nav><div class="card"${_scopeId}><div class="p-md-5"${_scopeId}><div class="text-center mt-2"${_scopeId}><h3 class="text-dark"${_scopeId}>Create a Password</h3><p class="text-muted"${_scopeId}>Creating a strong password is an important step in securing your accounts and personal information</p></div><div class="p-2 mt-4"${_scopeId}><form${_scopeId}><div class="form-floating mb-3"${_scopeId}><input class="form-control" placeholder=""${ssrRenderAttr("value", unref(form).password)} required type="password"${_scopeId}><label${_scopeId}>Enter Password</label>`);
            if (unref(form).errors.password) {
              _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-floating mb-3"${_scopeId}><input class="form-control" placeholder=""${ssrRenderAttr("value", unref(form).password_confirmation)} required type="password"${_scopeId}><label${_scopeId}>Confirm Password</label>`);
            if (unref(form).errors.password_confirmation) {
              _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.password_confirmation)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mt-5 mb-2"${_scopeId}><button class="${ssrRenderClass([{ "disabled": unref(form).processing }, "btn btn-primary btn-lg waves-effect waves-light w-100"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="submit"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<span class="spinner-grow text-white spinner-grow-sm me-2"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`Continue <i class="ms-1 fal fa-chevron-right"${_scopeId}></i></button></div><div class="text-center"${_scopeId}><small${_scopeId}>By creating an account you&#39;re agreeing to our <a href="#"${_scopeId}>Terms and Conditions</a></small></div></form><p class="mt-4"${_scopeId}>Need to make changes? `);
            _push2(ssrRenderComponent(_component_Link, {
              as: "button",
              href: _ctx.route("forget-session"),
              method: "post",
              class: "fw-bold btn btn-link p-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Forget this session. `);
                } else {
                  return [
                    createTextVNode(" Forget this session. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` And start over. We haven&#39;t persisted any data </p></div></div></div>`);
          } else {
            return [
              createVNode(_component_Head, { title: __props.title }, null, 8, ["title"]),
              createVNode("nav", {
                class: "breadcrumb justify-content-center text-muted",
                style: { "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")` }
              }, [
                createVNode("span", { class: "breadcrumb-item text-primary fw-bold" }, [
                  createVNode("span", { class: "badge badge-pill border border-2 border-primary fw-bold text-white bg-primary me-1" }, [
                    createVNode("i", { class: "fa fa-check" })
                  ]),
                  createTextVNode(" Create an Account")
                ]),
                createVNode("span", { class: "breadcrumb-item text-primary fw-bold" }, [
                  createVNode("span", { class: "badge badge-pill border border-2 border-primary fw-bold text-white bg-primary me-1" }, [
                    createVNode("i", { class: "fa fa-check" })
                  ]),
                  createTextVNode("Verify Phone Number")
                ]),
                createVNode("span", { class: "breadcrumb-item" }, [
                  createVNode("span", { class: "badge badge-pill border border-primary text-primary me-1" }, "3"),
                  createTextVNode("Create Password")
                ])
              ]),
              createVNode("div", { class: "card" }, [
                createVNode("div", { class: "p-md-5" }, [
                  createVNode("div", { class: "text-center mt-2" }, [
                    createVNode("h3", { class: "text-dark" }, "Create a Password"),
                    createVNode("p", { class: "text-muted" }, "Creating a strong password is an important step in securing your accounts and personal information")
                  ]),
                  createVNode("div", { class: "p-2 mt-4" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("div", { class: "form-floating mb-3" }, [
                        withDirectives(createVNode("input", {
                          class: "form-control",
                          placeholder: "",
                          "onUpdate:modelValue": ($event) => unref(form).password = $event,
                          required: "",
                          type: "password"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).password]
                        ]),
                        createVNode("label", null, "Enter Password"),
                        unref(form).errors.password ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "small text-danger"
                        }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-floating mb-3" }, [
                        withDirectives(createVNode("input", {
                          class: "form-control",
                          placeholder: "",
                          "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                          required: "",
                          type: "password"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).password_confirmation]
                        ]),
                        createVNode("label", null, "Confirm Password"),
                        unref(form).errors.password_confirmation ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "small text-danger"
                        }, toDisplayString(unref(form).errors.password_confirmation), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "mt-5 mb-2" }, [
                        createVNode("button", {
                          class: [{ "disabled": unref(form).processing }, "btn btn-primary btn-lg waves-effect waves-light w-100"],
                          disabled: unref(form).processing,
                          type: "submit"
                        }, [
                          unref(form).processing ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "spinner-grow text-white spinner-grow-sm me-2"
                          })) : createCommentVNode("", true),
                          createTextVNode("Continue "),
                          createVNode("i", { class: "ms-1 fal fa-chevron-right" })
                        ], 10, ["disabled"])
                      ]),
                      createVNode("div", { class: "text-center" }, [
                        createVNode("small", null, [
                          createTextVNode("By creating an account you're agreeing to our "),
                          createVNode("a", { href: "#" }, "Terms and Conditions")
                        ])
                      ])
                    ], 40, ["onSubmit"]),
                    createVNode("p", { class: "mt-4" }, [
                      createTextVNode("Need to make changes? "),
                      createVNode(_component_Link, {
                        as: "button",
                        href: _ctx.route("forget-session"),
                        method: "post",
                        class: "fw-bold btn btn-link p-0"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Forget this session. ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createTextVNode(" And start over. We haven't persisted any data ")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/CreatePassword.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$D
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$C = {
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: {
    status: {
      type: String
    }
  },
  setup(__props) {
    const form = useForm({
      email: ""
    });
    const submit = () => {
      form.post(route("password.email"), { preserveState: false });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(ssrRenderComponent(GuestLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Forgot Password" }, null, _parent2, _scopeId));
            _push2(`<div class="mt-3 mb-2"${_scopeId}><h3 class="fw-bold"${_scopeId}>Forgot Password</h3><p${_scopeId}>Let us know your email address and we will email you a password reset link</p></div>`);
            if (__props.status) {
              _push2(`<div class="alert alert-success alert-dismissible fade show" role="alert"${_scopeId}><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"${_scopeId}></button><p class="d-flex mb-0"${_scopeId}><i class="fal fa-mail-bulk me-2 font-size-24"${_scopeId}></i><span class="mb-0"${_scopeId}>${ssrInterpolate(__props.status)}</span></p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div class="form-floating mb-3"${_scopeId}><input type="email" class="form-control" placeholder=""${ssrRenderAttr("value", unref(form).email)} required autofocus${_scopeId}><label${_scopeId}>Email</label>`);
            if (unref(form).errors.email) {
              _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mt-4 mb-2"${_scopeId}><button class="${ssrRenderClass([{ "disabled": unref(form).processing }, "btn btn-primary waves-effect waves-light w-100 rounded-pill"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="submit"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<span class="spinner-grow text-white spinner-grow-sm me-2"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` Send Link</button></div><div class="text-center"${_scopeId}><span${_scopeId}>Already have an account? `);
            _push2(ssrRenderComponent(_component_Link, {
              href: _ctx.route("login")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Log in`);
                } else {
                  return [
                    createTextVNode("Log in")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span></div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Forgot Password" }),
              createVNode("div", { class: "mt-3 mb-2" }, [
                createVNode("h3", { class: "fw-bold" }, "Forgot Password"),
                createVNode("p", null, "Let us know your email address and we will email you a password reset link")
              ]),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "alert alert-success alert-dismissible fade show",
                role: "alert"
              }, [
                createVNode("button", {
                  type: "button",
                  class: "btn-close",
                  "data-bs-dismiss": "alert",
                  "aria-label": "Close"
                }),
                createVNode("p", { class: "d-flex mb-0" }, [
                  createVNode("i", { class: "fal fa-mail-bulk me-2 font-size-24" }),
                  createVNode("span", { class: "mb-0" }, toDisplayString(__props.status), 1)
                ])
              ])) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", { class: "form-floating mb-3" }, [
                  withDirectives(createVNode("input", {
                    type: "email",
                    class: "form-control",
                    placeholder: "",
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).email]
                  ]),
                  createVNode("label", null, "Email"),
                  unref(form).errors.email ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "small text-danger"
                  }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "mt-4 mb-2" }, [
                  createVNode("button", {
                    class: [{ "disabled": unref(form).processing }, "btn btn-primary waves-effect waves-light w-100 rounded-pill"],
                    disabled: unref(form).processing,
                    type: "submit"
                  }, [
                    unref(form).processing ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "spinner-grow text-white spinner-grow-sm me-2"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Send Link")
                  ], 10, ["disabled"])
                ]),
                createVNode("div", { class: "text-center" }, [
                  createVNode("span", null, [
                    createTextVNode("Already have an account? "),
                    createVNode(_component_Link, {
                      href: _ctx.route("login")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Log in")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$C
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$B = {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    status: String
  },
  setup(__props) {
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.post(route("login"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(ssrRenderComponent(GuestLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Log in" }, null, _parent2, _scopeId));
            if (__props.status) {
              _push2(`<div class="alert alert-success alert-dismissible fade show" role="alert"${_scopeId}><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"${_scopeId}></button><p class="d-flex mb-0"${_scopeId}><i class="fal fa-exclamation me-2 font-size-24"${_scopeId}></i><span class="mb-0"${_scopeId}>${ssrInterpolate(__props.status)}</span></p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-5 mb-2"${_scopeId}><h4 class="fw-bold"${_scopeId}>Login to your Account</h4><p class="text-muted"${_scopeId}></p></div><form${_scopeId}><div class="form-floating mb-3"${_scopeId}><input type="email" class="form-control" placeholder=""${ssrRenderAttr("value", unref(form).email)} required autofocus${_scopeId}><label${_scopeId}>Email</label>`);
            if (unref(form).errors.email) {
              _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="text-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: _ctx.route("password.request"),
              class: "text-black"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Forgot your password? `);
                } else {
                  return [
                    createTextVNode("Forgot your password? ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="form-floating mb-3"${_scopeId}><input type="password" class="form-control" placeholder=""${ssrRenderAttr("value", unref(form).password)} required${_scopeId}><label${_scopeId}>Password</label>`);
            if (unref(form).errors.password) {
              _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-check"${_scopeId}><input type="checkbox" class="form-check-input bg-transparent border-dark" id="auth-remember-check"${ssrIncludeBooleanAttr(Array.isArray(unref(form).remember) ? ssrLooseContain(unref(form).remember, null) : unref(form).remember) ? " checked" : ""}${_scopeId}><label class="form-check-label" for="auth-remember-check"${_scopeId}>Remember me</label></div><div class="mt-4 mb-2"${_scopeId}><button class="${ssrRenderClass([{ "disabled": unref(form).processing }, "btn rounded-pill btn-primary waves-effect waves-light w-100"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="submit"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<span class="spinner-grow text-white spinner-grow-sm me-2"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` Log In</button></div><div class="text-center"${_scopeId}><span${_scopeId}>Don&#39;t have an account? `);
            _push2(ssrRenderComponent(_component_Link, {
              href: _ctx.route("register")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Sign Up`);
                } else {
                  return [
                    createTextVNode("Sign Up")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span></div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Log in" }),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "alert alert-success alert-dismissible fade show",
                role: "alert"
              }, [
                createVNode("button", {
                  type: "button",
                  class: "btn-close",
                  "data-bs-dismiss": "alert",
                  "aria-label": "Close"
                }),
                createVNode("p", { class: "d-flex mb-0" }, [
                  createVNode("i", { class: "fal fa-exclamation me-2 font-size-24" }),
                  createVNode("span", { class: "mb-0" }, toDisplayString(__props.status), 1)
                ])
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "mt-5 mb-2" }, [
                createVNode("h4", { class: "fw-bold" }, "Login to your Account"),
                createVNode("p", { class: "text-muted" })
              ]),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", { class: "form-floating mb-3" }, [
                  withDirectives(createVNode("input", {
                    type: "email",
                    class: "form-control",
                    placeholder: "",
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).email]
                  ]),
                  createVNode("label", null, "Email"),
                  unref(form).errors.email ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "small text-danger"
                  }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "text-end" }, [
                  createVNode(_component_Link, {
                    href: _ctx.route("password.request"),
                    class: "text-black"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Forgot your password? ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("div", { class: "form-floating mb-3" }, [
                  withDirectives(createVNode("input", {
                    type: "password",
                    class: "form-control",
                    placeholder: "",
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).password]
                  ]),
                  createVNode("label", null, "Password"),
                  unref(form).errors.password ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "small text-danger"
                  }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "form-check" }, [
                  withDirectives(createVNode("input", {
                    type: "checkbox",
                    class: "form-check-input bg-transparent border-dark",
                    id: "auth-remember-check",
                    "onUpdate:modelValue": ($event) => unref(form).remember = $event
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelCheckbox, unref(form).remember]
                  ]),
                  createVNode("label", {
                    class: "form-check-label",
                    for: "auth-remember-check"
                  }, "Remember me")
                ]),
                createVNode("div", { class: "mt-4 mb-2" }, [
                  createVNode("button", {
                    class: [{ "disabled": unref(form).processing }, "btn rounded-pill btn-primary waves-effect waves-light w-100"],
                    disabled: unref(form).processing,
                    type: "submit"
                  }, [
                    unref(form).processing ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "spinner-grow text-white spinner-grow-sm me-2"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Log In")
                  ], 10, ["disabled"])
                ]),
                createVNode("div", { class: "text-center" }, [
                  createVNode("span", null, [
                    createTextVNode("Don't have an account? "),
                    createVNode(_component_Link, {
                      href: _ctx.route("register")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Sign Up")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$B
}, Symbol.toStringTag, { value: "Module" }));
const countries = { countries: [{ name: "Afghanistan", dial_code: "+93", code: "AF" }, { name: "Aland Islands", dial_code: "+358", code: "AX" }, { name: "Albania", dial_code: "+355", code: "AL" }, { name: "Algeria", dial_code: "+213", code: "DZ" }, { name: "AmericanSamoa", dial_code: "+1684", code: "AS" }, { name: "Andorra", dial_code: "+376", code: "AD" }, { name: "Angola", dial_code: "+244", code: "AO" }, { name: "Anguilla", dial_code: "+1264", code: "AI" }, { name: "Antarctica", dial_code: "+672", code: "AQ" }, { name: "Antigua and Barbuda", dial_code: "+1268", code: "AG" }, { name: "Argentina", dial_code: "+54", code: "AR" }, { name: "Armenia", dial_code: "+374", code: "AM" }, { name: "Aruba", dial_code: "+297", code: "AW" }, { name: "Australia", dial_code: "+61", code: "AU" }, { name: "Austria", dial_code: "+43", code: "AT" }, { name: "Azerbaijan", dial_code: "+994", code: "AZ" }, { name: "Bahamas", dial_code: "+1242", code: "BS" }, { name: "Bahrain", dial_code: "+973", code: "BH" }, { name: "Bangladesh", dial_code: "+880", code: "BD" }, { name: "Barbados", dial_code: "+1246", code: "BB" }, { name: "Belarus", dial_code: "+375", code: "BY" }, { name: "Belgium", dial_code: "+32", code: "BE" }, { name: "Belize", dial_code: "+501", code: "BZ" }, { name: "Benin", dial_code: "+229", code: "BJ" }, { name: "Bermuda", dial_code: "+1441", code: "BM" }, { name: "Bhutan", dial_code: "+975", code: "BT" }, { name: "Bolivia, Plurinational State of", dial_code: "+591", code: "BO" }, { name: "Bosnia and Herzegovina", dial_code: "+387", code: "BA" }, { name: "Botswana", dial_code: "+267", code: "BW" }, { name: "Brazil", dial_code: "+55", code: "BR" }, { name: "British Indian Ocean Territory", dial_code: "+246", code: "IO" }, { name: "Brunei Darussalam", dial_code: "+673", code: "BN" }, { name: "Bulgaria", dial_code: "+359", code: "BG" }, { name: "Burkina Faso", dial_code: "+226", code: "BF" }, { name: "Burundi", dial_code: "+257", code: "BI" }, { name: "Cambodia", dial_code: "+855", code: "KH" }, { name: "Cameroon", dial_code: "+237", code: "CM" }, { name: "Canada", dial_code: "+1", code: "CA" }, { name: "Cape Verde", dial_code: "+238", code: "CV" }, { name: "Cayman Islands", dial_code: "+ 345", code: "KY" }, { name: "Central African Republic", dial_code: "+236", code: "CF" }, { name: "Chad", dial_code: "+235", code: "TD" }, { name: "Chile", dial_code: "+56", code: "CL" }, { name: "China", dial_code: "+86", code: "CN" }, { name: "Christmas Island", dial_code: "+61", code: "CX" }, { name: "Cocos (Keeling) Islands", dial_code: "+61", code: "CC" }, { name: "Colombia", dial_code: "+57", code: "CO" }, { name: "Comoros", dial_code: "+269", code: "KM" }, { name: "Congo", dial_code: "+242", code: "CG" }, { name: "Congo, The Democratic Republic of the Congo", dial_code: "+243", code: "CD" }, { name: "Cook Islands", dial_code: "+682", code: "CK" }, { name: "Costa Rica", dial_code: "+506", code: "CR" }, { name: "Cote d'Ivoire", dial_code: "+225", code: "CI" }, { name: "Croatia", dial_code: "+385", code: "HR" }, { name: "Cuba", dial_code: "+53", code: "CU" }, { name: "Cyprus", dial_code: "+357", code: "CY" }, { name: "Czech Republic", dial_code: "+420", code: "CZ" }, { name: "Denmark", dial_code: "+45", code: "DK" }, { name: "Djibouti", dial_code: "+253", code: "DJ" }, { name: "Dominica", dial_code: "+1767", code: "DM" }, { name: "Dominican Republic", dial_code: "+1849", code: "DO" }, { name: "Ecuador", dial_code: "+593", code: "EC" }, { name: "Egypt", dial_code: "+20", code: "EG" }, { name: "El Salvador", dial_code: "+503", code: "SV" }, { name: "Equatorial Guinea", dial_code: "+240", code: "GQ" }, { name: "Eritrea", dial_code: "+291", code: "ER" }, { name: "Estonia", dial_code: "+372", code: "EE" }, { name: "Ethiopia", dial_code: "+251", code: "ET" }, { name: "Falkland Islands (Malvinas)", dial_code: "+500", code: "FK" }, { name: "Faroe Islands", dial_code: "+298", code: "FO" }, { name: "Fiji", dial_code: "+679", code: "FJ" }, { name: "Finland", dial_code: "+358", code: "FI" }, { name: "France", dial_code: "+33", code: "FR" }, { name: "French Guiana", dial_code: "+594", code: "GF" }, { name: "French Polynesia", dial_code: "+689", code: "PF" }, { name: "Gabon", dial_code: "+241", code: "GA" }, { name: "Gambia", dial_code: "+220", code: "GM" }, { name: "Georgia", dial_code: "+995", code: "GE" }, { name: "Germany", dial_code: "+49", code: "DE" }, { name: "Ghana", dial_code: "+233", code: "GH" }, { name: "Gibraltar", dial_code: "+350", code: "GI" }, { name: "Greece", dial_code: "+30", code: "GR" }, { name: "Greenland", dial_code: "+299", code: "GL" }, { name: "Grenada", dial_code: "+1473", code: "GD" }, { name: "Guadeloupe", dial_code: "+590", code: "GP" }, { name: "Guam", dial_code: "+1671", code: "GU" }, { name: "Guatemala", dial_code: "+502", code: "GT" }, { name: "Guernsey", dial_code: "+44", code: "GG" }, { name: "Guinea", dial_code: "+224", code: "GN" }, { name: "Guinea-Bissau", dial_code: "+245", code: "GW" }, { name: "Guyana", dial_code: "+595", code: "GY" }, { name: "Haiti", dial_code: "+509", code: "HT" }, { name: "Holy See (Vatican City State)", dial_code: "+379", code: "VA" }, { name: "Honduras", dial_code: "+504", code: "HN" }, { name: "Hong Kong", dial_code: "+852", code: "HK" }, { name: "Hungary", dial_code: "+36", code: "HU" }, { name: "Iceland", dial_code: "+354", code: "IS" }, { name: "India", dial_code: "+91", code: "IN" }, { name: "Indonesia", dial_code: "+62", code: "ID" }, { name: "Iran, Islamic Republic of Persian Gulf", dial_code: "+98", code: "IR" }, { name: "Iraq", dial_code: "+964", code: "IQ" }, { name: "Ireland", dial_code: "+353", code: "IE" }, { name: "Isle of Man", dial_code: "+44", code: "IM" }, { name: "Israel", dial_code: "+972", code: "IL" }, { name: "Italy", dial_code: "+39", code: "IT" }, { name: "Jamaica", dial_code: "+1876", code: "JM" }, { name: "Japan", dial_code: "+81", code: "JP" }, { name: "Jersey", dial_code: "+44", code: "JE" }, { name: "Jordan", dial_code: "+962", code: "JO" }, { name: "Kazakhstan", dial_code: "+77", code: "KZ" }, { name: "Kenya", dial_code: "+254", code: "KE" }, { name: "Kiribati", dial_code: "+686", code: "KI" }, { name: "Korea, Democratic People's Republic of Korea", dial_code: "+850", code: "KP" }, { name: "Korea, Republic of South Korea", dial_code: "+82", code: "KR" }, { name: "Kuwait", dial_code: "+965", code: "KW" }, { name: "Kyrgyzstan", dial_code: "+996", code: "KG" }, { name: "Laos", dial_code: "+856", code: "LA" }, { name: "Latvia", dial_code: "+371", code: "LV" }, { name: "Lebanon", dial_code: "+961", code: "LB" }, { name: "Lesotho", dial_code: "+266", code: "LS" }, { name: "Liberia", dial_code: "+231", code: "LR" }, { name: "Libyan Arab Jamahiriya", dial_code: "+218", code: "LY" }, { name: "Liechtenstein", dial_code: "+423", code: "LI" }, { name: "Lithuania", dial_code: "+370", code: "LT" }, { name: "Luxembourg", dial_code: "+352", code: "LU" }, { name: "Macao", dial_code: "+853", code: "MO" }, { name: "Macedonia", dial_code: "+389", code: "MK" }, { name: "Madagascar", dial_code: "+261", code: "MG" }, { name: "Malawi", dial_code: "+265", code: "MW" }, { name: "Malaysia", dial_code: "+60", code: "MY" }, { name: "Maldives", dial_code: "+960", code: "MV" }, { name: "Mali", dial_code: "+223", code: "ML" }, { name: "Malta", dial_code: "+356", code: "MT" }, { name: "Marshall Islands", dial_code: "+692", code: "MH" }, { name: "Martinique", dial_code: "+596", code: "MQ" }, { name: "Mauritania", dial_code: "+222", code: "MR" }, { name: "Mauritius", dial_code: "+230", code: "MU" }, { name: "Mayotte", dial_code: "+262", code: "YT" }, { name: "Mexico", dial_code: "+52", code: "MX" }, { name: "Micronesia, Federated States of Micronesia", dial_code: "+691", code: "FM" }, { name: "Moldova", dial_code: "+373", code: "MD" }, { name: "Monaco", dial_code: "+377", code: "MC" }, { name: "Mongolia", dial_code: "+976", code: "MN" }, { name: "Montenegro", dial_code: "+382", code: "ME" }, { name: "Montserrat", dial_code: "+1664", code: "MS" }, { name: "Morocco", dial_code: "+212", code: "MA" }, { name: "Mozambique", dial_code: "+258", code: "MZ" }, { name: "Myanmar", dial_code: "+95", code: "MM" }, { name: "Namibia", dial_code: "+264", code: "NA" }, { name: "Nauru", dial_code: "+674", code: "NR" }, { name: "Nepal", dial_code: "+977", code: "NP" }, { name: "Netherlands", dial_code: "+31", code: "NL" }, { name: "Netherlands Antilles", dial_code: "+599", code: "AN" }, { name: "New Caledonia", dial_code: "+687", code: "NC" }, { name: "New Zealand", dial_code: "+64", code: "NZ" }, { name: "Nicaragua", dial_code: "+505", code: "NI" }, { name: "Niger", dial_code: "+227", code: "NE" }, { name: "Nigeria", dial_code: "+234", code: "NG" }, { name: "Niue", dial_code: "+683", code: "NU" }, { name: "Norfolk Island", dial_code: "+672", code: "NF" }, { name: "Northern Mariana Islands", dial_code: "+1670", code: "MP" }, { name: "Norway", dial_code: "+47", code: "NO" }, { name: "Oman", dial_code: "+968", code: "OM" }, { name: "Pakistan", dial_code: "+92", code: "PK" }, { name: "Palau", dial_code: "+680", code: "PW" }, { name: "Palestinian Territory, Occupied", dial_code: "+970", code: "PS" }, { name: "Panama", dial_code: "+507", code: "PA" }, { name: "Papua New Guinea", dial_code: "+675", code: "PG" }, { name: "Paraguay", dial_code: "+595", code: "PY" }, { name: "Peru", dial_code: "+51", code: "PE" }, { name: "Philippines", dial_code: "+63", code: "PH" }, { name: "Pitcairn", dial_code: "+872", code: "PN" }, { name: "Poland", dial_code: "+48", code: "PL" }, { name: "Portugal", dial_code: "+351", code: "PT" }, { name: "Puerto Rico", dial_code: "+1939", code: "PR" }, { name: "Qatar", dial_code: "+974", code: "QA" }, { name: "Romania", dial_code: "+40", code: "RO" }, { name: "Russia", dial_code: "+7", code: "RU" }, { name: "Rwanda", dial_code: "+250", code: "RW" }, { name: "Reunion", dial_code: "+262", code: "RE" }, { name: "Saint Barthelemy", dial_code: "+590", code: "BL" }, { name: "Saint Helena, Ascension and Tristan Da Cunha", dial_code: "+290", code: "SH" }, { name: "Saint Kitts and Nevis", dial_code: "+1869", code: "KN" }, { name: "Saint Lucia", dial_code: "+1758", code: "LC" }, { name: "Saint Martin", dial_code: "+590", code: "MF" }, { name: "Saint Pierre and Miquelon", dial_code: "+508", code: "PM" }, { name: "Saint Vincent and the Grenadines", dial_code: "+1784", code: "VC" }, { name: "Samoa", dial_code: "+685", code: "WS" }, { name: "San Marino", dial_code: "+378", code: "SM" }, { name: "Sao Tome and Principe", dial_code: "+239", code: "ST" }, { name: "Saudi Arabia", dial_code: "+966", code: "SA" }, { name: "Senegal", dial_code: "+221", code: "SN" }, { name: "Serbia", dial_code: "+381", code: "RS" }, { name: "Seychelles", dial_code: "+248", code: "SC" }, { name: "Sierra Leone", dial_code: "+232", code: "SL" }, { name: "Singapore", dial_code: "+65", code: "SG" }, { name: "Slovakia", dial_code: "+421", code: "SK" }, { name: "Slovenia", dial_code: "+386", code: "SI" }, { name: "Solomon Islands", dial_code: "+677", code: "SB" }, { name: "Somalia", dial_code: "+252", code: "SO" }, { name: "South Africa", dial_code: "+27", code: "ZA" }, { name: "South Sudan", dial_code: "+211", code: "SS" }, { name: "South Georgia and the South Sandwich Islands", dial_code: "+500", code: "GS" }, { name: "Spain", dial_code: "+34", code: "ES" }, { name: "Sri Lanka", dial_code: "+94", code: "LK" }, { name: "Sudan", dial_code: "+249", code: "SD" }, { name: "Suriname", dial_code: "+597", code: "SR" }, { name: "Svalbard and Jan Mayen", dial_code: "+47", code: "SJ" }, { name: "Swaziland", dial_code: "+268", code: "SZ" }, { name: "Sweden", dial_code: "+46", code: "SE" }, { name: "Switzerland", dial_code: "+41", code: "CH" }, { name: "Syrian Arab Republic", dial_code: "+963", code: "SY" }, { name: "Taiwan", dial_code: "+886", code: "TW" }, { name: "Tajikistan", dial_code: "+992", code: "TJ" }, { name: "Tanzania, United Republic of Tanzania", dial_code: "+255", code: "TZ" }, { name: "Thailand", dial_code: "+66", code: "TH" }, { name: "Timor-Leste", dial_code: "+670", code: "TL" }, { name: "Togo", dial_code: "+228", code: "TG" }, { name: "Tokelau", dial_code: "+690", code: "TK" }, { name: "Tonga", dial_code: "+676", code: "TO" }, { name: "Trinidad and Tobago", dial_code: "+1868", code: "TT" }, { name: "Tunisia", dial_code: "+216", code: "TN" }, { name: "Turkey", dial_code: "+90", code: "TR" }, { name: "Turkmenistan", dial_code: "+993", code: "TM" }, { name: "Turks and Caicos Islands", dial_code: "+1649", code: "TC" }, { name: "Tuvalu", dial_code: "+688", code: "TV" }, { name: "Uganda", dial_code: "+256", code: "UG" }, { name: "Ukraine", dial_code: "+380", code: "UA" }, { name: "United Arab Emirates", dial_code: "+971", code: "AE" }, { name: "United Kingdom", dial_code: "+44", code: "GB" }, { name: "United States", dial_code: "+1", code: "US" }, { name: "Uruguay", dial_code: "+598", code: "UY" }, { name: "Uzbekistan", dial_code: "+998", code: "UZ" }, { name: "Vanuatu", dial_code: "+678", code: "VU" }, { name: "Venezuela, Bolivarian Republic of Venezuela", dial_code: "+58", code: "VE" }, { name: "Vietnam", dial_code: "+84", code: "VN" }, { name: "Virgin Islands, British", dial_code: "+1284", code: "VG" }, { name: "Virgin Islands, U.S.", dial_code: "+1340", code: "VI" }, { name: "Wallis and Futuna", dial_code: "+681", code: "WF" }, { name: "Yemen", dial_code: "+967", code: "YE" }, { name: "Zambia", dial_code: "+260", code: "ZM" }, { name: "Zimbabwe", dial_code: "+263", code: "ZW" }] };
const _sfc_main$A = {
  __name: "Register",
  __ssrInlineRender: true,
  props: { title: String, stage: String, country: String, connection: Object | null },
  setup(__props) {
    const props = __props;
    let country_code = computed(() => {
      var _a;
      return (_a = countries.countries.find((e2) => e2.name == props.country)) == null ? void 0 : _a.dial_code;
    });
    const form = useForm({
      firstname: "",
      lastname: "",
      email: "",
      country: "Nigeria",
      phone: "",
      connection: props.connection
    });
    const submit = () => {
      if (form.phone) {
        form.transform((data) => ({ data, phone: `${country_code.value}${form.phone}` })).post(route("register"));
      }
      form.post(route("register"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(ssrRenderComponent(GuestLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, { title: __props.title }, null, _parent2, _scopeId));
            if (__props.stage == "create") {
              _push2(`<!--[--><nav class="breadcrumb justify-content-center text-muted" style="${ssrRenderStyle({ "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")` })}"${_scopeId}><span class="breadcrumb-item text-muted"${_scopeId}><span class="badge badge-pill border border-secondary text-muted me-1"${_scopeId}>1</span> Create an Account</span><span class="breadcrumb-item"${_scopeId}><span class="badge badge-pill border border-secondary text-muted me-2"${_scopeId}>2</span>Verify Phone Number</span><span class="breadcrumb-item"${_scopeId}><span class="badge badge-pill border border-secondary text-muted me-1"${_scopeId}>3</span>Create Password</span></nav><div class="card"${_scopeId}><div class="p-md-5"${_scopeId}><div class="text-center mt-2"${_scopeId}><h3 class="fw-bold"${_scopeId}>Create An Account</h3><p class="text-muted"${_scopeId}></p></div><div class="p-2 mt-4"${_scopeId}><form${_scopeId}><div class="form-floating mb-3"${_scopeId}><input class="form-control" placeholder=""${ssrRenderAttr("value", unref(form).firstname)} required autofocus${_scopeId}><label${_scopeId}>Firstname</label>`);
              if (unref(form).errors.firstname) {
                _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.firstname)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="form-floating mb-3"${_scopeId}><input class="form-control" placeholder=""${ssrRenderAttr("value", unref(form).lastname)} required${_scopeId}><label${_scopeId}>Lastname</label>`);
              if (unref(form).errors.lastname) {
                _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.lastname)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="form-floating mb-3"${_scopeId}><input type="email" class="form-control" placeholder=""${ssrRenderAttr("value", unref(form).email)} required${_scopeId}><label${_scopeId}>Email</label>`);
              if (unref(form).errors.email) {
                _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="form-floating mb-3"${_scopeId}><select class="form-select" required${_scopeId}><option value=""${_scopeId}>Select Country</option><!--[-->`);
              ssrRenderList(unref(countries).countries, (i2) => {
                _push2(`<option${ssrRenderAttr("value", i2.name)}${_scopeId}>${ssrInterpolate(i2.name)}</option>`);
              });
              _push2(`<!--]--></select><label${_scopeId}>Country</label>`);
              if (unref(form).errors.country) {
                _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.country)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="text-end"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Link, {
                href: _ctx.route("login"),
                class: "text-muted small fst-italic"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Already have an account? Login `);
                  } else {
                    return [
                      createTextVNode("Already have an account? Login ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="mt-4 mb-2"${_scopeId}><button class="${ssrRenderClass([{ "disabled": unref(form).processing }, "btn btn-primary waves-effect waves-light w-100"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="submit"${_scopeId}>`);
              if (unref(form).processing) {
                _push2(`<span class="spinner-grow text-white spinner-grow-sm me-2"${_scopeId}></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`Continue <i class="ms-1 fal fa-chevron-right"${_scopeId}></i></button></div><div class="text-center"${_scopeId}><small${_scopeId}>By creating an account you&#39;re agreeing to our <a href="#"${_scopeId}>Terms and Conditions</a></small></div></form></div></div></div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.stage == "phone") {
              _push2(`<!--[--><nav class="breadcrumb justify-content-center text-muted" style="${ssrRenderStyle({ "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")` })}"${_scopeId}><span class="breadcrumb-item text-primary fw-bold"${_scopeId}><span class="badge badge-pill border border-2 border-primary fw-bold text-white bg-primary me-1"${_scopeId}><i class="fa fa-check"${_scopeId}></i></span> Create an Account</span><span class="breadcrumb-item"${_scopeId}><span class="badge badge-pill border border-primary text-primary me-2"${_scopeId}>2</span>Verify Phone Number</span><span class="breadcrumb-item"${_scopeId}><span class="badge badge-pill border border-secondary text-muted me-1"${_scopeId}>3</span>Create Password</span></nav><div class="card"${_scopeId}><div class="p-md-5"${_scopeId}><div class="text-center mt-2"${_scopeId}><h3 class="text-dark"${_scopeId}>Enter Phone Number</h3><p class="text-muted"${_scopeId}>A verification code will be sent to this number</p></div><div class="p-2 mt-4"${_scopeId}><form${_scopeId}><div class="input-group mb-3 border border-secondary overflow-hidden rounded"${_scopeId}><span class="input-group-text bg-transparent border-0" style="${ssrRenderStyle({ "border-right": "2px solid grey !important" })}"${_scopeId}>${ssrInterpolate(unref(country_code))}</span><input type="tel" class="form-control border-0" required${ssrRenderAttr("placeholder", unref(country_code) == "+234" ? "example: 7031234564" : "")}${ssrRenderAttr("value", unref(form).phone)}${_scopeId}></div>`);
              if (unref(form).errors.phone) {
                _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.phone)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mt-5 mb-2"${_scopeId}><button class="${ssrRenderClass([{ "disabled": unref(form).processing }, "btn btn-primary btn-lg waves-effect waves-light w-100"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="submit"${_scopeId}>`);
              if (unref(form).processing) {
                _push2(`<span class="spinner-grow text-white spinner-grow-sm me-2"${_scopeId}></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`Continue <i class="ms-1 fal fa-chevron-right"${_scopeId}></i></button></div><div class="text-center"${_scopeId}><small${_scopeId}>By creating an account you&#39;re agreeing to our <a href="#"${_scopeId}>Terms and Conditions</a></small></div><p class="mt-4"${_scopeId}>Need to make changes? `);
              _push2(ssrRenderComponent(_component_Link, {
                as: "button",
                href: _ctx.route("forget-session"),
                method: "post",
                class: "fw-bold btn btn-link p-0"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Forget this session. `);
                  } else {
                    return [
                      createTextVNode(" Forget this session. ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` And start over. We haven&#39;t persisted any data </p></form></div></div></div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_Head, { title: __props.title }, null, 8, ["title"]),
              __props.stage == "create" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode("nav", {
                  class: "breadcrumb justify-content-center text-muted",
                  style: { "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")` }
                }, [
                  createVNode("span", { class: "breadcrumb-item text-muted" }, [
                    createVNode("span", { class: "badge badge-pill border border-secondary text-muted me-1" }, "1"),
                    createTextVNode(" Create an Account")
                  ]),
                  createVNode("span", { class: "breadcrumb-item" }, [
                    createVNode("span", { class: "badge badge-pill border border-secondary text-muted me-2" }, "2"),
                    createTextVNode("Verify Phone Number")
                  ]),
                  createVNode("span", { class: "breadcrumb-item" }, [
                    createVNode("span", { class: "badge badge-pill border border-secondary text-muted me-1" }, "3"),
                    createTextVNode("Create Password")
                  ])
                ]),
                createVNode("div", { class: "card" }, [
                  createVNode("div", { class: "p-md-5" }, [
                    createVNode("div", { class: "text-center mt-2" }, [
                      createVNode("h3", { class: "fw-bold" }, "Create An Account"),
                      createVNode("p", { class: "text-muted" })
                    ]),
                    createVNode("div", { class: "p-2 mt-4" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"])
                      }, [
                        createVNode("div", { class: "form-floating mb-3" }, [
                          withDirectives(createVNode("input", {
                            class: "form-control",
                            placeholder: "",
                            "onUpdate:modelValue": ($event) => unref(form).firstname = $event,
                            required: "",
                            autofocus: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).firstname]
                          ]),
                          createVNode("label", null, "Firstname"),
                          unref(form).errors.firstname ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "small text-danger"
                          }, toDisplayString(unref(form).errors.firstname), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "form-floating mb-3" }, [
                          withDirectives(createVNode("input", {
                            class: "form-control",
                            placeholder: "",
                            "onUpdate:modelValue": ($event) => unref(form).lastname = $event,
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).lastname]
                          ]),
                          createVNode("label", null, "Lastname"),
                          unref(form).errors.lastname ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "small text-danger"
                          }, toDisplayString(unref(form).errors.lastname), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "form-floating mb-3" }, [
                          withDirectives(createVNode("input", {
                            type: "email",
                            class: "form-control",
                            placeholder: "",
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).email]
                          ]),
                          createVNode("label", null, "Email"),
                          unref(form).errors.email ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "small text-danger"
                          }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "form-floating mb-3" }, [
                          withDirectives(createVNode("select", {
                            class: "form-select",
                            "onUpdate:modelValue": ($event) => unref(form).country = $event,
                            required: ""
                          }, [
                            createVNode("option", { value: "" }, "Select Country"),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(countries).countries, (i2) => {
                              return openBlock(), createBlock("option", {
                                value: i2.name,
                                key: i2
                              }, toDisplayString(i2.name), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).country]
                          ]),
                          createVNode("label", null, "Country"),
                          unref(form).errors.country ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "small text-danger"
                          }, toDisplayString(unref(form).errors.country), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "text-end" }, [
                          createVNode(_component_Link, {
                            href: _ctx.route("login"),
                            class: "text-muted small fst-italic"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Already have an account? Login ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ]),
                        createVNode("div", { class: "mt-4 mb-2" }, [
                          createVNode("button", {
                            class: [{ "disabled": unref(form).processing }, "btn btn-primary waves-effect waves-light w-100"],
                            disabled: unref(form).processing,
                            type: "submit"
                          }, [
                            unref(form).processing ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "spinner-grow text-white spinner-grow-sm me-2"
                            })) : createCommentVNode("", true),
                            createTextVNode("Continue "),
                            createVNode("i", { class: "ms-1 fal fa-chevron-right" })
                          ], 10, ["disabled"])
                        ]),
                        createVNode("div", { class: "text-center" }, [
                          createVNode("small", null, [
                            createTextVNode("By creating an account you're agreeing to our "),
                            createVNode("a", { href: "#" }, "Terms and Conditions")
                          ])
                        ])
                      ], 40, ["onSubmit"])
                    ])
                  ])
                ])
              ], 64)) : createCommentVNode("", true),
              __props.stage == "phone" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                createVNode("nav", {
                  class: "breadcrumb justify-content-center text-muted",
                  style: { "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")` }
                }, [
                  createVNode("span", { class: "breadcrumb-item text-primary fw-bold" }, [
                    createVNode("span", { class: "badge badge-pill border border-2 border-primary fw-bold text-white bg-primary me-1" }, [
                      createVNode("i", { class: "fa fa-check" })
                    ]),
                    createTextVNode(" Create an Account")
                  ]),
                  createVNode("span", { class: "breadcrumb-item" }, [
                    createVNode("span", { class: "badge badge-pill border border-primary text-primary me-2" }, "2"),
                    createTextVNode("Verify Phone Number")
                  ]),
                  createVNode("span", { class: "breadcrumb-item" }, [
                    createVNode("span", { class: "badge badge-pill border border-secondary text-muted me-1" }, "3"),
                    createTextVNode("Create Password")
                  ])
                ]),
                createVNode("div", { class: "card" }, [
                  createVNode("div", { class: "p-md-5" }, [
                    createVNode("div", { class: "text-center mt-2" }, [
                      createVNode("h3", { class: "text-dark" }, "Enter Phone Number"),
                      createVNode("p", { class: "text-muted" }, "A verification code will be sent to this number")
                    ]),
                    createVNode("div", { class: "p-2 mt-4" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"])
                      }, [
                        createVNode("div", { class: "input-group mb-3 border border-secondary overflow-hidden rounded" }, [
                          createVNode("span", {
                            class: "input-group-text bg-transparent border-0",
                            style: { "border-right": "2px solid grey !important" }
                          }, toDisplayString(unref(country_code)), 1),
                          withDirectives(createVNode("input", {
                            type: "tel",
                            class: "form-control border-0",
                            required: "",
                            placeholder: unref(country_code) == "+234" ? "example: 7031234564" : "",
                            "onUpdate:modelValue": ($event) => unref(form).phone = $event
                          }, null, 8, ["placeholder", "onUpdate:modelValue"]), [
                            [vModelText, unref(form).phone]
                          ])
                        ]),
                        unref(form).errors.phone ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "small text-danger"
                        }, toDisplayString(unref(form).errors.phone), 1)) : createCommentVNode("", true),
                        createVNode("div", { class: "mt-5 mb-2" }, [
                          createVNode("button", {
                            class: [{ "disabled": unref(form).processing }, "btn btn-primary btn-lg waves-effect waves-light w-100"],
                            disabled: unref(form).processing,
                            type: "submit"
                          }, [
                            unref(form).processing ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "spinner-grow text-white spinner-grow-sm me-2"
                            })) : createCommentVNode("", true),
                            createTextVNode("Continue "),
                            createVNode("i", { class: "ms-1 fal fa-chevron-right" })
                          ], 10, ["disabled"])
                        ]),
                        createVNode("div", { class: "text-center" }, [
                          createVNode("small", null, [
                            createTextVNode("By creating an account you're agreeing to our "),
                            createVNode("a", { href: "#" }, "Terms and Conditions")
                          ])
                        ]),
                        createVNode("p", { class: "mt-4" }, [
                          createTextVNode("Need to make changes? "),
                          createVNode(_component_Link, {
                            as: "button",
                            href: _ctx.route("forget-session"),
                            method: "post",
                            class: "fw-bold btn btn-link p-0"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Forget this session. ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createTextVNode(" And start over. We haven't persisted any data ")
                        ])
                      ], 40, ["onSubmit"])
                    ])
                  ])
                ])
              ], 64)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$A
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$z = {
  __name: "RegisterSimple",
  __ssrInlineRender: true,
  props: { title: String, stage: String, country: String, connection: Object | null },
  setup(__props) {
    const props = __props;
    computed(() => {
      var _a;
      return (_a = countries.countries.find((e2) => e2.name == props.country)) == null ? void 0 : _a.dial_code;
    });
    const form = useForm({
      firstname: "",
      lastname: "",
      email: "",
      country: "Nigeria",
      terms: true,
      password: "",
      connection: props.connection
    });
    const submit = () => {
      form.post(route("register.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(ssrRenderComponent(GuestLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, { title: "Getting Started" }, null, _parent2, _scopeId));
            _push2(`<div class="mt-3 mb-2"${_scopeId}><h3 class="fw-bold"${_scopeId}>Create An Account</h3><p class="small mb-0"${_scopeId}>Lets Get Started</p></div><form${_scopeId}><div class="form-floating mb-3"${_scopeId}><input class="form-control" placeholder=""${ssrRenderAttr("value", unref(form).firstname)} required autofocus${_scopeId}><label${_scopeId}>Firstname</label>`);
            if (unref(form).errors.firstname) {
              _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.firstname)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-floating mb-3"${_scopeId}><input class="form-control" placeholder=""${ssrRenderAttr("value", unref(form).lastname)} required${_scopeId}><label${_scopeId}>Lastname</label>`);
            if (unref(form).errors.lastname) {
              _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.lastname)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-floating mb-3"${_scopeId}><input type="email" class="form-control" placeholder=""${ssrRenderAttr("value", unref(form).email)} required${_scopeId}><label${_scopeId}>Email</label>`);
            if (unref(form).errors.email) {
              _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-floating mb-3"${_scopeId}><input class="form-control" placeholder=""${ssrRenderAttr("value", unref(form).password)} required type="password"${_scopeId}><label${_scopeId}>Enter Password</label>`);
            if (unref(form).errors.password) {
              _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-floating mb-3"${_scopeId}><select class="form-select" required${_scopeId}><option value=""${_scopeId}>Select Country</option><!--[-->`);
            ssrRenderList(unref(countries).countries, (i2) => {
              _push2(`<option${ssrRenderAttr("value", i2.name)}${_scopeId}>${ssrInterpolate(i2.name)}</option>`);
            });
            _push2(`<!--]--></select><label${_scopeId}>Country</label>`);
            if (unref(form).errors.country) {
              _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.country)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-check"${_scopeId}><input type="checkbox" class="form-check-input bg-transparent border-dark" id="auth-remember-check"${ssrIncludeBooleanAttr(Array.isArray(unref(form).terms) ? ssrLooseContain(unref(form).terms, null) : unref(form).terms) ? " checked" : ""}${_scopeId}><label class="form-check-label" for="auth-remember-check"${_scopeId}>By creating an account you&#39;re agreeing to our <a href="#"${_scopeId}>Terms and Conditions</a></label></div><div class="mt-4 mb-2"${_scopeId}><button class="${ssrRenderClass([{ "disabled": unref(form).processing || !unref(form).terms }, "btn btn-primary waves-effect waves-light w-100 rounded-pill"])}"${ssrIncludeBooleanAttr(unref(form).processing || !unref(form).terms) ? " disabled" : ""} type="submit"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<span class="spinner-grow text-white spinner-grow-sm me-2"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`Sign Up</button></div><div class="text-center"${_scopeId}><span${_scopeId}>Already have an account? `);
            _push2(ssrRenderComponent(_component_Link, {
              href: _ctx.route("login")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Log in`);
                } else {
                  return [
                    createTextVNode("Log in")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span></div></form>`);
          } else {
            return [
              createVNode(_component_Head, { title: "Getting Started" }),
              createVNode("div", { class: "mt-3 mb-2" }, [
                createVNode("h3", { class: "fw-bold" }, "Create An Account"),
                createVNode("p", { class: "small mb-0" }, "Lets Get Started")
              ]),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", { class: "form-floating mb-3" }, [
                  withDirectives(createVNode("input", {
                    class: "form-control",
                    placeholder: "",
                    "onUpdate:modelValue": ($event) => unref(form).firstname = $event,
                    required: "",
                    autofocus: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).firstname]
                  ]),
                  createVNode("label", null, "Firstname"),
                  unref(form).errors.firstname ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "small text-danger"
                  }, toDisplayString(unref(form).errors.firstname), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "form-floating mb-3" }, [
                  withDirectives(createVNode("input", {
                    class: "form-control",
                    placeholder: "",
                    "onUpdate:modelValue": ($event) => unref(form).lastname = $event,
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).lastname]
                  ]),
                  createVNode("label", null, "Lastname"),
                  unref(form).errors.lastname ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "small text-danger"
                  }, toDisplayString(unref(form).errors.lastname), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "form-floating mb-3" }, [
                  withDirectives(createVNode("input", {
                    type: "email",
                    class: "form-control",
                    placeholder: "",
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).email]
                  ]),
                  createVNode("label", null, "Email"),
                  unref(form).errors.email ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "small text-danger"
                  }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "form-floating mb-3" }, [
                  withDirectives(createVNode("input", {
                    class: "form-control",
                    placeholder: "",
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    type: "password"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).password]
                  ]),
                  createVNode("label", null, "Enter Password"),
                  unref(form).errors.password ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "small text-danger"
                  }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "form-floating mb-3" }, [
                  withDirectives(createVNode("select", {
                    class: "form-select",
                    "onUpdate:modelValue": ($event) => unref(form).country = $event,
                    required: ""
                  }, [
                    createVNode("option", { value: "" }, "Select Country"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(countries).countries, (i2) => {
                      return openBlock(), createBlock("option", {
                        value: i2.name,
                        key: i2
                      }, toDisplayString(i2.name), 9, ["value"]);
                    }), 128))
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(form).country]
                  ]),
                  createVNode("label", null, "Country"),
                  unref(form).errors.country ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "small text-danger"
                  }, toDisplayString(unref(form).errors.country), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "form-check" }, [
                  withDirectives(createVNode("input", {
                    type: "checkbox",
                    class: "form-check-input bg-transparent border-dark",
                    id: "auth-remember-check",
                    "onUpdate:modelValue": ($event) => unref(form).terms = $event
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelCheckbox, unref(form).terms]
                  ]),
                  createVNode("label", {
                    class: "form-check-label",
                    for: "auth-remember-check"
                  }, [
                    createTextVNode("By creating an account you're agreeing to our "),
                    createVNode("a", { href: "#" }, "Terms and Conditions")
                  ])
                ]),
                createVNode("div", { class: "mt-4 mb-2" }, [
                  createVNode("button", {
                    class: [{ "disabled": unref(form).processing || !unref(form).terms }, "btn btn-primary waves-effect waves-light w-100 rounded-pill"],
                    disabled: unref(form).processing || !unref(form).terms,
                    type: "submit"
                  }, [
                    unref(form).processing ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "spinner-grow text-white spinner-grow-sm me-2"
                    })) : createCommentVNode("", true),
                    createTextVNode("Sign Up")
                  ], 10, ["disabled"])
                ]),
                createVNode("div", { class: "text-center" }, [
                  createVNode("span", null, [
                    createTextVNode("Already have an account? "),
                    createVNode(_component_Link, {
                      href: _ctx.route("login")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Log in")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/RegisterSimple.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$z
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$y = {
  __name: "ResetPassword",
  __ssrInlineRender: true,
  props: {
    email: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      token: props.token,
      email: props.email,
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route("password.store"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(GuestLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Reset Password" }, null, _parent2, _scopeId));
            _push2(`<div class="mt-5 mb-2"${_scopeId}><h3 class="fw-bold"${_scopeId}>Reset Password</h3><p class="text-muted"${_scopeId}>Enter your new password </p></div><form${_scopeId}><div class="form-floating mb-3"${_scopeId}><input type="email" class="form-control" placeholder="" readonly${ssrRenderAttr("value", unref(form).email)} required autofocus${_scopeId}><label${_scopeId}>Email</label>`);
            if (unref(form).errors.email) {
              _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-floating mb-3"${_scopeId}><input type="password" class="form-control" placeholder=""${ssrRenderAttr("value", unref(form).password)} required${_scopeId}><label${_scopeId}>Password</label>`);
            if (unref(form).errors.password) {
              _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-floating mb-3"${_scopeId}><input type="password" class="form-control" placeholder=""${ssrRenderAttr("value", unref(form).password_confirmation)} required${_scopeId}><label${_scopeId}>Confirm Password</label>`);
            if (unref(form).errors.password_confirmation) {
              _push2(`<p class="small text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.password_confirmation)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mt-4 mb-2"${_scopeId}><button class="${ssrRenderClass([{ "disabled": unref(form).processing }, "btn btn-primary waves-effect waves-light w-100 rounded-pill"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="submit"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<span class="spinner-grow text-white spinner-grow-sm me-2"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` Reset Password</button></div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Reset Password" }),
              createVNode("div", { class: "mt-5 mb-2" }, [
                createVNode("h3", { class: "fw-bold" }, "Reset Password"),
                createVNode("p", { class: "text-muted" }, "Enter your new password ")
              ]),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", { class: "form-floating mb-3" }, [
                  withDirectives(createVNode("input", {
                    type: "email",
                    class: "form-control",
                    placeholder: "",
                    readonly: "",
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).email]
                  ]),
                  createVNode("label", null, "Email"),
                  unref(form).errors.email ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "small text-danger"
                  }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "form-floating mb-3" }, [
                  withDirectives(createVNode("input", {
                    type: "password",
                    class: "form-control",
                    placeholder: "",
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).password]
                  ]),
                  createVNode("label", null, "Password"),
                  unref(form).errors.password ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "small text-danger"
                  }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "form-floating mb-3" }, [
                  withDirectives(createVNode("input", {
                    type: "password",
                    class: "form-control",
                    placeholder: "",
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).password_confirmation]
                  ]),
                  createVNode("label", null, "Confirm Password"),
                  unref(form).errors.password_confirmation ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "small text-danger"
                  }, toDisplayString(unref(form).errors.password_confirmation), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "mt-4 mb-2" }, [
                  createVNode("button", {
                    class: [{ "disabled": unref(form).processing }, "btn btn-primary waves-effect waves-light w-100 rounded-pill"],
                    disabled: unref(form).processing,
                    type: "submit"
                  }, [
                    unref(form).processing ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "spinner-grow text-white spinner-grow-sm me-2"
                    })) : createCommentVNode("", true),
                    createTextVNode(" Reset Password")
                  ], 10, ["disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ResetPassword.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$y
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$x = {
  __name: "VerifyEmail",
  __ssrInlineRender: true,
  props: {
    status: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({});
    const submit = () => {
      form.post(route("verification.send"), { preserveState: false });
    };
    const verificationLinkSent = computed(() => props.status === "verification-link-sent");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(GuestLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Email Verification" }, null, _parent2, _scopeId));
            _push2(`<div class="mt-5 mb-2"${_scopeId}><h4 class="fw-bold"${_scopeId}> Email Verification</h4><p class=""${_scopeId}> Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn&#39;t receive the email, we will gladly send you another. </p></div>`);
            if (verificationLinkSent.value) {
              _push2(`<div class="alert alert-success alert-dismissible fade show" role="alert"${_scopeId}><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"${_scopeId}></button><p class="d-flex mb-0"${_scopeId}><i class="fal fa-mail-bulk me-2 font-size-24"${_scopeId}></i><span class="mb-0"${_scopeId}><strong${_scopeId}>Link Sent!</strong> A new verification link has been sent to the email address you provided during registration.</span></p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div class="mt-4"${_scopeId}><button class="${ssrRenderClass([{ "disabled": unref(form).processing }, "btn btn-primary w-100 rounded-pill mb-3"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<span class="spinner-grow text-white spinner-grow-sm me-2"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`Resend Verification Email <i class="fal fa-envelope-open-text ms-2"${_scopeId}></i></button><div class="text-end"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "rounded-pill btn btn-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="fal me-2 fa-sign-out" aria-hidden="true"${_scopeId2}></i> Log Out`);
                } else {
                  return [
                    createVNode("i", {
                      class: "fal me-2 fa-sign-out",
                      "aria-hidden": "true"
                    }),
                    createTextVNode(" Log Out")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Email Verification" }),
              createVNode("div", { class: "mt-5 mb-2" }, [
                createVNode("h4", { class: "fw-bold" }, " Email Verification"),
                createVNode("p", { class: "" }, " Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. ")
              ]),
              verificationLinkSent.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "alert alert-success alert-dismissible fade show",
                role: "alert"
              }, [
                createVNode("button", {
                  type: "button",
                  class: "btn-close",
                  "data-bs-dismiss": "alert",
                  "aria-label": "Close"
                }),
                createVNode("p", { class: "d-flex mb-0" }, [
                  createVNode("i", { class: "fal fa-mail-bulk me-2 font-size-24" }),
                  createVNode("span", { class: "mb-0" }, [
                    createVNode("strong", null, "Link Sent!"),
                    createTextVNode(" A new verification link has been sent to the email address you provided during registration.")
                  ])
                ])
              ])) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", { class: "mt-4" }, [
                  createVNode("button", {
                    class: ["btn btn-primary w-100 rounded-pill mb-3", { "disabled": unref(form).processing }],
                    disabled: unref(form).processing
                  }, [
                    unref(form).processing ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "spinner-grow text-white spinner-grow-sm me-2"
                    })) : createCommentVNode("", true),
                    createTextVNode("Resend Verification Email "),
                    createVNode("i", { class: "fal fa-envelope-open-text ms-2" })
                  ], 10, ["disabled"]),
                  createVNode("div", { class: "text-end" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("logout"),
                      method: "post",
                      as: "button",
                      class: "rounded-pill btn btn-link"
                    }, {
                      default: withCtx(() => [
                        createVNode("i", {
                          class: "fal me-2 fa-sign-out",
                          "aria-hidden": "true"
                        }),
                        createTextVNode(" Log Out")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$x
}, Symbol.toStringTag, { value: "Module" }));
const VerifyPhone_vue_vue_type_style_index_0_scoped_49928c6f_lang = "";
const _sfc_main$w = {
  __name: "VerifyPhone",
  __ssrInlineRender: true,
  props: { title: String, token: String | Number },
  setup(__props) {
    let timer = null;
    let time = ref(0);
    const form = useForm({
      token: ""
    });
    const submit = () => {
      form.post(route("register"), { onError: () => form.reset() });
    };
    onMounted(() => start_timer());
    let start_timer = () => {
      clearInterval(timer);
      time.value = 60;
      timer = setInterval(() => {
        time.value = time.value - 1;
        if (time.value < 1) {
          clearInterval(timer);
        }
      }, 1e3);
    };
    let resendToken = () => {
      router.post(route("register.resend-code"), { onSubmit: () => {
        form.clearErrors();
        start_timer();
      } });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(ssrRenderComponent(GuestLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, { title: __props.title }, null, _parent2, _scopeId));
            {
              _push2(`<!--[--><nav class="breadcrumb justify-content-center text-muted" style="${ssrRenderStyle({ "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")` })}" data-v-49928c6f${_scopeId}><span class="breadcrumb-item text-primary fw-bold" data-v-49928c6f${_scopeId}><span class="badge badge-pill border border-2 border-primary fw-bold text-white bg-primary me-1" data-v-49928c6f${_scopeId}><i class="fa fa-check" data-v-49928c6f${_scopeId}></i></span> Create an Account</span><span class="breadcrumb-item" data-v-49928c6f${_scopeId}><span class="badge badge-pill border border-primary text-primary me-2" data-v-49928c6f${_scopeId}>2</span>Verify Phone Number</span><span class="breadcrumb-item" data-v-49928c6f${_scopeId}><span class="badge badge-pill border border-secondary text-muted me-1" data-v-49928c6f${_scopeId}>3</span>Create Password</span></nav><div class="card" data-v-49928c6f${_scopeId}><div class="p-md-5" data-v-49928c6f${_scopeId}><p class="text-end" data-v-49928c6f${_scopeId}><span class="badge text-bg-info me-2" data-v-49928c6f${_scopeId}>Debug</span>${ssrInterpolate(__props.token)}</p><div class="text-center mt-2" data-v-49928c6f${_scopeId}><h3 class="text-dark" data-v-49928c6f${_scopeId}>Account Verification</h3><p class="text-muted" data-v-49928c6f${_scopeId}>Please enter code that was sent to your phone number in the form below. This code will expire in 00:${ssrInterpolate(unref(time).toLocaleString("en-US", { minimumIntegerDigits: 2 }))} seconds.</p></div><div class="p-2 mt-4" data-v-49928c6f${_scopeId}><form data-v-49928c6f${_scopeId}><div class="d-flex justify-content-center" data-v-49928c6f${_scopeId}>`);
              _push2(ssrRenderComponent(unref(VOtpInput), {
                value: unref(form).token,
                "onUpdate:value": ($event) => unref(form).token = $event,
                req: "",
                "input-classes": "text-center form-control mx-2",
                separator: "",
                "num-inputs": 4,
                "should-auto-focus": true,
                "input-type": "letter-numeric",
                onOnComplete: submit,
                placeholder: ["*", "*", "*", "*"]
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              if (unref(form).errors.token) {
                _push2(`<p class="small text-danger" data-v-49928c6f${_scopeId}>${ssrInterpolate(unref(form).errors.token)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="text-center" data-v-49928c6f${_scopeId}>Didn&#39;t receive code, <a href="#" class="text-decoration-underline" data-v-49928c6f${_scopeId}>Resend</a></p><div class="mt-5 mb-2" data-v-49928c6f${_scopeId}><button class="${ssrRenderClass([{ "disabled": unref(form).processing || !unref(form).token }, "btn btn-primary btn-lg waves-effect waves-light w-100"])}"${ssrIncludeBooleanAttr(unref(form).processing || !unref(form).token) ? " disabled" : ""} type="submit" data-v-49928c6f${_scopeId}>`);
              if (unref(form).processing) {
                _push2(`<span class="spinner-grow text-white spinner-grow-sm me-2" data-v-49928c6f${_scopeId}></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`Continue <i class="ms-1 fal fa-chevron-right" data-v-49928c6f${_scopeId}></i></button></div><div class="text-center" data-v-49928c6f${_scopeId}><small data-v-49928c6f${_scopeId}>By creating an account you&#39;re agreeing to our <a href="#" data-v-49928c6f${_scopeId}>Terms and Conditions</a></small></div><p class="mt-4" data-v-49928c6f${_scopeId}>Need to make changes? `);
              _push2(ssrRenderComponent(_component_Link, {
                as: "button",
                href: _ctx.route("forget-session"),
                method: "post",
                class: "fw-bold btn btn-link p-0"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Forget this session. `);
                  } else {
                    return [
                      createTextVNode(" Forget this session. ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` And start over. We haven&#39;t persisted any data </p></form></div></div></div><!--]-->`);
            }
          } else {
            return [
              createVNode(_component_Head, { title: __props.title }, null, 8, ["title"]),
              (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode("nav", {
                  class: "breadcrumb justify-content-center text-muted",
                  style: { "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")` }
                }, [
                  createVNode("span", { class: "breadcrumb-item text-primary fw-bold" }, [
                    createVNode("span", { class: "badge badge-pill border border-2 border-primary fw-bold text-white bg-primary me-1" }, [
                      createVNode("i", { class: "fa fa-check" })
                    ]),
                    createTextVNode(" Create an Account")
                  ]),
                  createVNode("span", { class: "breadcrumb-item" }, [
                    createVNode("span", { class: "badge badge-pill border border-primary text-primary me-2" }, "2"),
                    createTextVNode("Verify Phone Number")
                  ]),
                  createVNode("span", { class: "breadcrumb-item" }, [
                    createVNode("span", { class: "badge badge-pill border border-secondary text-muted me-1" }, "3"),
                    createTextVNode("Create Password")
                  ])
                ]),
                createVNode("div", { class: "card" }, [
                  createVNode("div", { class: "p-md-5" }, [
                    createVNode("p", { class: "text-end" }, [
                      createVNode("span", { class: "badge text-bg-info me-2" }, "Debug"),
                      createTextVNode(toDisplayString(__props.token), 1)
                    ]),
                    createVNode("div", { class: "text-center mt-2" }, [
                      createVNode("h3", { class: "text-dark" }, "Account Verification"),
                      createVNode("p", { class: "text-muted" }, "Please enter code that was sent to your phone number in the form below. This code will expire in 00:" + toDisplayString(unref(time).toLocaleString("en-US", { minimumIntegerDigits: 2 })) + " seconds.", 1)
                    ]),
                    createVNode("div", { class: "p-2 mt-4" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"])
                      }, [
                        createVNode("div", { class: "d-flex justify-content-center" }, [
                          createVNode(unref(VOtpInput), {
                            value: unref(form).token,
                            "onUpdate:value": ($event) => unref(form).token = $event,
                            req: "",
                            "input-classes": "text-center form-control mx-2",
                            separator: "",
                            "num-inputs": 4,
                            "should-auto-focus": true,
                            "input-type": "letter-numeric",
                            onOnComplete: submit,
                            placeholder: ["*", "*", "*", "*"]
                          }, null, 8, ["value", "onUpdate:value"])
                        ]),
                        unref(form).errors.token ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "small text-danger"
                        }, toDisplayString(unref(form).errors.token), 1)) : createCommentVNode("", true),
                        createVNode("p", { class: "text-center" }, [
                          createTextVNode("Didn't receive code, "),
                          createVNode("a", {
                            onClick: withModifiers(unref(resendToken), ["prevent"]),
                            href: "#",
                            class: "text-decoration-underline"
                          }, "Resend", 8, ["onClick"])
                        ]),
                        createVNode("div", { class: "mt-5 mb-2" }, [
                          createVNode("button", {
                            class: [{ "disabled": unref(form).processing || !unref(form).token }, "btn btn-primary btn-lg waves-effect waves-light w-100"],
                            disabled: unref(form).processing || !unref(form).token,
                            type: "submit"
                          }, [
                            unref(form).processing ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "spinner-grow text-white spinner-grow-sm me-2"
                            })) : createCommentVNode("", true),
                            createTextVNode("Continue "),
                            createVNode("i", { class: "ms-1 fal fa-chevron-right" })
                          ], 10, ["disabled"])
                        ]),
                        createVNode("div", { class: "text-center" }, [
                          createVNode("small", null, [
                            createTextVNode("By creating an account you're agreeing to our "),
                            createVNode("a", { href: "#" }, "Terms and Conditions")
                          ])
                        ]),
                        createVNode("p", { class: "mt-4" }, [
                          createTextVNode("Need to make changes? "),
                          createVNode(_component_Link, {
                            as: "button",
                            href: _ctx.route("forget-session"),
                            method: "post",
                            class: "fw-bold btn btn-link p-0"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Forget this session. ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createTextVNode(" And start over. We haven't persisted any data ")
                        ])
                      ], 40, ["onSubmit"])
                    ])
                  ])
                ])
              ], 64))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyPhone.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const VerifyPhone = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-49928c6f"]]);
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VerifyPhone
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$v = {
  __name: "UserListItem",
  __ssrInlineRender: true,
  props: { user: Object },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "list-group-item" }, _attrs))}><div class="d-flex"><div class="flex-shrink-0 me-2"><img loading="lazy"${ssrRenderAttr("src", __props.user.avatar ?? "assets/images/no-profilepics.png")} class="avatar rounded-circle img-thumbnail"></div><div class="row w-100"><div class="col-7"><h6 class="mb-1">`);
      _push(ssrRenderComponent(_component_Link, {
        class: "text-body",
        href: _ctx.route("profile.index", { slug: __props.user.slug })
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.user.fullname)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.user.fullname), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h6><p class="mb-0 font-size-12 text-capitalize text-muted">${ssrInterpolate(__props.user.headline)}</p></div><div class="col-5 text-end"><button type="button" data-bs-toggle="dropdown" class="btn btn-sm border-secondary text-nowrap text-primary"><i class="fal fa-user-plus px-1"></i> Connect <i class="fal fa-chevron-down font-size-12 ms-1"></i></button><div class="dropdown-menu"><a class="dropdown-item" href="#">Request to be protégé</a><a class="dropdown-item" href="#">Connect as peers </a></div></div></div></div></li>`);
    };
  }
};
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UserListItem.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const _sfc_main$u = {
  __name: "UserLists",
  __ssrInlineRender: true,
  setup(__props) {
    let users = ref([]);
    let isLoading = ref(true);
    const getSuggestions = async () => {
      isLoading.value = true;
      try {
        let response = await axios$1.get(route("users.suggestions"));
        users.value = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    };
    const handleConnect = (ev) => {
      useForm({
        friend_id: ev.id,
        user_id: usePage().props.auth.user.id,
        type: ev.type ?? "peer"
      }).post("/connect", { preserveScroll: true, preserveState: false, only: ["posts"], onSuccess: () => users.value.splice(users.value.find((e2) => e2.id == ev.id), 1) });
    };
    onMounted(async () => {
      getSuggestions();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (unref(isLoading)) {
        _push(`<!--[-->`);
        ssrRenderList(7, (i2) => {
          _push(`<ul class="list-group list-group-flush"><li class="list-group-item"><div class="d-flex"><div class="flex-shrink-0 me-2"><div class="avatar placeholder placeholder-wave rounded-circle"></div></div><div class="row w-100"><div class="col-7"><h6 class="mb-0 placeholder placeholder-lg w-75 placeholder-wave"></h6><p class="mb-0 placeholder w-100 placeholder-wave"></p></div><div class="col-5 text-end"><a href="#" tabindex="-1" class="btn btn-sm bg-dark disabled placeholder w-100 placeholder-wave"></a></div></div></div></li></ul>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<ul class="list-group list-group-flush">`);
      if (unref(users).length) {
        _push(`<!--[-->`);
        ssrRenderList(unref(users), (i2) => {
          _push(ssrRenderComponent(_sfc_main$v, {
            onOnConnect: ($event) => handleConnect($event),
            key: i2,
            user: i2
          }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="d-flex justify-content-center align-items-center"><button class="btn btn-lg d-flex align-items-center"><i class="fal fa-arrows-rotate fa-3x me-2"></i> Reload </button></div>`);
      }
      _push(`</ul><!--]-->`);
    };
  }
};
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UserLists.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const _sfc_main$t = {
  __name: "AuthenticatedLayoutWithSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$I, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row"${_scopeId}><div class="col-xxl-10"${_scopeId}><div class="row"${_scopeId}><div class="col-md-7"${_scopeId}><div class="bg-white px-3 p-2 mb-3"${_scopeId}><div class="d-flex align-items-center justify-content-between"${_scopeId}><div${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "headerleft", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div><div${_scopeId}><button class="btn btn-light btn-sm d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#layoutSidebar"${_scopeId}><i class="fa fa-bars" aria-hidden="true"${_scopeId}></i></button></div></div></div>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div><div class="col-md-5"${_scopeId}><div class="offcanvas-md offcanvas-end" tabindex="-1" id="layoutSidebar"${_scopeId}><div class="offcanvas-header"${_scopeId}><button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#layoutSidebar" aria-label="Close"${_scopeId}></button></div><div style="${ssrRenderStyle({ "overflow-y": "auto" })}"${_scopeId}><div class="card shadow-sm"${_scopeId}><div class="card-header bg-transparent"${_scopeId}><h5 class=""${_scopeId}>Grow your network</h5></div>`);
            _push2(ssrRenderComponent(_sfc_main$u, null, null, _parent2, _scopeId));
            _push2(`<div class="card-footer bg-transparent"${_scopeId}><a href="#"${_scopeId}>View all recommendations <i class="fa fa-arrow-right ms-2"${_scopeId}></i></a></div></div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-xxl-10" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-md-7" }, [
                      createVNode("div", { class: "bg-white px-3 p-2 mb-3" }, [
                        createVNode("div", { class: "d-flex align-items-center justify-content-between" }, [
                          createVNode("div", null, [
                            renderSlot(_ctx.$slots, "headerleft")
                          ]),
                          createVNode("div", null, [
                            createVNode("button", {
                              class: "btn btn-light btn-sm d-md-none",
                              type: "button",
                              "data-bs-toggle": "offcanvas",
                              "data-bs-target": "#layoutSidebar"
                            }, [
                              createVNode("i", {
                                class: "fa fa-bars",
                                "aria-hidden": "true"
                              })
                            ])
                          ])
                        ])
                      ]),
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    createVNode("div", { class: "col-md-5" }, [
                      createVNode("div", {
                        class: "offcanvas-md offcanvas-end",
                        tabindex: "-1",
                        id: "layoutSidebar"
                      }, [
                        createVNode("div", { class: "offcanvas-header" }, [
                          createVNode("button", {
                            type: "button",
                            class: "btn-close",
                            "data-bs-dismiss": "offcanvas",
                            "data-bs-target": "#layoutSidebar",
                            "aria-label": "Close"
                          })
                        ]),
                        createVNode("div", { style: { "overflow-y": "auto" } }, [
                          createVNode("div", { class: "card shadow-sm" }, [
                            createVNode("div", { class: "card-header bg-transparent" }, [
                              createVNode("h5", { class: "" }, "Grow your network")
                            ]),
                            createVNode(_sfc_main$u),
                            createVNode("div", { class: "card-footer bg-transparent" }, [
                              createVNode("a", { href: "#" }, [
                                createTextVNode("View all recommendations "),
                                createVNode("i", { class: "fa fa-arrow-right ms-2" })
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayoutWithSidebar.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const _sfc_main$s = /* @__PURE__ */ Object.assign({ layout: _sfc_main$t }, {
  __name: "Construction",
  __ssrInlineRender: true,
  props: { title: String },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, {
        title: `${__props.title} | Under Construction`
      }, null, _parent));
      _push(`<div class="card card-body d-flex flex-column justify-content-center text-center align-items-center" style="${ssrRenderStyle({ "min-height": "80vh" })}"><h2>${ssrInterpolate(__props.title || "Under Construction")}</h2><img src="/assets/images/maintenance.png" alt="" style="${ssrRenderStyle({ "width": "100%", "object-fit": "cover" })}"><h4 class="my-3">This page is still Under Construction</h4><p>Please check back in sometime</p>`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("feeds"),
        class: "btn btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Back to Home`);
          } else {
            return [
              createTextVNode("Back to Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Construction.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$s
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$r = {
  __name: "CommentForm",
  __ssrInlineRender: true,
  props: { postId: String, content: String, commentId: Number },
  setup(__props) {
    const props = __props;
    let form = useForm({
      content: props.content,
      user_id: usePage().props.auth.user.id,
      commentable_id: props.postId
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_c_textarea = resolveComponent("c-textarea");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex mb-3" }, _attrs))}><div class="me-1 flex-shrink-0"><img${ssrRenderAttr("src", _ctx.$page.props.auth.user.usermeta.avatar ?? "assets/images/no-profilepics.png")} class="avatar avatar-sm rounded-circle img-thumbnail"></div><div class="flex-grow-1 lh-sm"><form class="p-2 py-0 rounded-3 bg-light">`);
      _push(ssrRenderComponent(_component_c_textarea, {
        required: "",
        modelValue: unref(form).content,
        "onUpdate:modelValue": ($event) => unref(form).content = $event,
        class: "form-control-plaintext",
        placeholder: "Write a comment"
      }, null, _parent));
      _push(`<div class="text-end"><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="submit" class="btn-sm font-size-20 btn">`);
      if (unref(form).processing) {
        _push(`<span class="spinner-border spinner-border-sm"></span>`);
      } else {
        _push(`<i class="fad fa-paper-plane"></i>`);
      }
      _push(`</button></div></form>`);
      ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CommentForm.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const _sfc_main$q = {
  __name: "ReactionButtons",
  __ssrInlineRender: true,
  props: { likeable: Object },
  setup(__props) {
    const props = __props;
    let likeObject = computed(() => {
      let likes = props.likeable.likes.filter((e2) => e2.reaction == "like");
      return {
        liked: likes.map((e2) => e2.user_id).includes(usePage().props.auth.user.id),
        count: likes.length
      };
    });
    let dislikeObject = computed(() => {
      let likes = props.likeable.likes.filter((e2) => e2.reaction == "dislike");
      return {
        liked: likes.map((e2) => e2.user_id).includes(usePage().props.auth.user.id),
        count: likes.length
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("comment.actions"),
        method: "POST",
        data: { likeable_id: __props.likeable.id, reaction: "like", user_id: _ctx.$page.props.auth.user.id },
        "preserve-scroll": true,
        "preserve-state": false,
        class: "text-body me-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="${ssrRenderClass([unref(likeObject).liked ? "text-primary fas" : "fal", "fa-thumbs-up me-1"])}"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(likeObject).count)}</span>`);
          } else {
            return [
              createVNode("i", {
                class: ["fa-thumbs-up me-1", unref(likeObject).liked ? "text-primary fas" : "fal"]
              }, null, 2),
              createVNode("span", null, toDisplayString(unref(likeObject).count), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("comment.actions"),
        method: "POST",
        data: { likeable_id: __props.likeable.id, reaction: "dislike", user_id: _ctx.$page.props.auth.user.id },
        "preserve-scroll": true,
        "preserve-state": false,
        class: "text-body me-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="${ssrRenderClass([unref(dislikeObject).liked ? "text-primary fas" : "fal", "fa-thumbs-down me-1"])}"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(dislikeObject).count)}</span>`);
          } else {
            return [
              createVNode("i", {
                class: ["fa-thumbs-down me-1", unref(dislikeObject).liked ? "text-primary fas" : "fal"]
              }, null, 2),
              createVNode("span", null, toDisplayString(unref(dislikeObject).count), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ReactionButtons.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const _sfc_main$p = {
  __name: "CommentItem",
  __ssrInlineRender: true,
  props: { comment: Object, canEdit: Boolean, canDelete: Boolean },
  setup(__props) {
    const props = __props;
    let content = ref("");
    let form = useForm({
      user_id: usePage().props.auth.user.id,
      content: null,
      commentable_id: props.comment.commentable_id,
      parent_id: props.comment.id,
      commentable_type: "App\\Models\\Comment"
    });
    let replies = computed(() => props.comment.replies);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _component_c_textarea = resolveComponent("c-textarea");
      const _component_comment_item = resolveComponent("comment-item", true);
      if (unref(content) && unref(content).length) {
        _push(ssrRenderComponent(_sfc_main$r, mergeProps({
          "post-id": __props.comment.post_id,
          content: unref(content),
          "comment-id": __props.comment.id
        }, _attrs), {
          footer: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<a href="#" class="small"${_scopeId}>Press to cancel</a>`);
            } else {
              return [
                createVNode("a", {
                  href: "#",
                  class: "small",
                  onClick: withModifiers(($event) => isRef(content) ? content.value = "" : content = "", ["prevent"])
                }, "Press to cancel", 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex mb-3" }, _attrs))}><div class="me-1 flex-shrink-0"><img loading="lazy"${ssrRenderAttr("src", __props.comment.user.avatar ?? "assets/images/no-profilepics.png")} class="avatar avatar-sm rounded-circle img-thumbnail"></div><div class="flex-grow-1"><div class="py-2 px-3 bg-light rounded-3">`);
        if (__props.canEdit || __props.canDelete) {
          _push(`<div class="dropdown float-end"><button style="${ssrRenderStyle({})}" class="btn btn-sm" type="button" data-bs-toggle="dropdown"><i class="fas fa-ellipsis-h"></i></button><div class="dropdown-menu">`);
          if (__props.canEdit) {
            _push(`<button class="dropdown-item" href="#">Edit</button>`);
          } else {
            _push(`<!---->`);
          }
          if (__props.canDelete) {
            _push(ssrRenderComponent(_component_Link, {
              method: "delete",
              as: "button",
              href: _ctx.route("comment.destroy"),
              "preserve-state": false,
              "preserve-scroll": true,
              class: "dropdown-item",
              data: { id: __props.comment.id }
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Delete `);
                } else {
                  return [
                    createTextVNode("Delete ")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="mb-1 fw-bold">`);
        _push(ssrRenderComponent(_component_Link, {
          class: "text-reset",
          href: _ctx.route("profile.index", { slug: __props.comment.user.slug })
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.comment.user.fullname)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.comment.user.fullname), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p><p class="mb-0" style="${ssrRenderStyle({ "white-space": "pre-line" })}">${__props.comment.content}</p><p class="text-end mb-0 small">${ssrInterpolate(unref(moment$1)(__props.comment.created_at).fromNow())} `);
        if (__props.comment.created_at !== __props.comment.updated_at) {
          _push(`<small${ssrRenderAttr("title", unref(moment$1)(__props.comment.updated_at).fromNow())}>(edited)</small>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></div><div class="d-flex align-items-center my-2">`);
        _push(ssrRenderComponent(_sfc_main$q, { likeable: __props.comment }, null, _parent));
        _push(`<a class="text-body me-2" data-bs-toggle="collapse"${ssrRenderAttr("href", `#reply_${__props.comment.id}`)}><i class="fal fa-reply fa-rotate-180"></i> Reply</a></div><div class="collapse"${ssrRenderAttr("id", `reply_${__props.comment.id}`)}><div class="d-flex mb-3"><div class="me-1 flex-shrink-0"><img${ssrRenderAttr("src", _ctx.$page.props.auth.user.usermeta.avatar ?? "assets/images/no-profilepics.png")} class="avatar rounded-circle img-thumbnail"></div><div class="flex-grow-1 lh-sm"><form class="p-2 py-0 rounded-3 bg-light">`);
        _push(ssrRenderComponent(_component_c_textarea, {
          modelValue: unref(form).content,
          "onUpdate:modelValue": ($event) => unref(form).content = $event,
          required: "",
          class: "form-control-plaintext",
          placeholder: "Add a reply"
        }, null, _parent));
        _push(`<div class="text-end"><button type="submit" class="btn-sm p-0 font-size-20 btn me-3"><i class="fad fa-paper-plane"></i></button></div></form>`);
        ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent);
        _push(`</div></div></div>`);
        if (unref(replies).length) {
          _push(`<button data-bs-toggle="collapse"${ssrRenderAttr("href", `#reply_comments_${__props.comment.id}`)} class="btn btn btn-sm rounded-pill text-primary"><i class="fas fa-caret-down me-3"></i> ${ssrInterpolate(unref(replies).length)} reply</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="collapse"${ssrRenderAttr("id", `reply_comments_${__props.comment.id}`)}><!--[-->`);
        ssrRenderList(unref(replies), (comm) => {
          _push(ssrRenderComponent(_component_comment_item, {
            key: comm,
            comment: comm,
            "can-edit": comm.user_id == _ctx.$page.props.auth.user.id,
            "can-delete": comm.user_id == _ctx.$page.props.auth.user.id
          }, null, _parent));
        });
        _push(`<!--]--></div></div></div>`);
      }
    };
  }
};
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CommentItem.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const _sfc_main$o = {
  __name: "LikeButton",
  __ssrInlineRender: true,
  props: { post: Object, mode: String },
  setup(__props) {
    const props = __props;
    let likeObject = computed(() => {
      let likeCount = props.post.likes.length;
      return {
        liked: props.post.likes.map((e2) => e2.user_id).includes(usePage().props.auth.user.id),
        label: `${likeCount} ${likeCount == 0 || likeCount > 1 ? "Likes" : "Like"}`
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.mode == "button") {
        _push(`<button${ssrRenderAttrs(mergeProps({
          as: "button",
          method: "POST",
          class: "btn"
        }, _attrs))}><i class="${ssrRenderClass([unref(likeObject).liked ? "text-danger fas" : "fal", "fa-heart"])}"></i></button>`);
      } else if (__props.mode = "label") {
        _push(`<span${ssrRenderAttrs(_attrs)}>${ssrInterpolate(unref(likeObject).label)}</span>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LikeButton.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const _sfc_main$n = {
  __name: "CommentButton",
  __ssrInlineRender: true,
  props: { post: Object, mode: String },
  setup(__props) {
    const props = __props;
    let commentObject = computed(() => {
      let count = props.post.comments_count;
      return {
        count,
        label: `${count} ${count == 0 || count > 1 ? "Comments" : "Comment"}`
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.mode == "button") {
        _push(`<button${ssrRenderAttrs(mergeProps({
          "data-bs-toggle": "collapse",
          "data-bs-target": `#post${__props.post.id}`,
          class: "btn ps-0"
        }, _attrs))}><i class="fal fa-comments"></i></button>`);
      } else if (__props.mode = "label") {
        _push(`<span${ssrRenderAttrs(mergeProps({
          "data-bs-toggle": "collapse",
          "data-bs-target": `#post${__props.post.id}`
        }, _attrs))}>${ssrInterpolate(unref(commentObject).label)}</span>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CommentButton.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const PostItem_vue_vue_type_style_index_0_scoped_90265539_lang = "";
const _sfc_main$m = {
  __name: "PostItem",
  __ssrInlineRender: true,
  props: { post: Object, minimal: Boolean },
  setup(__props) {
    let viewfull = ref();
    let toggleLikes = (ev) => {
      useForm(ev).post(route("post.toggle.like"), { preserveState: false, preserveScroll: true });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      if (__props.minimal) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "card border-0 my-4 mx-2",
          style: { "box-shadow": "0px 0px 2px rgb(154, 153, 153)" }
        }, _attrs))} data-v-90265539><div class="d-flex align-items-center p-2" data-v-90265539><div class="me-2 flex-shrink-0" data-v-90265539><img loading="lazy"${ssrRenderAttr("src", __props.post.user.avatar ?? "assets/images/no-profilepics.png")} class="avatar avatar-sm rounded-circle img-thumbnail" data-v-90265539></div><div class="flex-grow-1 lh-sm" data-v-90265539><h6 class="mb-1 fw-bold" data-v-90265539>`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("profile.index", { slug: __props.post.user.slug })
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.post.user.fullname)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.post.user.fullname), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</h6><p class="mb-0 small text-muted" data-v-90265539>${ssrInterpolate(unref(moment$1)(__props.post.created_at).fromNow())}</p></div></div>`);
        if (__props.post.attachments.length) {
          _push(`<div data-v-90265539><img loading="lazy" class="w-100" style="${ssrRenderStyle({ "height": "150px", "width": "100%", "object-fit": "cover" })}"${ssrRenderAttr("src", __props.post.attachments.map((e2) => e2.url)[0])} data-v-90265539></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="card-body" data-v-90265539>`);
        _push(ssrRenderComponent(_component_Link, {
          class: "text-body",
          href: _ctx.route("post.show", { id: __props.post.id })
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p data-v-90265539${_scopeId}>${ssrInterpolate(unref(truncate)(unref(stripHtml)(__props.post.content), { length: 100, omission: "... see more" }))}</p>`);
            } else {
              return [
                createVNode("p", null, toDisplayString(unref(truncate)(unref(stripHtml)(__props.post.content), { length: 100, omission: "... see more" })), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div data-v-90265539>`);
        _push(ssrRenderComponent(_sfc_main$o, {
          onOnPress: ($event) => unref(toggleLikes)($event),
          mode: "button",
          post: __props.post
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$o, {
          mode: "label",
          post: __props.post
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "card shadow-sm p-3 mb-3" }, _attrs))} data-v-90265539><div class="d-flex mb-3" data-v-90265539><div class="me-3 flex-shrink-0" data-v-90265539><img loading="lazy"${ssrRenderAttr("src", __props.post.user.avatar ?? "assets/images/no-profilepics.png")} class="avatar avatar-sm rounded-circle img-thumbnail" data-v-90265539></div><div class="flex-grow-1 lh-sm" data-v-90265539><h6 class="mb-1 fw-bold" data-v-90265539>`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("profile.index", { slug: __props.post.user.slug })
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.post.user.fullname)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.post.user.fullname), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</h6><p class="mb-1 text-capitalize small text-muted" data-v-90265539>${ssrInterpolate(__props.post.user.headline)}</p><p class="mb-0 small text-muted" data-v-90265539>${ssrInterpolate(unref(moment$1)(__props.post.created_at).fromNow())} `);
        if (__props.post.created_at !== __props.post.updated_at) {
          _push(`<small${ssrRenderAttr("title", unref(moment$1)(__props.post.updated_at).fromNow())} data-v-90265539>(edited)</small>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></div>`);
        if (__props.post.user.id == _ctx.$page.props.auth.user.id) {
          _push(`<div class="float-end" data-v-90265539><div class="dropdown open" data-v-90265539><button class="btn" type="button" id="triggerId" data-bs-toggle="dropdown" data-v-90265539><i class="fad font-size-20 fa-ellipsis-h" data-v-90265539></i></button><div class="dropdown-menu" data-v-90265539>`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("post.edit", { id: __props.post.id }),
            class: "dropdown-item"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="fad fa-pencil me-1" data-v-90265539${_scopeId}></i> Edit`);
              } else {
                return [
                  createVNode("i", { class: "fad fa-pencil me-1" }),
                  createTextVNode(" Edit")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<button class="dropdown-item" data-v-90265539><i class="fad fa-trash-alt me-1" data-v-90265539></i> Trash</button></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><a class="text-reset" href="" data-v-90265539>`);
        if (unref(viewfull)) {
          _push(`<p data-v-90265539>${__props.post.content}</p>`);
        } else {
          _push(`<p data-v-90265539>${ssrInterpolate(unref(truncate)(unref(stripHtml)(__props.post.content), { length: 200, omission: "... see more", separator: /,? +/ }))}</p>`);
        }
        _push(`</a>`);
        if (__props.post.attachments.length) {
          _push(`<div class="w-100 mb-3" style="${ssrRenderStyle({ "height": "300px" })}" data-v-90265539>`);
          _push(ssrRenderComponent(unref(GiGridImages), {
            class: "rounded-3",
            cells: 3,
            items: __props.post.attachments.map((e2) => e2.url)
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="d-flex justify-content-between align-items-center" data-v-90265539><div class="d-flex" data-v-90265539>`);
        _push(ssrRenderComponent(_sfc_main$n, {
          mode: "button",
          post: __props.post
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$o, {
          onOnPress: ($event) => unref(toggleLikes)($event),
          mode: "button",
          post: __props.post
        }, null, _parent));
        _push(`<button class="btn" data-v-90265539><i class="fal fa-share-alt" data-v-90265539></i></button></div><div class="d-flex justify-content-end text-muted small align-items-center" data-v-90265539>`);
        _push(ssrRenderComponent(_sfc_main$o, {
          mode: "label",
          post: __props.post
        }, null, _parent));
        _push(`<i style="${ssrRenderStyle({ "font-size": "3px" })}" class="fa fa-circle px-2" data-v-90265539></i>`);
        _push(ssrRenderComponent(_sfc_main$n, {
          mode: "label",
          post: __props.post
        }, null, _parent));
        _push(`<i style="${ssrRenderStyle({ "font-size": "3px" })}" class="fa fa-circle px-2" data-v-90265539></i><span data-v-90265539>0 Reports</span></div></div><div class="${ssrRenderClass([{ show: __props.post.comments_count }, "collapse"])}"${ssrRenderAttr("id", `post${__props.post.id}`)} data-v-90265539>`);
        _push(ssrRenderComponent(_sfc_main$r, {
          "post-id": __props.post.id
        }, null, _parent));
        if (__props.post.comments_count > 2) {
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("post.show", { id: __props.post.id })
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`View more comments`);
              } else {
                return [
                  createTextVNode("View more comments")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (__props.post.comments.length) {
          _push(`<!--[-->`);
          ssrRenderList(__props.post.comments, (comm) => {
            _push(ssrRenderComponent(_sfc_main$p, {
              key: comm,
              "can-edit": comm.user_id == _ctx.$page.props.auth.user.id,
              "can-delete": comm.user_id == _ctx.$page.props.auth.user.id || __props.post.user_id == _ctx.$page.props.auth.user.id,
              comment: comm
            }, null, _parent));
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PostItem.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const PostItem = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-90265539"]]);
const vueQuill_bubble = "";
const _sfc_main$l = {
  __name: "CreatePostForm",
  __ssrInlineRender: true,
  setup(__props) {
    onMounted(() => {
      new bootstrap.Modal("#createPostModal", {});
    });
    let form = useForm({
      content: "",
      attachments: []
    });
    let blobs = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="card card-body shadow-sm"><div class="d-flex align-items-center mb-3"><div class="me-2 flex-shrink-0"><img${ssrRenderAttr("src", _ctx.$page.props.auth.user.usermeta.avatar ?? "assets/images/no-profilepics.png")} class="avatar avatar-xs rounded-circle img-thumbnail"></div><div class="flex-grow-1 lh-sm"><input class="form-control form-control-sm p-2 ps-4 rounded-pill border-0 rounded-4 bg-light" placeholder="Are there career updates you would love to share with us today?"></div></div><div class="d-flex justify-content-between align-items-center"><div class="d-flex"><button class="btn btn-sm rounded-circle"><i class="fal fa-camera-retro"></i></button><button class="btn btn-sm rounded-circle"><i class="fal fa-image"></i></button><button class="btn btn-sm rounded-circle"><i class="fal fa-smile"></i></button></div><button diasbled class="btn btn-sm btn-primary px-3">Post</button></div></div><div class="modal fade" id="createPostModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"><div class="modal-dialog modal-md" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Create Post</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><form class="modal-body"><div class="d-flex mb-3"><div class="me-3 flex-shrink-0"><img loading="lazy"${ssrRenderAttr("src", _ctx.$page.props.auth.user.usermeta.avatar ?? "assets/images/no-profilepics.png")} class="avatar avatar-md rounded-circle img-thumbnail"></div><div class="flex-grow-1 lh-sm"><h6 class="mb-1 fw-bold">${ssrInterpolate(_ctx.$page.props.auth.user.fullname)}</h6><div class="dropdown open"><button class="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown"><i class="fal fa-globe me-1"></i> Everyone <i class="fa-chevron-down far"></i></button><div class="dropdown-menu"><button disabled class="dropdown-item" href="#"><i class="fad fa-lock-alt me-1"></i> Only me</button><button disabled class="dropdown-item" href="#"><i class="fad fa-user-friends me-1"></i>Your Connections</button></div></div></div></div><div class="form-group mb-3">`);
      _push(ssrRenderComponent(unref(QuillEditor), {
        placeholder: "Share career updates, trends and opportunities?",
        content: unref(form).content,
        "onUpdate:content": ($event) => unref(form).content = $event,
        contentType: "html",
        theme: "bubble"
      }, null, _parent));
      _push(`</div>`);
      if (unref(blobs).length) {
        _push(`<div class="p-2 mb-3 border-secondary border shadow-none rounded-3"><button style="${ssrRenderStyle({ "position": "absolute", "right": "20px", "z-index": "1" })}" class="btn bg-light rounded-circle"><i class="far fa-times"></i></button><div class="row"><div class="col-12"><button class="btn btn-dark btn-sm"><i class="fa fa-plus-circle" aria-hidden="true"></i> Add Photos</button></div><!--[-->`);
        ssrRenderList(unref(blobs), (i2) => {
          _push(`<div class="col-md-3"><img loading="lazy"${ssrRenderAttr("src", `${i2}`)} style="${ssrRenderStyle({ "width": "100%" })}"></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<button id="add-image" class="card collapse card-body shadow-none rounded-3 align-items-center w-100 justify-content-center border-secondary" style="${ssrRenderStyle({ "height": "150px" })}"><i class="fad fa-file-image fa-4x mb-3"></i><h4>Add photos to post</h4></button>`);
      }
      _push(`<input accept="image/*" type="file" class="d-none"><div class="d-flex justify-content-between"><button type="button" data-bs-toggle="collapse" data-bs-target="#add-image" class="btn btn-sm"><i class="fat fa-images fa-2x"></i></button><button type="submit"${ssrIncludeBooleanAttr(unref(form).content.length < 10 && unref(form).attachments.length == 0) ? " disabled" : ""} class="btn btn-primary px-4"><i class="fal me-1 fa-paper-plane"></i> Post `);
      if (unref(form).processing) {
        _push(`<span class="spinner-grow text-white spinner-grow-sm ms-2"></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></form></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CreatePostForm.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = {
  __name: "AppointmentWidgetItem",
  __ssrInlineRender: true,
  props: { item: Object, mode: String },
  setup(__props) {
    const props = __props;
    let isHost = computed(() => {
      let current_user = usePage().props.auth.user.id;
      return props.item.host == current_user;
    });
    let user = computed(() => {
      return isHost.value ? props.item.friend_user : props.item.host_user;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: "#",
        class: "list-group-item mb-2 list-group-item-action p-1 bordered-item list-group-item-action"
      }, _attrs))}><div class="row align-items-center g-1"><div class="col-10 text-truncate"><img${ssrRenderAttr("src", unref(user).avatar ?? "assets/images/no-profilepics.png")} class="avatar rounded-circle float-start me-1"><span class="w-100">Appointment with ${ssrInterpolate(unref(user).fullname)}</span><small class="d-block text-muted">${ssrInterpolate(unref(moment$1)(unref(props).item.appointment_timestamp, "X").fromNow().replace("in", "in about"))} time</small></div><div class="col-2 small text-end fw-bold">${ssrInterpolate(unref(moment$1)(unref(props).item.appointment_timestamp, "X").format("hh:mm a"))}</div></div></a>`);
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AppointmentWidgetItem.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const AppointmentWidget_vue_vue_type_style_index_0_scoped_00aadc84_lang = "";
const _sfc_main$j = {
  __name: "AppointmentWidget",
  __ssrInlineRender: true,
  setup(__props) {
    let item = ref(null);
    let appointments = ref([]);
    let attributes = computed(() => {
      let att = [];
      appointments.value.forEach((x2) => {
        att.unshift({
          dot: {},
          dates: moment$1(x2.appointment_timestamp, "X").format("LL"),
          popover: {
            label: `Appointment with ${x2.host == usePage().props.auth.user.id ? x2.friend_user.fullname : x2.host_user.fullname} at ${moment$1(x2.appointment_timestamp, "X").format("hh:mm A")}`
          }
        });
      });
      return att;
    });
    let selected_appointment = computed(() => {
      return appointments.value.filter((e2) => moment$1(e2.appointment_timestamp, "X").format("LL") == moment$1(selected_date.value).format("LL"));
    });
    let isLoading = ref(true);
    const loadData = async () => {
      isLoading.value = true;
      try {
        let response = await axios$1.get(route("appointment.get"));
        appointments.value = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    };
    let selected_date = ref(/* @__PURE__ */ new Date());
    onMounted(async () => {
      loadData();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VDatePicker = resolveComponent("VDatePicker");
      const _component_Link = resolveComponent("Link");
      if (!unref(item)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_VDatePicker, {
          attributes: unref(attributes),
          mode: "date",
          modelValue: unref(selected_date),
          "onUpdate:modelValue": ($event) => isRef(selected_date) ? selected_date.value = $event : selected_date = $event,
          expanded: "",
          "title-position": "left",
          borderless: ""
        }, null, _parent));
        if (unref(selected_appointment).length) {
          _push(`<div class="list-group list-group-flush p-2" data-v-00aadc84><!--[-->`);
          ssrRenderList(unref(selected_appointment), (appointment) => {
            _push(ssrRenderComponent(_sfc_main$k, {
              onOnClick: ($event) => isRef(item) ? item.value = $event : item = $event,
              item: appointment,
              key: appointment
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<p class="text-center" data-v-00aadc84><i class="fas fa-calendar me-2" data-v-00aadc84></i> No Scheduled Appointment</p>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "card-body" }, _attrs))} data-v-00aadc84><div class="d-flex align-items-center mb-4" data-v-00aadc84><a href="#" class="me-5" data-v-00aadc84><i class="fas fa-chevron-left me-2" data-v-00aadc84></i>Back</a><p class="mb-0 fw-bold" data-v-00aadc84>Appointment Details</p></div><h5 data-v-00aadc84>Appointment with ${ssrInterpolate(unref(item).user.fullname)}</h5><p data-v-00aadc84>${unref(item).item.content}</p><div data-v-00aadc84><label class="text-muted mb-0" data-v-00aadc84>Proposed Start time</label><p data-v-00aadc84>${ssrInterpolate(unref(moment$1)(unref(item).item.appointment_timestamp, "X").format("dddd, LL fro\\m hh:mm A"))} to 11:00 AM </p></div><div data-v-00aadc84><label class="text-muted mb-0" data-v-00aadc84>Participants</label><div class="row" data-v-00aadc84><div class="col-md-6" data-v-00aadc84><div class="d-flex" data-v-00aadc84><div class="flex-shrink-0" data-v-00aadc84><img${ssrRenderAttr("src", unref(item).item.host_user.avatar ?? "assets/images/no-profilepics.png")} class="avatar rounded-circle img-thumbnail" data-v-00aadc84></div><div class="flex-grow-1 ms-2" data-v-00aadc84><small class="mb-0 text-muted" data-v-00aadc84>Invitation From</small><h6 data-v-00aadc84>`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("profile.index", { slug: unref(item).item.host_user.slug })
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(item).item.host_user.fullname)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(item).item.host_user.fullname), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</h6></div></div></div><div class="col-md-6" data-v-00aadc84><div class="d-flex" data-v-00aadc84><div class="flex-shrink-0" data-v-00aadc84><img${ssrRenderAttr("src", unref(item).item.friend_user.avatar ?? "assets/images/no-profilepics.png")} class="avatar rounded-circle img-thumbnail" data-v-00aadc84></div><div class="flex-grow-1 ms-2" data-v-00aadc84><small class="mb-0 text-muted" data-v-00aadc84>Invitee</small><h6 data-v-00aadc84>`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("profile.index", { slug: unref(item).item.friend_user.slug })
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(item).item.friend_user.fullname)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(item).item.friend_user.fullname), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</h6></div></div></div></div></div></div>`);
      }
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AppointmentWidget.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const AppointmentWidget = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-00aadc84"]]);
const _sfc_main$i = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: { posts: Object, title: String },
  setup(__props) {
    var _a;
    const props = __props;
    let next_page_url = ref((_a = props.posts.next_page_url) == null ? void 0 : _a.replace("/feeds", "/feeds/ajax"));
    let allposts = ref(props.posts.data);
    let your_feed = computed(() => location.search);
    let loadMore = ($state) => {
      if (next_page_url.value) {
        axios$1.get(next_page_url.value).then((response) => {
          allposts.value = allposts.value.concat(response.data.data);
          next_page_url.value = response.data.next_page_url;
        }).catch((error) => {
          console.error(error);
          $state.complete();
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      const _component_infinite_loading = resolveComponent("infinite-loading");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, {
        title: `(${__props.posts.total})+ Posts`
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$I, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row"${_scopeId}><div class="col-xxl-10"${_scopeId}><div class="card shadow-none info-box d-flex flex-column" style="${ssrRenderStyle({ "background-image": "url(assets/images/bg.jpg)", "background-size": "cover", "background-position": "center center", "background-color": "#fcfcfcbf", "background-blend-mode": "lighten" })}"${_scopeId}><div class="row"${_scopeId}><div class="col-md-8"${_scopeId}><div class="card-body"${_scopeId}><h5 class="fw-bold text-center text-md-start mb-3"${_scopeId}><strong${_scopeId}>Complete your profile to get the most out of our platform</strong></h5><p class="text-center text-md-start"${_scopeId}>Setup your profile using our tools, highlighting your skills and the skills you need to learn to make sure our system reaches out to you with the right opportunities</p><div class="text-center text-md-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: _ctx.route("profile.index", { slug: _ctx.$page.props.auth.user.slug }),
              class: "btn bg-white text-primary mt-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="far fa-user-pen"${_scopeId2}></i> Profile Settings`);
                } else {
                  return [
                    createVNode("i", { class: "far fa-user-pen" }),
                    createTextVNode(" Profile Settings")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="col-md-4" style="${ssrRenderStyle({ "background": "url(/assets/images/register-img.png)", "background-size": "cover", "background-repeat": "no-repeat", "background-position": "center center" })}"${_scopeId}></div></div></div><div class="row"${_scopeId}><div class="col-md-7"${_scopeId}><div class="card px-3 p-2 mb-3"${_scopeId}><div class="d-flex align-items-center justify-content-between"${_scopeId}><strong class="d-md-block d-none"${_scopeId}><i class="fas fa-home me-2"${_scopeId}></i> Home</strong><ul class="nav nav-pills rounded-pill bg-light p-0"${_scopeId}><li class="nav-item" role="presentation"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: _ctx.route("feeds"),
              class: ["btn btn-sm btn-light rounded-pill", { active: !unref(your_feed) }]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Network Feeds `);
                } else {
                  return [
                    createTextVNode("Network Feeds ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li class="nav-item" role="presentation"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: _ctx.route("feeds", { author: _ctx.$page.props.auth.user.slug }),
              class: ["btn btn-sm btn-light rounded-pill", { active: unref(your_feed) }],
              type: "button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Your Posts`);
                } else {
                  return [
                    createTextVNode("Your Posts")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li></ul><div${_scopeId}><button class="btn btn-light btn-sm d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive"${_scopeId}><i class="fa fa-bars" aria-hidden="true"${_scopeId}></i></button></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$l, null, null, _parent2, _scopeId));
            if (unref(allposts).length) {
              _push2(`<!--[--><!--[-->`);
              ssrRenderList(unref(allposts), (i2) => {
                _push2(ssrRenderComponent(PostItem, {
                  post: i2,
                  key: i2
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
              if (unref(next_page_url)) {
                _push2(ssrRenderComponent(_component_infinite_loading, {
                  distance: "30",
                  direction: "bottom",
                  onInfinite: unref(loadMore),
                  firstload: true
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<div class="card card-body my-3 d-flex flex-column justify-content-center text-center align-items-center" style="${ssrRenderStyle({ "min-height": "40vh" })}"${_scopeId}><img loading="lazy" src="/assets/images/coming-soon-img.png" alt="" style="${ssrRenderStyle({ "width": "250px", "object-fit": "cover" })}"${_scopeId}><h5 class="my-3"${_scopeId}>It feels so lonely here</h5><p${_scopeId}>Connect with friends &amp; colleagues to see and interact with their posts</p></div>`);
            }
            _push2(`</div><div class="col-md-5"${_scopeId}><div class="offcanvas-md offcanvas-end" tabindex="-1" id="offcanvasResponsive"${_scopeId}><div class="offcanvas-header"${_scopeId}><button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"${_scopeId}></button></div><div style="${ssrRenderStyle({ "overflow-y": "auto" })}"${_scopeId}><div class="card shadow-sm"${_scopeId}><div class="card-header bg-transparent"${_scopeId}><h5 class="mb-0"${_scopeId}><i class="fad me-2 fa-calendar-check"${_scopeId}></i> Schedules &amp; Appointment</h5></div>`);
            _push2(ssrRenderComponent(AppointmentWidget, null, null, _parent2, _scopeId));
            _push2(`</div><div class="card shadow-sm"${_scopeId}><div class="card-header bg-transparent"${_scopeId}><h5 class=""${_scopeId}>Grow your network</h5></div>`);
            _push2(ssrRenderComponent(_sfc_main$u, null, null, _parent2, _scopeId));
            _push2(`<div class="card-footer bg-transparent"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: _ctx.route("search.people")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`View all recommendations <i class="fa fa-arrow-right ms-2"${_scopeId2}></i>`);
                } else {
                  return [
                    createTextVNode("View all recommendations "),
                    createVNode("i", { class: "fa fa-arrow-right ms-2" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-xxl-10" }, [
                  createVNode("div", {
                    class: "card shadow-none info-box d-flex flex-column",
                    style: { "background-image": "url(assets/images/bg.jpg)", "background-size": "cover", "background-position": "center center", "background-color": "#fcfcfcbf", "background-blend-mode": "lighten" }
                  }, [
                    createVNode("div", { class: "row" }, [
                      createVNode("div", { class: "col-md-8" }, [
                        createVNode("div", { class: "card-body" }, [
                          createVNode("h5", { class: "fw-bold text-center text-md-start mb-3" }, [
                            createVNode("strong", null, "Complete your profile to get the most out of our platform")
                          ]),
                          createVNode("p", { class: "text-center text-md-start" }, "Setup your profile using our tools, highlighting your skills and the skills you need to learn to make sure our system reaches out to you with the right opportunities"),
                          createVNode("div", { class: "text-center text-md-start" }, [
                            createVNode(_component_Link, {
                              href: _ctx.route("profile.index", { slug: _ctx.$page.props.auth.user.slug }),
                              class: "btn bg-white text-primary mt-2"
                            }, {
                              default: withCtx(() => [
                                createVNode("i", { class: "far fa-user-pen" }),
                                createTextVNode(" Profile Settings")
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ])
                        ])
                      ]),
                      createVNode("div", {
                        class: "col-md-4",
                        style: { "background": "url(/assets/images/register-img.png)", "background-size": "cover", "background-repeat": "no-repeat", "background-position": "center center" }
                      })
                    ])
                  ]),
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-md-7" }, [
                      createVNode("div", { class: "card px-3 p-2 mb-3" }, [
                        createVNode("div", { class: "d-flex align-items-center justify-content-between" }, [
                          createVNode("strong", { class: "d-md-block d-none" }, [
                            createVNode("i", { class: "fas fa-home me-2" }),
                            createTextVNode(" Home")
                          ]),
                          createVNode("ul", { class: "nav nav-pills rounded-pill bg-light p-0" }, [
                            createVNode("li", {
                              class: "nav-item",
                              role: "presentation"
                            }, [
                              createVNode(_component_Link, {
                                href: _ctx.route("feeds"),
                                class: ["btn btn-sm btn-light rounded-pill", { active: !unref(your_feed) }]
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Network Feeds ")
                                ]),
                                _: 1
                              }, 8, ["href", "class"])
                            ]),
                            createVNode("li", {
                              class: "nav-item",
                              role: "presentation"
                            }, [
                              createVNode(_component_Link, {
                                href: _ctx.route("feeds", { author: _ctx.$page.props.auth.user.slug }),
                                class: ["btn btn-sm btn-light rounded-pill", { active: unref(your_feed) }],
                                type: "button"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Your Posts")
                                ]),
                                _: 1
                              }, 8, ["href", "class"])
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("button", {
                              class: "btn btn-light btn-sm d-md-none",
                              type: "button",
                              "data-bs-toggle": "offcanvas",
                              "data-bs-target": "#offcanvasResponsive",
                              "aria-controls": "offcanvasResponsive"
                            }, [
                              createVNode("i", {
                                class: "fa fa-bars",
                                "aria-hidden": "true"
                              })
                            ])
                          ])
                        ])
                      ]),
                      createVNode(_sfc_main$l),
                      unref(allposts).length ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(allposts), (i2) => {
                          return openBlock(), createBlock(PostItem, {
                            post: i2,
                            key: i2
                          }, null, 8, ["post"]);
                        }), 128)),
                        unref(next_page_url) ? (openBlock(), createBlock(_component_infinite_loading, {
                          key: 0,
                          distance: "30",
                          direction: "bottom",
                          onInfinite: unref(loadMore),
                          firstload: true
                        }, null, 8, ["onInfinite"])) : createCommentVNode("", true)
                      ], 64)) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "card card-body my-3 d-flex flex-column justify-content-center text-center align-items-center",
                        style: { "min-height": "40vh" }
                      }, [
                        createVNode("img", {
                          loading: "lazy",
                          src: "/assets/images/coming-soon-img.png",
                          alt: "",
                          style: { "width": "250px", "object-fit": "cover" }
                        }),
                        createVNode("h5", { class: "my-3" }, "It feels so lonely here"),
                        createVNode("p", null, "Connect with friends & colleagues to see and interact with their posts")
                      ]))
                    ]),
                    createVNode("div", { class: "col-md-5" }, [
                      createVNode("div", {
                        class: "offcanvas-md offcanvas-end",
                        tabindex: "-1",
                        id: "offcanvasResponsive"
                      }, [
                        createVNode("div", { class: "offcanvas-header" }, [
                          createVNode("button", {
                            type: "button",
                            class: "btn-close",
                            "data-bs-dismiss": "offcanvas",
                            "data-bs-target": "#offcanvasResponsive",
                            "aria-label": "Close"
                          })
                        ]),
                        createVNode("div", { style: { "overflow-y": "auto" } }, [
                          createVNode("div", { class: "card shadow-sm" }, [
                            createVNode("div", { class: "card-header bg-transparent" }, [
                              createVNode("h5", { class: "mb-0" }, [
                                createVNode("i", { class: "fad me-2 fa-calendar-check" }),
                                createTextVNode(" Schedules & Appointment")
                              ])
                            ]),
                            createVNode(AppointmentWidget)
                          ]),
                          createVNode("div", { class: "card shadow-sm" }, [
                            createVNode("div", { class: "card-header bg-transparent" }, [
                              createVNode("h5", { class: "" }, "Grow your network")
                            ]),
                            createVNode(_sfc_main$u),
                            createVNode("div", { class: "card-footer bg-transparent" }, [
                              createVNode(_component_Link, {
                                href: _ctx.route("search.people")
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("View all recommendations "),
                                  createVNode("i", { class: "fa fa-arrow-right ms-2" })
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$i
}, Symbol.toStringTag, { value: "Module" }));
const Post_vue_vue_type_style_index_0_scoped_c300623c_lang = "";
const _sfc_main$h = {
  __name: "Post",
  __ssrInlineRender: true,
  props: { post: Object, comments: Object },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(ssrRenderComponent(_sfc_main$t, _attrs, {
        headerleft: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Link, {
              href: _ctx.route("feeds"),
              class: "btn rounded-pill"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="fad fa-long-arrow-left me-2" data-v-c300623c${_scopeId2}></i> Return to Feeds`);
                } else {
                  return [
                    createVNode("i", { class: "fad fa-long-arrow-left me-2" }),
                    createTextVNode(" Return to Feeds")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Link, {
                href: _ctx.route("feeds"),
                class: "btn rounded-pill"
              }, {
                default: withCtx(() => [
                  createVNode("i", { class: "fad fa-long-arrow-left me-2" }),
                  createTextVNode(" Return to Feeds")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent2, _scopeId));
            _push2(`<div class="card rounded-3 p-3" data-v-c300623c${_scopeId}><div class="d-flex mb-3 align-items-center" data-v-c300623c${_scopeId}><div class="me-3 flex-shrink-0" data-v-c300623c${_scopeId}><img${ssrRenderAttr("src", __props.post.user.avatar ?? "assets/images/no-profilepics.png")} class="avatar avatar rounded-circle img-thumbnail" data-v-c300623c${_scopeId}></div><div class="flex-grow-1 lh-sm" data-v-c300623c${_scopeId}><h6 class="mb-1 fw-bold" data-v-c300623c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: _ctx.route("profile.index", { slug: __props.post.user.slug })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.post.user.fullname)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.post.user.fullname), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</h6><p class="mb-0 small text-muted" data-v-c300623c${_scopeId}>${ssrInterpolate(unref(moment$1)(__props.post.created_at).format("LLL"))} `);
            if (!unref(moment$1)(__props.post.created_at).isSame(__props.post.updated_at)) {
              _push2(`<small${ssrRenderAttr("title", unref(moment$1)(__props.post.updated_at).fromNow())} data-v-c300623c${_scopeId}>(edited)</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</p></div>`);
            if (__props.post.user.id == _ctx.$page.props.auth.user.id) {
              _push2(`<div class="float-end" data-v-c300623c${_scopeId}><div class="dropdown open" data-v-c300623c${_scopeId}><button class="btn" type="button" id="triggerId" data-bs-toggle="dropdown" data-v-c300623c${_scopeId}><i class="fad font-size-20 fa-ellipsis-h" data-v-c300623c${_scopeId}></i></button><div class="dropdown-menu" data-v-c300623c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Link, {
                href: _ctx.route("post.edit", { id: __props.post.id }),
                class: "dropdown-item"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="fad fa-pencil me-1" data-v-c300623c${_scopeId2}></i> Edit`);
                  } else {
                    return [
                      createVNode("i", { class: "fad fa-pencil me-1" }),
                      createTextVNode(" Edit")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.post.attachments.length) {
              _push2(`<div class="w-100 mb-3" style="${ssrRenderStyle({ "height": "300px" })}" data-v-c300623c${_scopeId}>`);
              _push2(ssrRenderComponent(unref(GiGridImages), {
                class: "rounded-3",
                items: __props.post.attachments.map((e2) => e2.url)
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div style="${ssrRenderStyle({ "white-space": "pre-wrap" })}" data-v-c300623c${_scopeId}>${__props.post.content}</div><div class="d-flex justify-content-between align-items-center" data-v-c300623c${_scopeId}><div class="d-flex" data-v-c300623c${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$o, {
              mode: "button",
              post: __props.post
            }, null, _parent2, _scopeId));
            _push2(`<button class="btn" data-v-c300623c${_scopeId}><i class="fal fa-share-alt" data-v-c300623c${_scopeId}></i></button></div><div class="d-flex justify-content-end text-muted small align-items-center" data-v-c300623c${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$o, {
              mode: "label",
              post: __props.post
            }, null, _parent2, _scopeId));
            _push2(`<i style="${ssrRenderStyle({ "font-size": "3px" })}" class="fa fa-circle px-2" data-v-c300623c${_scopeId}></i>`);
            _push2(ssrRenderComponent(_sfc_main$n, {
              mode: "label",
              post: __props.post
            }, null, _parent2, _scopeId));
            _push2(`<i style="${ssrRenderStyle({ "font-size": "3px" })}" class="fa fa-circle px-2" data-v-c300623c${_scopeId}></i><span data-v-c300623c${_scopeId}>0 Reports</span></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$r, {
              "post-id": __props.post.id
            }, null, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(__props.comments.data, (comment) => {
              _push2(ssrRenderComponent(_sfc_main$p, {
                "can-edit": comment.user_id == _ctx.$page.props.auth.user.id,
                "can-delete": comment.user_id == _ctx.$page.props.auth.user.id || __props.post.user_id == _ctx.$page.props.auth.user.id,
                key: comment,
                comment
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Dashboard" }),
              createVNode("div", { class: "card rounded-3 p-3" }, [
                createVNode("div", { class: "d-flex mb-3 align-items-center" }, [
                  createVNode("div", { class: "me-3 flex-shrink-0" }, [
                    createVNode("img", {
                      src: __props.post.user.avatar ?? "assets/images/no-profilepics.png",
                      class: "avatar avatar rounded-circle img-thumbnail"
                    }, null, 8, ["src"])
                  ]),
                  createVNode("div", { class: "flex-grow-1 lh-sm" }, [
                    createVNode("h6", { class: "mb-1 fw-bold" }, [
                      createVNode(_component_Link, {
                        href: _ctx.route("profile.index", { slug: __props.post.user.slug })
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.post.user.fullname), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    createVNode("p", { class: "mb-0 small text-muted" }, [
                      createTextVNode(toDisplayString(unref(moment$1)(__props.post.created_at).format("LLL")) + " ", 1),
                      !unref(moment$1)(__props.post.created_at).isSame(__props.post.updated_at) ? (openBlock(), createBlock("small", {
                        key: 0,
                        title: unref(moment$1)(__props.post.updated_at).fromNow()
                      }, "(edited)", 8, ["title"])) : createCommentVNode("", true)
                    ])
                  ]),
                  __props.post.user.id == _ctx.$page.props.auth.user.id ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "float-end"
                  }, [
                    createVNode("div", { class: "dropdown open" }, [
                      createVNode("button", {
                        class: "btn",
                        type: "button",
                        id: "triggerId",
                        "data-bs-toggle": "dropdown"
                      }, [
                        createVNode("i", { class: "fad font-size-20 fa-ellipsis-h" })
                      ]),
                      createVNode("div", { class: "dropdown-menu" }, [
                        createVNode(_component_Link, {
                          href: _ctx.route("post.edit", { id: __props.post.id }),
                          class: "dropdown-item"
                        }, {
                          default: withCtx(() => [
                            createVNode("i", { class: "fad fa-pencil me-1" }),
                            createTextVNode(" Edit")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                __props.post.attachments.length ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "w-100 mb-3",
                  style: { "height": "300px" }
                }, [
                  createVNode(unref(GiGridImages), {
                    class: "rounded-3",
                    items: __props.post.attachments.map((e2) => e2.url)
                  }, null, 8, ["items"])
                ])) : createCommentVNode("", true),
                createVNode("div", {
                  style: { "white-space": "pre-wrap" },
                  innerHTML: __props.post.content
                }, null, 8, ["innerHTML"]),
                createVNode("div", { class: "d-flex justify-content-between align-items-center" }, [
                  createVNode("div", { class: "d-flex" }, [
                    createVNode(_sfc_main$o, {
                      mode: "button",
                      post: __props.post
                    }, null, 8, ["post"]),
                    createVNode("button", { class: "btn" }, [
                      createVNode("i", { class: "fal fa-share-alt" })
                    ])
                  ]),
                  createVNode("div", { class: "d-flex justify-content-end text-muted small align-items-center" }, [
                    createVNode(_sfc_main$o, {
                      mode: "label",
                      post: __props.post
                    }, null, 8, ["post"]),
                    createVNode("i", {
                      style: { "font-size": "3px" },
                      class: "fa fa-circle px-2"
                    }),
                    createVNode(_sfc_main$n, {
                      mode: "label",
                      post: __props.post
                    }, null, 8, ["post"]),
                    createVNode("i", {
                      style: { "font-size": "3px" },
                      class: "fa fa-circle px-2"
                    }),
                    createVNode("span", null, "0 Reports")
                  ])
                ]),
                createVNode(_sfc_main$r, {
                  "post-id": __props.post.id
                }, null, 8, ["post-id"]),
                (openBlock(true), createBlock(Fragment, null, renderList(__props.comments.data, (comment) => {
                  return openBlock(), createBlock(_sfc_main$p, {
                    "can-edit": comment.user_id == _ctx.$page.props.auth.user.id,
                    "can-delete": comment.user_id == _ctx.$page.props.auth.user.id || __props.post.user_id == _ctx.$page.props.auth.user.id,
                    key: comment,
                    comment
                  }, null, 8, ["can-edit", "can-delete", "comment"]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Feeds/Post.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const Post = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-c300623c"]]);
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Post
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$g = {
  __name: "PostEdit",
  __ssrInlineRender: true,
  props: { post: Object },
  setup(__props) {
    const props = __props;
    let form = useForm(props.post);
    let blobs = ref(props.post.attachments.map((e2) => e2.url));
    let handleUpload = (ev) => {
      form.attachments.push(ev.target.files[0]);
      blobs.value.push(URL.createObjectURL(ev.target.files[0]));
    };
    let resetUpload = () => {
      blobs.value = [];
      form.attachments = [];
    };
    let handleSubmit = () => {
      form.transform((data) => ({ ...data, _method: "put" })).post(route("post.update"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Edit Post" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$t, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card rounded-3 p-3"${_scopeId}><div class="d-flex mb-3 justify-content-between align-items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: _ctx.route("post.show", { id: __props.post.id }),
              class: "btn rounded-pill"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="fad fa-long-arrow-left me-2"${_scopeId2}></i> Return to Post`);
                } else {
                  return [
                    createVNode("i", { class: "fad fa-long-arrow-left me-2" }),
                    createTextVNode(" Return to Post")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><form class="modal-body"${_scopeId}><div class="d-flex mb-3"${_scopeId}><div class="me-3 flex-shrink-0"${_scopeId}><img${ssrRenderAttr("src", _ctx.$page.props.auth.user.usermeta.avatar ?? "assets/images/no-profilepics.png")} class="avatar avatar-md rounded-circle img-thumbnail"${_scopeId}></div><div class="flex-grow-1 lh-sm"${_scopeId}><h6 class="mb-1 fw-bold"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.fullname)}</h6><div class="dropdown open"${_scopeId}><button class="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown"${_scopeId}><i class="fal fa-globe me-1"${_scopeId}></i> Everyone <i class="fa-chevron-down far"${_scopeId}></i></button><div class="dropdown-menu"${_scopeId}><button disabled class="dropdown-item" href="#"${_scopeId}><i class="fad fa-lock-alt me-1"${_scopeId}></i> Only me</button><button disabled class="dropdown-item" href="#"${_scopeId}><i class="fad fa-user-friends me-1"${_scopeId}></i>Your Connections</button></div></div></div></div><div class="form-group mb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(QuillEditor), {
              placeholder: "What would you like to share today?",
              content: unref(form).content,
              "onUpdate:content": ($event) => unref(form).content = $event,
              contentType: "html",
              theme: "bubble"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(blobs).length) {
              _push2(`<div class="p-2 mb-3 border-secondary border shadow-none rounded-3"${_scopeId}><button style="${ssrRenderStyle({ "position": "absolute", "right": "20px", "z-index": "1" })}" class="btn bg-light rounded-circle"${_scopeId}><i class="far fa-times"${_scopeId}></i></button><div class="row"${_scopeId}><div class="col-12 mb-2"${_scopeId}><button class="btn btn-dark btn-sm"${_scopeId}><i class="fa fa-plus-circle" aria-hidden="true"${_scopeId}></i> Add Photos</button></div><!--[-->`);
              ssrRenderList(unref(blobs), (i2) => {
                _push2(`<div class="col-md-3"${_scopeId}><img${ssrRenderAttr("src", `${i2}`)} style="${ssrRenderStyle({ "width": "100%" })}"${_scopeId}></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<button id="add-image" class="card collapse card-body shadow-none rounded-3 align-items-center w-100 justify-content-center border-secondary" style="${ssrRenderStyle({ "height": "150px" })}"${_scopeId}><i class="fad fa-file-image fa-4x mb-3"${_scopeId}></i><h4${_scopeId}>Add photos to post</h4></button>`);
            }
            _push2(`<input accept="image/*" type="file" class="d-none"${_scopeId}><div class="d-flex justify-content-between"${_scopeId}><button type="button" data-bs-toggle="collapse" data-bs-target="#add-image" class="btn btn-sm"${_scopeId}><i class="fat fa-images fa-2x"${_scopeId}></i></button><button type="submit"${ssrIncludeBooleanAttr(unref(form).content.length < 10 && unref(form).attachments.length == 0) ? " disabled" : ""} class="btn btn-primary px-4"${_scopeId}> Update</button></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "card rounded-3 p-3" }, [
                createVNode("div", { class: "d-flex mb-3 justify-content-between align-items-center" }, [
                  createVNode(_component_Link, {
                    href: _ctx.route("post.show", { id: __props.post.id }),
                    class: "btn rounded-pill"
                  }, {
                    default: withCtx(() => [
                      createVNode("i", { class: "fad fa-long-arrow-left me-2" }),
                      createTextVNode(" Return to Post")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(unref(handleSubmit), ["prevent"]),
                  class: "modal-body"
                }, [
                  createVNode("div", { class: "d-flex mb-3" }, [
                    createVNode("div", { class: "me-3 flex-shrink-0" }, [
                      createVNode("img", {
                        src: _ctx.$page.props.auth.user.usermeta.avatar ?? "assets/images/no-profilepics.png",
                        class: "avatar avatar-md rounded-circle img-thumbnail"
                      }, null, 8, ["src"])
                    ]),
                    createVNode("div", { class: "flex-grow-1 lh-sm" }, [
                      createVNode("h6", { class: "mb-1 fw-bold" }, toDisplayString(_ctx.$page.props.auth.user.fullname), 1),
                      createVNode("div", { class: "dropdown open" }, [
                        createVNode("button", {
                          class: "btn btn-light btn-sm",
                          type: "button",
                          "data-bs-toggle": "dropdown"
                        }, [
                          createVNode("i", { class: "fal fa-globe me-1" }),
                          createTextVNode(" Everyone "),
                          createVNode("i", { class: "fa-chevron-down far" })
                        ]),
                        createVNode("div", { class: "dropdown-menu" }, [
                          createVNode("button", {
                            disabled: "",
                            class: "dropdown-item",
                            href: "#"
                          }, [
                            createVNode("i", { class: "fad fa-lock-alt me-1" }),
                            createTextVNode(" Only me")
                          ]),
                          createVNode("button", {
                            disabled: "",
                            class: "dropdown-item",
                            href: "#"
                          }, [
                            createVNode("i", { class: "fad fa-user-friends me-1" }),
                            createTextVNode("Your Connections")
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "form-group mb-3" }, [
                    createVNode(unref(QuillEditor), {
                      placeholder: "What would you like to share today?",
                      content: unref(form).content,
                      "onUpdate:content": ($event) => unref(form).content = $event,
                      contentType: "html",
                      theme: "bubble"
                    }, null, 8, ["content", "onUpdate:content"])
                  ]),
                  unref(blobs).length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-2 mb-3 border-secondary border shadow-none rounded-3"
                  }, [
                    createVNode("button", {
                      onClick: withModifiers(unref(resetUpload), ["prevent"]),
                      style: { "position": "absolute", "right": "20px", "z-index": "1" },
                      class: "btn bg-light rounded-circle"
                    }, [
                      createVNode("i", { class: "far fa-times" })
                    ], 8, ["onClick"]),
                    createVNode("div", { class: "row" }, [
                      createVNode("div", { class: "col-12 mb-2" }, [
                        createVNode("button", {
                          onClick: withModifiers(($event) => _ctx.$refs.inputFile.click(), ["prevent"]),
                          class: "btn btn-dark btn-sm"
                        }, [
                          createVNode("i", {
                            class: "fa fa-plus-circle",
                            "aria-hidden": "true"
                          }),
                          createTextVNode(" Add Photos")
                        ], 8, ["onClick"])
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(blobs), (i2) => {
                        return openBlock(), createBlock("div", {
                          class: "col-md-3",
                          key: i2
                        }, [
                          createVNode("img", {
                            src: `${i2}`,
                            style: { "width": "100%" }
                          }, null, 8, ["src"])
                        ]);
                      }), 128))
                    ])
                  ])) : (openBlock(), createBlock("button", {
                    key: 1,
                    onClick: withModifiers(($event) => _ctx.$refs.inputFile.click(), ["prevent"]),
                    id: "add-image",
                    class: "card collapse card-body shadow-none rounded-3 align-items-center w-100 justify-content-center border-secondary",
                    style: { "height": "150px" }
                  }, [
                    createVNode("i", { class: "fad fa-file-image fa-4x mb-3" }),
                    createVNode("h4", null, "Add photos to post")
                  ], 8, ["onClick"])),
                  createVNode("input", {
                    accept: "image/*",
                    onInput: ($event) => unref(handleUpload)($event),
                    type: "file",
                    ref: "inputFile",
                    class: "d-none"
                  }, null, 40, ["onInput"]),
                  createVNode("div", { class: "d-flex justify-content-between" }, [
                    createVNode("button", {
                      type: "button",
                      "data-bs-toggle": "collapse",
                      "data-bs-target": "#add-image",
                      class: "btn btn-sm"
                    }, [
                      createVNode("i", { class: "fat fa-images fa-2x" })
                    ]),
                    createVNode("button", {
                      type: "submit",
                      disabled: unref(form).content.length < 10 && unref(form).attachments.length == 0,
                      class: "btn btn-primary px-4"
                    }, " Update", 8, ["disabled"])
                  ])
                ], 40, ["onSubmit"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Feeds/PostEdit.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$g
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$f = {
  __name: "Conversation",
  __ssrInlineRender: true,
  props: { blank: Boolean, details: Object },
  setup(__props) {
    var _a, _b, _c;
    const props = __props;
    let chatend = ref();
    let conversation_grouped_by_date = computed(() => {
      const groups = props.details.chat.reduce((groups2, chat) => {
        const date = moment$1(chat.created_at).calendar(null, {
          sameDay: "[Today]",
          lastDay: "[Yesterday]",
          lastWeek: "[Last] dddd",
          sameElse: "DD/MM/YYYY"
        });
        if (!groups2[date]) {
          groups2[date] = [];
        }
        groups2[date].push(chat);
        return groups2;
      }, {});
      const groupArrays = Object.keys(groups).map((date) => {
        return {
          date,
          chat: groups[date]
        };
      });
      return groupArrays.reverse();
    });
    onMounted(() => setTimeout(() => {
      var _a2;
      (_a2 = chatend.value) == null ? void 0 : _a2.scrollIntoView({ behavior: "instant" });
    }));
    let form = useForm({
      content: null,
      receiver: (_a = props.details) == null ? void 0 : _a.recepient.id,
      message_id: (_c = (_b = props.details) == null ? void 0 : _b.chat[0]) == null ? void 0 : _c.message_id
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _component_c_textarea = resolveComponent("c-textarea");
      if (__props.blank) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "card card-body h-100 d-flex flex-column text-center justify-content-between",
          style: { "min-height": "75vh" }
        }, _attrs))}><div class="h-100 d-flex flex-column justify-content-center"><h2>Start a new conversation</h2><p>Or click on existing to continue conversation</p></div><p class="text-muted text-center"><i class="fas fa-lock me-2"></i> End to end encrypted </p></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="p-3 px-lg-4 border-bottom"><div class="row"><div class="col-md-4 col-6"><div class="d-flex align-items-center"><div class="flex-shrink-0 me-2 align-self-center"><img${ssrRenderAttr("src", __props.details.recepient.avatar ?? "assets/images/no-profilepics.png")} class="avatar avatar-sm rounded-circle img-thumbnail" alt=""></div><div class="flex-grow-1"><h6 class="font-size-16 mb-1 text-truncate"><a href="#" class="text-dark">${ssrInterpolate(__props.details.recepient.fullname)}</a></h6></div></div></div><div class="col-md-8 col-6"><ul class="list-inline user-chat-nav text-end mb-0"><li class="list-inline-item"><div class="dropdown"><button class="btn nav-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-search"></i></button><div class="dropdown-menu dropdown-menu-end dropdown-menu-md"><form class="p-2"><div><input type="text" class="form-control rounded" placeholder="Search..."></div></form></div></div></li><li class="list-inline-item"><div class="dropdown"><button class="btn nav-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-h"></i></button><div class="dropdown-menu dropdown-menu-end">`);
        _push(ssrRenderComponent(_component_Link, {
          class: "dropdown-item",
          href: _ctx.route("profile.index", { slug: __props.details.recepient.slug })
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Profile`);
            } else {
              return [
                createTextVNode("Profile")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<a class="dropdown-item" href="#">Delete</a></div></div></li></ul></div></div></div><div><div class="chat-conversation py-3"><ul class="list-unstyled mb-0 chat-conversation-message px-3" data-simplebar>`);
        if (__props.details.chat[0].id) {
          _push(`<!--[-->`);
          ssrRenderList(unref(conversation_grouped_by_date), (days) => {
            _push(`<!--[--><li class="chat-day-title"><div class="title">${ssrInterpolate(days.date)}</div></li><!--[-->`);
            ssrRenderList(unref(sortBy)(days.chat, (o2) => o2.created_at), (chat) => {
              _push(`<li class="${ssrRenderClass({ right: chat.receiver.id !== _ctx.$page.props.auth.user.id })}"><div class="conversation-list" style="${ssrRenderStyle({ "width": "60%" })}"><div class="ctext-wrap mb-3"><div class="ctext-wrap-content"><p class="mb-0" style="${ssrRenderStyle({ "white-space": "pre-line" })}">${chat.content}</p><div class="justify-content-end align-items-center d-flex"><span class="d-inline-block font-size-12 text-muted ms-2">${ssrInterpolate(unref(moment$1)(chat.created_at).format("hh:mm A"))}</span>`);
              if (chat.receiver.id !== _ctx.$page.props.auth.user.id) {
                _push(`<i class="${ssrRenderClass([chat.read_at ? "fa-check-double text-success" : "fa-check", "fal ms-1"])}"></i>`);
              } else {
                _push(`<!---->`);
              }
              if (chat.receiver.id !== _ctx.$page.props.auth.user.id) {
                _push(`<div class="dropdown"><a class="ps-2 text-muted" type="button" data-bs-toggle="dropdown"><i class="fa fa-ellipsis-v"></i></a><div class="dropdown-menu">`);
                _push(ssrRenderComponent(_component_Link, {
                  "preserve-state": false,
                  class: "dropdown-item",
                  method: "DELETE",
                  data: { id: chat.id },
                  href: _ctx.route("messages.destroy.conversation")
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(` Delete`);
                    } else {
                      return [
                        createTextVNode(" Delete")
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`</div></div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div></div></div></div></li>`);
            });
            _push(`<!--]--><!--]-->`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span></span></ul></div></div><form class="d-flex border p-2 align-items-end"><div class="flex-shrink-0"><button type="button" class="btn"><i class="fal fa-paperclip font-size-18"></i></button></div><div class="flex-grow-1 mx-1">`);
        _push(ssrRenderComponent(_component_c_textarea, {
          modelValue: unref(form).content,
          "onUpdate:modelValue": ($event) => unref(form).content = $event,
          class: "form-control",
          placeholder: "Type a message"
        }, null, _parent));
        _push(`</div>`);
        if (unref(form).content) {
          _push(`<div class="flex-shrink-0"><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn waves-effect waves-light">`);
          if (unref(form).processing) {
            _push(`<span class="spinner-border spinner-border-sm"></span>`);
          } else {
            _push(`<i class="fa fa-paper-plane"></i>`);
          }
          _push(`</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form></div>`);
      }
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Messages/Conversation.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$f
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$e = {
  __name: "Index",
  __ssrInlineRender: true,
  props: { messages: Object, title: String, conversation: Object, friends: Object },
  setup(__props) {
    const props = __props;
    let showUsers = ref(false);
    let conversation_details = ref(null);
    onMounted(() => {
      if (props.conversation) {
        conversation_details.value = {
          chat: props.conversation,
          recepient: props.conversation.find((e2) => e2.receiver.id !== usePage().props.auth.user.id).receiver
        };
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_v_select = resolveComponent("v-select");
      const _component_Link = resolveComponent("Link");
      _push(ssrRenderComponent(_sfc_main$I, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, { title: __props.title }, null, _parent2, _scopeId));
            _push2(`<div class="row gx-0"${_scopeId}><div class="col-4"${_scopeId}><div class="offcanvas-md offcanvas-start" tabindex="-1" id="chat-leftsidebar"${_scopeId}><div class="offcanvas-header"${_scopeId}><button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#chat-leftsidebar" aria-label="Close"${_scopeId}></button></div><div class="h-100 card"${_scopeId}>`);
            if (unref(showUsers)) {
              _push2(`<div class="p-3"${_scopeId}><div class="d-flex justify-content-between align-items-center mb-3"${_scopeId}><h5${_scopeId}>New Message</h5><button class="btn btn-md"${_scopeId}><i class="fal font-size-22 fa-times"${_scopeId}></i></button></div><form class="chat-message-list" data-simplebar${_scopeId}><div class="mb-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_v_select, {
                type: "search",
                label: "fullname",
                options: __props.friends,
                placeholder: "Search"
              }, {
                option: withCtx((option, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Link, {
                      "preserve-scroll": true,
                      href: _ctx.route("messages.index", { id: unref(_btoa)({ type: "user", id: option.id }) }),
                      class: "d-flex align-items-center mb-2"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex-shrink-0 me-2 align-self-center"${_scopeId3}><img${ssrRenderAttr("src", option.avatar ?? "assets/images/no-profilepics.png")} class="avatar avatar-sm rounded-circle img-thumbnail" alt=""${_scopeId3}></div><div class="flex-grow-1"${_scopeId3}><h6 class="font-size-16 mb-0"${_scopeId3}>${ssrInterpolate(option.fullname)}</h6><p class="text-muted text-wrap mb-0"${_scopeId3}>${ssrInterpolate(option.headline)}</p></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex-shrink-0 me-2 align-self-center" }, [
                              createVNode("img", {
                                src: option.avatar ?? "assets/images/no-profilepics.png",
                                class: "avatar avatar-sm rounded-circle img-thumbnail",
                                alt: ""
                              }, null, 8, ["src"])
                            ]),
                            createVNode("div", { class: "flex-grow-1" }, [
                              createVNode("h6", { class: "font-size-16 mb-0" }, toDisplayString(option.fullname), 1),
                              createVNode("p", { class: "text-muted text-wrap mb-0" }, toDisplayString(option.headline), 1)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Link, {
                        "preserve-scroll": true,
                        href: _ctx.route("messages.index", { id: unref(_btoa)({ type: "user", id: option.id }) }),
                        class: "d-flex align-items-center mb-2"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex-shrink-0 me-2 align-self-center" }, [
                            createVNode("img", {
                              src: option.avatar ?? "assets/images/no-profilepics.png",
                              class: "avatar avatar-sm rounded-circle img-thumbnail",
                              alt: ""
                            }, null, 8, ["src"])
                          ]),
                          createVNode("div", { class: "flex-grow-1" }, [
                            createVNode("h6", { class: "font-size-16 mb-0" }, toDisplayString(option.fullname), 1),
                            createVNode("p", { class: "text-muted text-wrap mb-0" }, toDisplayString(option.headline), 1)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["href"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></form></div>`);
            } else {
              _push2(`<!--[--><div class="p-3"${_scopeId}><div class="d-flex align-items-center mb-2"${_scopeId}><div class="flex-shrink-0 me-2 align-self-center"${_scopeId}><img${ssrRenderAttr("src", _ctx.$page.props.auth.user.usermeta.avatar ?? "assets/images/no-profilepics.png")} class="avatar avatar-sm rounded-circle img-thumbnail" alt=""${_scopeId}></div><div class="flex-grow-1"${_scopeId}><h6 class="font-size-16 mb-0"${_scopeId}><a href="#" class="text-dark"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.fullname)} <i class="fa fa-circle text-success align-middle font-size-10 ms-1"${_scopeId}></i></a></h6><p class="text-muted mb-0"${_scopeId}>Available</p></div><div class="flex-shrink-0"${_scopeId}><button class="btn"${_scopeId}><i class="fal fa-plus font-size-20"${_scopeId}></i></button></div></div><div class="search-box chat-search-box"${_scopeId}><div class="position-relative"${_scopeId}><input type="text" class="form-control bg-light border-0 rounded-pill" placeholder="Search or start a new chat"${_scopeId}><i class="fal fa-search search-icon"${_scopeId}></i></div></div></div><div class="chat-message-list" data-simplebar${_scopeId}><div class="p-1"${_scopeId}><div${_scopeId}><ul class="list-unstyled chat-list"${_scopeId}><!--[-->`);
              ssrRenderList(unref(sortBy)(__props.messages, (o2) => unref(moment$1)(o2.last_conversation.created_at).format("X")).reverse(), (i2) => {
                _push2(`<li class="${ssrRenderClass({ active: __props.conversation && __props.conversation.length && __props.conversation[0].message_id == i2.id })}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Link, {
                  "preserve-scroll": "",
                  href: _ctx.route("messages.index", { id: unref(_btoa)({ type: "message", id: i2.id }) })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="d-flex align-items-center"${_scopeId2}><div class="flex-shrink-0 me-2 align-self-center"${_scopeId2}><div class="user-img online"${_scopeId2}><img${ssrRenderAttr("src", i2[i2.user_id == _ctx.$page.props.auth.user.id ? "receiver" : "sender"].avatar ?? "assets/images/no-profilepics.png")} class="avatar avatar-xs rounded-circle img-thumbnail" alt=""${_scopeId2}><span class="user-status"${_scopeId2}></span></div></div><div class="flex-grow-1 overflow-hidden"${_scopeId2}><h6 class="text-truncate font-size-14 mb-0"${_scopeId2}>${ssrInterpolate(i2[i2.user_id == _ctx.$page.props.auth.user.id ? "receiver" : "sender"].fullname)} <div class="font-size-11 float-end fw-normal"${_scopeId2}>${ssrInterpolate(unref(moment$1)(i2.last_conversation.created_at).fromNow())}</div></h6><p class="text-truncate text-muted mb-0"${_scopeId2}>`);
                      if (i2.last_conversation.receiver !== _ctx.$page.props.auth.user.id) {
                        _push3(`<i class="${ssrRenderClass([i2.last_conversation.read_at ? "fa-check-double" : "fa-check", "fas me-1"])}"${_scopeId2}></i>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(` ${ssrInterpolate(i2.last_conversation.content)}</p></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "d-flex align-items-center" }, [
                          createVNode("div", { class: "flex-shrink-0 me-2 align-self-center" }, [
                            createVNode("div", { class: "user-img online" }, [
                              createVNode("img", {
                                src: i2[i2.user_id == _ctx.$page.props.auth.user.id ? "receiver" : "sender"].avatar ?? "assets/images/no-profilepics.png",
                                class: "avatar avatar-xs rounded-circle img-thumbnail",
                                alt: ""
                              }, null, 8, ["src"]),
                              createVNode("span", { class: "user-status" })
                            ])
                          ]),
                          createVNode("div", { class: "flex-grow-1 overflow-hidden" }, [
                            createVNode("h6", { class: "text-truncate font-size-14 mb-0" }, [
                              createTextVNode(toDisplayString(i2[i2.user_id == _ctx.$page.props.auth.user.id ? "receiver" : "sender"].fullname) + " ", 1),
                              createVNode("div", { class: "font-size-11 float-end fw-normal" }, toDisplayString(unref(moment$1)(i2.last_conversation.created_at).fromNow()), 1)
                            ]),
                            createVNode("p", { class: "text-truncate text-muted mb-0" }, [
                              i2.last_conversation.receiver !== _ctx.$page.props.auth.user.id ? (openBlock(), createBlock("i", {
                                key: 0,
                                class: [i2.last_conversation.read_at ? "fa-check-double" : "fa-check", "fas me-1"]
                              }, null, 2)) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(i2.last_conversation.content), 1)
                            ])
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</li>`);
              });
              _push2(`<!--]--></ul></div></div></div><!--]-->`);
            }
            _push2(`</div></div></div><div class="col-12 col-md-8"${_scopeId}><div class="w-100 h-100"${_scopeId}><a href="#" class="d-md-none" data-bs-toggle="offcanvas" data-bs-target="#chat-leftsidebar"${_scopeId}>Show Sidebar</a>`);
            if (unref(conversation_details) && unref(conversation_details).recepient) {
              _push2(ssrRenderComponent(_sfc_main$f, { details: unref(conversation_details) }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_sfc_main$f, { blank: "" }, null, _parent2, _scopeId));
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(_component_Head, { title: __props.title }, null, 8, ["title"]),
              createVNode("div", { class: "row gx-0" }, [
                createVNode("div", { class: "col-4" }, [
                  createVNode("div", {
                    class: "offcanvas-md offcanvas-start",
                    tabindex: "-1",
                    id: "chat-leftsidebar"
                  }, [
                    createVNode("div", { class: "offcanvas-header" }, [
                      createVNode("button", {
                        type: "button",
                        class: "btn-close",
                        "data-bs-dismiss": "offcanvas",
                        "data-bs-target": "#chat-leftsidebar",
                        "aria-label": "Close"
                      })
                    ]),
                    createVNode("div", { class: "h-100 card" }, [
                      unref(showUsers) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "p-3"
                      }, [
                        createVNode("div", { class: "d-flex justify-content-between align-items-center mb-3" }, [
                          createVNode("h5", null, "New Message"),
                          createVNode("button", {
                            onClick: ($event) => isRef(showUsers) ? showUsers.value = false : showUsers = false,
                            class: "btn btn-md"
                          }, [
                            createVNode("i", { class: "fal font-size-22 fa-times" })
                          ], 8, ["onClick"])
                        ]),
                        createVNode("form", {
                          class: "chat-message-list",
                          "data-simplebar": ""
                        }, [
                          createVNode("div", { class: "mb-3" }, [
                            createVNode(_component_v_select, {
                              type: "search",
                              label: "fullname",
                              options: __props.friends,
                              placeholder: "Search"
                            }, {
                              option: withCtx((option) => [
                                createVNode(_component_Link, {
                                  "preserve-scroll": true,
                                  href: _ctx.route("messages.index", { id: unref(_btoa)({ type: "user", id: option.id }) }),
                                  class: "d-flex align-items-center mb-2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex-shrink-0 me-2 align-self-center" }, [
                                      createVNode("img", {
                                        src: option.avatar ?? "assets/images/no-profilepics.png",
                                        class: "avatar avatar-sm rounded-circle img-thumbnail",
                                        alt: ""
                                      }, null, 8, ["src"])
                                    ]),
                                    createVNode("div", { class: "flex-grow-1" }, [
                                      createVNode("h6", { class: "font-size-16 mb-0" }, toDisplayString(option.fullname), 1),
                                      createVNode("p", { class: "text-muted text-wrap mb-0" }, toDisplayString(option.headline), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              _: 1
                            }, 8, ["options"])
                          ])
                        ])
                      ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                        createVNode("div", { class: "p-3" }, [
                          createVNode("div", { class: "d-flex align-items-center mb-2" }, [
                            createVNode("div", { class: "flex-shrink-0 me-2 align-self-center" }, [
                              createVNode("img", {
                                src: _ctx.$page.props.auth.user.usermeta.avatar ?? "assets/images/no-profilepics.png",
                                class: "avatar avatar-sm rounded-circle img-thumbnail",
                                alt: ""
                              }, null, 8, ["src"])
                            ]),
                            createVNode("div", { class: "flex-grow-1" }, [
                              createVNode("h6", { class: "font-size-16 mb-0" }, [
                                createVNode("a", {
                                  href: "#",
                                  class: "text-dark"
                                }, [
                                  createTextVNode(toDisplayString(_ctx.$page.props.auth.user.fullname) + " ", 1),
                                  createVNode("i", { class: "fa fa-circle text-success align-middle font-size-10 ms-1" })
                                ])
                              ]),
                              createVNode("p", { class: "text-muted mb-0" }, "Available")
                            ]),
                            createVNode("div", { class: "flex-shrink-0" }, [
                              createVNode("button", {
                                onClick: ($event) => isRef(showUsers) ? showUsers.value = true : showUsers = true,
                                class: "btn"
                              }, [
                                createVNode("i", { class: "fal fa-plus font-size-20" })
                              ], 8, ["onClick"])
                            ])
                          ]),
                          createVNode("div", { class: "search-box chat-search-box" }, [
                            createVNode("div", { class: "position-relative" }, [
                              createVNode("input", {
                                type: "text",
                                class: "form-control bg-light border-0 rounded-pill",
                                placeholder: "Search or start a new chat"
                              }),
                              createVNode("i", { class: "fal fa-search search-icon" })
                            ])
                          ])
                        ]),
                        createVNode("div", {
                          class: "chat-message-list",
                          "data-simplebar": ""
                        }, [
                          createVNode("div", { class: "p-1" }, [
                            createVNode("div", null, [
                              createVNode("ul", { class: "list-unstyled chat-list" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(sortBy)(__props.messages, (o2) => unref(moment$1)(o2.last_conversation.created_at).format("X")).reverse(), (i2) => {
                                  return openBlock(), createBlock("li", {
                                    key: i2,
                                    class: { active: __props.conversation && __props.conversation.length && __props.conversation[0].message_id == i2.id }
                                  }, [
                                    createVNode(_component_Link, {
                                      "preserve-scroll": "",
                                      href: _ctx.route("messages.index", { id: unref(_btoa)({ type: "message", id: i2.id }) })
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "d-flex align-items-center" }, [
                                          createVNode("div", { class: "flex-shrink-0 me-2 align-self-center" }, [
                                            createVNode("div", { class: "user-img online" }, [
                                              createVNode("img", {
                                                src: i2[i2.user_id == _ctx.$page.props.auth.user.id ? "receiver" : "sender"].avatar ?? "assets/images/no-profilepics.png",
                                                class: "avatar avatar-xs rounded-circle img-thumbnail",
                                                alt: ""
                                              }, null, 8, ["src"]),
                                              createVNode("span", { class: "user-status" })
                                            ])
                                          ]),
                                          createVNode("div", { class: "flex-grow-1 overflow-hidden" }, [
                                            createVNode("h6", { class: "text-truncate font-size-14 mb-0" }, [
                                              createTextVNode(toDisplayString(i2[i2.user_id == _ctx.$page.props.auth.user.id ? "receiver" : "sender"].fullname) + " ", 1),
                                              createVNode("div", { class: "font-size-11 float-end fw-normal" }, toDisplayString(unref(moment$1)(i2.last_conversation.created_at).fromNow()), 1)
                                            ]),
                                            createVNode("p", { class: "text-truncate text-muted mb-0" }, [
                                              i2.last_conversation.receiver !== _ctx.$page.props.auth.user.id ? (openBlock(), createBlock("i", {
                                                key: 0,
                                                class: [i2.last_conversation.read_at ? "fa-check-double" : "fa-check", "fas me-1"]
                                              }, null, 2)) : createCommentVNode("", true),
                                              createTextVNode(" " + toDisplayString(i2.last_conversation.content), 1)
                                            ])
                                          ])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])
                                  ], 2);
                                }), 128))
                              ])
                            ])
                          ])
                        ])
                      ], 64))
                    ])
                  ])
                ]),
                createVNode("div", { class: "col-12 col-md-8" }, [
                  createVNode("div", { class: "w-100 h-100" }, [
                    createVNode("a", {
                      href: "#",
                      class: "d-md-none",
                      "data-bs-toggle": "offcanvas",
                      "data-bs-target": "#chat-leftsidebar"
                    }, "Show Sidebar"),
                    unref(conversation_details) && unref(conversation_details).recepient ? (openBlock(), createBlock(_sfc_main$f, {
                      key: 0,
                      details: unref(conversation_details)
                    }, null, 8, ["details"])) : (openBlock(), createBlock(_sfc_main$f, {
                      key: 1,
                      blank: ""
                    }))
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Messages/Index.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$e
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$d = {
  __name: "UserCard",
  __ssrInlineRender: true,
  props: { user: Object },
  setup(__props) {
    const props = __props;
    let relationship = computed(() => {
      let current_user_id = usePage().props.auth.user.id;
      let x2 = props.user.connections.find((e2) => e2.user_id == current_user_id && e2.friend_id == props.user.id);
      let status = "not_connected";
      if (x2) {
        if (x2.status == "accepted") {
          status = "connected";
        } else {
          status = "pending_request";
        }
      }
      return { status, connection: x2 };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card card-body shadow-lg text-center align-items-center" }, _attrs))}><img loading="lazy"${ssrRenderAttr("src", __props.user.avatar ?? "assets/images/no-profilepics.png")} class="avatar avatar-xl rounded-circle img-thumbnail"><div style="${ssrRenderStyle({ "height": "4rem", "overflow": "hidden" })}"><p class="fw-bold mb-0">`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("profile.index", { slug: __props.user.slug })
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.user.firstname)} ${ssrInterpolate(__props.user.lastname)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.user.firstname) + " " + toDisplayString(__props.user.lastname), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><p class="small mb-0 text-capitalize">${ssrInterpolate(__props.user.headline)}</p></div>`);
      if (unref(relationship).status == "not_connected") {
        _push(`<div class="d-flex align-items-center"><button type="button" data-bs-toggle="dropdown" class="btn rounded-pill btn-light px-3 btn-sm text-nowrap fw-bold"><i class="fal fa-user-plus px-1"></i> Connect <i class="fal fa-chevron-down font-size-12 ms-1"></i></button><div class="dropdown-menu"><button type="button" class="dropdown-item">Request to be protégé</button><button class="dropdown-item" type="button">Connect as peers </button></div></div>`);
      } else if (unref(relationship).status == "connected") {
        _push(`<div class="dropdown open"><button class="btn rounded-pill btn-primary px-3 btn-sm text-nowrap" type="button" data-bs-toggle="dropdown"><i class="fas fa-bars me-2"></i> Actions <i class="fas fa-angle-down ms-2"></i></button><div class="dropdown-menu">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("messages.index", { id: unref(_btoa)({ type: "user", id: __props.user.id }) }),
          class: "dropdown-item"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fal fa-envelope-open-text me-1"${_scopeId}></i> Send Private Message`);
            } else {
              return [
                createVNode("i", { class: "fal fa-envelope-open-text me-1" }),
                createTextVNode(" Send Private Message")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="dropdown-item text-danger"><i class="fal fa-user-times me-1"></i> Disconnect</button></div></div>`);
      } else if (unref(relationship).status == "pending_request") {
        _push(`<button class="btn rounded-pill btn-light fw-bold px-2 btn-sm text-nowrap text-danger"><i class="fas fa-times me-1"></i> Cancel Request</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UserCard.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = {
  __name: "People",
  __ssrInlineRender: true,
  props: { users: Object, title: String },
  setup(__props) {
    var _a;
    const props = __props;
    let next_page_url = ref((_a = props.users.next_page_url) == null ? void 0 : _a.replace("/people", "/people/ajax"));
    let allusers = ref(props.users.data);
    let loadMore = ($state) => {
      if (next_page_url.value) {
        axios$1.get(next_page_url.value).then((response) => {
          allusers.value = allusers.value.concat(response.data.data);
          next_page_url.value = response.data.next_page_url;
        }).catch((error) => {
          console.error(error);
        });
      }
    };
    let disconnect = (ev, reject = false) => {
      let msg = reject ? `Are you sure you want to cancel this request?` : `Are you sure you want to disconnect from this user?`;
      if (confirm(msg)) {
        useForm(ev).delete(route("user.disconnect"), { preserveState: false, preserveScroll: true });
      }
    };
    let connect = (ev) => {
      useForm(ev).post(route("user.connect"), { preserveState: false, preserveScroll: true });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_infinite_loading = resolveComponent("infinite-loading");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: __props.title }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$I, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="page-title-box d-flex align-items-center justify-content-between"${_scopeId}><h3 class="mb-0 fw-bold"${_scopeId}>${ssrInterpolate(__props.title)}</h3><div class="page-title-right"${_scopeId}><ol class="breadcrumb m-0"${_scopeId}><li class="breadcrumb-item"${_scopeId}><a href="javascript: void(0);"${_scopeId}><i class="fa fa-home"${_scopeId}></i></a></li><li class="breadcrumb-item active"${_scopeId}>People</li></ol></div></div><p${_scopeId}>About ${ssrInterpolate(__props.users.total)} results</p><div class="row"${_scopeId}><div class="col-xxl-10"${_scopeId}>`);
            if (unref(allusers).length) {
              _push2(`<div class="row"${_scopeId}><!--[-->`);
              ssrRenderList(unref(allusers), (i2) => {
                _push2(`<div class="col-xl-3 col-md-4 col-6"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$d, {
                  onOnConnect: ($event) => unref(connect)($event),
                  onOnCancel: ($event) => unref(disconnect)($event, true),
                  onOnDisconnect: ($event) => unref(disconnect)($event),
                  user: i2
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
              if (unref(next_page_url)) {
                _push2(ssrRenderComponent(_component_infinite_loading, {
                  distance: "50",
                  direction: "bottom",
                  onInfinite: unref(loadMore),
                  firstload: true
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div class="col-md-8 mx-auto text-center"${_scopeId}><div class="jumbotron"${_scopeId}><h1 class="fw-bold"${_scopeId}>No result returned</h1><img src="/assets/images/404-error.png" class="w-100"${_scopeId}></div></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "page-title-box d-flex align-items-center justify-content-between" }, [
                createVNode("h3", { class: "mb-0 fw-bold" }, toDisplayString(__props.title), 1),
                createVNode("div", { class: "page-title-right" }, [
                  createVNode("ol", { class: "breadcrumb m-0" }, [
                    createVNode("li", { class: "breadcrumb-item" }, [
                      createVNode("a", { href: "javascript: void(0);" }, [
                        createVNode("i", { class: "fa fa-home" })
                      ])
                    ]),
                    createVNode("li", { class: "breadcrumb-item active" }, "People")
                  ])
                ])
              ]),
              createVNode("p", null, "About " + toDisplayString(__props.users.total) + " results", 1),
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-xxl-10" }, [
                  unref(allusers).length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "row"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(allusers), (i2) => {
                      return openBlock(), createBlock("div", {
                        class: "col-xl-3 col-md-4 col-6",
                        key: i2
                      }, [
                        createVNode(_sfc_main$d, {
                          onOnConnect: ($event) => unref(connect)($event),
                          onOnCancel: ($event) => unref(disconnect)($event, true),
                          onOnDisconnect: ($event) => unref(disconnect)($event),
                          user: i2
                        }, null, 8, ["onOnConnect", "onOnCancel", "onOnDisconnect", "user"])
                      ]);
                    }), 128)),
                    unref(next_page_url) ? (openBlock(), createBlock(_component_infinite_loading, {
                      key: 0,
                      distance: "50",
                      direction: "bottom",
                      onInfinite: unref(loadMore),
                      firstload: true
                    }, null, 8, ["onInfinite"])) : createCommentVNode("", true)
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "col-md-8 mx-auto text-center"
                  }, [
                    createVNode("div", { class: "jumbotron" }, [
                      createVNode("h1", { class: "fw-bold" }, "No result returned"),
                      createVNode("img", {
                        src: "/assets/images/404-error.png",
                        class: "w-100"
                      })
                    ])
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/People.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$c
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$b = /* @__PURE__ */ Object.assign({ layout: _sfc_main$t }, {
  __name: "Certification",
  __ssrInlineRender: true,
  props: { certifications: Object },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Certification" }, null, _parent));
      _push(`<div class="card card-body" style="${ssrRenderStyle({ "min-height": "50vh" })}"><div class="d-flex align-items-center justify-content-between mb-4"><div class="d-flex align-items-center justify-content-between">`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("profile.index", { id: _ctx.$page.props.auth.user.slug }),
        class: "btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fas fa-arrow-left me-2"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fas fa-arrow-left me-2" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h5 class="mb-0">Certifications</h5></div>`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("certification.create"),
        class: "btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa fa-plus font-size-18"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fa fa-plus font-size-18" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (__props.certifications.length) {
        _push(`<!--[-->`);
        ssrRenderList(__props.certifications, (i2) => {
          _push(`<div class="d-flex justify-content-between align-items-start mb-4"><div class="me-3 flex-shrink-0"><img src="/assets/images/certificate.png" alt="" style="${ssrRenderStyle({ "width": "100px" })}"></div><div class="flex-grow-1 lh-sm"><p class="mb-1 fw-bold">${ssrInterpolate(i2.title)}</p><p class="mb-1">${ssrInterpolate(i2.organization)}</p><p class="mb-1">Issued ${ssrInterpolate(unref(moment$1)(i2.issued_date).format("MMM, YYYY"))}</p>`);
          if (i2.url) {
            _push(`<a class="btn rounded-pill btn-sm border-primary text-primary"${ssrRenderAttr("href", i2.url)} target="_blank"><i class="fa fa-link"></i> Show Credentials</a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("certification.edit", { id: i2.id }),
            class: "btn"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="fas fa-pen-alt"${_scopeId}></i>`);
              } else {
                return [
                  createVNode("i", { class: "fas fa-pen-alt" })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="jumbotron"><h1 class="fw-bold">No result returned</h1><img src="/assets/images/404-error.png" class="w-100"></div>`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Certification.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$b
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = {
  __name: "StartAndEndDate",
  __ssrInlineRender: true,
  props: ["modelValue"],
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    let isCurrent = ref(true);
    let start = ref(null);
    let end = ref(null);
    onMounted(() => {
      let [prefix, suffix] = props.modelValue ? props.modelValue.split(" - ").map((e2) => e2.trim()) : [];
      if ((suffix == null ? void 0 : suffix.toLowerCase()) === "current") {
        isCurrent.value = true;
      } else {
        isCurrent.value = false;
        end.value = suffix;
      }
      start.value = prefix;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "row row-cols-md-2" }, _attrs))}><div class="form-group"><div class="form-floating mb-3"><input type="month" required class="form-control"${ssrRenderAttr("value", unref(start))}${ssrRenderAttr("max", unref(moment$1)().format("YYYY-MM"))}><label>Start Date *</label></div></div><div class="form-group"><div class="form-floating mb-3"><input type="month"${ssrRenderAttr("min", unref(start))} required${ssrRenderAttr("value", unref(end))}${ssrIncludeBooleanAttr(unref(isCurrent)) ? " disabled" : ""} class="form-control"><label>End Date *</label></div><div class="form-check form-switch"><input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"${ssrIncludeBooleanAttr(Array.isArray(unref(isCurrent)) ? ssrLooseContain(unref(isCurrent), null) : unref(isCurrent)) ? " checked" : ""}><label class="form-check-label" for="flexSwitchCheckChecked"> Present (Current)</label></div></div></div>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/StartAndEndDate.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ Object.assign({ layout: _sfc_main$t }, {
  __name: "CertificationForm",
  __ssrInlineRender: true,
  props: { title: String, certification: Object },
  setup(__props) {
    var _a, _b, _c, _d;
    const props = __props;
    let form = useForm({
      user_id: usePage().props.auth.user.id,
      title: (_a = props.certification) == null ? void 0 : _a.title,
      organization: (_b = props.certification) == null ? void 0 : _b.organization,
      issued_date: (_c = props.certification) == null ? void 0 : _c.issued_date,
      url: (_d = props.certification) == null ? void 0 : _d.url
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: __props.title }, null, _parent));
      _push(`<form class="card"><div class="card-header bg-transparent d-flex align-items-center">`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("profile.certification", { slug: _ctx.$page.props.auth.user.slug }),
        class: "btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fas fa-arrow-left me-2"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fas fa-arrow-left me-2" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h5 class="mb-0">${ssrInterpolate(__props.title)}</h5></div><div class="card-body"><div class="form-group"><div class="form-floating mb-3"><input type="text" class="form-control" maxlength="50" required${ssrRenderAttr("value", unref(form).title)}><label>Title *</label></div></div><div class="form-group"><div class="form-floating mb-3"><input type="text" class="form-control" maxlength="50" required${ssrRenderAttr("value", unref(form).organization)}><label>Organization *</label></div></div><div class="form-group"><div class="form-floating mb-3"><input type="month" class="form-control" required${ssrRenderAttr("value", unref(form).issued_date)}><label>Issued Date *</label></div></div><div class="form-group"><div class="form-floating mb-3"><input type="url" class="form-control"${ssrRenderAttr("value", unref(form).url)}><label>Credential URL</label></div></div></div><div class="card-footer">`);
      if ((_a2 = props.certification) == null ? void 0 : _a2.id) {
        _push(`<button type="button" class="btn-link btn px-0 text-danger float-start">Delete certification</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="btn btn-primary float-end px-4">`);
      if (unref(form).processing) {
        _push(`<span class="spinner-grow text-white spinner-grow-sm me-2"></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`Save</button></div></form><!--]-->`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/CertificationForm.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$9
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$8 = /* @__PURE__ */ Object.assign({ layout: _sfc_main$t }, {
  __name: "Education",
  __ssrInlineRender: true,
  props: { educations: Object },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Education" }, null, _parent));
      _push(`<div class="card card-body" style="${ssrRenderStyle({ "min-height": "50vh" })}"><div class="d-flex align-items-center justify-content-between mb-4"><div class="d-flex align-items-center justify-content-between">`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("profile.index", { id: _ctx.$page.props.auth.user.slug }),
        class: "btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fas fa-arrow-left me-2"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fas fa-arrow-left me-2" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h5 class="mb-0">Education</h5></div>`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("education.create"),
        class: "btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa fa-plus font-size-18"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fa fa-plus font-size-18" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (__props.educations.length) {
        _push(`<!--[-->`);
        ssrRenderList(__props.educations, (i2) => {
          _push(`<div class="d-flex justify-content-between align-items-start mb-4"><div class="d-flex"><div class="me-3 flex-shrink-0"><img src="/assets/images/education.png" alt="" style="${ssrRenderStyle({ "width": "100px" })}"></div><div class="flex-grow-1"><p class="mb-1 fw-bold">${ssrInterpolate(i2.institution)}</p><p class="mb-0">${ssrInterpolate(unref(formatStartEndDate)(i2.start_end_date))}</p><p class="mb-0 d-flex align-items-center">${ssrInterpolate(i2.degree)} <i class="fa fa-circle mx-2" aria-hidden="true" style="${ssrRenderStyle({ "font-size": "3px" })}"></i> ${ssrInterpolate(i2.study)}</p></div></div>`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("education.edit", { id: i2.id }),
            class: "btn"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="fas fa-pen-alt"${_scopeId}></i>`);
              } else {
                return [
                  createVNode("i", { class: "fas fa-pen-alt" })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="jumbotron"><h1 class="fw-bold">No result returned</h1><img src="/assets/images/404-error.png" class="w-100"></div>`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Education.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$8
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = /* @__PURE__ */ Object.assign({ layout: _sfc_main$t }, {
  __name: "EducationForm",
  __ssrInlineRender: true,
  props: { title: String, education: Object },
  setup(__props) {
    var _a, _b, _c, _d;
    const props = __props;
    let form = useForm({
      user_id: usePage().props.auth.user.id,
      degree: (_a = props.education) == null ? void 0 : _a.degree,
      institution: (_b = props.education) == null ? void 0 : _b.institution,
      start_end_date: (_c = props.education) == null ? void 0 : _c.start_end_date,
      study: (_d = props.education) == null ? void 0 : _d.study
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: __props.title }, null, _parent));
      _push(`<form class="card"><div class="card-header bg-transparent d-flex align-items-center">`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("profile.education", { slug: _ctx.$page.props.auth.user.slug }),
        class: "text-muted"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fas fa-long-arrow-left me-5"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fas fa-long-arrow-left me-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h5 class="mb-0">${ssrInterpolate(__props.title)}</h5></div><div class="card-body"><div class="form-group"><div class="form-floating mb-3"><select class="form-select" required><!--[-->`);
      ssrRenderList(["School Certificate", "National Diploma", "Bachelor Degree", "Master Degree", "Doctoral Degree"], (i2, index) => {
        _push(`<option${ssrRenderAttr("value", i2)}>${ssrInterpolate(i2)}</option>`);
      });
      _push(`<!--]--></select><label>Degree * </label></div></div><div class="form-group"><div class="form-floating mb-3"><input type="text" class="form-control" maxlength="50" required${ssrRenderAttr("value", unref(form).institution)}><label>School / University / Institution *</label></div></div><div class="form-group"><div class="form-floating mb-3"><input type="text" class="form-control" maxlength="50" required${ssrRenderAttr("value", unref(form).study)}><label>Field of Study *</label></div></div>`);
      _push(ssrRenderComponent(_sfc_main$a, {
        modelValue: unref(form).start_end_date,
        "onUpdate:modelValue": ($event) => unref(form).start_end_date = $event
      }, null, _parent));
      _push(`</div><div class="card-footer">`);
      if ((_a2 = props.education) == null ? void 0 : _a2.id) {
        _push(`<button type="button" class="btn-link btn px-0 text-danger float-start"><i class="fas fa-trash me-2"></i> Delete Education</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="btn btn-primary float-end px-4">`);
      if (unref(form).processing) {
        _push(`<span class="spinner-grow text-white spinner-grow-sm me-2"></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`Save</button></div></form><!--]-->`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/EducationForm.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$7
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = /* @__PURE__ */ Object.assign({ layout: _sfc_main$t }, {
  __name: "Experience",
  __ssrInlineRender: true,
  props: { experiences: Object },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Experiences" }, null, _parent));
      _push(`<div class="card card-body"><div class="d-flex align-items-center justify-content-between mb-4"><div class="d-flex align-items-center justify-content-between">`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("profile.index", { id: _ctx.$page.props.auth.user.slug }),
        class: "btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fas fa-long-arrow-left me-2"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fas fa-long-arrow-left me-2" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h5 class="mb-0">Experience</h5></div>`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("experience.create"),
        class: "btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa fa-plus font-size-18"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fa fa-plus font-size-18" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (__props.experiences.length) {
        _push(`<!--[-->`);
        ssrRenderList(__props.experiences, (i2) => {
          _push(`<div class="d-flex justify-content-between align-items-start mb-4"><div class="d-flex"><div class="me-3 flex-shrink-0"><img src="/assets/images/business.png" alt="" style="${ssrRenderStyle({ "width": "100px" })}"></div><div class="flex-grow-1"><p class="mb-1 fw-bold">${ssrInterpolate(i2.title)}</p><p class="mb-0 d-flex align-items-center">${ssrInterpolate(i2.employer)} <i style="${ssrRenderStyle({ "font-size": "3px" })}" class="fa fa-circle px-2"></i> ${ssrInterpolate(i2.type)}</p><p class="mb-0">${ssrInterpolate(unref(formatStartEndDate)(i2.start_end_date))}</p><small>${ssrInterpolate(i2.industry)}</small><p>${ssrInterpolate(i2.description)}</p></div></div>`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("experience.edit", { id: i2.id }),
            class: "btn"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="fas fa-pen-alt"${_scopeId}></i>`);
              } else {
                return [
                  createVNode("i", { class: "fas fa-pen-alt" })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="jumbotron"><h1 class="fw-bold">No result returned</h1><img src="/assets/images/404-error.png" class="w-100"></div>`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Experience.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$6
}, Symbol.toStringTag, { value: "Module" }));
const industries = [
  "Accounting",
  "Airlines/Aviation",
  "Alternative Dispute Resolution",
  "Alternative Medicine",
  "Animation",
  "Apparel & Fashion",
  "Architecture & Planning",
  "Arts & Crafts",
  "Automotive",
  "Aviation & Aerospace",
  "Banking",
  "Biotechnology",
  "Broadcast Media",
  "Building Materials",
  "Business Supplies & Equipment",
  "Capital Markets",
  "Chemicals",
  "Civic & Social Organization",
  "Civil Engineering",
  "Commercial Real Estate",
  "Computer & Network Security",
  "Computer Games",
  "Computer Hardware",
  "Computer Networking",
  "Computer Software",
  "Construction",
  "Consumer Electronics",
  "Consumer Goods",
  "Consumer Services",
  "Cosmetics",
  "Dairy",
  "Defense & Space",
  "Design",
  "Education Management",
  "E-learning",
  "Electrical & Electronic Manufacturing",
  "Entertainment",
  "Environmental Services",
  "Events Services",
  "Executive Office",
  "Facilities Services",
  "Farming",
  "Financial Services",
  "Fine Art",
  "Fishery",
  "Food & Beverages",
  "Food Production",
  "Fundraising",
  "Furniture",
  "Gambling & Casinos",
  "Glass, Ceramics & Concrete",
  "Government Administration",
  "Government Relations",
  "Graphic Design",
  "Health, Wellness & Fitness",
  "Higher Education",
  "Hospital & Health Care",
  "Hospitality",
  "Human Resources",
  "Import & Export",
  "Individual & Family Services",
  "Industrial Automation",
  "Information Services",
  "Information Technology & Services",
  "Insurance",
  "International Affairs",
  "International Trade & Development",
  "Internet",
  "Investment Banking/Venture",
  "Investment Management",
  "Judiciary",
  "Law Enforcement",
  "Law Practice",
  "Legal Services",
  "Legislative Office",
  "Leisure & Travel",
  "Libraries",
  "Logistics & Supply Chain",
  "Luxury Goods & Jewelry",
  "Machinery",
  "Management Consulting",
  "Maritime",
  "Marketing & Advertising",
  "Market Research",
  "Mechanical or Industrial Engineering",
  "Media Production",
  "Medical Device",
  "Medical Practice",
  "Mental Health Care",
  "Military",
  "Mining & Metals",
  "Motion Pictures & Film",
  "Museums & Institutions",
  "Music",
  "Nanotechnology",
  "Newspapers",
  "Nonprofit Organization Management",
  "Oil & Energy",
  "Online Publishing",
  "Outsourcing/Offshoring",
  "Package/Freight Delivery",
  "Packaging & Containers",
  "Paper & Forest Products",
  "Performing Arts",
  "Pharmaceuticals",
  "Philanthropy",
  "Photography",
  "Plastics",
  "Political Organization",
  "Primary/Secondary",
  "Printing",
  "Professional Training",
  "Program Development",
  "Public Policy",
  "Public Relations",
  "Public Safety",
  "Publishing",
  "Railroad Manufacture",
  "Ranching",
  "Real Estate",
  "Recreational",
  "Facilities & Services",
  "Religious Institutions",
  "Renewables & Environment",
  "Research",
  "Restaurants",
  "Retail",
  "Security & Investigations",
  "Semiconductors",
  "Shipbuilding",
  "Sporting Goods",
  "Sports",
  "Staffing & Recruiting",
  "Supermarkets",
  "Telecommunications",
  "Textiles",
  "Think Tanks",
  "Tobacco",
  "Translation & Localization",
  "Transportation/Trucking/Railroad",
  "Utilities",
  "Venture Capital",
  "Veterinary",
  "Warehousing",
  "Wholesale",
  "Wine & Spirits",
  "Wireless",
  "Writing & Editing"
];
const _sfc_main$5 = /* @__PURE__ */ Object.assign({ layout: _sfc_main$t }, {
  __name: "ExperienceForm",
  __ssrInlineRender: true,
  props: { title: String, experience: Object },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f;
    const props = __props;
    let form = useForm({
      user_id: usePage().props.auth.user.id,
      title: (_a = props.experience) == null ? void 0 : _a.title,
      employer: (_b = props.experience) == null ? void 0 : _b.employer,
      start_end_date: (_c = props.experience) == null ? void 0 : _c.start_end_date,
      type: (_d = props.experience) == null ? void 0 : _d.type,
      industry: (_e = props.experience) == null ? void 0 : _e.industry,
      description: (_f = props.experience) == null ? void 0 : _f.description
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: __props.title }, null, _parent));
      _push(`<form class="card"><div class="card-header bg-transparent d-flex align-items-center">`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("profile.experience", { slug: _ctx.$page.props.auth.user.slug }),
        class: "text-muted"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fas fa-long-arrow-left me-5"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fas fa-long-arrow-left me-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h5 class="mb-0">${ssrInterpolate(__props.title)}</h5></div><div class="card-body"><div class="form-group"><div class="form-floating mb-3"><input type="text" class="form-control" maxlength="50" required${ssrRenderAttr("value", unref(form).title)}><label>Job Title *</label></div></div><div class="form-group"><div class="form-floating mb-3"><input type="text" class="form-control" maxlength="50" required${ssrRenderAttr("value", unref(form).employer)}><label>Employer *</label></div></div><div class="form-group"><div class="form-floating mb-3"><select class="form-select" required><option value="">--Choose One--</option><!--[-->`);
      ssrRenderList(["Full-time", "Part-time", "Self-employed", "Freelance", "Contract", "Internship"], (i2, index) => {
        _push(`<option${ssrRenderAttr("value", i2)}>${ssrInterpolate(i2)}</option>`);
      });
      _push(`<!--]--></select><label>Employment Type * </label></div></div><div class="form-group"><div class="form-floating mb-3"><textarea class="form-control" maxlength="200" style="${ssrRenderStyle({ "height": "100px" })}">${ssrInterpolate(unref(form).description)}</textarea><label>Description</label></div></div><div class="form-group mb-3">`);
      _push(ssrRenderComponent(_sfc_main$a, {
        modelValue: unref(form).start_end_date,
        "onUpdate:modelValue": ($event) => unref(form).start_end_date = $event
      }, null, _parent));
      _push(`</div><div class="form-group"><div class="form-floating mb-3"><select class="form-select" required><option value="null">--Choose One--</option><!--[-->`);
      ssrRenderList(unref(industries), (i2, index) => {
        _push(`<option${ssrRenderAttr("value", i2)}>${ssrInterpolate(i2)}</option>`);
      });
      _push(`<!--]--></select><label>Industry *</label></div></div></div><div class="card-footer">`);
      if ((_a2 = props.experience) == null ? void 0 : _a2.id) {
        _push(`<button type="button" class="btn-link btn px-0 text-danger float-start"><i class="fas fa-trash me-2"></i> Delete experience</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="btn btn-primary float-end px-4">`);
      if (unref(form).processing) {
        _push(`<span class="spinner-grow text-white spinner-grow-sm me-2"></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`Save</button></div></form><!--]-->`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/ExperienceForm.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const professions = [
  "accountant",
  "actor",
  "actuary",
  "adhesive bonding machine tender",
  "adjudicator",
  "administrative assistant",
  "administrative services manager",
  "adult education teacher",
  "advertising manager",
  "advertising sales agent",
  "aerobics instructor",
  "aerospace engineer",
  "aerospace engineering technician",
  "agent",
  "agricultural engineer",
  "agricultural equipment operator",
  "agricultural grader",
  "agricultural inspector",
  "agricultural manager",
  "agricultural sciences teacher",
  "agricultural sorter",
  "agricultural technician",
  "agricultural worker",
  "air conditioning installer",
  "air conditioning mechanic",
  "air traffic controller",
  "aircraft cargo handling supervisor",
  "aircraft mechanic",
  "aircraft service technician",
  "airline copilot",
  "airline pilot",
  "ambulance dispatcher",
  "ambulance driver",
  "amusement machine servicer",
  "anesthesiologist",
  "animal breeder",
  "animal control worker",
  "animal scientist",
  "animal trainer",
  "animator",
  "answering service operator",
  "anthropologist",
  "apparel patternmaker",
  "apparel worker",
  "arbitrator",
  "archeologist",
  "architect",
  "architectural drafter",
  "architectural manager",
  "archivist",
  "art director",
  "art teacher",
  "artist",
  "assembler",
  "astronomer",
  "athlete",
  "athletic trainer",
  "ATM machine repairer",
  "atmospheric scientist",
  "attendant",
  "audio and video equipment technician",
  "audio-visual and multimedia collections specialist",
  "audiologist",
  "auditor",
  "author",
  "auto damage insurance appraiser",
  "automotive and watercraft service attendant",
  "automotive glass installer",
  "automotive mechanic",
  "avionics technician",
  "back-end developer",
  "baggage porter",
  "bailiff",
  "baker",
  "barback",
  "barber",
  "bartender",
  "basic education teacher",
  "behavioral disorder counselor",
  "bellhop",
  "bench carpenter",
  "bicycle repairer",
  "bill and account collector",
  "billing and posting clerk",
  "biochemist",
  "biological technician",
  "biomedical engineer",
  "biophysicist",
  "blaster",
  "blending machine operator",
  "blockmason",
  "boiler operator",
  "boilermaker",
  "bookkeeper",
  "boring machine tool tender",
  "brazer",
  "brickmason",
  "bridge and lock tender",
  "broadcast news analyst",
  "broadcast technician",
  "brokerage clerk",
  "budget analyst",
  "building inspector",
  "bus mechanic",
  "butcher",
  "buyer",
  "cabinetmaker",
  "cafeteria attendant",
  "cafeteria cook",
  "camera operator",
  "camera repairer",
  "cardiovascular technician",
  "cargo agent",
  "carpenter",
  "carpet installer",
  "cartographer",
  "cashier",
  "caster",
  "ceiling tile installer",
  "cellular equipment installer",
  "cement mason",
  "channeling machine operator",
  "chauffeur",
  "checker",
  "chef",
  "chemical engineer",
  "chemical plant operator",
  "chemist",
  "chemistry teacher",
  "chief executive",
  "child social worker",
  "childcare worker",
  "chiropractor",
  "choreographer",
  "civil drafter",
  "civil engineer",
  "civil engineering technician",
  "claims adjuster",
  "claims examiner",
  "claims investigator",
  "cleaner",
  "clinical laboratory technician",
  "clinical laboratory technologist",
  "clinical psychologist",
  "coating worker",
  "coatroom attendant",
  "coil finisher",
  "coil taper",
  "coil winder",
  "coin machine servicer",
  "commercial diver",
  "commercial pilot",
  "commodities sales agent",
  "communications equipment operator",
  "communications teacher",
  "community association manager",
  "community service manager",
  "compensation and benefits manager",
  "compliance officer",
  "composer",
  "computer hardware engineer",
  "computer network architect",
  "computer operator",
  "computer programmer",
  "computer science teacher",
  "computer support specialist",
  "computer systems administrator",
  "computer systems analyst",
  "concierge",
  "conciliator",
  "concrete finisher",
  "conservation science teacher",
  "conservation scientist",
  "conservation worker",
  "conservator",
  "construction inspector",
  "construction manager",
  "construction painter",
  "construction worker",
  "continuous mining machine operator",
  "convention planner",
  "conveyor operator",
  "cook",
  "cooling equipment operator",
  "copy marker",
  "correctional officer",
  "correctional treatment specialist",
  "correspondence clerk",
  "correspondent",
  "cosmetologist",
  "cost estimator",
  "costume attendant",
  "counseling psychologist",
  "counselor",
  "courier",
  "court reporter",
  "craft artist",
  "crane operator",
  "credit analyst",
  "credit checker",
  "credit counselor",
  "criminal investigator",
  "criminal justice teacher",
  "crossing guard",
  "curator",
  "custom sewer",
  "customer service representative",
  "cutter",
  "cutting machine operator",
  "dancer",
  "data entry keyer",
  "database administrator",
  "decorating worker",
  "delivery services driver",
  "demonstrator",
  "dental assistant",
  "dental hygienist",
  "dental laboratory technician",
  "dentist",
  "dermatologist",
  "derrick operator",
  "designer",
  "desktop publisher",
  "detective",
  "developer",
  "diagnostic medical sonographer",
  "die maker",
  "diesel engine specialist",
  "dietetic technician",
  "dietitian",
  "dinkey operator",
  "director",
  "dishwasher",
  "dispatcher",
  "DJ",
  "doctor",
  "door-to-door sales worker",
  "drafter",
  "dragline operator",
  "drama teacher",
  "dredge operator",
  "dressing room attendant",
  "dressmaker",
  "drier operator",
  "drilling machine tool operator",
  "dry-cleaning worker",
  "drywall installer",
  "dyeing machine operator",
  "earth driller",
  "economics teacher",
  "economist",
  "editor",
  "education administrator",
  "electric motor repairer",
  "electrical electronics drafter",
  "electrical engineer",
  "electrical equipment assembler",
  "electrical installer",
  "electrical power-line installer",
  "electrician",
  "electro-mechanical technician",
  "elementary school teacher",
  "elevator installer",
  "elevator repairer",
  "embalmer",
  "emergency management director",
  "emergency medical technician",
  "engine assembler",
  "engineer",
  "engineering manager",
  "engineering teacher",
  "english language teacher",
  "engraver",
  "entertainment attendant",
  "environmental engineer",
  "environmental science teacher",
  "environmental scientist",
  "epidemiologist",
  "escort",
  "etcher",
  "event planner",
  "excavating operator",
  "executive administrative assistant",
  "executive secretary",
  "exhibit designer",
  "expediting clerk",
  "explosives worker",
  "extraction worker",
  "fabric mender",
  "fabric patternmaker",
  "fabricator",
  "faller",
  "family practitioner",
  "family social worker",
  "family therapist",
  "farm advisor",
  "farm equipment mechanic",
  "farm labor contractor",
  "farmer",
  "farmworker",
  "fashion designer",
  "fast food cook",
  "fence erector",
  "fiberglass fabricator",
  "fiberglass laminator",
  "file clerk",
  "filling machine operator",
  "film and video editor",
  "financial analyst",
  "financial examiner",
  "financial manager",
  "financial services sales agent",
  "fine artist",
  "fire alarm system installer",
  "fire dispatcher",
  "fire inspector",
  "fire investigator",
  "firefighter",
  "fish and game warden",
  "fish cutter",
  "fish trimmer",
  "fisher",
  "fitness studies teacher",
  "fitness trainer",
  "flight attendant",
  "floor finisher",
  "floor layer",
  "floor sander",
  "floral designer",
  "food batchmaker",
  "food cooking machine operator",
  "food preparation worker",
  "food science technician",
  "food scientist",
  "food server",
  "food service manager",
  "food technologist",
  "foreign language teacher",
  "foreign literature teacher",
  "forensic science technician",
  "forest fire inspector",
  "forest fire prevention specialist",
  "forest worker",
  "forester",
  "forestry teacher",
  "forging machine setter",
  "foundry coremaker",
  "freight agent",
  "freight mover",
  "front-end developer",
  "fundraising manager",
  "funeral attendant",
  "funeral director",
  "funeral service manager",
  "furnace operator",
  "furnishings worker",
  "furniture finisher",
  "gaming booth cashier",
  "gaming cage worker",
  "gaming change person",
  "gaming dealer",
  "gaming investigator",
  "gaming manager",
  "gaming surveillance officer",
  "garment mender",
  "garment presser",
  "gas compressor",
  "gas plant operator",
  "gas pumping station operator",
  "general manager",
  "general practitioner",
  "geographer",
  "geography teacher",
  "geological engineer",
  "geological technician",
  "geoscientist",
  "glazier",
  "government program eligibility interviewer",
  "graduate teaching assistant",
  "graphic designer",
  "groundskeeper",
  "groundskeeping worker",
  "gynecologist",
  "hairdresser",
  "hairstylist",
  "hand grinding worker",
  "hand laborer",
  "hand packager",
  "hand packer",
  "hand polishing worker",
  "hand sewer",
  "hazardous materials removal worker",
  "head cook",
  "health and safety engineer",
  "health educator",
  "health information technician",
  "health services manager",
  "health specialties teacher",
  "healthcare social worker",
  "hearing officer",
  "heat treating equipment setter",
  "heating installer",
  "heating mechanic",
  "heavy truck driver",
  "highway maintenance worker",
  "historian",
  "history teacher",
  "hoist and winch operator",
  "home appliance repairer",
  "home economics teacher",
  "home entertainment installer",
  "home health aide",
  "home management advisor",
  "host",
  "hostess",
  "hostler",
  "hotel desk clerk",
  "housekeeping cleaner",
  "human resources assistant",
  "human resources manager",
  "human service assistant",
  "hunter",
  "hydrologist",
  "illustrator",
  "industrial designer",
  "industrial engineer",
  "industrial engineering technician",
  "industrial machinery mechanic",
  "industrial production manager",
  "industrial truck operator",
  "industrial-organizational psychologist",
  "information clerk",
  "information research scientist",
  "information security analyst",
  "information systems manager",
  "inspector",
  "instructional coordinator",
  "instructor",
  "insulation worker",
  "insurance claims clerk",
  "insurance sales agent",
  "insurance underwriter",
  "intercity bus driver",
  "interior designer",
  "internist",
  "interpreter",
  "interviewer",
  "investigator",
  "jailer",
  "janitor",
  "jeweler",
  "judge",
  "judicial law clerk",
  "kettle operator",
  "kiln operator",
  "kindergarten teacher",
  "laboratory animal caretaker",
  "landscape architect",
  "landscaping worker",
  "lathe setter",
  "laundry worker",
  "law enforcement teacher",
  "law teacher",
  "lawyer",
  "layout worker",
  "leather worker",
  "legal assistant",
  "legal secretary",
  "legislator",
  "librarian",
  "library assistant",
  "library science teacher",
  "library technician",
  "licensed practical nurse",
  "licensed vocational nurse",
  "life scientist",
  "lifeguard",
  "light truck driver",
  "line installer",
  "literacy teacher",
  "literature teacher",
  "loading machine operator",
  "loan clerk",
  "loan interviewer",
  "loan officer",
  "lobby attendant",
  "locker room attendant",
  "locksmith",
  "locomotive engineer",
  "locomotive firer",
  "lodging manager",
  "log grader",
  "logging equipment operator",
  "logistician",
  "machine feeder",
  "machinist",
  "magistrate judge",
  "magistrate",
  "maid",
  "mail clerk",
  "mail machine operator",
  "mail superintendent",
  "maintenance painter",
  "maintenance worker",
  "makeup artist",
  "management analyst",
  "manicurist",
  "manufactured building installer",
  "mapping technician",
  "marble setter",
  "marine engineer",
  "marine oiler",
  "market research analyst",
  "marketing manager",
  "marketing specialist",
  "marriage therapist",
  "massage therapist",
  "material mover",
  "materials engineer",
  "materials scientist",
  "mathematical science teacher",
  "mathematical technician",
  "mathematician",
  "maxillofacial surgeon",
  "measurer",
  "meat cutter",
  "meat packer",
  "meat trimmer",
  "mechanical door repairer",
  "mechanical drafter",
  "mechanical engineer",
  "mechanical engineering technician",
  "mediator",
  "medical appliance technician",
  "medical assistant",
  "medical equipment preparer",
  "medical equipment repairer",
  "medical laboratory technician",
  "medical laboratory technologist",
  "medical records technician",
  "medical scientist",
  "medical secretary",
  "medical services manager",
  "medical transcriptionist",
  "meeting planner",
  "mental health counselor",
  "mental health social worker",
  "merchandise displayer",
  "messenger",
  "metal caster",
  "metal patternmaker",
  "metal pickling operator",
  "metal pourer",
  "metal worker",
  "metal-refining furnace operator",
  "metal-refining furnace tender",
  "meter reader",
  "microbiologist",
  "middle school teacher",
  "milling machine setter",
  "millwright",
  "mine cutting machine operator",
  "mine shuttle car operator",
  "mining engineer",
  "mining safety engineer",
  "mining safety inspector",
  "mining service unit operator",
  "mixing machine setter",
  "mobile heavy equipment mechanic",
  "mobile home installer",
  "model maker",
  "model",
  "molder",
  "mortician",
  "motel desk clerk",
  "motion picture projectionist",
  "motorboat mechanic",
  "motorboat operator",
  "motorboat service technician",
  "motorcycle mechanic",
  "movers",
  "multimedia artist",
  "museum technician",
  "music director",
  "music teacher",
  "musical instrument repairer",
  "musician",
  "natural sciences manager",
  "naval architect",
  "network systems administrator",
  "new accounts clerk",
  "news vendor",
  "nonfarm animal caretaker",
  "nuclear engineer",
  "nuclear medicine technologist",
  "nuclear power reactor operator",
  "nuclear technician",
  "nursing aide",
  "nursing instructor",
  "nursing teacher",
  "nutritionist",
  "obstetrician",
  "occupational health and safety specialist",
  "occupational health and safety technician",
  "occupational therapist",
  "occupational therapy aide",
  "occupational therapy assistant",
  "offbearer",
  "office clerk",
  "office machine operator",
  "operating engineer",
  "operations manager",
  "operations research analyst",
  "ophthalmic laboratory technician",
  "optician",
  "optometrist",
  "oral surgeon",
  "order clerk",
  "order filler",
  "orderly",
  "ordnance handling expert",
  "orthodontist",
  "orthotist",
  "outdoor power equipment mechanic",
  "oven operator",
  "packaging machine operator",
  "painter ",
  "painting worker",
  "paper goods machine setter",
  "paperhanger",
  "paralegal",
  "paramedic",
  "parking enforcement worker",
  "parking lot attendant",
  "parts salesperson",
  "paving equipment operator",
  "payroll clerk",
  "pediatrician",
  "pedicurist",
  "personal care aide",
  "personal chef",
  "personal financial advisor",
  "personal trainer",
  "pest control worker",
  "pesticide applicator",
  "pesticide handler",
  "pesticide sprayer",
  "petroleum engineer",
  "petroleum gauger",
  "petroleum pump system operator",
  "petroleum refinery operator",
  "petroleum technician",
  "pharmacist",
  "pharmacy aide",
  "pharmacy technician",
  "philosophy teacher",
  "photogrammetrist",
  "photographer",
  "photographic process worker",
  "photographic processing machine operator",
  "physical therapist aide",
  "physical therapist assistant",
  "physical therapist",
  "physician assistant",
  "physician",
  "physicist",
  "physics teacher",
  "pile-driver operator",
  "pipefitter",
  "pipelayer",
  "planing machine operator",
  "planning clerk",
  "plant operator",
  "plant scientist",
  "plasterer",
  "plastic patternmaker",
  "plastic worker",
  "plumber",
  "podiatrist",
  "police dispatcher",
  "police officer",
  "policy processing clerk",
  "political science teacher",
  "political scientist",
  "postal service clerk",
  "postal service mail carrier",
  "postal service mail processing machine operator",
  "postal service mail processor",
  "postal service mail sorter",
  "postmaster",
  "postsecondary teacher",
  "poultry cutter",
  "poultry trimmer",
  "power dispatcher",
  "power distributor",
  "power plant operator",
  "power tool repairer",
  "precious stone worker",
  "precision instrument repairer",
  "prepress technician",
  "preschool teacher",
  "priest",
  "print binding worker",
  "printing press operator",
  "private detective",
  "probation officer",
  "procurement clerk",
  "producer",
  "product promoter",
  "product manager",
  "production clerk",
  "production occupation",
  "proofreader",
  "property manager",
  "prosthetist",
  "prosthodontist",
  "psychiatric aide",
  "psychiatric technician",
  "psychiatrist",
  "psychologist",
  "psychology teacher",
  "public relations manager",
  "public relations specialist",
  "pump operator",
  "purchasing agent",
  "purchasing manager",
  "radiation therapist",
  "radio announcer",
  "radio equipment installer",
  "radio operator",
  "radiologic technician",
  "radiologic technologist",
  "rail car repairer",
  "rail transportation worker",
  "rail yard engineer",
  "rail-track laying equipment operator",
  "railroad brake operator",
  "railroad conductor",
  "railroad police",
  "rancher",
  "real estate appraiser",
  "real estate broker",
  "real estate manager",
  "real estate sales agent",
  "receiving clerk",
  "receptionist",
  "record clerk",
  "recreation teacher",
  "recreation worker",
  "recreational therapist",
  "recreational vehicle service technician",
  "recyclable material collector",
  "referee",
  "refractory materials repairer",
  "refrigeration installer",
  "refrigeration mechanic",
  "refuse collector",
  "regional planner",
  "registered nurse",
  "rehabilitation counselor",
  "reinforcing iron worker",
  "reinforcing rebar worker",
  "religion teacher",
  "religious activities director",
  "religious worker",
  "rental clerk",
  "repair worker",
  "reporter",
  "residential advisor",
  "resort desk clerk",
  "respiratory therapist",
  "respiratory therapy technician",
  "retail buyer",
  "retail salesperson",
  "revenue agent",
  "rigger",
  "rock splitter",
  "rolling machine tender",
  "roof bolter",
  "roofer",
  "rotary drill operator",
  "roustabout",
  "safe repairer",
  "sailor",
  "sales engineer",
  "sales manager",
  "sales representative",
  "sampler",
  "sawing machine operator",
  "scaler",
  "school bus driver",
  "school psychologist",
  "school social worker",
  "scout leader",
  "sculptor",
  "secondary education teacher",
  "secondary school teacher",
  "secretary",
  "securities sales agent",
  "security guard",
  "security system installer",
  "segmental paver",
  "self-enrichment education teacher",
  "semiconductor processor",
  "septic tank servicer",
  "set designer",
  "sewer pipe cleaner",
  "sewing machine operator",
  "shampooer",
  "shaper",
  "sheet metal worker",
  "sheriff's patrol officer",
  "ship captain",
  "ship engineer",
  "ship loader",
  "shipmate",
  "shipping clerk",
  "shoe machine operator",
  "shoe worker",
  "short order cook",
  "signal operator",
  "signal repairer",
  "singer",
  "ski patrol",
  "skincare specialist",
  "slaughterer",
  "slicing machine tender",
  "slot supervisor",
  "social science research assistant",
  "social sciences teacher",
  "social scientist",
  "social service assistant",
  "social service manager",
  "social work teacher",
  "social worker",
  "sociologist",
  "sociology teacher",
  "software developer",
  "software engineer",
  "soil scientist",
  "solderer",
  "sorter",
  "sound engineering technician",
  "space scientist",
  "special education teacher",
  "speech-language pathologist",
  "sports book runner",
  "sports entertainer",
  "sports performer",
  "stationary engineer",
  "statistical assistant",
  "statistician",
  "steamfitter",
  "stock clerk",
  "stock mover",
  "stonemason",
  "street vendor",
  "streetcar operator",
  "structural iron worker",
  "structural metal fabricator",
  "structural metal fitter",
  "structural steel worker",
  "stucco mason",
  "substance abuse counselor",
  "substance abuse social worker",
  "subway operator",
  "surfacing equipment operator",
  "surgeon",
  "surgical technologist",
  "survey researcher",
  "surveying technician",
  "surveyor",
  "switch operator",
  "switchboard operator",
  "tailor",
  "tamping equipment operator",
  "tank car loader",
  "taper",
  "tax collector",
  "tax examiner",
  "tax preparer",
  "taxi driver",
  "teacher assistant",
  "teacher",
  "team assembler",
  "technical writer",
  "telecommunications equipment installer",
  "telemarketer",
  "telephone operator",
  "television announcer",
  "teller",
  "terrazzo finisher",
  "terrazzo worker",
  "tester",
  "textile bleaching operator",
  "textile cutting machine setter",
  "textile knitting machine setter",
  "textile presser",
  "textile worker",
  "therapist",
  "ticket agent",
  "ticket taker",
  "tile setter",
  "timekeeping clerk",
  "timing device assembler",
  "tire builder",
  "tire changer",
  "tire repairer",
  "title abstractor",
  "title examiner",
  "title searcher",
  "tobacco roasting machine operator",
  "tool filer",
  "tool grinder",
  "tool maker",
  "tool sharpener",
  "tour guide",
  "tower equipment installer",
  "tower operator",
  "track switch repairer",
  "tractor operator",
  "tractor-trailer truck driver",
  "traffic clerk",
  "traffic technician",
  "training and development manager",
  "training and development specialist",
  "transit police",
  "translator",
  "transportation equipment painter",
  "transportation inspector",
  "transportation security screener",
  "transportation worker",
  "trapper",
  "travel agent",
  "travel clerk",
  "travel guide",
  "tree pruner",
  "tree trimmer",
  "trimmer",
  "truck loader",
  "truck mechanic",
  "tuner",
  "turning machine tool operator",
  "tutor",
  "typist",
  "umpire",
  "undertaker",
  "upholsterer",
  "urban planner",
  "usher",
  "UX designer",
  "valve installer",
  "vending machine servicer",
  "veterinarian",
  "veterinary assistant",
  "veterinary technician",
  "vocational counselor",
  "vocational education teacher",
  "waiter",
  "waitress",
  "watch repairer",
  "water treatment plant operator",
  "weaving machine setter",
  "web developer",
  "weigher",
  "welder",
  "wellhead pumper",
  "wholesale buyer",
  "wildlife biologist",
  "window trimmer",
  "wood patternmaker",
  "woodworker",
  "word processor",
  "writer",
  "yardmaster",
  "zoologist"
];
const _sfc_main$4 = {
  __name: "OnboardMessage",
  __ssrInlineRender: true,
  props: { user: Object },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[--><div class="text-end"><button class="btn">Close</button></div><div class="row g-5 align-items-center"><div class="col-md-5"><img loading="lazy" src="/assets/images/ribara-woman.gif" alt="" style="${ssrRenderStyle({ "width": "100%", "object-fit": "contain" })}"></div><div class="col-md-7"><h1 class="my-3"><span>Welcome onboard</span><br> <b class="text-primary fw-bold display-5">${ssrInterpolate(__props.user.fullname)}</b></h1><p class="lead fw-bold">Ribara is about Discovering and being Discovered.</p><ol class="list-group list-group-flush"><li class="list-group-item"><div class="row"><div class="col-md-8"><p class="m-0 d-flex"><i class="${ssrRenderClass([!__props.user.email_verified_at ? "fa-exclamation-circle text-danger" : "fa-check-circle text-success", "fa me-2 font-size-24"])}"></i>Your Email is one channel we would be sending notifications to. We need to be sure it works.</p></div><div class="col-md-4 text-end">`);
      _push(ssrRenderComponent(_component_Link, {
        disabled: "",
        as: "button",
        href: _ctx.route("verification.send"),
        method: "POST",
        class: "btn btn-light fw-bold btn-sm disabled"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Verify Email <i class="fa fa-angle-right ms-1"${_scopeId}></i>`);
          } else {
            return [
              createTextVNode(" Verify Email "),
              createVNode("i", { class: "fa fa-angle-right ms-1" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></li><li class="list-group-item"><div class="row"><div class="col-md-8"><p class="m-0 d-flex"><i class="${ssrRenderClass([!__props.user.usermeta.avatar ? "fa-exclamation-circle text-danger" : "fa-check-circle text-success", "fa me-2 font-size-24"])}"></i> A good profile picture speaks thousand words.</p></div><div class="col-md-4 text-end"><button class="btn btn-light fw-bold btn-sm">Upload Avatar <i class="fa fa-angle-right ms-1"></i></button></div></div></li><li class="list-group-item"><div class="row"><div class="col-md-8"><p class="m-0 d-flex"><i class="${ssrRenderClass([!__props.user.usermeta.headline ? "fa-exclamation-circle text-danger" : "fa-check-circle text-success", "fa me-2 font-size-24"])}"></i> Let people know who you are easily. Complete your profile information</p></div><div class="col-md-4 text-end"><button class="btn btn-light fw-bold btn-sm">Edit profile <i class="fa fa-angle-right ms-1"></i></button></div></div></li><li class="list-group-item"><div class="row"><div class="col-md-8"><p class="m-0 d-flex"><i class="${ssrRenderClass([__props.user.experience.length == 0 ? "fa-exclamation-triangle text-warning" : "fa-check-circle text-success", "fa me-2 font-size-24"])}"></i> Add any relevant work experience</p></div><div class="col-md-4 text-end">`);
      _push(ssrRenderComponent(_component_Link, {
        onClick: ($event) => _ctx.$emit("action", "close"),
        href: _ctx.route("experience.create"),
        class: "btn btn-light fw-bold btn-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Add Experience <i class="fa fa-angle-right ms-1"${_scopeId}></i>`);
          } else {
            return [
              createTextVNode("Add Experience "),
              createVNode("i", { class: "fa fa-angle-right ms-1" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></li><li class="list-group-item"><div class="row"><div class="col-md-8"><p class="m-0 d-flex"><i class="${ssrRenderClass([__props.user.education.length == 0 ? "fa-exclamation-triangle text-warning" : "fa-check-circle text-success", "fa me-2 font-size-24"])}"></i> Add any relevant education history</p></div><div class="col-md-4 text-end">`);
      _push(ssrRenderComponent(_component_Link, {
        onClick: ($event) => _ctx.$emit("action", "close"),
        href: _ctx.route("education.create"),
        class: "btn btn-light fw-bold btn-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Add Education <i class="fa fa-angle-right ms-1"${_scopeId}></i>`);
          } else {
            return [
              createTextVNode("Add Education "),
              createVNode("i", { class: "fa fa-angle-right ms-1" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></li><li class="list-group-item"><div class="row"><div class="col-md-8"><p class="m-0 d-flex"><i class="${ssrRenderClass([__props.user.connections_count == 0 ? "fa-exclamation-triangle text-warning" : "fa-check-circle text-success", "fa me-2 font-size-24"])}"></i> Connect with atleast one person</p></div><div class="col-md-4 text-end">`);
      _push(ssrRenderComponent(_component_Link, {
        onClick: ($event) => _ctx.$emit("action", "close"),
        "preserve-state": false,
        href: _ctx.route("search.people"),
        class: "btn btn-light fw-bold btn-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Explore People <i class="fa fa-angle-right ms-1"${_scopeId}></i>`);
          } else {
            return [
              createTextVNode("Explore People "),
              createVNode("i", { class: "fa fa-angle-right ms-1" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></li></ol><em class="mt-4">Do you find this popup annoying. We do too. So please finish up with the checklist so we could all move to greater things</em></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/OnboardMessage.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  __name: "Index",
  __ssrInlineRender: true,
  props: { user: Object, title: String },
  setup(__props) {
    const props = __props;
    register();
    let modal = ref();
    let isOwner = computed(() => usePage().props.auth.user.id == props.user.id);
    computed(() => {
      var _a;
      return (_a = countries.countries.find((e2) => e2.name == form.usermeta.country)) == null ? void 0 : _a.dial_code;
    });
    let form = useForm(props.user);
    let handleSave = () => {
      form.post(route("profile.update"), { preserveState: true, preserveScroll: true, onSuccess: () => {
        modal == null ? void 0 : modal.hide();
        toast.success("Profile changes updated");
      } });
    };
    let avatarform = useForm({ avatar: null });
    const uploadAvatar = (event) => {
      avatarform.avatar = event.target.files[0];
      avatarform.post(route("profile.avatar"), { preserveState: false, onFinish: () => modal.hide(), onSuccess: () => toast.success("Avatar Changed") });
    };
    const removeAvatar = () => useForm({ avatar: props.user.usermeta.avatar }).delete(route("profile.avatar.destroy"), { preserveState: false, onSuccess: () => {
      modal.hide();
      toast.success("Avatar removed");
    } });
    let showModal = (id) => {
      modal = new bootstrap.Modal(id, {});
      modal.show();
    };
    let handleAction = (ev) => {
      switch (ev) {
        case "close":
          modal.hide();
          break;
        case "avatar":
          modal.hide();
          showModal("#update-avatar");
          break;
        case "profile":
          modal.hide();
          showModal("#update-profile");
          break;
      }
    };
    let connect = (ev) => {
      useForm(ev).post(route("user.connect"), { preserveState: false, preserveScroll: true });
    };
    onMounted(() => {
      if (isOwner) {
        if (!props.user.usermeta.avatar || !props.user.usermeta.headline || props.user.experience.length == 0 || props.user.education.length == 0 || props.user.connections_count == 0) {
          showModal("#onboarding");
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      const _component_v_select = resolveComponent("v-select");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: __props.title }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$I, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card p-0 overflow-hidden mb-4"${_scopeId}><div class="card-header" style="${ssrRenderStyle({ "height": "15vh", "background-image": "url(assets/images/bg.jpg)", "background-size": "cover" })}"${_scopeId}></div><div class="card-body d-flex flex-column flex-md-row align-items-md-end align-items-center mt-n5" style="${ssrRenderStyle({ "z-index": "2" })}"${_scopeId}><div class="flex-shrink-0"${_scopeId}><img${ssrRenderAttr("src", __props.user.usermeta.avatar ?? "assets/images/no-profilepics.png")} class="rounded-circle avatar avatar-xl img-thumbnail"${_scopeId}></div><div class="flex-grow-1 ms-3 text-center text-md-start"${_scopeId}><div class="row align-items-center"${_scopeId}><div class="col-md-6"${_scopeId}><h6 class="fs-2 fw-bold mb-0"${_scopeId}>${ssrInterpolate(__props.user.fullname)}</h6>`);
            if (__props.user.usermeta.headline) {
              _push2(`<p class="mb-1"${_scopeId}>${ssrInterpolate(unref(startCase)(__props.user.usermeta.headline))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_Link, {
              href: _ctx.route("profile.connections", { slug: __props.user.slug })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.user.connections.length)} Connection${ssrInterpolate(__props.user.connections.length > 0 ? "s" : "")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.user.connections.length) + " Connection" + toDisplayString(__props.user.connections.length > 0 ? "s" : ""), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="col-md-6 mt-3 d-flex justify-content-center justify-content-lg-end"${_scopeId}>`);
            if (unref(isOwner)) {
              _push2(`<button class="btn btn-secondary"${_scopeId}><i class="fa fa-pencil me-2"${_scopeId}></i>Edit Profile</button>`);
            } else {
              _push2(`<!--[-->`);
              if (!__props.user.connections.map((e2) => e2.id).includes(_ctx.$page.props.auth.user.id)) {
                _push2(`<div class="dropdown"${_scopeId}><button type="button" data-bs-toggle="dropdown" class="btn btn-primary me-1"${_scopeId}><i class="fal fa-user-plus px-1"${_scopeId}></i> Connect <i class="fal fa-chevron-down font-size-12 ms-1"${_scopeId}></i></button><div class="dropdown-menu"${_scopeId}><button type="button" class="dropdown-item"${_scopeId}>Become protégé</button><button class="dropdown-item" type="button"${_scopeId}>Connect as peers </button></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_Link, {
                href: _ctx.route("messages.index", { id: unref(_btoa)({ type: "user", id: __props.user.id }) }),
                class: "btn btn-light"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="fal fa-envelope-open-text me-1"${_scopeId2}></i> Message`);
                  } else {
                    return [
                      createVNode("i", { class: "fal fa-envelope-open-text me-1" }),
                      createTextVNode(" Message")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<!--]-->`);
            }
            _push2(`</div></div></div></div></div><div class="row"${_scopeId}><div class="col-lg-5"${_scopeId}><div class="card card-body"${_scopeId}><ul class="list-group list-group-flush"${_scopeId}><li class="list-group-item d-flex"${_scopeId}><i class="fad fa-briefcase me-4 fs-3"${_scopeId}></i><p class="mb-0"${_scopeId}><small class="text-muted d-block"${_scopeId}>Dream job</small>`);
            if (__props.user.usermeta.dream_job) {
              _push2(`<strong class="text-capitalize"${_scopeId}>${ssrInterpolate(__props.user.usermeta.dream_job)}</strong>`);
            } else {
              _push2(`<span class="text-muted"${_scopeId}>(Not Stated)</span>`);
            }
            _push2(`</p></li><li class="list-group-item d-flex"${_scopeId}><i class="fad fa-location-dot me-4 fs-3"${_scopeId}></i><p class="mb-0"${_scopeId}><small class="text-muted d-block"${_scopeId}>Country of Residence</small>`);
            if (__props.user.usermeta.country) {
              _push2(`<strong class="text-capitalize"${_scopeId}>${ssrInterpolate(__props.user.usermeta.country)}</strong>`);
            } else {
              _push2(`<span class="text-muted"${_scopeId}>(Not Stated)</span>`);
            }
            _push2(`</p></li><li class="list-group-item d-flex"${_scopeId}><i class="fad fa-handshake me-4 fs-3"${_scopeId}></i><div class="mb-2"${_scopeId}><small class="text-muted d-block"${_scopeId}>Openness to Hiring</small><div class="form-check ms-2 form-switch form-switch-lg"${_scopeId}>`);
            if (unref(isOwner)) {
              _push2(`<input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).usermeta.available_for_work) ? ssrLooseContain(unref(form).usermeta.available_for_work, null) : unref(form).usermeta.available_for_work) ? " checked" : ""} class="form-check-input" id="available_for_work"${_scopeId}>`);
            } else {
              _push2(`<!--[-->`);
              if (unref(form).usermeta.available_for_work) {
                _push2(`<i class="fa fa-thumbs-up" aria-hidden="true"${_scopeId}></i>`);
              } else {
                _push2(`<i class="fa fa-thumbs-down"${_scopeId}></i>`);
              }
              _push2(`<!--]-->`);
            }
            _push2(`<label class="ms-2 form-check-label" for="available_for_work"${_scopeId}>${ssrInterpolate(unref(form).usermeta.available_for_work ? "Yes" : "No")}</label></div></div></li></ul></div><div class="card card-body"${_scopeId}><ul class="list-group list-group-flush"${_scopeId}><li class="list-group-item"${_scopeId}><p class="text-muted mb-2"${_scopeId}>Career Goal <i class="fa fa-info-circle"${_scopeId}></i></p><div class="progress animated-progess"${_scopeId}><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="${ssrRenderStyle({ "width": "79%" })}"${_scopeId}></div></div></li><li class="list-group-item"${_scopeId}><p class="text-muted mb-2"${_scopeId}>Skill Meter <i class="fa fa-info-circle"${_scopeId}></i></p><div class="progress animated-progess"${_scopeId}><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="${ssrRenderStyle({ "width": "10%" })}"${_scopeId}></div></div></li></ul></div><div class="card card-body"${_scopeId}><h5 class="mb-3 fw-bold"${_scopeId}>About</h5>`);
            if (__props.user.usermeta.bio) {
              _push2(`<p${_scopeId}>${ssrInterpolate(__props.user.usermeta.bio)}</p>`);
            } else {
              _push2(`<div${_scopeId}><p class="fw-bold mb-0"${_scopeId}>User has not updated their biography section of their profile</p><p${_scopeId}>Once they do, it would be displayed here.</p>`);
              if (unref(isOwner)) {
                _push2(`<button data-bs-toggle="modal" data-bs-target="#update-profile" class="btn border-primary text-primary btn-sm fw-bold"${_scopeId}><i class="fa fa-pencil me-1"${_scopeId}></i> Edit Profile</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div><div class="card card-body"${_scopeId}><div class="d-flex justify-content-between align-items-center"${_scopeId}><h5 class="mb-3 fw-bold"${_scopeId}>Connections<br${_scopeId}><small class="fw-normal"${_scopeId}>${ssrInterpolate(__props.user.connections.length)} Connection${ssrInterpolate(__props.user.connections.length > 0 ? "s" : "")}</small></h5>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: _ctx.route("profile.connections", { slug: __props.user.slug })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See All connections`);
                } else {
                  return [
                    createTextVNode("See All connections")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="row g-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.user.connections.slice(0, 6), (i2) => {
              _push2(`<div class="col-4 mb-1"${_scopeId}><img${ssrRenderAttr("src", i2.avatar ?? "assets/images/no-profilepics.png")} class="img-thumbnail rounded-3 border border-light" style="${ssrRenderStyle({ "width": "100%", "height": "150px", "object-fit": "cover" })}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Link, {
                href: _ctx.route("profile.index", { slug: i2.slug }),
                class: "fw-bold font-size-12 stretched-link text-dark lh-1"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(i2.fullname)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(i2.fullname), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div><div class="card card-body"${_scopeId}><div class="accordion accordion-flush" id="experience-accordion"${_scopeId}><div class="d-flex justify-content-between align-items-center"${_scopeId}><h5 class="mb-3 fw-bold"${_scopeId}>Experiences</h5>`);
            if (__props.user.experience.length && unref(isOwner)) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Link, {
                href: _ctx.route("experience.create"),
                class: "btn"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="fa fa-plus text-muted"${_scopeId2}></i>`);
                  } else {
                    return [
                      createVNode("i", { class: "fa fa-plus text-muted" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Link, {
                href: _ctx.route("profile.experience", { slug: __props.user.slug }),
                class: "btn"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="fa fa-pencil text-muted"${_scopeId2}></i>`);
                  } else {
                    return [
                      createVNode("i", { class: "fa fa-pencil text-muted" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.user.experience.length) {
              _push2(`<!--[--><!--[-->`);
              ssrRenderList(__props.user.experience.slice(0, 2), (i2) => {
                _push2(`<div class="d-flex mb-3"${_scopeId}><div class="d-flex w-100"${_scopeId}><div class="flex-shrink-0 me-3"${_scopeId}><img src="/assets/images/business.png" alt="" style="${ssrRenderStyle({ "width": "80px" })}"${_scopeId}></div><div class="flex-grow-1"${_scopeId}><div class="accordion-item"${_scopeId}><div class="btn text-start w-100 collapsed flex-column" data-bs-toggle="collapse"${ssrRenderAttr("data-bs-target", `#experience_${i2.id}`)}${_scopeId}><div${_scopeId}><p class="mb-1 fw-bold"${_scopeId}>${ssrInterpolate(i2.title)}</p><p class="mb-0"${_scopeId}>${ssrInterpolate(i2.employer)}<small class="ms-1 text-muted"${_scopeId}>(${ssrInterpolate(i2.type)})</small></p><p class="mb-0"${_scopeId}>${ssrInterpolate(unref(formatStartEndDate)(i2.start_end_date))}</p><small${_scopeId}>${ssrInterpolate(i2.industry)}</small></div></div></div><div${ssrRenderAttr("id", `experience_${i2.id}`)} class="accordion-collapse collapse" data-bs-parent="#experience-accordion"${_scopeId}><div class="accordion-body"${_scopeId}>${ssrInterpolate(i2.description)}</div></div></div></div></div>`);
              });
              _push2(`<!--]-->`);
              if (__props.user.experience.length > 2) {
                _push2(`<div class="text-end"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Link, {
                  href: _ctx.route("profile.experience", { slug: __props.user.slug }),
                  class: "btn btn-light"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`See More `);
                    } else {
                      return [
                        createTextVNode("See More ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<div${_scopeId}><p class="fw-bold mb-0"${_scopeId}>User haven’t shared experience yet</p><p${_scopeId}>Once they do, it would be displayed here.</p>`);
              if (unref(isOwner)) {
                _push2(ssrRenderComponent(_component_Link, {
                  href: _ctx.route("experience.create"),
                  class: "btn border-primary text-primary btn-sm fw-bold"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<i class="fa fa-plus-circle me-1"${_scopeId2}></i> Add Experience`);
                    } else {
                      return [
                        createVNode("i", { class: "fa fa-plus-circle me-1" }),
                        createTextVNode(" Add Experience")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div></div><div class="card card-body"${_scopeId}><div class="d-flex justify-content-between align-items-center"${_scopeId}><h5 class="mb-3 fw-bold"${_scopeId}>Education</h5>`);
            if (__props.user.education.length && unref(isOwner)) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Link, {
                href: _ctx.route("education.create"),
                class: "btn"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="fa fa-plus text-muted"${_scopeId2}></i>`);
                  } else {
                    return [
                      createVNode("i", { class: "fa fa-plus text-muted" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Link, {
                href: _ctx.route("profile.education", { slug: __props.user.slug }),
                class: "btn"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="fa fa-pencil text-muted"${_scopeId2}></i>`);
                  } else {
                    return [
                      createVNode("i", { class: "fa fa-pencil text-muted" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.user.education.length) {
              _push2(`<div class="list-group list-group-flush"${_scopeId}><!--[-->`);
              ssrRenderList(__props.user.education.slice(0, 2), (i2) => {
                _push2(`<div class="d-flex mb-3 list-group-item px-0"${_scopeId}><div class="me-3 flex-shrink-0"${_scopeId}><img src="/assets/images/education.png" alt="" style="${ssrRenderStyle({ "width": "80px" })}"${_scopeId}></div><div class="flex-grow-1"${_scopeId}><p class="mb-1 fw-bold"${_scopeId}>${ssrInterpolate(i2.institution)} <small class="text-muted ms-2 fw-normal"${_scopeId}>(${ssrInterpolate(i2.degree)})</small></p><p class="mb-0"${_scopeId}>${ssrInterpolate(i2.study)}</p><p class="mb-0"${_scopeId}>${ssrInterpolate(unref(formatStartEndDate)(i2.start_end_date))}</p></div></div>`);
              });
              _push2(`<!--]-->`);
              if (__props.user.experience.length > 2) {
                _push2(`<div class="text-end"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Link, {
                  href: _ctx.route("profile.education", { slug: __props.user.slug }),
                  class: "btn btn-light"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`See More `);
                    } else {
                      return [
                        createTextVNode("See More ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div${_scopeId}><p class="fw-bold mb-0"${_scopeId}>User haven’t posted his/her educational history</p><p${_scopeId}>Once they do, it would be displayed here.</p>`);
              if (unref(isOwner)) {
                _push2(ssrRenderComponent(_component_Link, {
                  href: _ctx.route("education.create"),
                  class: "btn border-primary text-primary btn-sm fw-bold"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<i class="fa fa-plus-circle me-1"${_scopeId2}></i> Add Educational history`);
                    } else {
                      return [
                        createVNode("i", { class: "fa fa-plus-circle me-1" }),
                        createTextVNode(" Add Educational history")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div><div class="card card-body"${_scopeId}><div class="d-flex justify-content-between align-items-center"${_scopeId}><h5 class="mb-3 fw-bold"${_scopeId}>Certifications</h5>`);
            if (__props.user.certification.length && unref(isOwner)) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Link, {
                href: _ctx.route("certification.create"),
                class: "btn"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="fa fa-plus text-muted"${_scopeId2}></i>`);
                  } else {
                    return [
                      createVNode("i", { class: "fa fa-plus text-muted" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Link, {
                href: _ctx.route("profile.certification", { slug: __props.user.slug }),
                class: "btn"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="fa fa-pencil text-muted"${_scopeId2}></i>`);
                  } else {
                    return [
                      createVNode("i", { class: "fa fa-pencil text-muted" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.user.certification.length) {
              _push2(`<div class="list-group list-group-flush"${_scopeId}><!--[-->`);
              ssrRenderList(__props.user.certification.slice(0, 2), (i2) => {
                _push2(`<div class="d-flex mb-3 list-group-item px-0"${_scopeId}><div class="me-3 flex-shrink-0"${_scopeId}><img src="/assets/images/certificate.png" alt="" style="${ssrRenderStyle({ "width": "80px" })}"${_scopeId}></div><div class="flex-grow-1 lh-sm"${_scopeId}><p class="mb-1 fw-bold"${_scopeId}>${ssrInterpolate(i2.title)}</p><p class="mb-1"${_scopeId}>${ssrInterpolate(i2.organization)}</p><p class="mb-1"${_scopeId}>Issued ${ssrInterpolate(unref(moment$1)(i2.issued_date).format("MMM, YYYY"))}</p>`);
                if (i2.url) {
                  _push2(`<a class="btn rounded-pill btn-sm border-primary text-primary"${ssrRenderAttr("href", i2.url)} target="_blank"${_scopeId}><i class="fa fa-link"${_scopeId}></i> Show Credentials</a>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]-->`);
              if (__props.user.certification.length > 2) {
                _push2(`<div class="text-end"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Link, {
                  href: _ctx.route("profile.education", { slug: __props.user.slug }),
                  class: "btn btn-light"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`See More `);
                    } else {
                      return [
                        createTextVNode("See More ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div${_scopeId}><p class="fw-bold mb-0"${_scopeId}>User haven’t posted their licenses and certifications</p><p${_scopeId}>Once they do, it would be displayed here.</p>`);
              if (unref(isOwner)) {
                _push2(ssrRenderComponent(_component_Link, {
                  href: _ctx.route("certification.create"),
                  class: "btn border-primary text-primary btn-sm fw-bold"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<i class="fa fa-plus-circle me-1"${_scopeId2}></i> Add Certification &amp; License`);
                    } else {
                      return [
                        createVNode("i", { class: "fa fa-plus-circle me-1" }),
                        createTextVNode(" Add Certification & License")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div></div><div class="col-lg-7"${_scopeId}><div class="card card-body mb-2"${_scopeId}><div class="d-flex justify-content-between align-items-center"${_scopeId}><h5 class="mb-0 fw-bold"${_scopeId}>Posts </h5>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: _ctx.route("feeds", { author: __props.user.slug })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`View All`);
                } else {
                  return [
                    createTextVNode("View All")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (__props.user.post.length) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.user.post, (i2) => {
                _push2(ssrRenderComponent(PostItem, {
                  post: i2,
                  key: i2
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<div class="card card-body my-3 d-flex flex-column justify-content-center text-center align-items-center" style="${ssrRenderStyle({ "min-height": "40vh" })}"${_scopeId}><img loading="lazy" src="/assets/images/coming-soon-img.png" alt="" style="${ssrRenderStyle({ "width": "250px", "object-fit": "cover" })}"${_scopeId}><h5 class="my-3"${_scopeId}>It feels so lonely here</h5><p${_scopeId}>No post by user</p></div>`);
            }
            _push2(`</div></div>`);
            if (unref(isOwner)) {
              _push2(`<!--[--><div class="modal fade" id="update-profile" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"${_scopeId}><div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down modal-lg" role="document"${_scopeId}><form class="modal-content"${_scopeId}><div class="modal-header"${_scopeId}><h5 class="modal-title"${_scopeId}>Edit Profile</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"${_scopeId}></button></div><div class="modal-body"${_scopeId}><div class="row"${_scopeId}><div class="col-md-6"${_scopeId}><div class="form-floating mb-3"${_scopeId}><input type="text" maxlength="50" class="form-control" placeholder="" required${ssrRenderAttr("value", unref(form).firstname)}${_scopeId}><label${_scopeId}>Firstname</label></div></div><div class="col-md-6"${_scopeId}><div class="form-floating mb-3"${_scopeId}><input type="text" maxlength="50" class="form-control" placeholder="" required${ssrRenderAttr("value", unref(form).lastname)}${_scopeId}><label${_scopeId}>Lastname</label></div></div><div class="col-md-6"${_scopeId}><div class="form-floating mb-3"${_scopeId}><input type="email" maxlength="50" class="form-control" placeholder="" required${ssrRenderAttr("value", unref(form).email)}${_scopeId}><label${_scopeId}>Email</label>`);
              if (unref(form).email !== __props.user.email) {
                _push2(`<small class="text-warning"${_scopeId}><i class="fa fa-exclamation-triangle"${_scopeId}></i> Changing this field would require reverification</small>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="col-md-6"${_scopeId}><div class="form-floating mb-3"${_scopeId}><select class="form-select" required${_scopeId}><option${ssrRenderAttr("value", null)}${_scopeId}>Select Country</option><!--[-->`);
              ssrRenderList(unref(countries).countries, (i2) => {
                _push2(`<option${ssrRenderAttr("value", i2.name)}${_scopeId}>${ssrInterpolate(i2.name)}</option>`);
              });
              _push2(`<!--]--></select><label${_scopeId}>Country</label></div></div><div class="col-md-6 mb-3"${_scopeId}><div class="form-floating"${_scopeId}><input type="tel" maxlength="50" class="form-control" placeholder="" required${ssrRenderAttr("value", unref(form).phone)}${_scopeId}><label${_scopeId}>Phone</label></div>`);
              if (unref(form).phone !== __props.user.phone) {
                _push2(`<small class="text-warning"${_scopeId}><i class="fa fa-exclamation-triangle"${_scopeId}></i> Changing this field would require reverification</small>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="col-md-6"${_scopeId}><div class="form-floating mb-3"${_scopeId}><select class="form-select" required${_scopeId}><option${ssrRenderAttr("value", null)}${_scopeId}>Select Gender</option><!--[-->`);
              ssrRenderList(["Male", "Female", "Others"], (i2) => {
                _push2(`<option${ssrRenderAttr("value", i2)}${_scopeId}>${ssrInterpolate(i2)}</option>`);
              });
              _push2(`<!--]--></select><label${_scopeId}>Gender</label></div></div></div><hr${_scopeId}><div class="row"${_scopeId}><div class="col-md-6"${_scopeId}><div class="mb-3 custom-vselect"${_scopeId}><label${_scopeId}>Dream Job</label>`);
              _push2(ssrRenderComponent(_component_v_select, {
                required: "",
                modelValue: unref(form).usermeta.dream_job,
                "onUpdate:modelValue": ($event) => unref(form).usermeta.dream_job = $event,
                options: unref(professions),
                taggable: true,
                pushtags: true,
                placeholder: "-- Select or create new --"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="col-md-6"${_scopeId}><div class="form-floating mb-3"${_scopeId}><input type="text" class="form-control" placeholder="" maxlength="50" required${ssrRenderAttr("value", unref(form).usermeta.headline)}${_scopeId}><label${_scopeId}>Profile Headline</label></div></div></div><div class="form-floating mb-3"${_scopeId}><textarea class="form-control" required style="${ssrRenderStyle({ "height": "120px" })}" maxlength="400"${_scopeId}>${ssrInterpolate(unref(form).usermeta.bio)}</textarea><label${_scopeId}>About Me</label></div></div><div class="modal-footer"${_scopeId}><button type="button" class="btn btn-light px-4" data-bs-dismiss="modal"${_scopeId}>Close</button><button type="submit" class="btn btn-primary px-4"${_scopeId}>`);
              if (unref(form).processing) {
                _push2(`<span class="spinner-grow text-white spinner-grow-sm me-2"${_scopeId}></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(` Save</button></div></form></div></div><div class="modal fade" id="update-avatar" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"${_scopeId}><div class="modal-dialog modal-dialog-scrollable modal-md" role="document"${_scopeId}><div class="modal-content"${_scopeId}><div class="modal-header"${_scopeId}><h5 class="modal-title"${_scopeId}>Profile Photo</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"${_scopeId}></button></div><div class="modal-body text-center"${_scopeId}><img${ssrRenderAttr("src", __props.user.usermeta.avatar ?? "assets/images/no-profilepics.png")} class="rounded-circle img-thumbnail" style="${ssrRenderStyle({ "width": "300px", "height": "300px" })}"${_scopeId}><input type="file" accept="image/jpeg, image/jpeg, image/png" style="${ssrRenderStyle({ "display": "none" })}"${_scopeId}></div><div class="modal-footer justify-content-between"${_scopeId}><button type="button" class="btn d-flex flex-column align-items-center"${_scopeId}><i class="fa fa-pencil"${_scopeId}></i> Change</button>`);
              if (unref(avatarform).processing) {
                _push2(`<span class="spinner-grow text-white spinner-grow-sm me-2"${_scopeId}></span>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.user.usermeta.avatar) {
                _push2(`<button type="button" class="btn d-flex flex-column align-items-center"${_scopeId}><i class="fa fa-trash"${_scopeId}></i> Delete</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></div><div class="modal fade" id="onboarding" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false"${_scopeId}><div class="modal-dialog modal-dialog-scrollable modal-xl" role="document"${_scopeId}><div class="modal-content"${_scopeId}><div class="modal-body"${_scopeId}><div class="container"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                onAction: ($event) => unref(handleAction)($event),
                user: __props.user
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div></div></div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "card p-0 overflow-hidden mb-4" }, [
                createVNode("div", {
                  class: "card-header",
                  style: { "height": "15vh", "background-image": "url(assets/images/bg.jpg)", "background-size": "cover" }
                }),
                createVNode("div", {
                  class: "card-body d-flex flex-column flex-md-row align-items-md-end align-items-center mt-n5",
                  style: { "z-index": "2" }
                }, [
                  createVNode("div", { class: "flex-shrink-0" }, [
                    createVNode("img", {
                      onClick: withModifiers(($event) => unref(showModal)("#update-avatar"), ["prevent"]),
                      src: __props.user.usermeta.avatar ?? "assets/images/no-profilepics.png",
                      class: "rounded-circle avatar avatar-xl img-thumbnail"
                    }, null, 8, ["onClick", "src"])
                  ]),
                  createVNode("div", { class: "flex-grow-1 ms-3 text-center text-md-start" }, [
                    createVNode("div", { class: "row align-items-center" }, [
                      createVNode("div", { class: "col-md-6" }, [
                        createVNode("h6", { class: "fs-2 fw-bold mb-0" }, toDisplayString(__props.user.fullname), 1),
                        __props.user.usermeta.headline ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mb-1"
                        }, toDisplayString(unref(startCase)(__props.user.usermeta.headline)), 1)) : createCommentVNode("", true),
                        createVNode(_component_Link, {
                          href: _ctx.route("profile.connections", { slug: __props.user.slug })
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(__props.user.connections.length) + " Connection" + toDisplayString(__props.user.connections.length > 0 ? "s" : ""), 1)
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("div", { class: "col-md-6 mt-3 d-flex justify-content-center justify-content-lg-end" }, [
                        unref(isOwner) ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: withModifiers(($event) => unref(showModal)("#update-profile"), ["prevent"]),
                          class: "btn btn-secondary"
                        }, [
                          createVNode("i", { class: "fa fa-pencil me-2" }),
                          createTextVNode("Edit Profile")
                        ], 8, ["onClick"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                          !__props.user.connections.map((e2) => e2.id).includes(_ctx.$page.props.auth.user.id) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "dropdown"
                          }, [
                            createVNode("button", {
                              type: "button",
                              "data-bs-toggle": "dropdown",
                              class: "btn btn-primary me-1"
                            }, [
                              createVNode("i", { class: "fal fa-user-plus px-1" }),
                              createTextVNode(" Connect "),
                              createVNode("i", { class: "fal fa-chevron-down font-size-12 ms-1" })
                            ]),
                            createVNode("div", { class: "dropdown-menu" }, [
                              createVNode("button", {
                                type: "button",
                                onClick: withModifiers(($event) => unref(connect)({ friend_id: __props.user.id, user_id: _ctx.$page.props.auth.user.id, type: "protege", status: "accepted" }), ["prevent"]),
                                class: "dropdown-item"
                              }, "Become protégé", 8, ["onClick"]),
                              createVNode("button", {
                                onClick: withModifiers(($event) => unref(connect)({ friend_id: __props.user.id, user_id: _ctx.$page.props.auth.user.id, type: "peer", status: "accepted" }), ["prevent"]),
                                class: "dropdown-item",
                                type: "button"
                              }, "Connect as peers ", 8, ["onClick"])
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode(_component_Link, {
                            href: _ctx.route("messages.index", { id: unref(_btoa)({ type: "user", id: __props.user.id }) }),
                            class: "btn btn-light"
                          }, {
                            default: withCtx(() => [
                              createVNode("i", { class: "fal fa-envelope-open-text me-1" }),
                              createTextVNode(" Message")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ], 64))
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-lg-5" }, [
                  createVNode("div", { class: "card card-body" }, [
                    createVNode("ul", { class: "list-group list-group-flush" }, [
                      createVNode("li", { class: "list-group-item d-flex" }, [
                        createVNode("i", { class: "fad fa-briefcase me-4 fs-3" }),
                        createVNode("p", { class: "mb-0" }, [
                          createVNode("small", { class: "text-muted d-block" }, "Dream job"),
                          __props.user.usermeta.dream_job ? (openBlock(), createBlock("strong", {
                            key: 0,
                            class: "text-capitalize"
                          }, toDisplayString(__props.user.usermeta.dream_job), 1)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "text-muted"
                          }, "(Not Stated)"))
                        ])
                      ]),
                      createVNode("li", { class: "list-group-item d-flex" }, [
                        createVNode("i", { class: "fad fa-location-dot me-4 fs-3" }),
                        createVNode("p", { class: "mb-0" }, [
                          createVNode("small", { class: "text-muted d-block" }, "Country of Residence"),
                          __props.user.usermeta.country ? (openBlock(), createBlock("strong", {
                            key: 0,
                            class: "text-capitalize"
                          }, toDisplayString(__props.user.usermeta.country), 1)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "text-muted"
                          }, "(Not Stated)"))
                        ])
                      ]),
                      createVNode("li", { class: "list-group-item d-flex" }, [
                        createVNode("i", { class: "fad fa-handshake me-4 fs-3" }),
                        createVNode("div", { class: "mb-2" }, [
                          createVNode("small", { class: "text-muted d-block" }, "Openness to Hiring"),
                          createVNode("div", { class: "form-check ms-2 form-switch form-switch-lg" }, [
                            unref(isOwner) ? withDirectives((openBlock(), createBlock("input", {
                              key: 0,
                              onChange: unref(handleSave),
                              type: "checkbox",
                              "onUpdate:modelValue": ($event) => unref(form).usermeta.available_for_work = $event,
                              class: "form-check-input",
                              id: "available_for_work"
                            }, null, 40, ["onChange", "onUpdate:modelValue"])), [
                              [vModelCheckbox, unref(form).usermeta.available_for_work]
                            ]) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              unref(form).usermeta.available_for_work ? (openBlock(), createBlock("i", {
                                key: 0,
                                class: "fa fa-thumbs-up",
                                "aria-hidden": "true"
                              })) : (openBlock(), createBlock("i", {
                                key: 1,
                                class: "fa fa-thumbs-down"
                              }))
                            ], 64)),
                            createVNode("label", {
                              class: "ms-2 form-check-label",
                              for: "available_for_work"
                            }, toDisplayString(unref(form).usermeta.available_for_work ? "Yes" : "No"), 1)
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "card card-body" }, [
                    createVNode("ul", { class: "list-group list-group-flush" }, [
                      createVNode("li", { class: "list-group-item" }, [
                        createVNode("p", { class: "text-muted mb-2" }, [
                          createTextVNode("Career Goal "),
                          createVNode("i", { class: "fa fa-info-circle" })
                        ]),
                        createVNode("div", { class: "progress animated-progess" }, [
                          createVNode("div", {
                            class: "progress-bar progress-bar-striped progress-bar-animated",
                            role: "progressbar",
                            style: { "width": "79%" }
                          })
                        ])
                      ]),
                      createVNode("li", { class: "list-group-item" }, [
                        createVNode("p", { class: "text-muted mb-2" }, [
                          createTextVNode("Skill Meter "),
                          createVNode("i", { class: "fa fa-info-circle" })
                        ]),
                        createVNode("div", { class: "progress animated-progess" }, [
                          createVNode("div", {
                            class: "progress-bar progress-bar-striped progress-bar-animated",
                            role: "progressbar",
                            style: { "width": "10%" }
                          })
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "card card-body" }, [
                    createVNode("h5", { class: "mb-3 fw-bold" }, "About"),
                    __props.user.usermeta.bio ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(__props.user.usermeta.bio), 1)) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode("p", { class: "fw-bold mb-0" }, "User has not updated their biography section of their profile"),
                      createVNode("p", null, "Once they do, it would be displayed here."),
                      unref(isOwner) ? (openBlock(), createBlock("button", {
                        key: 0,
                        "data-bs-toggle": "modal",
                        "data-bs-target": "#update-profile",
                        class: "btn border-primary text-primary btn-sm fw-bold"
                      }, [
                        createVNode("i", { class: "fa fa-pencil me-1" }),
                        createTextVNode(" Edit Profile")
                      ])) : createCommentVNode("", true)
                    ]))
                  ]),
                  createVNode("div", { class: "card card-body" }, [
                    createVNode("div", { class: "d-flex justify-content-between align-items-center" }, [
                      createVNode("h5", { class: "mb-3 fw-bold" }, [
                        createTextVNode("Connections"),
                        createVNode("br"),
                        createVNode("small", { class: "fw-normal" }, toDisplayString(__props.user.connections.length) + " Connection" + toDisplayString(__props.user.connections.length > 0 ? "s" : ""), 1)
                      ]),
                      createVNode(_component_Link, {
                        href: _ctx.route("profile.connections", { slug: __props.user.slug })
                      }, {
                        default: withCtx(() => [
                          createTextVNode("See All connections")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    createVNode("div", { class: "row g-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.user.connections.slice(0, 6), (i2) => {
                        return openBlock(), createBlock("div", {
                          class: "col-4 mb-1",
                          key: i2
                        }, [
                          createVNode("img", {
                            src: i2.avatar ?? "assets/images/no-profilepics.png",
                            class: "img-thumbnail rounded-3 border border-light",
                            style: { "width": "100%", "height": "150px", "object-fit": "cover" }
                          }, null, 8, ["src"]),
                          createVNode(_component_Link, {
                            href: _ctx.route("profile.index", { slug: i2.slug }),
                            class: "fw-bold font-size-12 stretched-link text-dark lh-1"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(i2.fullname), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"])
                        ]);
                      }), 128))
                    ])
                  ]),
                  createVNode("div", { class: "card card-body" }, [
                    createVNode("div", {
                      class: "accordion accordion-flush",
                      id: "experience-accordion"
                    }, [
                      createVNode("div", { class: "d-flex justify-content-between align-items-center" }, [
                        createVNode("h5", { class: "mb-3 fw-bold" }, "Experiences"),
                        __props.user.experience.length && unref(isOwner) ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode(_component_Link, {
                            href: _ctx.route("experience.create"),
                            class: "btn"
                          }, {
                            default: withCtx(() => [
                              createVNode("i", { class: "fa fa-plus text-muted" })
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode(_component_Link, {
                            href: _ctx.route("profile.experience", { slug: __props.user.slug }),
                            class: "btn"
                          }, {
                            default: withCtx(() => [
                              createVNode("i", { class: "fa fa-pencil text-muted" })
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])) : createCommentVNode("", true)
                      ]),
                      __props.user.experience.length ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.user.experience.slice(0, 2), (i2) => {
                          return openBlock(), createBlock("div", {
                            class: "d-flex mb-3",
                            key: i2
                          }, [
                            createVNode("div", { class: "d-flex w-100" }, [
                              createVNode("div", { class: "flex-shrink-0 me-3" }, [
                                createVNode("img", {
                                  src: "/assets/images/business.png",
                                  alt: "",
                                  style: { "width": "80px" }
                                })
                              ]),
                              createVNode("div", { class: "flex-grow-1" }, [
                                createVNode("div", { class: "accordion-item" }, [
                                  createVNode("div", {
                                    class: "btn text-start w-100 collapsed flex-column",
                                    "data-bs-toggle": "collapse",
                                    "data-bs-target": `#experience_${i2.id}`
                                  }, [
                                    createVNode("div", null, [
                                      createVNode("p", { class: "mb-1 fw-bold" }, toDisplayString(i2.title), 1),
                                      createVNode("p", { class: "mb-0" }, [
                                        createTextVNode(toDisplayString(i2.employer), 1),
                                        createVNode("small", { class: "ms-1 text-muted" }, "(" + toDisplayString(i2.type) + ")", 1)
                                      ]),
                                      createVNode("p", { class: "mb-0" }, toDisplayString(unref(formatStartEndDate)(i2.start_end_date)), 1),
                                      createVNode("small", null, toDisplayString(i2.industry), 1)
                                    ])
                                  ], 8, ["data-bs-target"])
                                ]),
                                createVNode("div", {
                                  id: `experience_${i2.id}`,
                                  class: "accordion-collapse collapse",
                                  "data-bs-parent": "#experience-accordion"
                                }, [
                                  createVNode("div", { class: "accordion-body" }, toDisplayString(i2.description), 1)
                                ], 8, ["id"])
                              ])
                            ])
                          ]);
                        }), 128)),
                        __props.user.experience.length > 2 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-end"
                        }, [
                          createVNode(_component_Link, {
                            href: _ctx.route("profile.experience", { slug: __props.user.slug }),
                            class: "btn btn-light"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("See More ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])) : createCommentVNode("", true)
                      ], 64)) : (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("p", { class: "fw-bold mb-0" }, "User haven’t shared experience yet"),
                        createVNode("p", null, "Once they do, it would be displayed here."),
                        unref(isOwner) ? (openBlock(), createBlock(_component_Link, {
                          key: 0,
                          href: _ctx.route("experience.create"),
                          class: "btn border-primary text-primary btn-sm fw-bold"
                        }, {
                          default: withCtx(() => [
                            createVNode("i", { class: "fa fa-plus-circle me-1" }),
                            createTextVNode(" Add Experience")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ]))
                    ])
                  ]),
                  createVNode("div", { class: "card card-body" }, [
                    createVNode("div", { class: "d-flex justify-content-between align-items-center" }, [
                      createVNode("h5", { class: "mb-3 fw-bold" }, "Education"),
                      __props.user.education.length && unref(isOwner) ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode(_component_Link, {
                          href: _ctx.route("education.create"),
                          class: "btn"
                        }, {
                          default: withCtx(() => [
                            createVNode("i", { class: "fa fa-plus text-muted" })
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(_component_Link, {
                          href: _ctx.route("profile.education", { slug: __props.user.slug }),
                          class: "btn"
                        }, {
                          default: withCtx(() => [
                            createVNode("i", { class: "fa fa-pencil text-muted" })
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])) : createCommentVNode("", true)
                    ]),
                    __props.user.education.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "list-group list-group-flush"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.user.education.slice(0, 2), (i2) => {
                        return openBlock(), createBlock("div", {
                          class: "d-flex mb-3 list-group-item px-0",
                          key: i2
                        }, [
                          createVNode("div", { class: "me-3 flex-shrink-0" }, [
                            createVNode("img", {
                              src: "/assets/images/education.png",
                              alt: "",
                              style: { "width": "80px" }
                            })
                          ]),
                          createVNode("div", { class: "flex-grow-1" }, [
                            createVNode("p", { class: "mb-1 fw-bold" }, [
                              createTextVNode(toDisplayString(i2.institution) + " ", 1),
                              createVNode("small", { class: "text-muted ms-2 fw-normal" }, "(" + toDisplayString(i2.degree) + ")", 1)
                            ]),
                            createVNode("p", { class: "mb-0" }, toDisplayString(i2.study), 1),
                            createVNode("p", { class: "mb-0" }, toDisplayString(unref(formatStartEndDate)(i2.start_end_date)), 1)
                          ])
                        ]);
                      }), 128)),
                      __props.user.experience.length > 2 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-end"
                      }, [
                        createVNode(_component_Link, {
                          href: _ctx.route("profile.education", { slug: __props.user.slug }),
                          class: "btn btn-light"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("See More ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode("p", { class: "fw-bold mb-0" }, "User haven’t posted his/her educational history"),
                      createVNode("p", null, "Once they do, it would be displayed here."),
                      unref(isOwner) ? (openBlock(), createBlock(_component_Link, {
                        key: 0,
                        href: _ctx.route("education.create"),
                        class: "btn border-primary text-primary btn-sm fw-bold"
                      }, {
                        default: withCtx(() => [
                          createVNode("i", { class: "fa fa-plus-circle me-1" }),
                          createTextVNode(" Add Educational history")
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true)
                    ]))
                  ]),
                  createVNode("div", { class: "card card-body" }, [
                    createVNode("div", { class: "d-flex justify-content-between align-items-center" }, [
                      createVNode("h5", { class: "mb-3 fw-bold" }, "Certifications"),
                      __props.user.certification.length && unref(isOwner) ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode(_component_Link, {
                          href: _ctx.route("certification.create"),
                          class: "btn"
                        }, {
                          default: withCtx(() => [
                            createVNode("i", { class: "fa fa-plus text-muted" })
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(_component_Link, {
                          href: _ctx.route("profile.certification", { slug: __props.user.slug }),
                          class: "btn"
                        }, {
                          default: withCtx(() => [
                            createVNode("i", { class: "fa fa-pencil text-muted" })
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])) : createCommentVNode("", true)
                    ]),
                    __props.user.certification.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "list-group list-group-flush"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.user.certification.slice(0, 2), (i2) => {
                        return openBlock(), createBlock("div", {
                          class: "d-flex mb-3 list-group-item px-0",
                          key: i2
                        }, [
                          createVNode("div", { class: "me-3 flex-shrink-0" }, [
                            createVNode("img", {
                              src: "/assets/images/certificate.png",
                              alt: "",
                              style: { "width": "80px" }
                            })
                          ]),
                          createVNode("div", { class: "flex-grow-1 lh-sm" }, [
                            createVNode("p", { class: "mb-1 fw-bold" }, toDisplayString(i2.title), 1),
                            createVNode("p", { class: "mb-1" }, toDisplayString(i2.organization), 1),
                            createVNode("p", { class: "mb-1" }, "Issued " + toDisplayString(unref(moment$1)(i2.issued_date).format("MMM, YYYY")), 1),
                            i2.url ? (openBlock(), createBlock("a", {
                              key: 0,
                              class: "btn rounded-pill btn-sm border-primary text-primary",
                              href: i2.url,
                              target: "_blank"
                            }, [
                              createVNode("i", { class: "fa fa-link" }),
                              createTextVNode(" Show Credentials")
                            ], 8, ["href"])) : createCommentVNode("", true)
                          ])
                        ]);
                      }), 128)),
                      __props.user.certification.length > 2 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-end"
                      }, [
                        createVNode(_component_Link, {
                          href: _ctx.route("profile.education", { slug: __props.user.slug }),
                          class: "btn btn-light"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("See More ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode("p", { class: "fw-bold mb-0" }, "User haven’t posted their licenses and certifications"),
                      createVNode("p", null, "Once they do, it would be displayed here."),
                      unref(isOwner) ? (openBlock(), createBlock(_component_Link, {
                        key: 0,
                        href: _ctx.route("certification.create"),
                        class: "btn border-primary text-primary btn-sm fw-bold"
                      }, {
                        default: withCtx(() => [
                          createVNode("i", { class: "fa fa-plus-circle me-1" }),
                          createTextVNode(" Add Certification & License")
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true)
                    ]))
                  ])
                ]),
                createVNode("div", { class: "col-lg-7" }, [
                  createVNode("div", { class: "card card-body mb-2" }, [
                    createVNode("div", { class: "d-flex justify-content-between align-items-center" }, [
                      createVNode("h5", { class: "mb-0 fw-bold" }, "Posts "),
                      createVNode(_component_Link, {
                        href: _ctx.route("feeds", { author: __props.user.slug })
                      }, {
                        default: withCtx(() => [
                          createTextVNode("View All")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  __props.user.post.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.user.post, (i2) => {
                    return openBlock(), createBlock(PostItem, {
                      post: i2,
                      key: i2
                    }, null, 8, ["post"]);
                  }), 128)) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "card card-body my-3 d-flex flex-column justify-content-center text-center align-items-center",
                    style: { "min-height": "40vh" }
                  }, [
                    createVNode("img", {
                      loading: "lazy",
                      src: "/assets/images/coming-soon-img.png",
                      alt: "",
                      style: { "width": "250px", "object-fit": "cover" }
                    }),
                    createVNode("h5", { class: "my-3" }, "It feels so lonely here"),
                    createVNode("p", null, "No post by user")
                  ]))
                ])
              ]),
              unref(isOwner) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode("div", {
                  class: "modal fade",
                  id: "update-profile",
                  tabindex: "-1",
                  "data-bs-backdrop": "static",
                  "data-bs-keyboard": "false",
                  role: "dialog"
                }, [
                  createVNode("div", {
                    class: "modal-dialog modal-dialog-scrollable modal-fullscreen-md-down modal-lg",
                    role: "document"
                  }, [
                    createVNode("form", {
                      class: "modal-content",
                      onSubmit: withModifiers(unref(handleSave), ["prevent"])
                    }, [
                      createVNode("div", { class: "modal-header" }, [
                        createVNode("h5", { class: "modal-title" }, "Edit Profile"),
                        createVNode("button", {
                          type: "button",
                          class: "btn-close",
                          "data-bs-dismiss": "modal",
                          "aria-label": "Close"
                        })
                      ]),
                      createVNode("div", { class: "modal-body" }, [
                        createVNode("div", { class: "row" }, [
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("div", { class: "form-floating mb-3" }, [
                              withDirectives(createVNode("input", {
                                type: "text",
                                maxlength: "50",
                                class: "form-control",
                                placeholder: "",
                                required: "",
                                "onUpdate:modelValue": ($event) => unref(form).firstname = $event
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).firstname]
                              ]),
                              createVNode("label", null, "Firstname")
                            ])
                          ]),
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("div", { class: "form-floating mb-3" }, [
                              withDirectives(createVNode("input", {
                                type: "text",
                                maxlength: "50",
                                class: "form-control",
                                placeholder: "",
                                required: "",
                                "onUpdate:modelValue": ($event) => unref(form).lastname = $event
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).lastname]
                              ]),
                              createVNode("label", null, "Lastname")
                            ])
                          ]),
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("div", { class: "form-floating mb-3" }, [
                              withDirectives(createVNode("input", {
                                type: "email",
                                maxlength: "50",
                                class: "form-control",
                                placeholder: "",
                                required: "",
                                "onUpdate:modelValue": ($event) => unref(form).email = $event
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).email]
                              ]),
                              createVNode("label", null, "Email"),
                              unref(form).email !== __props.user.email ? (openBlock(), createBlock("small", {
                                key: 0,
                                class: "text-warning"
                              }, [
                                createVNode("i", { class: "fa fa-exclamation-triangle" }),
                                createTextVNode(" Changing this field would require reverification")
                              ])) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("div", { class: "form-floating mb-3" }, [
                              withDirectives(createVNode("select", {
                                class: "form-select",
                                required: "",
                                "onUpdate:modelValue": ($event) => unref(form).usermeta.country = $event
                              }, [
                                createVNode("option", { value: null }, "Select Country"),
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(countries).countries, (i2) => {
                                  return openBlock(), createBlock("option", {
                                    value: i2.name,
                                    key: i2
                                  }, toDisplayString(i2.name), 9, ["value"]);
                                }), 128))
                              ], 8, ["onUpdate:modelValue"]), [
                                [vModelSelect, unref(form).usermeta.country]
                              ]),
                              createVNode("label", null, "Country")
                            ])
                          ]),
                          createVNode("div", { class: "col-md-6 mb-3" }, [
                            createVNode("div", { class: "form-floating" }, [
                              withDirectives(createVNode("input", {
                                type: "tel",
                                maxlength: "50",
                                class: "form-control",
                                placeholder: "",
                                required: "",
                                "onUpdate:modelValue": ($event) => unref(form).phone = $event
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).phone]
                              ]),
                              createVNode("label", null, "Phone")
                            ]),
                            unref(form).phone !== __props.user.phone ? (openBlock(), createBlock("small", {
                              key: 0,
                              class: "text-warning"
                            }, [
                              createVNode("i", { class: "fa fa-exclamation-triangle" }),
                              createTextVNode(" Changing this field would require reverification")
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("div", { class: "form-floating mb-3" }, [
                              withDirectives(createVNode("select", {
                                class: "form-select",
                                required: "",
                                "onUpdate:modelValue": ($event) => unref(form).usermeta.gender = $event
                              }, [
                                createVNode("option", { value: null }, "Select Gender"),
                                (openBlock(), createBlock(Fragment, null, renderList(["Male", "Female", "Others"], (i2) => {
                                  return createVNode("option", {
                                    value: i2,
                                    key: i2
                                  }, toDisplayString(i2), 9, ["value"]);
                                }), 64))
                              ], 8, ["onUpdate:modelValue"]), [
                                [vModelSelect, unref(form).usermeta.gender]
                              ]),
                              createVNode("label", null, "Gender")
                            ])
                          ])
                        ]),
                        createVNode("hr"),
                        createVNode("div", { class: "row" }, [
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("div", { class: "mb-3 custom-vselect" }, [
                              createVNode("label", null, "Dream Job"),
                              createVNode(_component_v_select, {
                                required: "",
                                modelValue: unref(form).usermeta.dream_job,
                                "onUpdate:modelValue": ($event) => unref(form).usermeta.dream_job = $event,
                                options: unref(professions),
                                taggable: true,
                                pushtags: true,
                                placeholder: "-- Select or create new --"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                            ])
                          ]),
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("div", { class: "form-floating mb-3" }, [
                              withDirectives(createVNode("input", {
                                type: "text",
                                class: "form-control",
                                placeholder: "",
                                maxlength: "50",
                                required: "",
                                "onUpdate:modelValue": ($event) => unref(form).usermeta.headline = $event
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).usermeta.headline]
                              ]),
                              createVNode("label", null, "Profile Headline")
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "form-floating mb-3" }, [
                          withDirectives(createVNode("textarea", {
                            class: "form-control",
                            required: "",
                            "onUpdate:modelValue": ($event) => unref(form).usermeta.bio = $event,
                            style: { "height": "120px" },
                            maxlength: "400"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).usermeta.bio]
                          ]),
                          createVNode("label", null, "About Me")
                        ])
                      ]),
                      createVNode("div", { class: "modal-footer" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-light px-4",
                          "data-bs-dismiss": "modal"
                        }, "Close"),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary px-4"
                        }, [
                          unref(form).processing ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "spinner-grow text-white spinner-grow-sm me-2"
                          })) : createCommentVNode("", true),
                          createTextVNode(" Save")
                        ])
                      ])
                    ], 40, ["onSubmit"])
                  ])
                ]),
                createVNode("div", {
                  class: "modal fade",
                  id: "update-avatar",
                  tabindex: "-1",
                  "data-bs-backdrop": "static",
                  "data-bs-keyboard": "false",
                  role: "dialog"
                }, [
                  createVNode("div", {
                    class: "modal-dialog modal-dialog-scrollable modal-md",
                    role: "document"
                  }, [
                    createVNode("div", { class: "modal-content" }, [
                      createVNode("div", { class: "modal-header" }, [
                        createVNode("h5", { class: "modal-title" }, "Profile Photo"),
                        createVNode("button", {
                          type: "button",
                          class: "btn-close",
                          "data-bs-dismiss": "modal",
                          "aria-label": "Close"
                        })
                      ]),
                      createVNode("div", { class: "modal-body text-center" }, [
                        createVNode("img", {
                          src: __props.user.usermeta.avatar ?? "assets/images/no-profilepics.png",
                          class: "rounded-circle img-thumbnail",
                          style: { "width": "300px", "height": "300px" }
                        }, null, 8, ["src"]),
                        createVNode("input", {
                          type: "file",
                          onInput: ($event) => uploadAvatar($event),
                          ref: "profileimage",
                          accept: "image/jpeg, image/jpeg, image/png",
                          style: { "display": "none" }
                        }, null, 40, ["onInput"])
                      ]),
                      createVNode("div", { class: "modal-footer justify-content-between" }, [
                        createVNode("button", {
                          onClick: withModifiers(($event) => _ctx.$refs.profileimage.click(), ["prevent"]),
                          type: "button",
                          class: "btn d-flex flex-column align-items-center"
                        }, [
                          createVNode("i", { class: "fa fa-pencil" }),
                          createTextVNode(" Change")
                        ], 8, ["onClick"]),
                        unref(avatarform).processing ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "spinner-grow text-white spinner-grow-sm me-2"
                        })) : createCommentVNode("", true),
                        __props.user.usermeta.avatar ? (openBlock(), createBlock("button", {
                          key: 1,
                          onClick: withModifiers(removeAvatar, ["prevent"]),
                          type: "button",
                          class: "btn d-flex flex-column align-items-center"
                        }, [
                          createVNode("i", { class: "fa fa-trash" }),
                          createTextVNode(" Delete")
                        ], 8, ["onClick"])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", {
                  class: "modal fade",
                  id: "onboarding",
                  tabindex: "-1",
                  role: "dialog",
                  "data-bs-backdrop": "static",
                  "data-bs-keyboard": "false"
                }, [
                  createVNode("div", {
                    class: "modal-dialog modal-dialog-scrollable modal-xl",
                    role: "document"
                  }, [
                    createVNode("div", { class: "modal-content" }, [
                      createVNode("div", { class: "modal-body" }, [
                        createVNode("div", { class: "container" }, [
                          createVNode(_sfc_main$4, {
                            onAction: ($event) => unref(handleAction)($event),
                            user: __props.user
                          }, null, 8, ["onAction", "user"])
                        ])
                      ])
                    ])
                  ])
                ])
              ], 64)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Index.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  __name: "UserNetworkCard",
  __ssrInlineRender: true,
  props: {
    connection: Object,
    isOwner: Boolean,
    slug: String,
    actions: {
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    let user = computed(() => {
      if (props.connection.user.slug == props.slug) {
        return props.connection.friend;
      } else {
        return props.connection.user;
      }
    });
    let selected_user = ref(null);
    let modal = ref();
    let closeModal = () => {
      selected_user.value = null;
      modal.hide();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      if (__props.connection.status == "accepted") {
        _push(`<div class="card card-body shadow-lg text-center align-items-center"><img${ssrRenderAttr("src", unref(user).avatar ?? "assets/images/no-profilepics.png")} class="avatar avatar-xl rounded-circle img-thumbnail"><div style="${ssrRenderStyle({ "height": "4rem", "overflow": "hidden" })}"><p class="fw-bold mb-0">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("profile.index", { slug: unref(user).slug })
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(user).firstname)} ${ssrInterpolate(unref(user).lastname)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(user).firstname) + " " + toDisplayString(unref(user).lastname), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p><p class="small mb-0 text-capitalize">${ssrInterpolate(unref(user).headline)}</p></div>`);
        if (__props.isOwner) {
          _push(`<div class="dropdown open"><button class="btn rounded-pill btn-primary px-4 btn-sm text-nowrap" type="button" data-bs-toggle="dropdown"><i class="fas fa-bars me-2"></i> Actions <i class="fas fa-angle-down ms-2"></i></button><div class="dropdown-menu">`);
          _push(ssrRenderComponent(_component_Link, {
            href: _ctx.route("messages.index", { id: unref(_btoa)({ type: "user", id: unref(user).id }) }),
            class: "dropdown-item"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="fal fa-envelope-open-text me-1"${_scopeId}></i> Send Private Message`);
              } else {
                return [
                  createVNode("i", { class: "fal fa-envelope-open-text me-1" }),
                  createTextVNode(" Send Private Message")
                ];
              }
            }),
            _: 1
          }, _parent));
          if (__props.actions.includes("appointment")) {
            _push(`<button class="dropdown-item"><i class="fal fa-calendar-plus me-1"></i> Schedule Appointment</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="dropdown-item text-danger"><i class="fal fa-user-times me-1"></i> Disconnect</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="card card-body shadow-lg"><div class="d-flex"><div class="flex-shrink-0"><img${ssrRenderAttr("src", unref(user).avatar ?? "assets/images/no-profilepics.png")} class="avatar avatar-md rounded-circle img-thumbnail"></div><div class="flex-grow-1 ms-3"><p class="">`);
        _push(ssrRenderComponent(_component_Link, {
          href: _ctx.route("profile.index", { slug: unref(user).slug })
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(user).firstname)} ${ssrInterpolate(unref(user).lastname)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(user).firstname) + " " + toDisplayString(unref(user).lastname), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` wants to connect with you as a <strong>${ssrInterpolate(__props.connection.type)}</strong></p>`);
        if (__props.isOwner) {
          _push(`<div><button class="btn btn-sm border-primary text-primary rounded-pill me-2 px-3"><i class="fa fa-check"></i> Accept</button><button class="btn btn-sm rounded-pill text-danger px-3"><i class="fa fa-times me-2"></i> Reject</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      }
      if (unref(selected_user)) {
        _push(`<div class="modal fade"${ssrRenderAttr("id", `appointment_modal_${unref(user).id}`)} tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"><div class="modal-dialog modal-dialog-scrollable modal-xl" role="document"><div class="modal-content"><div class="modal-header border-0" style="${ssrRenderStyle({ "background": "#d7d6f4" })}"><h4 class="fw-bold text-primary modal-title">Book an Appointment</h4><button type="button" class="btn-close" aria-label="Close"></button></div><div class="modal-body pt-0 p-0" style="${ssrRenderStyle({ "min-height": "50vh" })}">`);
        _push(ssrRenderComponent(_sfc_main$F, {
          onClose: unref(closeModal),
          user: unref(selected_user),
          modal: unref(modal)
        }, null, _parent));
        _push(`</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UserNetworkCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Networks",
  __ssrInlineRender: true,
  props: { users: Object, slug: String },
  setup(__props) {
    const props = __props;
    let accepted = computed(() => sortBy(props.users.filter((e2) => e2.status == "accepted"), (o2) => o2.firstname));
    let peers = computed(() => accepted.value.filter((e2) => e2.type == "peer"));
    let proteges = computed(() => accepted.value.filter((e2) => e2.type == "protege" && e2.friend.slug == props.slug));
    let mentors = computed(() => accepted.value.filter((e2) => e2.type == "protege" && e2.user.slug == props.slug));
    let requests = computed(() => props.users.filter((e2) => e2.status !== "accepted" && e2.friend.slug == props.slug));
    let isOwner = computed(() => usePage().props.auth.user.slug == props.slug);
    let handleDisconnect = (ev, reject = false) => {
      let msg = reject ? `Are you sure you want to reject this user's request?` : `Are you sure you want to disconnect from this user?`;
      if (confirm(msg)) {
        useForm(ev).delete(route("user.disconnect"), { preserveState: true, preserveScroll: true });
      }
    };
    let handleAccept = (ev) => {
      if (confirm("By accepting this request,\n1. Tips, Updates and trends you post would automatically show on user's timeline/feed\n2. User can send you a direct message.\n3. A protege can schedule an appointment ")) {
        useForm(ev).put(route("user.connection.update"), { preserveState: false, preserveScroll: true });
      }
    };
    let invitation_url = computed(() => {
      return `${usePage().props.ziggy.url}/register?hook=${btoa(JSON.stringify({
        user_id: usePage().props.auth.user.id,
        type: invitationform.type
      }))}`;
    });
    let invitationform = useForm({
      email: [],
      type: "peer",
      message: ""
    });
    watch(() => invitationform.type, (value) => {
      let usepage = usePage().props;
      let data = {
        user_id: usepage.auth.user.id,
        type: value
      };
      let message = null;
      if (value == "mentor") {
        message = `is inviting you as a mentor on the Ribara platform. ${usepage.auth.user.usermeta.gender == "Male" ? "He" : "She"} admires your ethics and would like to learn more from you.`;
      } else if (value == "protege") {
        message = `wants to be your mentor on the Ribara platform. On this platform, ${usepage.auth.user.usermeta.gender == "Male" ? "he" : "she"} is able to share ${usepage.auth.user.usermeta.gender == "Male" ? "his" : "her"} experiences that would help you better at your field.`;
      } else if (value == "peer") {
        message = `wants to connect with you on the Ribara platform to inspire each other as you grow in your career.`;
      }
      invitationform.message = `Hello!, 
${usepage.auth.user.fullname} ${message} Accept the invite  here: ${usepage.ziggy.url}/register?hook=${btoa(JSON.stringify(data))}
    `;
    }, { immediate: true });
    let handleInvite = () => {
      invitationform.post(route("users.invitation"), { onSuccess: () => modal.hide() });
    };
    let modal = ref();
    let showModal = (id) => {
      modal = new bootstrap.Modal(id, {});
      modal.show();
    };
    let copy = () => {
      navigator.clipboard.writeText(invitation_url.value).then(() => toast.success("Invitation link copied")).catch((err) => toast.error(err));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_v_select = resolveComponent("v-select");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Profile" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$I, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(`<div class="row"${_scopeId}><div class="col-12 mb-3 text-end"${_scopeId}><button class="btn btn-link"${_scopeId}><i class="fal fa-user-plus me-1"${_scopeId}></i> Invite Friends</button></div><div class="col-lg-3 col-md-4 col-xxl-2"${_scopeId}><ul class="nav nav-pills flex-md-column flex-row"${_scopeId}><li class="nav-item" role="presentation"${_scopeId}><a class="nav-link active d-flex justify-content-between align-items-center" data-bs-toggle="tab" data-bs-target="#all" type="button" role="tab"${_scopeId}>All Connections <span class="badge rounded-pill bg-secondary ms-2"${_scopeId}>${ssrInterpolate((_a = unref(accepted)) == null ? void 0 : _a.length)}</span></a></li><li class="nav-item" role="presentation"${_scopeId}><a class="nav-link d-flex justify-content-between align-items-center" data-bs-toggle="tab" data-bs-target="#peers" type="button" role="tab"${_scopeId}>Peers<span class="badge rounded-pill bg-secondary ms-2"${_scopeId}>${ssrInterpolate((_b = unref(peers)) == null ? void 0 : _b.length)}</span></a></li><li class="nav-item" role="presentation"${_scopeId}><a class="nav-link d-flex justify-content-between align-items-center" data-bs-toggle="tab" data-bs-target="#proteges" type="button" role="tab"${_scopeId}>Proteges<span class="badge rounded-pill bg-secondary ms-2"${_scopeId}>${ssrInterpolate((_c = unref(proteges)) == null ? void 0 : _c.length)}</span></a></li><li class="nav-item" role="presentation"${_scopeId}><a class="nav-link d-flex justify-content-between align-items-center" data-bs-toggle="tab" data-bs-target="#mentors" type="button" role="tab"${_scopeId}>Mentors <span class="badge rounded-pill bg-secondary ms-2"${_scopeId}>${ssrInterpolate((_d = unref(mentors)) == null ? void 0 : _d.length)}</span></a></li>`);
            if (unref(isOwner)) {
              _push2(`<li class="nav-item" role="presentation"${_scopeId}><a class="nav-link d-flex justify-content-between align-items-center" data-bs-toggle="tab" data-bs-target="#requests" type="button" role="tab"${_scopeId}>Requests <span class="badge rounded-pill bg-secondary ms-2"${_scopeId}>${ssrInterpolate((_e = unref(requests)) == null ? void 0 : _e.length)}</span></a></li>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</ul></div><div class="col-lg-9 col-md-8"${_scopeId}><div class="tab-content"${_scopeId}><div class="tab-pane active" id="all" role="tabpanel"${_scopeId}><div class="row"${_scopeId}>`);
            if (unref(accepted).length) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(accepted), (user) => {
                _push2(`<div class="col-md-4 col-xl-3 col-6"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  connection: user,
                  onOnDisconnect: ($event) => unref(handleDisconnect)($event),
                  "is-owner": unref(isOwner),
                  slug: __props.slug
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<div class="col-md-8 mx-auto text-center"${_scopeId}><div class="jumbotron"${_scopeId}><h1 class="fw-bold"${_scopeId}>No result returned</h1><img src="/assets/images/404-error.png" class="w-100"${_scopeId}></div></div>`);
            }
            _push2(`</div></div><div class="tab-pane" id="peers" role="tabpanel"${_scopeId}><div class="row"${_scopeId}>`);
            if (unref(peers).length) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(peers), (user) => {
                _push2(`<div class="col-md-4 col-xl-3 col-6"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  connection: user,
                  onOnDisconnect: ($event) => unref(handleDisconnect)($event),
                  "is-owner": unref(isOwner),
                  slug: __props.slug
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<div class="col-md-8 mx-auto text-center"${_scopeId}><div class="jumbotron"${_scopeId}><h1 class="fw-bold"${_scopeId}>No result returned</h1><img src="/assets/images/404-error.png" class="w-100"${_scopeId}></div></div>`);
            }
            _push2(`</div></div><div class="tab-pane" id="proteges" role="tabpanel"${_scopeId}><div class="row"${_scopeId}>`);
            if (unref(proteges).length) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(proteges), (user) => {
                _push2(`<div class="col-md-4 col-xl-3 col-6"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  connection: user,
                  onOnDisconnect: ($event) => unref(handleDisconnect)($event),
                  "is-owner": unref(isOwner),
                  slug: __props.slug
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<div class="col-md-8 mx-auto text-center"${_scopeId}><div class="jumbotron"${_scopeId}><h1 class="fw-bold"${_scopeId}>No result returned</h1><img src="/assets/images/404-error.png" class="w-100"${_scopeId}></div></div>`);
            }
            _push2(`</div></div><div class="tab-pane" id="mentors" role="tabpanel"${_scopeId}><div class="row"${_scopeId}>`);
            if (unref(mentors).length) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(mentors), (user) => {
                _push2(`<div class="col-md-4 col-xl-3 col-6"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  connection: user,
                  actions: ["appointment"],
                  onOnDisconnect: ($event) => unref(handleDisconnect)($event),
                  "is-owner": unref(isOwner),
                  slug: __props.slug
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<div class="col-md-8 mx-auto text-center"${_scopeId}><div class="jumbotron"${_scopeId}><h1 class="fw-bold"${_scopeId}>No result returned</h1><img src="/assets/images/404-error.png" class="w-100"${_scopeId}></div></div>`);
            }
            _push2(`</div></div><div class="tab-pane" id="requests" role="tabpanel"${_scopeId}><div class="row"${_scopeId}>`);
            if (unref(requests).length) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(requests), (user) => {
                _push2(`<div class="col-md-6 col-12"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  onOnAccept: ($event) => unref(handleAccept)($event),
                  onOnDisconnect: ($event) => unref(handleDisconnect)($event, true),
                  "is-owner": unref(isOwner),
                  connection: user,
                  slug: __props.slug
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<div class="col-md-8 mx-auto text-center"${_scopeId}><div class="jumbotron"${_scopeId}><h1 class="fw-bold"${_scopeId}>No result returned</h1><img src="/assets/images/404-error.png" class="w-100"${_scopeId}></div></div>`);
            }
            _push2(`</div></div></div></div></div><div class="modal fade" id="invitation" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"${_scopeId}><div class="modal-dialog modal-dialog-scrollable modal-lg"${_scopeId}><div class="modal-content" style="${ssrRenderStyle({ "min-height": "30vh" })}"${_scopeId}><div class="modal-header"${_scopeId}><h5 class="modal-title"${_scopeId}>Invite Friends</h5><button type="button" class="btn-close" data-bs-dismiss="modal"${_scopeId}></button></div><form class="modal-body"${_scopeId}><div class="form-group mb-3"${_scopeId}><div class="custom-vselect"${_scopeId}><label${_scopeId}>Enter valid email of users</label>`);
            _push2(ssrRenderComponent(_component_v_select, {
              placeholder: "Separate with tab",
              modelValue: unref(invitationform).email,
              "onUpdate:modelValue": ($event) => unref(invitationform).email = $event,
              taggable: "",
              autocomplete: true,
              multiple: "",
              "push-tags": "",
              loading: false,
              "select-on-tab": true,
              "no-drop": true,
              "dropdown-should-open": (VueSelect2) => VueSelect2.open
            }, {
              search: withCtx(({ attributes, events }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<input${ssrRenderAttrs(mergeProps({
                    class: "vs__search",
                    required: !unref(invitationform).email.length
                  }, attributes))}${_scopeId2}>`);
                } else {
                  return [
                    createVNode("input", mergeProps({
                      class: "vs__search",
                      required: !unref(invitationform).email.length
                    }, attributes, toHandlers(events, true)), null, 16, ["required"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="row"${_scopeId}><div class="col-md-8"${_scopeId}><div class="form-group mb-3"${_scopeId}><label class="fw-bold me-2 d-block text-muted small"${_scopeId}>Connect as:</label><!--[-->`);
            ssrRenderList(["peer", "protege", "mentor"], (i2) => {
              _push2(`<div class="form-check form-check-inline"${_scopeId}><input class="form-check-input" type="radio" name="type"${ssrRenderAttr("id", i2)}${ssrRenderAttr("value", i2)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(invitationform).type, i2)) ? " checked" : ""}${_scopeId}><label class="form-check-label text-capitalize"${ssrRenderAttr("for", i2)}${_scopeId}>${ssrInterpolate(i2)}</label></div>`);
            });
            _push2(`<!--]--></div><div class="form-floating mb-3"${_scopeId}><textarea class="form-control" style="${ssrRenderStyle({ "height": "150px", "resize": "none" })}"${_scopeId}>${ssrInterpolate(unref(invitationform).message)}</textarea><label for="formId1"${_scopeId}>Invitation Message</label></div><div class="form-group"${_scopeId}><button class="${ssrRenderClass([{ "disabled": unref(invitationform).processing || !unref(invitationform).message }, "btn btn-primary waves-effect waves-light w-100"])}"${ssrIncludeBooleanAttr(unref(invitationform).processing || !unref(invitationform).message) ? " disabled" : ""} type="submit"${_scopeId}>`);
            if (unref(invitationform).processing) {
              _push2(`<span class="spinner-grow text-white spinner-grow-sm me-2"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` Send Invitation${ssrInterpolate(unref(invitationform).email.length > 1 ? "s" : "")}</button></div></div><div class="col-md-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(QRCodeVue3), {
              width: 250,
              height: 250,
              value: unref(invitation_url),
              image: "/logo.png",
              dotsOptions: {
                type: "dots",
                color: "#26249a"
              }
            }, null, _parent2, _scopeId));
            _push2(`<button class="btn w-100 btn-light btn-xs"${_scopeId}><i class="fas fa-copy me-2"${_scopeId}></i> Copy (${ssrInterpolate(unref(invitationform).type)}) invitation link </button></div></div></form></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-12 mb-3 text-end" }, [
                  createVNode("button", {
                    onClick: withModifiers(($event) => unref(showModal)("#invitation"), ["prevent"]),
                    class: "btn btn-link"
                  }, [
                    createVNode("i", { class: "fal fa-user-plus me-1" }),
                    createTextVNode(" Invite Friends")
                  ], 8, ["onClick"])
                ]),
                createVNode("div", { class: "col-lg-3 col-md-4 col-xxl-2" }, [
                  createVNode("ul", { class: "nav nav-pills flex-md-column flex-row" }, [
                    createVNode("li", {
                      class: "nav-item",
                      role: "presentation"
                    }, [
                      createVNode("a", {
                        class: "nav-link active d-flex justify-content-between align-items-center",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#all",
                        type: "button",
                        role: "tab"
                      }, [
                        createTextVNode("All Connections "),
                        createVNode("span", { class: "badge rounded-pill bg-secondary ms-2" }, toDisplayString((_f = unref(accepted)) == null ? void 0 : _f.length), 1)
                      ])
                    ]),
                    createVNode("li", {
                      class: "nav-item",
                      role: "presentation"
                    }, [
                      createVNode("a", {
                        class: "nav-link d-flex justify-content-between align-items-center",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#peers",
                        type: "button",
                        role: "tab"
                      }, [
                        createTextVNode("Peers"),
                        createVNode("span", { class: "badge rounded-pill bg-secondary ms-2" }, toDisplayString((_g = unref(peers)) == null ? void 0 : _g.length), 1)
                      ])
                    ]),
                    createVNode("li", {
                      class: "nav-item",
                      role: "presentation"
                    }, [
                      createVNode("a", {
                        class: "nav-link d-flex justify-content-between align-items-center",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#proteges",
                        type: "button",
                        role: "tab"
                      }, [
                        createTextVNode("Proteges"),
                        createVNode("span", { class: "badge rounded-pill bg-secondary ms-2" }, toDisplayString((_h = unref(proteges)) == null ? void 0 : _h.length), 1)
                      ])
                    ]),
                    createVNode("li", {
                      class: "nav-item",
                      role: "presentation"
                    }, [
                      createVNode("a", {
                        class: "nav-link d-flex justify-content-between align-items-center",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#mentors",
                        type: "button",
                        role: "tab"
                      }, [
                        createTextVNode("Mentors "),
                        createVNode("span", { class: "badge rounded-pill bg-secondary ms-2" }, toDisplayString((_i = unref(mentors)) == null ? void 0 : _i.length), 1)
                      ])
                    ]),
                    unref(isOwner) ? (openBlock(), createBlock("li", {
                      key: 0,
                      class: "nav-item",
                      role: "presentation"
                    }, [
                      createVNode("a", {
                        class: "nav-link d-flex justify-content-between align-items-center",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#requests",
                        type: "button",
                        role: "tab"
                      }, [
                        createTextVNode("Requests "),
                        createVNode("span", { class: "badge rounded-pill bg-secondary ms-2" }, toDisplayString((_j = unref(requests)) == null ? void 0 : _j.length), 1)
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("div", { class: "col-lg-9 col-md-8" }, [
                  createVNode("div", { class: "tab-content" }, [
                    createVNode("div", {
                      class: "tab-pane active",
                      id: "all",
                      role: "tabpanel"
                    }, [
                      createVNode("div", { class: "row" }, [
                        unref(accepted).length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(accepted), (user) => {
                          return openBlock(), createBlock("div", {
                            class: "col-md-4 col-xl-3 col-6",
                            key: user
                          }, [
                            createVNode(_sfc_main$2, {
                              connection: user,
                              onOnDisconnect: ($event) => unref(handleDisconnect)($event),
                              "is-owner": unref(isOwner),
                              slug: __props.slug
                            }, null, 8, ["connection", "onOnDisconnect", "is-owner", "slug"])
                          ]);
                        }), 128)) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "col-md-8 mx-auto text-center"
                        }, [
                          createVNode("div", { class: "jumbotron" }, [
                            createVNode("h1", { class: "fw-bold" }, "No result returned"),
                            createVNode("img", {
                              src: "/assets/images/404-error.png",
                              class: "w-100"
                            })
                          ])
                        ]))
                      ])
                    ]),
                    createVNode("div", {
                      class: "tab-pane",
                      id: "peers",
                      role: "tabpanel"
                    }, [
                      createVNode("div", { class: "row" }, [
                        unref(peers).length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(peers), (user) => {
                          return openBlock(), createBlock("div", {
                            class: "col-md-4 col-xl-3 col-6",
                            key: user
                          }, [
                            createVNode(_sfc_main$2, {
                              connection: user,
                              onOnDisconnect: ($event) => unref(handleDisconnect)($event),
                              "is-owner": unref(isOwner),
                              slug: __props.slug
                            }, null, 8, ["connection", "onOnDisconnect", "is-owner", "slug"])
                          ]);
                        }), 128)) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "col-md-8 mx-auto text-center"
                        }, [
                          createVNode("div", { class: "jumbotron" }, [
                            createVNode("h1", { class: "fw-bold" }, "No result returned"),
                            createVNode("img", {
                              src: "/assets/images/404-error.png",
                              class: "w-100"
                            })
                          ])
                        ]))
                      ])
                    ]),
                    createVNode("div", {
                      class: "tab-pane",
                      id: "proteges",
                      role: "tabpanel"
                    }, [
                      createVNode("div", { class: "row" }, [
                        unref(proteges).length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(proteges), (user) => {
                          return openBlock(), createBlock("div", {
                            class: "col-md-4 col-xl-3 col-6",
                            key: user
                          }, [
                            createVNode(_sfc_main$2, {
                              connection: user,
                              onOnDisconnect: ($event) => unref(handleDisconnect)($event),
                              "is-owner": unref(isOwner),
                              slug: __props.slug
                            }, null, 8, ["connection", "onOnDisconnect", "is-owner", "slug"])
                          ]);
                        }), 128)) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "col-md-8 mx-auto text-center"
                        }, [
                          createVNode("div", { class: "jumbotron" }, [
                            createVNode("h1", { class: "fw-bold" }, "No result returned"),
                            createVNode("img", {
                              src: "/assets/images/404-error.png",
                              class: "w-100"
                            })
                          ])
                        ]))
                      ])
                    ]),
                    createVNode("div", {
                      class: "tab-pane",
                      id: "mentors",
                      role: "tabpanel"
                    }, [
                      createVNode("div", { class: "row" }, [
                        unref(mentors).length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(mentors), (user) => {
                          return openBlock(), createBlock("div", {
                            class: "col-md-4 col-xl-3 col-6",
                            key: user
                          }, [
                            createVNode(_sfc_main$2, {
                              connection: user,
                              actions: ["appointment"],
                              onOnDisconnect: ($event) => unref(handleDisconnect)($event),
                              "is-owner": unref(isOwner),
                              slug: __props.slug
                            }, null, 8, ["connection", "onOnDisconnect", "is-owner", "slug"])
                          ]);
                        }), 128)) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "col-md-8 mx-auto text-center"
                        }, [
                          createVNode("div", { class: "jumbotron" }, [
                            createVNode("h1", { class: "fw-bold" }, "No result returned"),
                            createVNode("img", {
                              src: "/assets/images/404-error.png",
                              class: "w-100"
                            })
                          ])
                        ]))
                      ])
                    ]),
                    createVNode("div", {
                      class: "tab-pane",
                      id: "requests",
                      role: "tabpanel"
                    }, [
                      createVNode("div", { class: "row" }, [
                        unref(requests).length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(requests), (user) => {
                          return openBlock(), createBlock("div", {
                            class: "col-md-6 col-12",
                            key: user
                          }, [
                            createVNode(_sfc_main$2, {
                              onOnAccept: ($event) => unref(handleAccept)($event),
                              onOnDisconnect: ($event) => unref(handleDisconnect)($event, true),
                              "is-owner": unref(isOwner),
                              connection: user,
                              slug: __props.slug
                            }, null, 8, ["onOnAccept", "onOnDisconnect", "is-owner", "connection", "slug"])
                          ]);
                        }), 128)) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "col-md-8 mx-auto text-center"
                        }, [
                          createVNode("div", { class: "jumbotron" }, [
                            createVNode("h1", { class: "fw-bold" }, "No result returned"),
                            createVNode("img", {
                              src: "/assets/images/404-error.png",
                              class: "w-100"
                            })
                          ])
                        ]))
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal fade",
                id: "invitation",
                tabindex: "-1",
                "data-bs-backdrop": "static",
                "data-bs-keyboard": "false",
                role: "dialog"
              }, [
                createVNode("div", { class: "modal-dialog modal-dialog-scrollable modal-lg" }, [
                  createVNode("div", {
                    class: "modal-content",
                    style: { "min-height": "30vh" }
                  }, [
                    createVNode("div", { class: "modal-header" }, [
                      createVNode("h5", { class: "modal-title" }, "Invite Friends"),
                      createVNode("button", {
                        type: "button",
                        class: "btn-close",
                        "data-bs-dismiss": "modal"
                      })
                    ]),
                    createVNode("form", {
                      class: "modal-body",
                      onSubmit: withModifiers(unref(handleInvite), ["prevent"])
                    }, [
                      createVNode("div", { class: "form-group mb-3" }, [
                        createVNode("div", { class: "custom-vselect" }, [
                          createVNode("label", null, "Enter valid email of users"),
                          createVNode(_component_v_select, {
                            placeholder: "Separate with tab",
                            modelValue: unref(invitationform).email,
                            "onUpdate:modelValue": ($event) => unref(invitationform).email = $event,
                            taggable: "",
                            autocomplete: true,
                            multiple: "",
                            "push-tags": "",
                            loading: false,
                            "select-on-tab": true,
                            "no-drop": true,
                            "dropdown-should-open": (VueSelect2) => VueSelect2.open
                          }, {
                            search: withCtx(({ attributes, events }) => [
                              createVNode("input", mergeProps({
                                class: "vs__search",
                                required: !unref(invitationform).email.length
                              }, attributes, toHandlers(events, true)), null, 16, ["required"])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "dropdown-should-open"])
                        ])
                      ]),
                      createVNode("div", { class: "row" }, [
                        createVNode("div", { class: "col-md-8" }, [
                          createVNode("div", { class: "form-group mb-3" }, [
                            createVNode("label", { class: "fw-bold me-2 d-block text-muted small" }, "Connect as:"),
                            (openBlock(), createBlock(Fragment, null, renderList(["peer", "protege", "mentor"], (i2) => {
                              return createVNode("div", {
                                class: "form-check form-check-inline",
                                key: i2
                              }, [
                                withDirectives(createVNode("input", {
                                  class: "form-check-input",
                                  type: "radio",
                                  name: "type",
                                  id: i2,
                                  value: i2,
                                  "onUpdate:modelValue": ($event) => unref(invitationform).type = $event
                                }, null, 8, ["id", "value", "onUpdate:modelValue"]), [
                                  [vModelRadio, unref(invitationform).type]
                                ]),
                                createVNode("label", {
                                  class: "form-check-label text-capitalize",
                                  for: i2
                                }, toDisplayString(i2), 9, ["for"])
                              ]);
                            }), 64))
                          ]),
                          createVNode("div", { class: "form-floating mb-3" }, [
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(invitationform).message = $event,
                              class: "form-control",
                              style: { "height": "150px", "resize": "none" }
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(invitationform).message]
                            ]),
                            createVNode("label", { for: "formId1" }, "Invitation Message")
                          ]),
                          createVNode("div", { class: "form-group" }, [
                            createVNode("button", {
                              class: [{ "disabled": unref(invitationform).processing || !unref(invitationform).message }, "btn btn-primary waves-effect waves-light w-100"],
                              disabled: unref(invitationform).processing || !unref(invitationform).message,
                              type: "submit"
                            }, [
                              unref(invitationform).processing ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "spinner-grow text-white spinner-grow-sm me-2"
                              })) : createCommentVNode("", true),
                              createTextVNode(" Send Invitation" + toDisplayString(unref(invitationform).email.length > 1 ? "s" : ""), 1)
                            ], 10, ["disabled"])
                          ])
                        ]),
                        createVNode("div", { class: "col-md-4" }, [
                          createVNode(unref(QRCodeVue3), {
                            width: 250,
                            height: 250,
                            value: unref(invitation_url),
                            image: "/logo.png",
                            dotsOptions: {
                              type: "dots",
                              color: "#26249a"
                            }
                          }, null, 8, ["value"]),
                          createVNode("button", {
                            onClick: withModifiers(unref(copy), ["prevent"]),
                            class: "btn w-100 btn-light btn-xs"
                          }, [
                            createVNode("i", { class: "fas fa-copy me-2" }),
                            createTextVNode(" Copy (" + toDisplayString(unref(invitationform).type) + ") invitation link ", 1)
                          ], 8, ["onClick"])
                        ])
                      ])
                    ], 40, ["onSubmit"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Networks.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
  __name: "UserConnections",
  __ssrInlineRender: true,
  props: { id: Number, isOwner: Boolean },
  setup(__props) {
    const props = __props;
    let users = ref([]);
    let accepted = ref([]);
    watch((users2) => (value) => {
      accepted = value;
    });
    let isLoading = ref(false);
    let getUsers = () => {
      isLoading.value = true;
      axios.get(route("user.connections", { id: props.id })).then((response) => {
        users.value = response.data;
        accepted.value = response.data.filter((e2) => e2.status == "accepted");
      });
    };
    onMounted(() => getUsers());
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[-->${ssrInterpolate(unref(accepted))} <ul class="nav nav-tabs nav-tabs-custom justify-content-center"><li class="nav-item" role="presentation"><button class="nav-link bg-transparent active" data-bs-toggle="tab" data-bs-target="#all" type="button" role="tab">All Connections <span class="badge rounded-pill bg-primary ms-2">${ssrInterpolate((_a = unref(accepted)) == null ? void 0 : _a.length)}</span></button></li></ul><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/UserConnections.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
window.axios = axios$1;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
const app = "";
const vueSelect = "";
function t(t4, r2) {
  for (var n2 = 0; n2 < r2.length; n2++) {
    var e2 = r2[n2];
    e2.enumerable = e2.enumerable || false, e2.configurable = true, "value" in e2 && (e2.writable = true), Object.defineProperty(t4, e2.key, e2);
  }
}
function r(r2, n2, e2) {
  return n2 && t(r2.prototype, n2), e2 && t(r2, e2), Object.defineProperty(r2, "prototype", { writable: false }), r2;
}
function n() {
  return n = Object.assign ? Object.assign.bind() : function(t4) {
    for (var r2 = 1; r2 < arguments.length; r2++) {
      var n2 = arguments[r2];
      for (var e2 in n2)
        Object.prototype.hasOwnProperty.call(n2, e2) && (t4[e2] = n2[e2]);
    }
    return t4;
  }, n.apply(this, arguments);
}
function e(t4) {
  return e = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t5) {
    return t5.__proto__ || Object.getPrototypeOf(t5);
  }, e(t4);
}
function o(t4, r2) {
  return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t5, r3) {
    return t5.__proto__ = r3, t5;
  }, o(t4, r2);
}
function i() {
  if ("undefined" == typeof Reflect || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if ("function" == typeof Proxy)
    return true;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), true;
  } catch (t4) {
    return false;
  }
}
function u(t4, r2, n2) {
  return u = i() ? Reflect.construct.bind() : function(t5, r3, n3) {
    var e2 = [null];
    e2.push.apply(e2, r3);
    var i2 = new (Function.bind.apply(t5, e2))();
    return n3 && o(i2, n3.prototype), i2;
  }, u.apply(null, arguments);
}
function f(t4) {
  var r2 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
  return f = function(t5) {
    if (null === t5 || -1 === Function.toString.call(t5).indexOf("[native code]"))
      return t5;
    if ("function" != typeof t5)
      throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r2) {
      if (r2.has(t5))
        return r2.get(t5);
      r2.set(t5, n2);
    }
    function n2() {
      return u(t5, arguments, e(this).constructor);
    }
    return n2.prototype = Object.create(t5.prototype, { constructor: { value: n2, enumerable: false, writable: true, configurable: true } }), o(n2, t5);
  }, f(t4);
}
var a = String.prototype.replace, c = /%20/g, l = { default: "RFC3986", formatters: { RFC1738: function(t4) {
  return a.call(t4, c, "+");
}, RFC3986: function(t4) {
  return String(t4);
} }, RFC1738: "RFC1738", RFC3986: "RFC3986" }, s = Object.prototype.hasOwnProperty, v = Array.isArray, p = function() {
  for (var t4 = [], r2 = 0; r2 < 256; ++r2)
    t4.push("%" + ((r2 < 16 ? "0" : "") + r2.toString(16)).toUpperCase());
  return t4;
}(), y = function(t4, r2) {
  for (var n2 = r2 && r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, e2 = 0; e2 < t4.length; ++e2)
    void 0 !== t4[e2] && (n2[e2] = t4[e2]);
  return n2;
}, d = { arrayToObject: y, assign: function(t4, r2) {
  return Object.keys(r2).reduce(function(t5, n2) {
    return t5[n2] = r2[n2], t5;
  }, t4);
}, combine: function(t4, r2) {
  return [].concat(t4, r2);
}, compact: function(t4) {
  for (var r2 = [{ obj: { o: t4 }, prop: "o" }], n2 = [], e2 = 0; e2 < r2.length; ++e2)
    for (var o2 = r2[e2], i2 = o2.obj[o2.prop], u2 = Object.keys(i2), f2 = 0; f2 < u2.length; ++f2) {
      var a2 = u2[f2], c2 = i2[a2];
      "object" == typeof c2 && null !== c2 && -1 === n2.indexOf(c2) && (r2.push({ obj: i2, prop: a2 }), n2.push(c2));
    }
  return function(t5) {
    for (; t5.length > 1; ) {
      var r3 = t5.pop(), n3 = r3.obj[r3.prop];
      if (v(n3)) {
        for (var e3 = [], o3 = 0; o3 < n3.length; ++o3)
          void 0 !== n3[o3] && e3.push(n3[o3]);
        r3.obj[r3.prop] = e3;
      }
    }
  }(r2), t4;
}, decode: function(t4, r2, n2) {
  var e2 = t4.replace(/\+/g, " ");
  if ("iso-8859-1" === n2)
    return e2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(e2);
  } catch (t5) {
    return e2;
  }
}, encode: function(t4, r2, n2, e2, o2) {
  if (0 === t4.length)
    return t4;
  var i2 = t4;
  if ("symbol" == typeof t4 ? i2 = Symbol.prototype.toString.call(t4) : "string" != typeof t4 && (i2 = String(t4)), "iso-8859-1" === n2)
    return escape(i2).replace(/%u[0-9a-f]{4}/gi, function(t5) {
      return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
    });
  for (var u2 = "", f2 = 0; f2 < i2.length; ++f2) {
    var a2 = i2.charCodeAt(f2);
    45 === a2 || 46 === a2 || 95 === a2 || 126 === a2 || a2 >= 48 && a2 <= 57 || a2 >= 65 && a2 <= 90 || a2 >= 97 && a2 <= 122 || o2 === l.RFC1738 && (40 === a2 || 41 === a2) ? u2 += i2.charAt(f2) : a2 < 128 ? u2 += p[a2] : a2 < 2048 ? u2 += p[192 | a2 >> 6] + p[128 | 63 & a2] : a2 < 55296 || a2 >= 57344 ? u2 += p[224 | a2 >> 12] + p[128 | a2 >> 6 & 63] + p[128 | 63 & a2] : (a2 = 65536 + ((1023 & a2) << 10 | 1023 & i2.charCodeAt(f2 += 1)), u2 += p[240 | a2 >> 18] + p[128 | a2 >> 12 & 63] + p[128 | a2 >> 6 & 63] + p[128 | 63 & a2]);
  }
  return u2;
}, isBuffer: function(t4) {
  return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
}, isRegExp: function(t4) {
  return "[object RegExp]" === Object.prototype.toString.call(t4);
}, maybeMap: function(t4, r2) {
  if (v(t4)) {
    for (var n2 = [], e2 = 0; e2 < t4.length; e2 += 1)
      n2.push(r2(t4[e2]));
    return n2;
  }
  return r2(t4);
}, merge: function t2(r2, n2, e2) {
  if (!n2)
    return r2;
  if ("object" != typeof n2) {
    if (v(r2))
      r2.push(n2);
    else {
      if (!r2 || "object" != typeof r2)
        return [r2, n2];
      (e2 && (e2.plainObjects || e2.allowPrototypes) || !s.call(Object.prototype, n2)) && (r2[n2] = true);
    }
    return r2;
  }
  if (!r2 || "object" != typeof r2)
    return [r2].concat(n2);
  var o2 = r2;
  return v(r2) && !v(n2) && (o2 = y(r2, e2)), v(r2) && v(n2) ? (n2.forEach(function(n3, o3) {
    if (s.call(r2, o3)) {
      var i2 = r2[o3];
      i2 && "object" == typeof i2 && n3 && "object" == typeof n3 ? r2[o3] = t2(i2, n3, e2) : r2.push(n3);
    } else
      r2[o3] = n3;
  }), r2) : Object.keys(n2).reduce(function(r3, o3) {
    var i2 = n2[o3];
    return r3[o3] = s.call(r3, o3) ? t2(r3[o3], i2, e2) : i2, r3;
  }, o2);
} }, b = Object.prototype.hasOwnProperty, h = { brackets: function(t4) {
  return t4 + "[]";
}, comma: "comma", indices: function(t4, r2) {
  return t4 + "[" + r2 + "]";
}, repeat: function(t4) {
  return t4;
} }, m = Array.isArray, g = String.prototype.split, j = Array.prototype.push, w = function(t4, r2) {
  j.apply(t4, m(r2) ? r2 : [r2]);
}, O = Date.prototype.toISOString, E = l.default, R = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: d.encode, encodeValuesOnly: false, format: E, formatter: l.formatters[E], indices: false, serializeDate: function(t4) {
  return O.call(t4);
}, skipNulls: false, strictNullHandling: false }, S = function t3(r2, n2, e2, o2, i2, u2, f2, a2, c2, l2, s2, v2, p2, y2) {
  var b2, h2 = r2;
  if ("function" == typeof f2 ? h2 = f2(n2, h2) : h2 instanceof Date ? h2 = l2(h2) : "comma" === e2 && m(h2) && (h2 = d.maybeMap(h2, function(t4) {
    return t4 instanceof Date ? l2(t4) : t4;
  })), null === h2) {
    if (o2)
      return u2 && !p2 ? u2(n2, R.encoder, y2, "key", s2) : n2;
    h2 = "";
  }
  if ("string" == typeof (b2 = h2) || "number" == typeof b2 || "boolean" == typeof b2 || "symbol" == typeof b2 || "bigint" == typeof b2 || d.isBuffer(h2)) {
    if (u2) {
      var j2 = p2 ? n2 : u2(n2, R.encoder, y2, "key", s2);
      if ("comma" === e2 && p2) {
        for (var O2 = g.call(String(h2), ","), E2 = "", S2 = 0; S2 < O2.length; ++S2)
          E2 += (0 === S2 ? "" : ",") + v2(u2(O2[S2], R.encoder, y2, "value", s2));
        return [v2(j2) + "=" + E2];
      }
      return [v2(j2) + "=" + v2(u2(h2, R.encoder, y2, "value", s2))];
    }
    return [v2(n2) + "=" + v2(String(h2))];
  }
  var k2, x2 = [];
  if (void 0 === h2)
    return x2;
  if ("comma" === e2 && m(h2))
    k2 = [{ value: h2.length > 0 ? h2.join(",") || null : void 0 }];
  else if (m(f2))
    k2 = f2;
  else {
    var C2 = Object.keys(h2);
    k2 = a2 ? C2.sort(a2) : C2;
  }
  for (var N2 = 0; N2 < k2.length; ++N2) {
    var T2 = k2[N2], F2 = "object" == typeof T2 && void 0 !== T2.value ? T2.value : h2[T2];
    if (!i2 || null !== F2) {
      var D2 = m(h2) ? "function" == typeof e2 ? e2(n2, T2) : n2 : n2 + (c2 ? "." + T2 : "[" + T2 + "]");
      w(x2, t3(F2, D2, e2, o2, i2, u2, f2, a2, c2, l2, s2, v2, p2, y2));
    }
  }
  return x2;
}, k = Object.prototype.hasOwnProperty, x = Array.isArray, C = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: d.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, N = function(t4) {
  return t4.replace(/&#(\d+);/g, function(t5, r2) {
    return String.fromCharCode(parseInt(r2, 10));
  });
}, T = function(t4, r2) {
  return t4 && "string" == typeof t4 && r2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, F = function(t4, r2, n2, e2) {
  if (t4) {
    var o2 = n2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = n2.depth > 0 && /(\[[^[\]]*])/.exec(o2), f2 = u2 ? o2.slice(0, u2.index) : o2, a2 = [];
    if (f2) {
      if (!n2.plainObjects && k.call(Object.prototype, f2) && !n2.allowPrototypes)
        return;
      a2.push(f2);
    }
    for (var c2 = 0; n2.depth > 0 && null !== (u2 = i2.exec(o2)) && c2 < n2.depth; ) {
      if (c2 += 1, !n2.plainObjects && k.call(Object.prototype, u2[1].slice(1, -1)) && !n2.allowPrototypes)
        return;
      a2.push(u2[1]);
    }
    return u2 && a2.push("[" + o2.slice(u2.index) + "]"), function(t5, r3, n3, e3) {
      for (var o3 = e3 ? r3 : T(r3, n3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, f3 = t5[i3];
        if ("[]" === f3 && n3.parseArrays)
          u3 = [].concat(o3);
        else {
          u3 = n3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var a3 = "[" === f3.charAt(0) && "]" === f3.charAt(f3.length - 1) ? f3.slice(1, -1) : f3, c3 = parseInt(a3, 10);
          n3.parseArrays || "" !== a3 ? !isNaN(c3) && f3 !== a3 && String(c3) === a3 && c3 >= 0 && n3.parseArrays && c3 <= n3.arrayLimit ? (u3 = [])[c3] = o3 : "__proto__" !== a3 && (u3[a3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    }(a2, r2, n2, e2);
  }
}, D = function(t4, r2) {
  var n2 = function(t5) {
    if (!t5)
      return C;
    if (null != t5.decoder && "function" != typeof t5.decoder)
      throw new TypeError("Decoder has to be a function.");
    if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset)
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    return { allowDots: void 0 === t5.allowDots ? C.allowDots : !!t5.allowDots, allowPrototypes: "boolean" == typeof t5.allowPrototypes ? t5.allowPrototypes : C.allowPrototypes, arrayLimit: "number" == typeof t5.arrayLimit ? t5.arrayLimit : C.arrayLimit, charset: void 0 === t5.charset ? C.charset : t5.charset, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : C.charsetSentinel, comma: "boolean" == typeof t5.comma ? t5.comma : C.comma, decoder: "function" == typeof t5.decoder ? t5.decoder : C.decoder, delimiter: "string" == typeof t5.delimiter || d.isRegExp(t5.delimiter) ? t5.delimiter : C.delimiter, depth: "number" == typeof t5.depth || false === t5.depth ? +t5.depth : C.depth, ignoreQueryPrefix: true === t5.ignoreQueryPrefix, interpretNumericEntities: "boolean" == typeof t5.interpretNumericEntities ? t5.interpretNumericEntities : C.interpretNumericEntities, parameterLimit: "number" == typeof t5.parameterLimit ? t5.parameterLimit : C.parameterLimit, parseArrays: false !== t5.parseArrays, plainObjects: "boolean" == typeof t5.plainObjects ? t5.plainObjects : C.plainObjects, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : C.strictNullHandling };
  }(r2);
  if ("" === t4 || null == t4)
    return n2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var e2 = "string" == typeof t4 ? function(t5, r3) {
    var n3, e3 = {}, o3 = (r3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(r3.delimiter, Infinity === r3.parameterLimit ? void 0 : r3.parameterLimit), i3 = -1, u3 = r3.charset;
    if (r3.charsetSentinel)
      for (n3 = 0; n3 < o3.length; ++n3)
        0 === o3[n3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[n3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[n3] && (u3 = "iso-8859-1"), i3 = n3, n3 = o3.length);
    for (n3 = 0; n3 < o3.length; ++n3)
      if (n3 !== i3) {
        var f3, a3, c2 = o3[n3], l2 = c2.indexOf("]="), s2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
        -1 === s2 ? (f3 = r3.decoder(c2, C.decoder, u3, "key"), a3 = r3.strictNullHandling ? null : "") : (f3 = r3.decoder(c2.slice(0, s2), C.decoder, u3, "key"), a3 = d.maybeMap(T(c2.slice(s2 + 1), r3), function(t6) {
          return r3.decoder(t6, C.decoder, u3, "value");
        })), a3 && r3.interpretNumericEntities && "iso-8859-1" === u3 && (a3 = N(a3)), c2.indexOf("[]=") > -1 && (a3 = x(a3) ? [a3] : a3), e3[f3] = k.call(e3, f3) ? d.combine(e3[f3], a3) : a3;
      }
    return e3;
  }(t4, n2) : t4, o2 = n2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(e2), u2 = 0; u2 < i2.length; ++u2) {
    var f2 = i2[u2], a2 = F(f2, e2[f2], n2, "string" == typeof t4);
    o2 = d.merge(o2, a2, n2);
  }
  return d.compact(o2);
}, I = /* @__PURE__ */ function() {
  function t4(t5, r2, n3) {
    var e2, o2;
    this.name = t5, this.definition = r2, this.bindings = null != (e2 = r2.bindings) ? e2 : {}, this.wheres = null != (o2 = r2.wheres) ? o2 : {}, this.config = n3;
  }
  var n2 = t4.prototype;
  return n2.matchesUrl = function(t5) {
    var r2 = this;
    if (!this.definition.methods.includes("GET"))
      return false;
    var n3 = this.template.replace(/(\/?){([^}?]*)(\??)}/g, function(t6, n4, e3, o3) {
      var i3, u3 = "(?<" + e3 + ">" + ((null == (i3 = r2.wheres[e3]) ? void 0 : i3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+") + ")";
      return o3 ? "(" + n4 + u3 + ")?" : "" + n4 + u3;
    }).replace(/^\w+:\/\//, ""), e2 = t5.replace(/^\w+:\/\//, "").split("?"), o2 = e2[0], i2 = e2[1], u2 = new RegExp("^" + n3 + "/?$").exec(o2);
    if (u2) {
      for (var f2 in u2.groups)
        u2.groups[f2] = "string" == typeof u2.groups[f2] ? decodeURIComponent(u2.groups[f2]) : u2.groups[f2];
      return { params: u2.groups, query: D(i2) };
    }
    return false;
  }, n2.compile = function(t5) {
    var r2 = this, n3 = this.parameterSegments;
    return n3.length ? this.template.replace(/{([^}?]+)(\??)}/g, function(e2, o2, i2) {
      var u2, f2, a2;
      if (!i2 && [null, void 0].includes(t5[o2]))
        throw new Error("Ziggy error: '" + o2 + "' parameter is required for route '" + r2.name + "'.");
      if (n3[n3.length - 1].name === o2 && ".*" === r2.wheres[o2])
        return encodeURIComponent(null != (a2 = t5[o2]) ? a2 : "").replace(/%2F/g, "/");
      if (r2.wheres[o2] && !new RegExp("^" + (i2 ? "(" + r2.wheres[o2] + ")?" : r2.wheres[o2]) + "$").test(null != (u2 = t5[o2]) ? u2 : ""))
        throw new Error("Ziggy error: '" + o2 + "' parameter does not match required format '" + r2.wheres[o2] + "' for route '" + r2.name + "'.");
      return encodeURIComponent(null != (f2 = t5[o2]) ? f2 : "");
    }).replace(this.origin + "//", this.origin + "/").replace(/\/+$/, "") : this.template;
  }, r(t4, [{ key: "template", get: function() {
    return (this.origin + "/" + this.definition.uri).replace(/\/+$/, "");
  } }, { key: "origin", get: function() {
    return this.config.absolute ? this.definition.domain ? "" + this.config.url.match(/^\w+:\/\//)[0] + this.definition.domain + (this.config.port ? ":" + this.config.port : "") : this.config.url : "";
  } }, { key: "parameterSegments", get: function() {
    var t5, r2;
    return null != (t5 = null == (r2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : r2.map(function(t6) {
      return { name: t6.replace(/{|\??}/g, ""), required: !/\?}$/.test(t6) };
    })) ? t5 : [];
  } }]), t4;
}(), $$1 = /* @__PURE__ */ function(t4) {
  var e2, i2;
  function u2(r2, e3, o2, i3) {
    var u3;
    if (void 0 === o2 && (o2 = true), (u3 = t4.call(this) || this).t = null != i3 ? i3 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, u3.t = n({}, u3.t, { absolute: o2 }), r2) {
      if (!u3.t.routes[r2])
        throw new Error("Ziggy error: route '" + r2 + "' is not in the route list.");
      u3.i = new I(r2, u3.t.routes[r2], u3.t), u3.u = u3.l(e3);
    }
    return u3;
  }
  i2 = t4, (e2 = u2).prototype = Object.create(i2.prototype), e2.prototype.constructor = e2, o(e2, i2);
  var f2 = u2.prototype;
  return f2.toString = function() {
    var t5 = this, r2 = Object.keys(this.u).filter(function(r3) {
      return !t5.i.parameterSegments.some(function(t6) {
        return t6.name === r3;
      });
    }).filter(function(t6) {
      return "_query" !== t6;
    }).reduce(function(r3, e3) {
      var o2;
      return n({}, r3, ((o2 = {})[e3] = t5.u[e3], o2));
    }, {});
    return this.i.compile(this.u) + function(t6, r3) {
      var n2, e3 = t6, o2 = function(t7) {
        if (!t7)
          return R;
        if (null != t7.encoder && "function" != typeof t7.encoder)
          throw new TypeError("Encoder has to be a function.");
        var r4 = t7.charset || R.charset;
        if (void 0 !== t7.charset && "utf-8" !== t7.charset && "iso-8859-1" !== t7.charset)
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var n3 = l.default;
        if (void 0 !== t7.format) {
          if (!b.call(l.formatters, t7.format))
            throw new TypeError("Unknown format option provided.");
          n3 = t7.format;
        }
        var e4 = l.formatters[n3], o3 = R.filter;
        return ("function" == typeof t7.filter || m(t7.filter)) && (o3 = t7.filter), { addQueryPrefix: "boolean" == typeof t7.addQueryPrefix ? t7.addQueryPrefix : R.addQueryPrefix, allowDots: void 0 === t7.allowDots ? R.allowDots : !!t7.allowDots, charset: r4, charsetSentinel: "boolean" == typeof t7.charsetSentinel ? t7.charsetSentinel : R.charsetSentinel, delimiter: void 0 === t7.delimiter ? R.delimiter : t7.delimiter, encode: "boolean" == typeof t7.encode ? t7.encode : R.encode, encoder: "function" == typeof t7.encoder ? t7.encoder : R.encoder, encodeValuesOnly: "boolean" == typeof t7.encodeValuesOnly ? t7.encodeValuesOnly : R.encodeValuesOnly, filter: o3, format: n3, formatter: e4, serializeDate: "function" == typeof t7.serializeDate ? t7.serializeDate : R.serializeDate, skipNulls: "boolean" == typeof t7.skipNulls ? t7.skipNulls : R.skipNulls, sort: "function" == typeof t7.sort ? t7.sort : null, strictNullHandling: "boolean" == typeof t7.strictNullHandling ? t7.strictNullHandling : R.strictNullHandling };
      }(r3);
      "function" == typeof o2.filter ? e3 = (0, o2.filter)("", e3) : m(o2.filter) && (n2 = o2.filter);
      var i3 = [];
      if ("object" != typeof e3 || null === e3)
        return "";
      var u3 = h[r3 && r3.arrayFormat in h ? r3.arrayFormat : r3 && "indices" in r3 ? r3.indices ? "indices" : "repeat" : "indices"];
      n2 || (n2 = Object.keys(e3)), o2.sort && n2.sort(o2.sort);
      for (var f3 = 0; f3 < n2.length; ++f3) {
        var a2 = n2[f3];
        o2.skipNulls && null === e3[a2] || w(i3, S(e3[a2], a2, u3, o2.strictNullHandling, o2.skipNulls, o2.encode ? o2.encoder : null, o2.filter, o2.sort, o2.allowDots, o2.serializeDate, o2.format, o2.formatter, o2.encodeValuesOnly, o2.charset));
      }
      var c2 = i3.join(o2.delimiter), s2 = true === o2.addQueryPrefix ? "?" : "";
      return o2.charsetSentinel && (s2 += "iso-8859-1" === o2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), c2.length > 0 ? s2 + c2 : "";
    }(n({}, r2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: function(t6, r3) {
      return "boolean" == typeof t6 ? Number(t6) : r3(t6);
    } });
  }, f2.v = function(t5) {
    var r2 = this;
    t5 ? this.t.absolute && t5.startsWith("/") && (t5 = this.p().host + t5) : t5 = this.h();
    var e3 = {}, o2 = Object.entries(this.t.routes).find(function(n2) {
      return e3 = new I(n2[0], n2[1], r2.t).matchesUrl(t5);
    }) || [void 0, void 0];
    return n({ name: o2[0] }, e3, { route: o2[1] });
  }, f2.h = function() {
    var t5 = this.p(), r2 = t5.pathname, n2 = t5.search;
    return (this.t.absolute ? t5.host + r2 : r2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + n2;
  }, f2.current = function(t5, r2) {
    var e3 = this.v(), o2 = e3.name, i3 = e3.params, u3 = e3.query, f3 = e3.route;
    if (!t5)
      return o2;
    var a2 = new RegExp("^" + t5.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$").test(o2);
    if ([null, void 0].includes(r2) || !a2)
      return a2;
    var c2 = new I(o2, f3, this.t);
    r2 = this.l(r2, c2);
    var l2 = n({}, i3, u3);
    return !(!Object.values(r2).every(function(t6) {
      return !t6;
    }) || Object.values(l2).some(function(t6) {
      return void 0 !== t6;
    })) || Object.entries(r2).every(function(t6) {
      return l2[t6[0]] == t6[1];
    });
  }, f2.p = function() {
    var t5, r2, n2, e3, o2, i3, u3 = "undefined" != typeof window ? window.location : {}, f3 = u3.host, a2 = u3.pathname, c2 = u3.search;
    return { host: null != (t5 = null == (r2 = this.t.location) ? void 0 : r2.host) ? t5 : void 0 === f3 ? "" : f3, pathname: null != (n2 = null == (e3 = this.t.location) ? void 0 : e3.pathname) ? n2 : void 0 === a2 ? "" : a2, search: null != (o2 = null == (i3 = this.t.location) ? void 0 : i3.search) ? o2 : void 0 === c2 ? "" : c2 };
  }, f2.has = function(t5) {
    return Object.keys(this.t.routes).includes(t5);
  }, f2.l = function(t5, r2) {
    var e3 = this;
    void 0 === t5 && (t5 = {}), void 0 === r2 && (r2 = this.i), null != t5 || (t5 = {}), t5 = ["string", "number"].includes(typeof t5) ? [t5] : t5;
    var o2 = r2.parameterSegments.filter(function(t6) {
      return !e3.t.defaults[t6.name];
    });
    if (Array.isArray(t5))
      t5 = t5.reduce(function(t6, r3, e4) {
        var i4, u3;
        return n({}, t6, o2[e4] ? ((i4 = {})[o2[e4].name] = r3, i4) : "object" == typeof r3 ? r3 : ((u3 = {})[r3] = "", u3));
      }, {});
    else if (1 === o2.length && !t5[o2[0].name] && (t5.hasOwnProperty(Object.values(r2.bindings)[0]) || t5.hasOwnProperty("id"))) {
      var i3;
      (i3 = {})[o2[0].name] = t5, t5 = i3;
    }
    return n({}, this.m(r2), this.g(t5, r2));
  }, f2.m = function(t5) {
    var r2 = this;
    return t5.parameterSegments.filter(function(t6) {
      return r2.t.defaults[t6.name];
    }).reduce(function(t6, e3, o2) {
      var i3, u3 = e3.name;
      return n({}, t6, ((i3 = {})[u3] = r2.t.defaults[u3], i3));
    }, {});
  }, f2.g = function(t5, r2) {
    var e3 = r2.bindings, o2 = r2.parameterSegments;
    return Object.entries(t5).reduce(function(t6, r3) {
      var i3, u3, f3 = r3[0], a2 = r3[1];
      if (!a2 || "object" != typeof a2 || Array.isArray(a2) || !o2.some(function(t7) {
        return t7.name === f3;
      }))
        return n({}, t6, ((u3 = {})[f3] = a2, u3));
      if (!a2.hasOwnProperty(e3[f3])) {
        if (!a2.hasOwnProperty("id"))
          throw new Error("Ziggy error: object passed as '" + f3 + "' parameter is missing route model binding key '" + e3[f3] + "'.");
        e3[f3] = "id";
      }
      return n({}, t6, ((i3 = {})[f3] = a2[e3[f3]], i3));
    }, {});
  }, f2.valueOf = function() {
    return this.toString();
  }, f2.check = function(t5) {
    return this.has(t5);
  }, r(u2, [{ key: "params", get: function() {
    var t5 = this.v();
    return n({}, t5.params, t5.query);
  } }]), u2;
}(/* @__PURE__ */ f(String)), A = { install: function(t4, r2) {
  var n2 = function(t5, n3, e2, o2) {
    return void 0 === o2 && (o2 = r2), function(t6, r3, n4, e3) {
      var o3 = new $$1(t6, r3, n4, e3);
      return t6 ? o3.toString() : o3;
    }(t5, n3, e2, o2);
  };
  t4.mixin({ methods: { route: n2 } }), parseInt(t4.version) > 2 && t4.provide("route", n2);
} };
const style$1 = "";
const style = "";
const appName = "Ribara";
createServer((page) => createInertiaApp({
  page,
  render: renderToString,
  title: (title) => `${title} - ${appName}: Bridging Skill Gaps and Unlocking Dream Jobs`,
  resolve: (name) => {
    const pages = /* @__PURE__ */ Object.assign({ "./Pages/Appointments/Index.vue": __vite_glob_0_0, "./Pages/Appointments/Schedule.vue": __vite_glob_0_1, "./Pages/Auth/CreatePassword.vue": __vite_glob_0_2, "./Pages/Auth/ForgotPassword.vue": __vite_glob_0_3, "./Pages/Auth/Login.vue": __vite_glob_0_4, "./Pages/Auth/Register.vue": __vite_glob_0_5, "./Pages/Auth/RegisterSimple.vue": __vite_glob_0_6, "./Pages/Auth/ResetPassword.vue": __vite_glob_0_7, "./Pages/Auth/VerifyEmail.vue": __vite_glob_0_8, "./Pages/Auth/VerifyPhone.vue": __vite_glob_0_9, "./Pages/Construction.vue": __vite_glob_0_10, "./Pages/Dashboard.vue": __vite_glob_0_11, "./Pages/Feeds/Post.vue": __vite_glob_0_12, "./Pages/Feeds/PostEdit.vue": __vite_glob_0_13, "./Pages/Messages/Conversation.vue": __vite_glob_0_14, "./Pages/Messages/Index.vue": __vite_glob_0_15, "./Pages/People.vue": __vite_glob_0_16, "./Pages/Profile/Certification.vue": __vite_glob_0_17, "./Pages/Profile/CertificationForm.vue": __vite_glob_0_18, "./Pages/Profile/Education.vue": __vite_glob_0_19, "./Pages/Profile/EducationForm.vue": __vite_glob_0_20, "./Pages/Profile/Experience.vue": __vite_glob_0_21, "./Pages/Profile/ExperienceForm.vue": __vite_glob_0_22, "./Pages/Profile/Index.vue": __vite_glob_0_23, "./Pages/Profile/Networks.vue": __vite_glob_0_24, "./Pages/Profile/OnboardMessage.vue": __vite_glob_0_25, "./Pages/Profile/UserConnections.vue": __vite_glob_0_26 });
    return pages[`./Pages/${name}.vue`];
  },
  setup({ el, App, props, plugin }) {
    return createSSRApp({ render: () => h$1(App, props) }).component("Link", Link).component("Head", Head).component("infinite-loading", InfiniteLoading).component("v-select", VueSelect).use(plugin).use(A, Ziggy).use(VCalendar, {});
  },
  progress: {
    color: "#4B5563",
    showSpinner: true
  }
}));
