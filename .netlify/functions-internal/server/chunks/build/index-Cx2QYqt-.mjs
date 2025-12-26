import { c as _sfc_main$f, d as useState, a as useLocale, b as useAppConfig, t as tv } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, mergeModels, useSlots, useModel, useTemplateRef, toRef, watch, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, renderSlot, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
import { Primitive } from 'reka-ui';
import { K as upperFirst, v as defu } from '../_/nitro.mjs';
import { useVueTable, getExpandedRowModel, getSortedRowModel, getFilteredRowModel, getCoreRowModel, FlexRender } from '@tanstack/vue-table';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { createReusableTemplate, reactiveOmit } from '@vueuse/core';
import dayjs from 'dayjs';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'vaul-vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';

const theme = {
  "slots": {
    "root": "relative overflow-auto",
    "base": "min-w-full",
    "caption": "sr-only",
    "thead": "relative",
    "tbody": "[&>tr]:data-[selectable=true]:hover:bg-elevated/50 [&>tr]:data-[selectable=true]:focus-visible:outline-primary",
    "tfoot": "relative",
    "tr": "data-[selected=true]:bg-elevated/50",
    "th": "px-4 py-3.5 text-sm text-highlighted text-left rtl:text-right font-semibold [&:has([role=checkbox])]:pe-0",
    "td": "p-4 text-sm text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0",
    "separator": "absolute z-[1] left-0 w-full h-px bg-(--ui-border-accented)",
    "empty": "py-6 text-center text-sm text-muted",
    "loading": "py-6 text-center"
  },
  "variants": {
    "virtualize": {
      "false": {
        "base": "overflow-clip",
        "tbody": "divide-y divide-default"
      }
    },
    "pinned": {
      "true": {
        "th": "sticky bg-default/75 data-[pinned=left]:left-0 data-[pinned=right]:right-0",
        "td": "sticky bg-default/75 data-[pinned=left]:left-0 data-[pinned=right]:right-0"
      }
    },
    "sticky": {
      "true": {
        "thead": "sticky top-0 inset-x-0 bg-default/75 z-[1] backdrop-blur",
        "tfoot": "sticky bottom-0 inset-x-0 bg-default/75 z-[1] backdrop-blur"
      },
      "header": {
        "thead": "sticky top-0 inset-x-0 bg-default/75 z-[1] backdrop-blur"
      },
      "footer": {
        "tfoot": "sticky bottom-0 inset-x-0 bg-default/75 z-[1] backdrop-blur"
      }
    },
    "loading": {
      "true": {
        "thead": "after:absolute after:z-[1] after:h-px"
      }
    },
    "loadingAnimation": {
      "carousel": "",
      "carousel-inverse": "",
      "swing": "",
      "elastic": ""
    },
    "loadingColor": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    }
  },
  "compoundVariants": [
    {
      "loading": true,
      "loadingColor": "primary",
      "class": {
        "thead": "after:bg-primary"
      }
    },
    {
      "loading": true,
      "loadingColor": "secondary",
      "class": {
        "thead": "after:bg-secondary"
      }
    },
    {
      "loading": true,
      "loadingColor": "success",
      "class": {
        "thead": "after:bg-success"
      }
    },
    {
      "loading": true,
      "loadingColor": "info",
      "class": {
        "thead": "after:bg-info"
      }
    },
    {
      "loading": true,
      "loadingColor": "warning",
      "class": {
        "thead": "after:bg-warning"
      }
    },
    {
      "loading": true,
      "loadingColor": "error",
      "class": {
        "thead": "after:bg-error"
      }
    },
    {
      "loading": true,
      "loadingColor": "neutral",
      "class": {
        "thead": "after:bg-inverted"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "carousel",
      "class": {
        "thead": "after:animate-[carousel_2s_ease-in-out_infinite] rtl:after:animate-[carousel-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "carousel-inverse",
      "class": {
        "thead": "after:animate-[carousel-inverse_2s_ease-in-out_infinite] rtl:after:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "swing",
      "class": {
        "thead": "after:animate-[swing_2s_ease-in-out_infinite]"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "elastic",
      "class": {
        "thead": "after:animate-[elastic_2s_ease-in-out_infinite]"
      }
    }
  ],
  "defaultVariants": {
    "loadingColor": "primary",
    "loadingAnimation": "carousel"
  }
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UTable",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    as: { type: null, required: false },
    data: { type: Array, required: false },
    columns: { type: Array, required: false },
    caption: { type: String, required: false },
    meta: { type: Object, required: false },
    virtualize: { type: [Boolean, Object], required: false, default: false },
    empty: { type: String, required: false },
    sticky: { type: [Boolean, String], required: false },
    loading: { type: Boolean, required: false },
    loadingColor: { type: null, required: false },
    loadingAnimation: { type: null, required: false },
    watchOptions: { type: Object, required: false, default: () => ({
      deep: true
    }) },
    globalFilterOptions: { type: Object, required: false },
    columnFiltersOptions: { type: Object, required: false },
    columnPinningOptions: { type: Object, required: false },
    columnSizingOptions: { type: Object, required: false },
    visibilityOptions: { type: Object, required: false },
    sortingOptions: { type: Object, required: false },
    groupingOptions: { type: Object, required: false },
    expandedOptions: { type: Object, required: false },
    rowSelectionOptions: { type: Object, required: false },
    rowPinningOptions: { type: Object, required: false },
    paginationOptions: { type: Object, required: false },
    facetedOptions: { type: Object, required: false },
    onSelect: { type: Function, required: false },
    onHover: { type: Function, required: false },
    onContextmenu: { type: [Function, Array], required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    state: { type: Object, required: false },
    onStateChange: { type: Function, required: false },
    renderFallbackValue: { type: null, required: false },
    _features: { type: Array, required: false },
    autoResetAll: { type: Boolean, required: false },
    debugAll: { type: Boolean, required: false },
    debugCells: { type: Boolean, required: false },
    debugColumns: { type: Boolean, required: false },
    debugHeaders: { type: Boolean, required: false },
    debugRows: { type: Boolean, required: false },
    debugTable: { type: Boolean, required: false },
    defaultColumn: { type: Object, required: false },
    getRowId: { type: Function, required: false },
    getSubRows: { type: Function, required: false },
    initialState: { type: Object, required: false },
    mergeOptions: { type: Function, required: false }
  }, {
    "globalFilter": { type: String, ...{ default: void 0 } },
    "globalFilterModifiers": {},
    "columnFilters": { type: Array, ...{ default: [] } },
    "columnFiltersModifiers": {},
    "columnOrder": { type: Array, ...{ default: [] } },
    "columnOrderModifiers": {},
    "columnVisibility": { type: Object, ...{ default: {} } },
    "columnVisibilityModifiers": {},
    "columnPinning": { type: Object, ...{ default: {} } },
    "columnPinningModifiers": {},
    "columnSizing": { type: Object, ...{ default: {} } },
    "columnSizingModifiers": {},
    "columnSizingInfo": { type: Object, ...{ default: {} } },
    "columnSizingInfoModifiers": {},
    "rowSelection": { type: Object, ...{ default: {} } },
    "rowSelectionModifiers": {},
    "rowPinning": { type: Object, ...{ default: {} } },
    "rowPinningModifiers": {},
    "sorting": { type: Array, ...{ default: [] } },
    "sortingModifiers": {},
    "grouping": { type: Array, ...{ default: [] } },
    "groupingModifiers": {},
    "expanded": { type: [Boolean, Object], ...{ default: {} } },
    "expandedModifiers": {},
    "pagination": { type: Object, ...{ default: {} } },
    "paginationModifiers": {}
  }),
  emits: ["update:globalFilter", "update:columnFilters", "update:columnOrder", "update:columnVisibility", "update:columnPinning", "update:columnSizing", "update:columnSizingInfo", "update:rowSelection", "update:rowPinning", "update:sorting", "update:grouping", "update:expanded", "update:pagination"],
  setup(__props, { expose: __expose }) {
    const props = __props;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const data = ref(props.data ?? []);
    const meta = computed(() => props.meta ?? {});
    const columns = computed(() => processColumns(props.columns ?? Object.keys(data.value[0] ?? {}).map((accessorKey) => ({ accessorKey, header: upperFirst(accessorKey) }))));
    function processColumns(columns2) {
      return columns2.map((column) => {
        const col = { ...column };
        if ("columns" in col && col.columns) {
          col.columns = processColumns(col.columns);
        }
        if (!col.cell) {
          col.cell = ({ getValue }) => {
            const value = getValue();
            if (value === "" || value === null || value === void 0) {
              return " ";
            }
            return String(value);
          };
        }
        return col;
      });
    }
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.table || {} })({
      sticky: props.virtualize ? false : props.sticky,
      loading: props.loading,
      loadingColor: props.loadingColor,
      loadingAnimation: props.loadingAnimation,
      virtualize: !!props.virtualize
    }));
    const [DefineTableTemplate, ReuseTableTemplate] = createReusableTemplate();
    const [DefineRowTemplate, ReuseRowTemplate] = createReusableTemplate({
      props: {
        row: {
          type: Object,
          required: true
        },
        style: {
          type: Object,
          required: false
        }
      }
    });
    const hasFooter = computed(() => {
      function hasFooterRecursive(columns2) {
        for (const column of columns2) {
          if ("footer" in column) {
            return true;
          }
          if ("columns" in column && hasFooterRecursive(column.columns)) {
            return true;
          }
        }
        return false;
      }
      return hasFooterRecursive(columns.value);
    });
    const globalFilterState = useModel(__props, "globalFilter", { type: String, ...{ default: void 0 } });
    const columnFiltersState = useModel(__props, "columnFilters", { type: Array, ...{ default: [] } });
    const columnOrderState = useModel(__props, "columnOrder", { type: Array, ...{ default: [] } });
    const columnVisibilityState = useModel(__props, "columnVisibility", { type: Object, ...{ default: {} } });
    const columnPinningState = useModel(__props, "columnPinning", { type: Object, ...{ default: {} } });
    const columnSizingState = useModel(__props, "columnSizing", { type: Object, ...{ default: {} } });
    const columnSizingInfoState = useModel(__props, "columnSizingInfo", { type: Object, ...{ default: {} } });
    const rowSelectionState = useModel(__props, "rowSelection", { type: Object, ...{ default: {} } });
    const rowPinningState = useModel(__props, "rowPinning", { type: Object, ...{ default: {} } });
    const sortingState = useModel(__props, "sorting", { type: Array, ...{ default: [] } });
    const groupingState = useModel(__props, "grouping", { type: Array, ...{ default: [] } });
    const expandedState = useModel(__props, "expanded", { type: [Boolean, Object], ...{ default: {} } });
    const paginationState = useModel(__props, "pagination", { type: Object, ...{ default: {} } });
    const rootRef = useTemplateRef("rootRef");
    const tableRef = useTemplateRef("tableRef");
    const tableApi = useVueTable({
      ...reactiveOmit(props, "as", "data", "columns", "virtualize", "caption", "sticky", "loading", "loadingColor", "loadingAnimation", "class", "ui"),
      data,
      get columns() {
        return columns.value;
      },
      meta: meta.value,
      getCoreRowModel: getCoreRowModel(),
      ...props.globalFilterOptions || {},
      onGlobalFilterChange: (updaterOrValue) => valueUpdater(updaterOrValue, globalFilterState),
      ...props.columnFiltersOptions || {},
      getFilteredRowModel: getFilteredRowModel(),
      onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFiltersState),
      onColumnOrderChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnOrderState),
      ...props.visibilityOptions || {},
      onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibilityState),
      ...props.columnPinningOptions || {},
      onColumnPinningChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnPinningState),
      ...props.columnSizingOptions || {},
      onColumnSizingChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnSizingState),
      onColumnSizingInfoChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnSizingInfoState),
      ...props.rowSelectionOptions || {},
      onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelectionState),
      ...props.rowPinningOptions || {},
      onRowPinningChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowPinningState),
      ...props.sortingOptions || {},
      getSortedRowModel: getSortedRowModel(),
      onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sortingState),
      ...props.groupingOptions || {},
      onGroupingChange: (updaterOrValue) => valueUpdater(updaterOrValue, groupingState),
      ...props.expandedOptions || {},
      getExpandedRowModel: getExpandedRowModel(),
      onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expandedState),
      ...props.paginationOptions || {},
      onPaginationChange: (updaterOrValue) => valueUpdater(updaterOrValue, paginationState),
      ...props.facetedOptions || {},
      state: {
        get globalFilter() {
          return globalFilterState.value;
        },
        get columnFilters() {
          return columnFiltersState.value;
        },
        get columnOrder() {
          return columnOrderState.value;
        },
        get columnVisibility() {
          return columnVisibilityState.value;
        },
        get columnPinning() {
          return columnPinningState.value;
        },
        get expanded() {
          return expandedState.value;
        },
        get rowSelection() {
          return rowSelectionState.value;
        },
        get sorting() {
          return sortingState.value;
        },
        get grouping() {
          return groupingState.value;
        },
        get rowPinning() {
          return rowPinningState.value;
        },
        get columnSizing() {
          return columnSizingState.value;
        },
        get columnSizingInfo() {
          return columnSizingInfoState.value;
        },
        get pagination() {
          return paginationState.value;
        }
      }
    });
    const rows = computed(() => tableApi.getRowModel().rows);
    const virtualizerProps = toRef(() => defu(typeof props.virtualize === "boolean" ? {} : props.virtualize, {
      estimateSize: 65,
      overscan: 12
    }));
    const virtualizer = !!props.virtualize && useVirtualizer({
      ...virtualizerProps.value,
      get count() {
        return rows.value.length;
      },
      getScrollElement: () => rootRef.value?.$el,
      estimateSize: (index) => {
        const estimate = virtualizerProps.value.estimateSize;
        return typeof estimate === "function" ? estimate(index) : estimate;
      }
    });
    const renderedSize = computed(() => {
      if (!virtualizer) {
        return 0;
      }
      const virtualItems = virtualizer.value.getVirtualItems();
      if (!virtualItems?.length) {
        return 0;
      }
      return virtualItems.reduce((sum, item) => sum + item.size, 0);
    });
    function valueUpdater(updaterOrValue, ref2) {
      ref2.value = typeof updaterOrValue === "function" ? updaterOrValue(ref2.value) : updaterOrValue;
    }
    function onRowSelect(e, row) {
      if (!props.onSelect) {
        return;
      }
      const target = e.target;
      const isInteractive = target.closest("button") || target.closest("a");
      if (isInteractive) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      props.onSelect(e, row);
    }
    function onRowHover(e, row) {
      if (!props.onHover) {
        return;
      }
      props.onHover(e, row);
    }
    function onRowContextmenu(e, row) {
      if (!props.onContextmenu) {
        return;
      }
      if (Array.isArray(props.onContextmenu)) {
        props.onContextmenu.forEach((fn) => fn(e, row));
      } else {
        props.onContextmenu(e, row);
      }
    }
    function resolveValue(prop, arg) {
      if (typeof prop === "function") {
        return prop(arg);
      }
      return prop;
    }
    watch(() => props.data, () => {
      data.value = props.data ? [...props.data] : [];
    }, props.watchOptions);
    __expose({
      get $el() {
        return rootRef.value?.$el;
      },
      tableRef,
      tableApi
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(DefineRowTemplate), null, {
        default: withCtx(({ row, style }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<tr${ssrRenderAttr("data-selected", row.getIsSelected())}${ssrRenderAttr("data-selectable", !!props.onSelect || !!props.onHover || !!props.onContextmenu)}${ssrRenderAttr("data-expanded", row.getIsExpanded())}${ssrRenderAttr("role", props.onSelect ? "button" : void 0)}${ssrRenderAttr("tabindex", props.onSelect ? 0 : void 0)} data-slot="tr" class="${ssrRenderClass(ui.value.tr({
              class: [
                props.ui?.tr,
                resolveValue(unref(tableApi).options.meta?.class?.tr, row)
              ]
            }))}" style="${ssrRenderStyle([resolveValue(unref(tableApi).options.meta?.style?.tr, row), style])}"${_scopeId}><!--[-->`);
            ssrRenderList(row.getVisibleCells(), (cell) => {
              _push2(`<td${ssrRenderAttr("data-pinned", cell.column.getIsPinned())}${ssrRenderAttr("colspan", resolveValue(cell.column.columnDef.meta?.colspan?.td, cell))}${ssrRenderAttr("rowspan", resolveValue(cell.column.columnDef.meta?.rowspan?.td, cell))} data-slot="td" class="${ssrRenderClass(ui.value.td({
                class: [
                  props.ui?.td,
                  resolveValue(cell.column.columnDef.meta?.class?.td, cell)
                ],
                pinned: !!cell.column.getIsPinned()
              }))}" style="${ssrRenderStyle(resolveValue(cell.column.columnDef.meta?.style?.td, cell))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, `${cell.column.id}-cell`, mergeProps({ ref_for: true }, cell.getContext()), () => {
                _push2(ssrRenderComponent(unref(FlexRender), {
                  render: cell.column.columnDef.cell,
                  props: cell.getContext()
                }, null, _parent2, _scopeId));
              }, _push2, _parent2, _scopeId);
              _push2(`</td>`);
            });
            _push2(`<!--]--></tr>`);
            if (row.getIsExpanded()) {
              _push2(`<tr data-slot="tr" class="${ssrRenderClass(ui.value.tr({ class: [props.ui?.tr] }))}"${_scopeId}><td${ssrRenderAttr("colspan", row.getAllCells().length)} data-slot="td" class="${ssrRenderClass(ui.value.td({ class: [props.ui?.td] }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "expanded", { row }, null, _push2, _parent2, _scopeId);
              _push2(`</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("tr", {
                "data-selected": row.getIsSelected(),
                "data-selectable": !!props.onSelect || !!props.onHover || !!props.onContextmenu,
                "data-expanded": row.getIsExpanded(),
                role: props.onSelect ? "button" : void 0,
                tabindex: props.onSelect ? 0 : void 0,
                "data-slot": "tr",
                class: ui.value.tr({
                  class: [
                    props.ui?.tr,
                    resolveValue(unref(tableApi).options.meta?.class?.tr, row)
                  ]
                }),
                style: [resolveValue(unref(tableApi).options.meta?.style?.tr, row), style],
                onClick: ($event) => onRowSelect($event, row),
                onPointerenter: ($event) => onRowHover($event, row),
                onPointerleave: ($event) => onRowHover($event, null),
                onContextmenu: ($event) => onRowContextmenu($event, row)
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                  return openBlock(), createBlock("td", {
                    key: cell.id,
                    "data-pinned": cell.column.getIsPinned(),
                    colspan: resolveValue(cell.column.columnDef.meta?.colspan?.td, cell),
                    rowspan: resolveValue(cell.column.columnDef.meta?.rowspan?.td, cell),
                    "data-slot": "td",
                    class: ui.value.td({
                      class: [
                        props.ui?.td,
                        resolveValue(cell.column.columnDef.meta?.class?.td, cell)
                      ],
                      pinned: !!cell.column.getIsPinned()
                    }),
                    style: resolveValue(cell.column.columnDef.meta?.style?.td, cell)
                  }, [
                    renderSlot(_ctx.$slots, `${cell.column.id}-cell`, mergeProps({ ref_for: true }, cell.getContext()), () => [
                      createVNode(unref(FlexRender), {
                        render: cell.column.columnDef.cell,
                        props: cell.getContext()
                      }, null, 8, ["render", "props"])
                    ])
                  ], 14, ["data-pinned", "colspan", "rowspan"]);
                }), 128))
              ], 46, ["data-selected", "data-selectable", "data-expanded", "role", "tabindex", "onClick", "onPointerenter", "onPointerleave", "onContextmenu"]),
              row.getIsExpanded() ? (openBlock(), createBlock("tr", {
                key: 0,
                "data-slot": "tr",
                class: ui.value.tr({ class: [props.ui?.tr] })
              }, [
                createVNode("td", {
                  colspan: row.getAllCells().length,
                  "data-slot": "td",
                  class: ui.value.td({ class: [props.ui?.td] })
                }, [
                  renderSlot(_ctx.$slots, "expanded", { row })
                ], 10, ["colspan"])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(unref(DefineTableTemplate), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table data-slot="base" class="${ssrRenderClass(ui.value.base({ class: [props.ui?.base] }))}"${_scopeId}>`);
            if (__props.caption || !!slots.caption) {
              _push2(`<caption data-slot="caption" class="${ssrRenderClass(ui.value.caption({ class: [props.ui?.caption] }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "caption", {}, () => {
                _push2(`${ssrInterpolate(__props.caption)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</caption>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<thead data-slot="thead" class="${ssrRenderClass(ui.value.thead({ class: [props.ui?.thead] }))}"${_scopeId}><!--[-->`);
            ssrRenderList(unref(tableApi).getHeaderGroups(), (headerGroup) => {
              _push2(`<tr data-slot="tr" class="${ssrRenderClass(ui.value.tr({ class: [props.ui?.tr] }))}"${_scopeId}><!--[-->`);
              ssrRenderList(headerGroup.headers, (header) => {
                _push2(`<th${ssrRenderAttr("data-pinned", header.column.getIsPinned())}${ssrRenderAttr("scope", header.colSpan > 1 ? "colgroup" : "col")}${ssrRenderAttr("colspan", header.colSpan > 1 ? header.colSpan : void 0)}${ssrRenderAttr("rowspan", header.rowSpan > 1 ? header.rowSpan : void 0)} data-slot="th" class="${ssrRenderClass(ui.value.th({
                  class: [
                    props.ui?.th,
                    resolveValue(header.column.columnDef.meta?.class?.th, header)
                  ],
                  pinned: !!header.column.getIsPinned()
                }))}" style="${ssrRenderStyle(resolveValue(header.column.columnDef.meta?.style?.th, header))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, `${header.id}-header`, mergeProps({ ref_for: true }, header.getContext()), () => {
                  if (!header.isPlaceholder) {
                    _push2(ssrRenderComponent(unref(FlexRender), {
                      render: header.column.columnDef.header,
                      props: header.getContext()
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                }, _push2, _parent2, _scopeId);
                _push2(`</th>`);
              });
              _push2(`<!--]--></tr>`);
            });
            _push2(`<!--]--><tr data-slot="separator" class="${ssrRenderClass(ui.value.separator({ class: [props.ui?.separator] }))}"${_scopeId}></tr></thead><tbody data-slot="tbody" class="${ssrRenderClass(ui.value.tbody({ class: [props.ui?.tbody] }))}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "body-top", {}, null, _push2, _parent2, _scopeId);
            if (rows.value.length) {
              _push2(`<!--[-->`);
              if (unref(virtualizer)) {
                _push2(`<!--[-->`);
                ssrRenderList(unref(virtualizer).getVirtualItems(), (virtualRow, index) => {
                  _push2(ssrRenderComponent(unref(ReuseRowTemplate), {
                    row: rows.value[virtualRow.index],
                    style: {
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`
                    }
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              } else {
                _push2(`<!--[-->`);
                ssrRenderList(rows.value, (row) => {
                  _push2(ssrRenderComponent(unref(ReuseRowTemplate), {
                    key: row.id,
                    row
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              }
              _push2(`<!--]-->`);
            } else if (__props.loading && !!slots["loading"]) {
              _push2(`<tr${_scopeId}><td${ssrRenderAttr("colspan", unref(tableApi).getAllLeafColumns().length)} data-slot="loading" class="${ssrRenderClass(ui.value.loading({ class: props.ui?.loading }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "loading", {}, null, _push2, _parent2, _scopeId);
              _push2(`</td></tr>`);
            } else {
              _push2(`<tr${_scopeId}><td${ssrRenderAttr("colspan", unref(tableApi).getAllLeafColumns().length)} data-slot="empty" class="${ssrRenderClass(ui.value.empty({ class: props.ui?.empty }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "empty", {}, () => {
                _push2(`${ssrInterpolate(__props.empty || unref(t)("table.noData"))}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</td></tr>`);
            }
            ssrRenderSlot(_ctx.$slots, "body-bottom", {}, null, _push2, _parent2, _scopeId);
            _push2(`</tbody>`);
            if (hasFooter.value) {
              _push2(`<tfoot data-slot="tfoot" class="${ssrRenderClass(ui.value.tfoot({ class: [props.ui?.tfoot] }))}" style="${ssrRenderStyle(unref(virtualizer) ? {
                transform: `translateY(${unref(virtualizer).getTotalSize() - renderedSize.value}px)`
              } : void 0)}"${_scopeId}><tr data-slot="separator" class="${ssrRenderClass(ui.value.separator({ class: [props.ui?.separator] }))}"${_scopeId}></tr><!--[-->`);
              ssrRenderList(unref(tableApi).getFooterGroups(), (footerGroup) => {
                _push2(`<tr data-slot="tr" class="${ssrRenderClass(ui.value.tr({ class: [props.ui?.tr] }))}"${_scopeId}><!--[-->`);
                ssrRenderList(footerGroup.headers, (header) => {
                  _push2(`<th${ssrRenderAttr("data-pinned", header.column.getIsPinned())}${ssrRenderAttr("colspan", header.colSpan > 1 ? header.colSpan : void 0)}${ssrRenderAttr("rowspan", header.rowSpan > 1 ? header.rowSpan : void 0)} data-slot="th" class="${ssrRenderClass(ui.value.th({
                    class: [
                      props.ui?.th,
                      resolveValue(header.column.columnDef.meta?.class?.th, header)
                    ],
                    pinned: !!header.column.getIsPinned()
                  }))}" style="${ssrRenderStyle(resolveValue(header.column.columnDef.meta?.style?.th, header))}"${_scopeId}>`);
                  ssrRenderSlot(_ctx.$slots, `${header.id}-footer`, mergeProps({ ref_for: true }, header.getContext()), () => {
                    if (!header.isPlaceholder) {
                      _push2(ssrRenderComponent(unref(FlexRender), {
                        render: header.column.columnDef.footer,
                        props: header.getContext()
                      }, null, _parent2, _scopeId));
                    } else {
                      _push2(`<!---->`);
                    }
                  }, _push2, _parent2, _scopeId);
                  _push2(`</th>`);
                });
                _push2(`<!--]--></tr>`);
              });
              _push2(`<!--]--></tfoot>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</table>`);
          } else {
            return [
              createVNode("table", {
                ref_key: "tableRef",
                ref: tableRef,
                "data-slot": "base",
                class: ui.value.base({ class: [props.ui?.base] })
              }, [
                __props.caption || !!slots.caption ? (openBlock(), createBlock("caption", {
                  key: 0,
                  "data-slot": "caption",
                  class: ui.value.caption({ class: [props.ui?.caption] })
                }, [
                  renderSlot(_ctx.$slots, "caption", {}, () => [
                    createTextVNode(toDisplayString(__props.caption), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                createVNode("thead", {
                  "data-slot": "thead",
                  class: ui.value.thead({ class: [props.ui?.thead] })
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(tableApi).getHeaderGroups(), (headerGroup) => {
                    return openBlock(), createBlock("tr", {
                      key: headerGroup.id,
                      "data-slot": "tr",
                      class: ui.value.tr({ class: [props.ui?.tr] })
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                        return openBlock(), createBlock("th", {
                          key: header.id,
                          "data-pinned": header.column.getIsPinned(),
                          scope: header.colSpan > 1 ? "colgroup" : "col",
                          colspan: header.colSpan > 1 ? header.colSpan : void 0,
                          rowspan: header.rowSpan > 1 ? header.rowSpan : void 0,
                          "data-slot": "th",
                          class: ui.value.th({
                            class: [
                              props.ui?.th,
                              resolveValue(header.column.columnDef.meta?.class?.th, header)
                            ],
                            pinned: !!header.column.getIsPinned()
                          }),
                          style: resolveValue(header.column.columnDef.meta?.style?.th, header)
                        }, [
                          renderSlot(_ctx.$slots, `${header.id}-header`, mergeProps({ ref_for: true }, header.getContext()), () => [
                            !header.isPlaceholder ? (openBlock(), createBlock(unref(FlexRender), {
                              key: 0,
                              render: header.column.columnDef.header,
                              props: header.getContext()
                            }, null, 8, ["render", "props"])) : createCommentVNode("", true)
                          ])
                        ], 14, ["data-pinned", "scope", "colspan", "rowspan"]);
                      }), 128))
                    ], 2);
                  }), 128)),
                  createVNode("tr", {
                    "data-slot": "separator",
                    class: ui.value.separator({ class: [props.ui?.separator] })
                  }, null, 2)
                ], 2),
                createVNode("tbody", {
                  "data-slot": "tbody",
                  class: ui.value.tbody({ class: [props.ui?.tbody] })
                }, [
                  renderSlot(_ctx.$slots, "body-top"),
                  rows.value.length ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    unref(virtualizer) ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(virtualizer).getVirtualItems(), (virtualRow, index) => {
                      return openBlock(), createBlock(unref(ReuseRowTemplate), {
                        key: rows.value[virtualRow.index]?.id,
                        row: rows.value[virtualRow.index],
                        style: {
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`
                        }
                      }, null, 8, ["row", "style"]);
                    }), 128)) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(rows.value, (row) => {
                      return openBlock(), createBlock(unref(ReuseRowTemplate), {
                        key: row.id,
                        row
                      }, null, 8, ["row"]);
                    }), 128))
                  ], 64)) : __props.loading && !!slots["loading"] ? (openBlock(), createBlock("tr", { key: 1 }, [
                    createVNode("td", {
                      colspan: unref(tableApi).getAllLeafColumns().length,
                      "data-slot": "loading",
                      class: ui.value.loading({ class: props.ui?.loading })
                    }, [
                      renderSlot(_ctx.$slots, "loading")
                    ], 10, ["colspan"])
                  ])) : (openBlock(), createBlock("tr", { key: 2 }, [
                    createVNode("td", {
                      colspan: unref(tableApi).getAllLeafColumns().length,
                      "data-slot": "empty",
                      class: ui.value.empty({ class: props.ui?.empty })
                    }, [
                      renderSlot(_ctx.$slots, "empty", {}, () => [
                        createTextVNode(toDisplayString(__props.empty || unref(t)("table.noData")), 1)
                      ])
                    ], 10, ["colspan"])
                  ])),
                  renderSlot(_ctx.$slots, "body-bottom")
                ], 2),
                hasFooter.value ? (openBlock(), createBlock("tfoot", {
                  key: 1,
                  "data-slot": "tfoot",
                  class: ui.value.tfoot({ class: [props.ui?.tfoot] }),
                  style: unref(virtualizer) ? {
                    transform: `translateY(${unref(virtualizer).getTotalSize() - renderedSize.value}px)`
                  } : void 0
                }, [
                  createVNode("tr", {
                    "data-slot": "separator",
                    class: ui.value.separator({ class: [props.ui?.separator] })
                  }, null, 2),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(tableApi).getFooterGroups(), (footerGroup) => {
                    return openBlock(), createBlock("tr", {
                      key: footerGroup.id,
                      "data-slot": "tr",
                      class: ui.value.tr({ class: [props.ui?.tr] })
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(footerGroup.headers, (header) => {
                        return openBlock(), createBlock("th", {
                          key: header.id,
                          "data-pinned": header.column.getIsPinned(),
                          colspan: header.colSpan > 1 ? header.colSpan : void 0,
                          rowspan: header.rowSpan > 1 ? header.rowSpan : void 0,
                          "data-slot": "th",
                          class: ui.value.th({
                            class: [
                              props.ui?.th,
                              resolveValue(header.column.columnDef.meta?.class?.th, header)
                            ],
                            pinned: !!header.column.getIsPinned()
                          }),
                          style: resolveValue(header.column.columnDef.meta?.style?.th, header)
                        }, [
                          renderSlot(_ctx.$slots, `${header.id}-footer`, mergeProps({ ref_for: true }, header.getContext()), () => [
                            !header.isPlaceholder ? (openBlock(), createBlock(unref(FlexRender), {
                              key: 0,
                              render: header.column.columnDef.footer,
                              props: header.getContext()
                            }, null, 8, ["render", "props"])) : createCommentVNode("", true)
                          ])
                        ], 14, ["data-pinned", "colspan", "rowspan"]);
                      }), 128))
                    ], 2);
                  }), 128))
                ], 6)) : createCommentVNode("", true)
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        ref_key: "rootRef",
        ref: rootRef,
        as: __props.as
      }, _ctx.$attrs, {
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(virtualizer)) {
              _push2(`<div style="${ssrRenderStyle({
                height: `${unref(virtualizer).getTotalSize()}px`
              })}"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ReuseTableTemplate), null, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(ssrRenderComponent(unref(ReuseTableTemplate), null, null, _parent2, _scopeId));
            }
          } else {
            return [
              unref(virtualizer) ? (openBlock(), createBlock("div", {
                key: 0,
                style: {
                  height: `${unref(virtualizer).getTotalSize()}px`
                }
              }, [
                createVNode(unref(ReuseTableTemplate))
              ], 4)) : (openBlock(), createBlock(unref(ReuseTableTemplate), { key: 1 }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parse_bec1c26f5da3e0eb7eb8934493334778/node_modules/@nuxt/ui/dist/runtime/components/Table.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const now = dayjs().format("YYYY-MM-DD");
    const list = ref([]);
    const isKilled = (needKillTimes, killTimes) => {
      console.log(needKillTimes, killTimes);
      return Number(needKillTimes) <= Number(killTimes);
    };
    const hasKilled = computed(() => {
      return list.value?.filter((item) => isKilled(item.needKillTimes, item.killTimes));
    });
    const toKill = computed(() => {
      return list.value?.filter((item) => !isKilled(item.needKillTimes, item.killTimes));
    });
    const columns = [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => `${row.getValue("id")}`
      },
      {
        accessorKey: "content",
        header: "小怪兽",
        cell: ({ row }) => `${row.getValue("content")}`
      },
      {
        accessorKey: "needKillTimes",
        header: "状态",
        cell: ({ row }) => `${isKilled(row.getValue("needKillTimes"), row.getValue("killTimes")) ? "已消灭" : "待消灭"}`
      },
      {
        accessorKey: "addAt",
        header: "诞生时间",
        cell: ({ row }) => `${dayjs(row.getValue("addAt")).format("YYYY-MM-DD")}`
      },
      {
        accessorKey: "killTimes",
        header: "被消灭次数",
        cell: ({ row }) => `${Number(row.getValue("killTimes"))}`
      }
    ];
    const goToKill = () => {
      useState("to-kill", () => toKill);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$f;
      const _component_UTable = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-8 py-4 mx-auto" }, _attrs))}><h1 class="text-lg font-bold text-success"> 欢迎回来，童童！<span>${ssrInterpolate(unref(now))}</span></h1><span>截止目前为止，你已经kill了<span class="text-success font-bold text-2xl">${ssrInterpolate(hasKilled.value.length)}</span>个小怪兽，真棒！</span><span>还有</span><span class="text-danger font-bold text-2xl">${ssrInterpolate(toKill.value.length)}</span>个小怪兽等待你去击败，加油呀！`);
      _push(ssrRenderComponent(_component_UButton, {
        class: "mx-4 my-4",
        to: "/kill",
        onClick: goToKill
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`开启战斗之旅！`);
          } else {
            return [
              createTextVNode("开启战斗之旅！")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="mt-4"> 小怪兽成员表<span class="ml-4">${ssrInterpolate(list.value?.length)}</span>个`);
      _push(ssrRenderComponent(_component_UButton, {
        class: "mx-4 my-4",
        to: "/add"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`去添加`);
          } else {
            return [
              createTextVNode("去添加")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h1>`);
      _push(ssrRenderComponent(_component_UTable, {
        data: toKill.value,
        columns,
        class: "flex-1 mb-4"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UTable, {
        data: hasKilled.value,
        columns,
        class: "flex-1"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Cx2QYqt-.mjs.map
