(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Frontend_web/src/shared/component/StatCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatBox",
    ()=>StatBox,
    "SubTitleText",
    ()=>SubTitleText,
    "TextSatistics",
    ()=>TextSatistics,
    "TitleText",
    ()=>TitleText,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Stack/Stack.js [app-client] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/styles/styled.js [app-client] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
"use client";
;
;
const TitleText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"])(({ theme })=>({
        fontSize: "32px",
        color: theme.palette.text.primary,
        lineHeight: 1.2,
        marginTop: "32px"
    }));
_c = TitleText;
const SubTitleText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"])(({ theme })=>({
        fontSize: "16px",
        fontWeight: "500",
        paddingBottom: "32px"
    }));
_c1 = SubTitleText;
const TextSatistics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"])({
    color: "#0068FF",
    fontSize: "64px",
    margin: 0,
    lineHeight: 1
});
_c2 = TextSatistics;
const StatBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])({
    height: "100%",
    backgroundColor: "#fff",
    textAlign: "left",
    padding: "0px 32px"
});
_c3 = StatBox;
const StatGrid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"])({
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    maxHeight: "350px"
});
_c4 = StatGrid;
const StatCard = ({ title, subTitle, titleColor = "text.secondary", leftHighlight, rightHighlight, size = 6 })=>{
    const hasRight = Boolean(rightHighlight);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatGrid, {
        size: size,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBox, {
            sx: {
                height: "100%"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                height: "100%",
                justifyContent: "space-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TitleText, {
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/shared/component/StatCard.tsx",
                                lineNumber: 67,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubTitleText, {
                                color: titleColor,
                                children: subTitle
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/shared/component/StatCard.tsx",
                                lineNumber: 68,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Frontend_web/src/shared/component/StatCard.tsx",
                        lineNumber: 66,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                        container: true,
                        width: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                size: hasRight ? 6 : 12,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextSatistics, {
                                            children: leftHighlight.value
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/shared/component/StatCard.tsx",
                                            lineNumber: 76,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubTitleText, {
                                            color: "text.primary",
                                            children: leftHighlight.label
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/shared/component/StatCard.tsx",
                                            lineNumber: 77,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Frontend_web/src/shared/component/StatCard.tsx",
                                    lineNumber: 75,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/shared/component/StatCard.tsx",
                                lineNumber: 74,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            hasRight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                size: 6,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextSatistics, {
                                            children: rightHighlight.value
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/shared/component/StatCard.tsx",
                                            lineNumber: 86,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubTitleText, {
                                            color: "text.primary",
                                            children: rightHighlight.label
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/shared/component/StatCard.tsx",
                                            lineNumber: 87,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Frontend_web/src/shared/component/StatCard.tsx",
                                    lineNumber: 85,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/shared/component/StatCard.tsx",
                                lineNumber: 84,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Frontend_web/src/shared/component/StatCard.tsx",
                        lineNumber: 73,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Frontend_web/src/shared/component/StatCard.tsx",
                lineNumber: 64,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/Frontend_web/src/shared/component/StatCard.tsx",
            lineNumber: 63,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Frontend_web/src/shared/component/StatCard.tsx",
        lineNumber: 62,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c5 = StatCard;
const __TURBOPACK__default__export__ = StatCard;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "TitleText");
__turbopack_context__.k.register(_c1, "SubTitleText");
__turbopack_context__.k.register(_c2, "TextSatistics");
__turbopack_context__.k.register(_c3, "StatBox");
__turbopack_context__.k.register(_c4, "StatGrid");
__turbopack_context__.k.register(_c5, "StatCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Frontend_web/src/shared/component/IconAppCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BoxIcon",
    ()=>BoxIcon,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Card/Card.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/styles/styled.js [app-client] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/next/image.js [app-client] (ecmascript)");
"use client";
;
;
;
const CardIconApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"])({
    cursor: "pointer",
    minHeight: 280,
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    borderRadius: "0px",
    boxShadow: "none",
    border: "1px solid #f4f4f5",
    "&:hover": {
        boxShadow: "8px 8px 24px rgba(37, 99, 235, 0.15)"
    }
});
_c = CardIconApp;
const BoxIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])({
    aspectRatio: "1 / 1",
    width: "fit-content"
});
_c1 = BoxIcon;
const TitleText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"])({
    marginBottom: "0px"
});
_c2 = TitleText;
const IconAppCard = ({ path, title, width = 60, height = 60, subTitle })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardIconApp, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BoxIcon, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: path,
                    alt: title,
                    width: width,
                    height: height
                }, void 0, false, {
                    fileName: "[project]/Frontend_web/src/shared/component/IconAppCard.tsx",
                    lineNumber: 40,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Frontend_web/src/shared/component/IconAppCard.tsx",
                lineNumber: 39,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TitleText, {
                color: "text.primary",
                variant: "h5",
                children: title
            }, void 0, false, {
                fileName: "[project]/Frontend_web/src/shared/component/IconAppCard.tsx",
                lineNumber: 43,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                color: "text.secondary",
                variant: "body1",
                children: subTitle
            }, void 0, false, {
                fileName: "[project]/Frontend_web/src/shared/component/IconAppCard.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Frontend_web/src/shared/component/IconAppCard.tsx",
        lineNumber: 38,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c3 = IconAppCard;
const __TURBOPACK__default__export__ = IconAppCard;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "CardIconApp");
__turbopack_context__.k.register(_c1, "BoxIcon");
__turbopack_context__.k.register(_c2, "TitleText");
__turbopack_context__.k.register(_c3, "IconAppCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Frontend_web/src/common/utilities/hook/trans.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTrans",
    ()=>useTrans
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useTrans = ()=>{
    _s();
    const { t, ready } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    return (key, options)=>{
        try {
            // Return key if translation is not ready
            if (!ready) {
                return key;
            }
            const result = options ? t(key, options) : t(key);
            // Ensure we always return a string
            if (typeof result === 'string') {
                return result;
            }
            // If result is an object (from interpolation), convert to string
            return String(result);
        } catch (error) {
            console.warn(`Translation error for key "${key}":`, error);
            return key;
        }
    };
};
_s(useTrans, "tme6M53CPwzNDDAqQKqW2SfZclU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BoxMedia",
    ()=>BoxMedia,
    "CardContentStyled",
    ()=>CardContentStyled,
    "CardImageSection",
    ()=>CardImageSection,
    "CardMediaStyled",
    ()=>CardMediaStyled,
    "ContentSection",
    ()=>ContentSection,
    "HeadingSection",
    ()=>HeadingSection,
    "ImageSubTitle",
    ()=>ImageSubTitle,
    "ImageTextSection",
    ()=>ImageTextSection,
    "ImageTitle",
    ()=>ImageTitle,
    "SubHeadingSection",
    ()=>SubHeadingSection,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Card/Card.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/CardContent/CardContent.js [app-client] (ecmascript) <export default as CardContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardMedia$2f$CardMedia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardMedia$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/CardMedia/CardMedia.js [app-client] (ecmascript) <export default as CardMedia>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Container$2f$Container$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Container$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Container/Container.js [app-client] (ecmascript) <export default as Container>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Stack/Stack.js [app-client] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/styles/styled.js [app-client] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$shared$2f$component$2f$StatCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/src/shared/component/StatCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$shared$2f$component$2f$IconAppCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/src/shared/component/IconAppCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$common$2f$utilities$2f$hook$2f$trans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/src/common/utilities/hook/trans.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const ContentSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"])({
    alignItems: 'center',
    textAlign: 'center',
    padding: "24px"
});
_c = ContentSection;
const HeadingSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"])({
    color: '#292929',
    alignItems: 'center',
    justifyItems: 'center'
});
_c1 = HeadingSection;
const SubHeadingSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"])({
    color: '#292929',
    lineHeight: 1.25,
    fontWeight: 500
});
_c2 = SubHeadingSection;
const StackVideo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"])({
    margin: '60px 0px'
});
_c3 = StackVideo;
const BoxMedia = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
    position: "relative",
    minHeight: "300px",
    width: "100%",
    overflow: "hidden",
    borderRadius: "8px",
    cursor: "pointer",
    "& img": {
        transition: "transform 0.4s ease",
        objectFit: "cover"
    },
    "&:hover img": {
        transform: "scale(1.1)"
    },
    "& video": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform 0.4s ease"
    },
    "&:hover video": {
        transform: "scale(1.1)"
    }
});
_c4 = BoxMedia;
const CardImageSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"])({
    width: "100%",
    borderRadius: 0,
    boxShadow: "none"
});
_c5 = CardImageSection;
const CardContentStyled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"])({
    textAlign: "center",
    paddingTop: "16px"
});
_c6 = CardContentStyled;
const ImageTextSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
    paddingTop: "24px"
});
_c7 = ImageTextSection;
const ImageTitle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"])({
    marginBottom: "0px"
});
_c8 = ImageTitle;
const ImageSubTitle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"])(({ theme })=>({
        color: theme.palette.text.secondary,
        paddingTop: "16px"
    }));
_c9 = ImageSubTitle;
const ContentTrustSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(ContentSection)({
    backgroundColor: "#F6F7F9",
    minHeight: "300px",
    padding: "114px 24px"
});
_c10 = ContentTrustSection;
const BoxMediaNoRadius = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(BoxMedia)({
    borderRadius: "0px",
    minHeight: "auto"
});
_c11 = BoxMediaNoRadius;
const CardMediaStyled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardMedia$2f$CardMedia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardMedia$3e$__["CardMedia"])({
    borderRadius: "8px"
});
_c12 = CardMediaStyled;
const RegisButton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"])(({ theme })=>({
        minWidth: "270px",
        borderRadius: "32px",
        backgroundColor: "#2563eb",
        color: "#fff",
        fontSize: "17px",
        fontWeight: 500,
        letterSpacing: 1,
        marginTop: "24px",
        "&:hover": {
            backgroundColor: "#294fcc"
        }
    }));
_c13 = RegisButton;
const HomeTab = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$common$2f$utilities$2f$hook$2f$trans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrans"])();
    const handleClickChangePage = ()=>{
        router.push('/mainsite');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
        gap: 7,
        "data-testid": "home-tab",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentSection, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Container$2f$Container$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Container$3e$__["Container"], {
                        maxWidth: "md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                alignItems: 'center',
                                spacing: 2,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "h3",
                                        sx: {
                                            fontWeight: 500,
                                            lineHeight: 1.1,
                                            textAlign: "center",
                                            maxWidth: 900,
                                            wordBreak: "keep-all"
                                        },
                                        children: [
                                            t("LANDING.HEADER"),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#2563eb"
                                                },
                                                children: t("LANDING.INTERNET")
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                lineNumber: 127,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            ",",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                lineNumber: 127,
                                                columnNumber: 91
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            t("LANDING.CHANGE"),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#14b8a6"
                                                },
                                                children: t("LANDING.LIFE")
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                lineNumber: 129,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " ",
                                            t("LANDING.VIETNAM")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                        lineNumber: 117,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubHeadingSection, {
                                        variant: "h6",
                                        children: t("LANDING.SUBTITLE")
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                        lineNumber: 132,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                lineNumber: 116,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RegisButton, {
                                onClick: ()=>handleClickChangePage(),
                                children: t("LANDING.CTA_BUTTON")
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                lineNumber: 137,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                        lineNumber: 115,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StackVideo, {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                            width: "100%",
                            src: "https://zalo-site.zadn.vn/videos/home-vi.mp4",
                            autoPlay: true,
                            muted: true,
                            loop: true,
                            playsInline: true
                        }, void 0, false, {
                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                            lineNumber: 141,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                        lineNumber: 140,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                lineNumber: 114,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentSection, {
                "data-testid": "home-tab-effort-section",
                spacing: 5,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingSection, {
                                variant: "h4",
                                children: t("LANDING.EFFORTS_TITLE")
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                lineNumber: 146,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubHeadingSection, {
                                variant: "h6",
                                children: t("LANDING.EFFORTS_SUBTITLE")
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                lineNumber: 147,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                        lineNumber: 145,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        container: true,
                        spacing: 4,
                        sx: {
                            mt: 2,
                            width: "100%"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                size: {
                                    xs: 12,
                                    md: 4
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardImageSection, {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardMediaStyled, {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BoxMedia, {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "/images/pic1.webp",
                                                    alt: "pic1",
                                                    fill: true,
                                                    style: {
                                                        objectFit: "cover"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                lineNumber: 156,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 155,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardContentStyled, {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageTextSection, {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageTitle, {
                                                        variant: "h5",
                                                        gutterBottom: true,
                                                        children: t("LANDING.PRODUCT_SERVICE")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageSubTitle, {
                                                        variant: "body1",
                                                        children: t("LANDING.PRODUCT_SERVICE_DESC")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                        lineNumber: 171,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                lineNumber: 167,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 166,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                    lineNumber: 154,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                lineNumber: 153,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                size: {
                                    xs: 12,
                                    md: 4
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardImageSection, {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardMediaStyled, {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BoxMedia, {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "/images/pic2.webp",
                                                    alt: "pic2",
                                                    fill: true,
                                                    style: {
                                                        objectFit: "cover"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                lineNumber: 182,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 181,
                                            columnNumber: 40
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageTextSection, {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageTitle, {
                                                        variant: "h5",
                                                        gutterBottom: true,
                                                        children: t("LANDING.AI_TECH")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageSubTitle, {
                                                        variant: "body1",
                                                        children: t("LANDING.AI_TECH_DESC")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                        lineNumber: 197,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                lineNumber: 193,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 192,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                    lineNumber: 181,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                lineNumber: 180,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                size: {
                                    xs: 12,
                                    md: 4
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardImageSection, {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardMedia$2f$CardMedia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardMedia$3e$__["CardMedia"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BoxMedia, {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "/images/pic3.webp",
                                                    alt: "pic3",
                                                    fill: true,
                                                    style: {
                                                        objectFit: "cover"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                lineNumber: 209,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 208,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageTextSection, {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageTitle, {
                                                        variant: "h5",
                                                        gutterBottom: true,
                                                        children: t("LANDING.IMPACT_RESPONSIBILITY")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageSubTitle, {
                                                        variant: "body1",
                                                        children: t("LANDING.IMPACT_RESPONSIBILITY_DESC")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                        lineNumber: 224,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                lineNumber: 220,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 219,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                    lineNumber: 207,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                lineNumber: 206,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                        lineNumber: 151,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                lineNumber: 144,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentTrustSection, {
                spacing: 5,
                "data-testid": "home-tab-trust-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        pb: 3,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingSection, {
                                variant: "h4",
                                children: t("LANDING.TRUST_TITLE")
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                lineNumber: 235,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Container$2f$Container$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Container$3e$__["Container"], {
                                maxWidth: "md",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubHeadingSection, {
                                    variant: "h6",
                                    children: t("LANDING.TRUST_SUBTITLE")
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                    lineNumber: 237,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                lineNumber: 236,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                        lineNumber: 234,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        direction: "column",
                        width: "100%",
                        container: true,
                        spacing: 5,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                container: true,
                                alignItems: "stretch",
                                spacing: 5,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: 6,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            sx: {
                                                height: "100%"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BoxMediaNoRadius, {
                                                height: 350,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpeople.3932e46d.png&w=3840&q=75",
                                                    fill: true,
                                                    alt: ""
                                                }, void 0, false, {
                                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                lineNumber: 247,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 246,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                        lineNumber: 245,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: 6,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$shared$2f$component$2f$StatCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            size: 6,
                                            title: t("LANDING.ZALO"),
                                            subTitle: t("LANDING.ZALO_DESC"),
                                            leftHighlight: {
                                                value: "2B+",
                                                label: t("LANDING.MESSAGES_PER_DAY")
                                            },
                                            rightHighlight: {
                                                value: "79M+",
                                                label: t("LANDING.USERS")
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 258,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                        lineNumber: 257,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                lineNumber: 244,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                container: true,
                                sx: {
                                    alignItems: "stretch"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: 3,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BoxMediaNoRadius, {
                                            sx: {
                                                height: "100%"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                fill: true,
                                                src: "https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkiki.d715d09c.webp&w=3840&q=75",
                                                alt: ""
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                lineNumber: 269,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 268,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                        lineNumber: 267,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: 3,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$shared$2f$component$2f$StatCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            title: t("LANDING.KIKI"),
                                            subTitle: t("LANDING.KIKI_DESC"),
                                            leftHighlight: {
                                                value: "1M+",
                                                label: t("LANDING.INSTALLED")
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 278,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                        lineNumber: 277,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: 3,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                            src: "https://zalo-site.zadn.vn/videos/zalo-video-thumb.mp4",
                                            autoPlay: true,
                                            muted: true,
                                            loop: true,
                                            playsInline: true,
                                            width: "100%"
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 286,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                        lineNumber: 285,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: 3,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$shared$2f$component$2f$StatCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            title: t("LANDING.ZALO_VIDEO"),
                                            leftHighlight: {
                                                value: "40M+",
                                                label: t("LANDING.USERS")
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 297,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                        lineNumber: 296,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                lineNumber: 266,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                        lineNumber: 243,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                lineNumber: 233,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentSection, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                    width: "100%",
                    spacing: 5,
                    marginTop: 4,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            container: true,
                            size: 12,
                            textAlign: "left",
                            spacing: 5,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    paddingRight: 4,
                                    size: 4,
                                    children: [
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingSection, {
                                            variant: "h4",
                                            children: t("LANDING.ECOSYSTEM_TITLE")
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 309,
                                            columnNumber: 54
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                    lineNumber: 309,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    size: 4,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$shared$2f$component$2f$IconAppCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        path: "https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-zalo.d8547d8a.png&w=640&q=75",
                                        title: t("LANDING.ZALO"),
                                        subTitle: t("LANDING.ZALO_DESC")
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                        lineNumber: 312,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                    lineNumber: 310,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    size: 4,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$shared$2f$component$2f$IconAppCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        path: "https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-zing-mp3.f64af3c6.png&w=640&q=75",
                                        title: t("LANDING.ZING_MP3"),
                                        subTitle: t("LANDING.ZING_MP3_DESC")
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                        lineNumber: 318,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                    lineNumber: 317,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                            lineNumber: 308,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            container: true,
                            size: 12,
                            spacing: 5,
                            textAlign: "left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    size: 4,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$shared$2f$component$2f$IconAppCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        path: "https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-bao-moi.a8318a04.png&w=640&q=75",
                                        title: t("LANDING.BAO_MOI"),
                                        subTitle: t("LANDING.BAO_MOI_DESC")
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                        lineNumber: 327,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                    lineNumber: 326,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    size: 4,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$shared$2f$component$2f$IconAppCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        path: "https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-kiki.d528c587.png&w=640&q=75",
                                        title: t("LANDING.KIKI"),
                                        subTitle: t("LANDING.KIKI_DESC")
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                        lineNumber: 332,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                    lineNumber: 331,
                                    columnNumber: 28
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    size: 4,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$shared$2f$component$2f$IconAppCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        path: "https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-zalo-video.5d7c7b34.png&w=640&q=75",
                                        title: t("LANDING.ZALO_VIDEO"),
                                        subTitle: t("LANDING.ZALO_VIDEO_DESC")
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                        lineNumber: 337,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                    lineNumber: 336,
                                    columnNumber: 28
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                            lineNumber: 325,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                    lineNumber: 307,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                lineNumber: 306,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentSection, {
                spacing: 7,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Container$2f$Container$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Container$3e$__["Container"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingSection, {
                                variant: "h4",
                                children: t("LANDING.UPDATES_TITLE")
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                lineNumber: 348,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubHeadingSection, {
                                variant: "h6",
                                children: t("LANDING.UPDATES_SUBTITLE")
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                lineNumber: 349,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                        lineNumber: 347,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        width: "100%",
                        alignItems: "stretch",
                        container: true,
                        spacing: 5,
                        size: 12,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                size: 8.5,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                    spacing: 2,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BoxMediaNoRadius, {
                                            height: 550,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                fill: true,
                                                src: "https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fzalo-sos.1f373bf5.png&w=3840&q=75",
                                                alt: ""
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                lineNumber: 356,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 355,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingSection, {
                                            textAlign: "left",
                                            variant: "h5",
                                            children: t("LANDING.ZALO_SOS")
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 362,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                    lineNumber: 354,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                lineNumber: 353,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                size: 3.5,
                                container: true,
                                direction: "column",
                                height: "100%",
                                spacing: 2,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                            spacing: 2,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BoxMediaNoRadius, {
                                                    height: 200,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        fill: true,
                                                        src: "https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fzalo-ai-llm-vietnam.e3fee334.png&w=1920&q=75",
                                                        alt: ""
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                        lineNumber: 376,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                    lineNumber: 375,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingSection, {
                                                    textAlign: "left",
                                                    variant: "h5",
                                                    children: t("LANDING.ZALO_LLM")
                                                }, void 0, false, {
                                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                    lineNumber: 383,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 374,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                        lineNumber: 373,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                            spacing: 2,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BoxMediaNoRadius, {
                                                    height: 200,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        fill: true,
                                                        src: "https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fzalo-ai-assistant.f438edbe.png&w=3840&q=75",
                                                        alt: ""
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                        lineNumber: 392,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                    lineNumber: 391,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeadingSection, {
                                                    textAlign: "left",
                                                    variant: "h5",
                                                    children: t("LANDING.ZALO_ASSISTANT")
                                                }, void 0, false, {
                                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                                    lineNumber: 399,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                            lineNumber: 390,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                        lineNumber: 389,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                                lineNumber: 366,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                        lineNumber: 352,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                lineNumber: 346,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContentSection, {}, void 0, false, {
                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
                lineNumber: 408,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx",
        lineNumber: 113,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
};
_s(HomeTab, "1EpRZUczlxNJ9sStpCV+/lV2W5Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$common$2f$utilities$2f$hook$2f$trans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrans"]
    ];
});
_c14 = HomeTab;
const __TURBOPACK__default__export__ = HomeTab;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14;
__turbopack_context__.k.register(_c, "ContentSection");
__turbopack_context__.k.register(_c1, "HeadingSection");
__turbopack_context__.k.register(_c2, "SubHeadingSection");
__turbopack_context__.k.register(_c3, "StackVideo");
__turbopack_context__.k.register(_c4, "BoxMedia");
__turbopack_context__.k.register(_c5, "CardImageSection");
__turbopack_context__.k.register(_c6, "CardContentStyled");
__turbopack_context__.k.register(_c7, "ImageTextSection");
__turbopack_context__.k.register(_c8, "ImageTitle");
__turbopack_context__.k.register(_c9, "ImageSubTitle");
__turbopack_context__.k.register(_c10, "ContentTrustSection");
__turbopack_context__.k.register(_c11, "BoxMediaNoRadius");
__turbopack_context__.k.register(_c12, "CardMediaStyled");
__turbopack_context__.k.register(_c13, "RegisButton");
__turbopack_context__.k.register(_c14, "HomeTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/CardContent/CardContent.js [app-client] (ecmascript) <export default as CardContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardMedia$2f$CardMedia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardMedia$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/CardMedia/CardMedia.js [app-client] (ecmascript) <export default as CardMedia>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Container$2f$Container$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Container$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Container/Container.js [app-client] (ecmascript) <export default as Container>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Stack/Stack.js [app-client] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/styles/styled.js [app-client] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$common$2f$utilities$2f$hook$2f$trans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/src/common/utilities/hook/trans.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const GridMedia = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"])({
    border: "1px solid #F4F4F5",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px"
});
_c = GridMedia;
const ImaggTitleLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageTitle"])({
    textAlign: "left"
});
_c1 = ImaggTitleLeft;
const ImaggSubTitleLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageSubTitle"])({
    textAlign: "left"
});
_c2 = ImaggSubTitleLeft;
const ProductTab = ()=>{
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$common$2f$utilities$2f$hook$2f$trans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrans"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
        gap: 7,
        "data-testid": "home-tab",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContentSection"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Container$2f$Container$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Container$3e$__["Container"], {
                    maxWidth: "lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                        alignItems: 'center',
                        spacing: 2,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadingSection"], {
                                variant: "h3",
                                children: t("LANDING.PRODUCT_TITLE")
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                lineNumber: 24,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubHeadingSection"], {
                                padding: "0px 80px",
                                variant: "body1",
                                children: [
                                    t("LANDING.PRODUCT_SUBTITLE"),
                                    "                     "
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                lineNumber: 26,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                        lineNumber: 23,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                    lineNumber: 22,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContentSection"], {
                spacing: 5,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                        container: true,
                        size: 12,
                        spacing: 5,
                        sx: {
                            mt: 2,
                            width: "100%"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GridMedia, {
                                size: 4,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardImageSection"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardMediaStyled"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxMedia"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                    src: "https://zalo-site.zadn.vn/videos/product-zalo-thumb.mp4",
                                                    autoPlay: true,
                                                    muted: true,
                                                    loop: true,
                                                    playsInline: true
                                                }, void 0, false, {
                                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                    lineNumber: 41,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                lineNumber: 40,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                            lineNumber: 39,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContentStyled"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageTextSection"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImaggTitleLeft, {
                                                        variant: "h5",
                                                        gutterBottom: true,
                                                        children: t("LANDING.ZALO")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                        lineNumber: 47,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImaggSubTitleLeft, {
                                                        variant: "body1",
                                                        children: [
                                                            t("LANDING.ZALO_APP_DESC"),
                                                            "                                "
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                        lineNumber: 50,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                lineNumber: 46,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                            lineNumber: 45,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                    lineNumber: 38,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                lineNumber: 37,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GridMedia, {
                                size: 4,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardImageSection"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardMediaStyled"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxMedia"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fthumb-zing-mp3.8c320140.png&w=1920&q=75",
                                                    alt: "pic2",
                                                    fill: true,
                                                    style: {
                                                        objectFit: "cover"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                    lineNumber: 61,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                lineNumber: 60,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                            lineNumber: 59,
                                            columnNumber: 40
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageTextSection"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImaggTitleLeft, {
                                                        variant: "h5",
                                                        gutterBottom: true,
                                                        children: t("LANDING.ZING_MP3")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                        lineNumber: 72,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImaggSubTitleLeft, {
                                                        variant: "body1",
                                                        children: [
                                                            t("LANDING.ZING_MP3_PRODUCT_DESC"),
                                                            "                                "
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                        lineNumber: 75,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                lineNumber: 71,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                            lineNumber: 70,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                    lineNumber: 59,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                lineNumber: 58,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GridMedia, {
                                size: 4,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardImageSection"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardMedia$2f$CardMedia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardMedia$3e$__["CardMedia"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxMedia"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                    src: "https://zalo-site.zadn.vn/videos/product-zalo-video-thumb.mp4",
                                                    autoPlay: true,
                                                    muted: true,
                                                    loop: true,
                                                    playsInline: true
                                                }, void 0, false, {
                                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                lineNumber: 86,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                            lineNumber: 85,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageTextSection"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImaggTitleLeft, {
                                                        variant: "h5",
                                                        gutterBottom: true,
                                                        children: t("LANDING.ZALO_VIDEO")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImaggSubTitleLeft, {
                                                        variant: "body1",
                                                        children: [
                                                            t("LANDING.ZAO_VIDEO_DESC"),
                                                            "                                "
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                lineNumber: 92,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                            lineNumber: 91,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                    lineNumber: 84,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                lineNumber: 83,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                        lineNumber: 35,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                        container: true,
                        size: 12,
                        spacing: 5,
                        sx: {
                            mt: 2,
                            width: "100%"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GridMedia, {
                                size: 4,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardImageSection"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardMediaStyled"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxMedia"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fthumb-baomoi.f3bc3350.png&w=3840&q=75",
                                                    alt: "pic2",
                                                    fill: true,
                                                    style: {
                                                        objectFit: "cover"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                lineNumber: 108,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                            lineNumber: 107,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageTextSection"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImaggTitleLeft, {
                                                        variant: "h5",
                                                        gutterBottom: true,
                                                        children: t("LANDING.BAO_MOI")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                        lineNumber: 120,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImaggSubTitleLeft, {
                                                        variant: "body1",
                                                        children: [
                                                            t("LANDING.BAO_MOI_PRODUCT_DESC"),
                                                            "                                    "
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                lineNumber: 119,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                            lineNumber: 118,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                    lineNumber: 106,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                lineNumber: 105,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GridMedia, {
                                size: 4,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardImageSection"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardMediaStyled"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxMedia"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                    src: "https://zalo-site.zadn.vn/videos/product-kiki-thumb.mp4",
                                                    autoPlay: true,
                                                    muted: true,
                                                    loop: true,
                                                    playsInline: true
                                                }, void 0, false, {
                                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                lineNumber: 133,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                            lineNumber: 132,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContentStyled"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageTextSection"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImaggTitleLeft, {
                                                        variant: "h5",
                                                        gutterBottom: true,
                                                        children: t("LANDING.KIKI")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImaggSubTitleLeft, {
                                                        variant: "body1",
                                                        children: [
                                                            t("LANDING.KIKI_PRODUCT_DESC"),
                                                            "                                    "
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                lineNumber: 139,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                            lineNumber: 138,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                    lineNumber: 131,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                lineNumber: 130,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GridMedia, {
                                size: 4,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardImageSection"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardMediaStyled"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxMedia"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fthumb-laban-key.7c9f5332.png&w=1920&q=75",
                                                    alt: "pic2",
                                                    fill: true,
                                                    style: {
                                                        objectFit: "cover"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                lineNumber: 156,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                            lineNumber: 155,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageTextSection"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImaggTitleLeft, {
                                                        variant: "h5",
                                                        gutterBottom: true,
                                                        children: t("LANDING.LABAN_KEY")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImaggSubTitleLeft, {
                                                        variant: "body1",
                                                        children: [
                                                            t("LANDING.LABAN_KEY_DESC"),
                                                            "                                    "
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                        lineNumber: 171,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                lineNumber: 167,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                            lineNumber: 166,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                    lineNumber: 154,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                lineNumber: 153,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                        lineNumber: 103,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContentSection"], {
                spacing: 14,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadingSection"], {
                        letterSpacing: 1,
                        variant: "h3",
                        children: t("LANDING.SOLUTIONS_TITLE")
                    }, void 0, false, {
                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                        lineNumber: 182,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                        width: "100%",
                        container: true,
                        size: 12,
                        spacing: 5,
                        justifyContent: "center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GridMedia, {
                                size: 6,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardImageSection"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardMediaStyled"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxMedia"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fthumb-zalo-bussiness.538799e3.png&w=3840&q=75",
                                                    alt: "pic2",
                                                    fill: true,
                                                    style: {
                                                        objectFit: "cover"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                lineNumber: 187,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                            lineNumber: 186,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageTextSection"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImaggTitleLeft, {
                                                        variant: "h5",
                                                        gutterBottom: true,
                                                        children: t("LANDING.LABAN_KEY")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                        lineNumber: 198,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImaggSubTitleLeft, {
                                                        variant: "body1",
                                                        children: [
                                                            t("LANDING.LABAN_KEY_DESC"),
                                                            "                                    "
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                lineNumber: 197,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                            lineNumber: 196,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                    lineNumber: 185,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                lineNumber: 184,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GridMedia, {
                                size: 6,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardImageSection"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardMediaStyled"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxMedia"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "https://zalo-site.zadn.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fthumb-zalo-bussiness.538799e3.png&w=3840&q=75",
                                                    alt: "pic2",
                                                    fill: true,
                                                    style: {
                                                        objectFit: "cover"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                lineNumber: 210,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                            lineNumber: 209,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageTextSection"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImaggTitleLeft, {
                                                        variant: "h5",
                                                        gutterBottom: true,
                                                        children: t("LANDING.LABAN_KEY")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImaggSubTitleLeft, {
                                                        variant: "body1",
                                                        children: [
                                                            t("LANDING.LABAN_KEY_DESC"),
                                                            "                                    "
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                        lineNumber: 224,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                                lineNumber: 220,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                            lineNumber: 219,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                    lineNumber: 208,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                                lineNumber: 207,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                        lineNumber: 183,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                lineNumber: 181,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContentSection"], {}, void 0, false, {
                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
                lineNumber: 233,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx",
        lineNumber: 20,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ProductTab, "kAL+t0TBu7dhvMD77ayv/E63yDY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$common$2f$utilities$2f$hook$2f$trans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrans"]
    ];
});
_c3 = ProductTab;
const __TURBOPACK__default__export__ = ProductTab;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "GridMedia");
__turbopack_context__.k.register(_c1, "ImaggTitleLeft");
__turbopack_context__.k.register(_c2, "ImaggSubTitleLeft");
__turbopack_context__.k.register(_c3, "ProductTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Frontend_web/src/app/(page)/landingPage/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeaderLandingStyled",
    ()=>HeaderLandingStyled,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Container$2f$Container$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Container$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Container/Container.js [app-client] (ecmascript) <export default as Container>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Link$2f$Link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Link/Link.js [app-client] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Stack/Stack.js [app-client] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tab$2f$Tab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Tab/Tab.js [app-client] (ecmascript) <export default as Tab>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$lab$2f$esm$2f$TabContext$2f$TabContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/lab/esm/TabContext/TabContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$lab$2f$esm$2f$TabList$2f$TabList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/lab/esm/TabList/TabList.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$lab$2f$esm$2f$TabPanel$2f$TabPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/lab/esm/TabPanel/TabPanel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$LanguageOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/icons-material/esm/LanguageOutlined.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/src/app/(page)/landingPage/components/HomeTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$ProductTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/src/app/(page)/landingPage/components/ProductTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$common$2f$utilities$2f$hook$2f$trans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/src/common/utilities/hook/trans.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
const HeaderLandingStyled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])({
    minHeight: "10vh",
    padding: "16px 32px",
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    gap: "24px",
    marginBottom: "48px"
});
_c = HeaderLandingStyled;
const TabLandingStyled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$lab$2f$esm$2f$TabList$2f$TabList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
    width: "fit-content",
    maxWidth: "100%",
    "& .MuiTabs-flexContainer": {
        gap: "32px"
    },
    "& .MuiTab-root": {
        fontSize: "16px",
        color: "#262626",
        textTransform: "none",
        fontWeight: 500,
        minHeight: 48,
        minWidth: "auto",
        padding: "12px 0",
        whiteSpace: "nowrap"
    },
    "& .MuiTabs-indicator": {
        backgroundColor: "#2563eb",
        height: "2px",
        bottom: "8px"
    },
    "& .MuiTouchRipple-root": {
        display: "none"
    },
    "& .MuiTab-root.Mui-selected": {
        backgroundColor: "transparent",
        color: "#262626"
    }
});
_c1 = TabLandingStyled;
const BoxIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])({
    display: "flex",
    alignItems: "center",
    flexShrink: 0
});
_c2 = BoxIcon;
const StackAdress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"])({
    borderBottom: "1px solid #E5E7EB",
    paddingBottom: "24px"
});
_c3 = StackAdress;
const LinkStyled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Link$2f$Link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"])({
    color: "black",
    textDecoration: "none",
    "&:hover": {
        textDecoration: "underline",
        textDecorationColor: "black"
    }
});
_c4 = LinkStyled;
const ContainerLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$emotion$2f$styled$2f$dist$2f$emotion$2d$styled$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Container$2f$Container$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Container$3e$__["Container"])({
    padding: "0px 54px",
    backgroundColor: "#F6F7F9"
});
_c5 = ContainerLink;
const LandingPage = ()=>{
    _s();
    const [tabs, setTabs] = __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState("home");
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$common$2f$utilities$2f$hook$2f$trans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrans"])();
    const { i18n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const handleLanguageToggle = ()=>{
        const newLang = i18n.language === 'vi' ? 'en' : 'vi';
        i18n.changeLanguage(newLang);
        localStorage.setItem('language', newLang);
    };
    const handleChangeTabs = (_event, newTab)=>{
        setTabs(newTab);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$lab$2f$esm$2f$TabContext$2f$TabContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                value: tabs,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeaderLandingStyled, {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        display: "flex",
                                        alignItems: "center",
                                        flexShrink: 0
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/images/logo-zalo.svg",
                                        alt: "logo-zalo",
                                        width: 85,
                                        height: 50
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                    lineNumber: 111,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        flex: 1,
                                        display: "flex",
                                        justifyContent: "center",
                                        minWidth: 0,
                                        overflow: "hidden"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabLandingStyled, {
                                        // value={tabs}
                                        onChange: handleChangeTabs,
                                        variant: "scrollable",
                                        scrollButtons: "auto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tab$2f$Tab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__["Tab"], {
                                                label: t("LANDING.TAB_HOME"),
                                                value: "home"
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                lineNumber: 135,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tab$2f$Tab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__["Tab"], {
                                                label: t("LANDING.TAB_PRODUCTS"),
                                                value: "products"
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                lineNumber: 136,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tab$2f$Tab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__["Tab"], {
                                                label: t("LANDING.TAB_AI"),
                                                value: "ai"
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                lineNumber: 137,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tab$2f$Tab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__["Tab"], {
                                                label: t("LANDING.TAB_IMPACT"),
                                                value: "impact"
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                lineNumber: 138,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tab$2f$Tab$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__["Tab"], {
                                                label: t("LANDING.TAB_ABOUT"),
                                                value: "about"
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                lineNumber: 139,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                    lineNumber: 120,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BoxIcon, {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                        onClick: handleLanguageToggle,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$LanguageOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                            lineNumber: 146,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                        lineNumber: 145,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                    lineNumber: 144,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                            lineNumber: 110,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$lab$2f$esm$2f$TabPanel$2f$TabPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        p: 0
                                    },
                                    value: "home",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$HomeTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                    lineNumber: 152,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$lab$2f$esm$2f$TabPanel$2f$TabPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        p: 0
                                    },
                                    value: "products",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$components$2f$ProductTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                    lineNumber: 155,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$lab$2f$esm$2f$TabPanel$2f$TabPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        p: 0
                                    },
                                    value: "ai",
                                    children: "AI content"
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                    lineNumber: 158,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$lab$2f$esm$2f$TabPanel$2f$TabPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        p: 0
                                    },
                                    value: "impact",
                                    children: "Impact content"
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                    lineNumber: 161,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$lab$2f$esm$2f$TabPanel$2f$TabPanel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        p: 0
                                    },
                                    value: "about",
                                    children: "About content"
                                }, void 0, false, {
                                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                            lineNumber: 151,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                    lineNumber: 109,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                lineNumber: 108,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                bgcolor: "#F6F7F9",
                padding: "40px 0px",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContainerLink, {
                    disableGutters: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                        spacing: 3,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StackAdress, {
                                spacing: 2,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "https://zalo-site.zadn.vn/_next/static/media/logo.a68785cd.svg",
                                        alt: "logo-zalo",
                                        width: 85,
                                        height: 50
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                        lineNumber: 175,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        marginBottom: "16px",
                                        variant: "body1",
                                        children: t("LANDING.FOOTER_ADDRESS")
                                    }, void 0, false, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                        lineNumber: 181,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                lineNumber: 174,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                container: true,
                                spacing: 3,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                        size: 4,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "h6",
                                                fontWeight: 600,
                                                mb: 2,
                                                children: t("LANDING.FOOTER_SOLUTIONS")
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                lineNumber: 188,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                                spacing: 2,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkStyled, {
                                                        href: "#",
                                                        variant: "body1",
                                                        children: t("LANDING.ZALO_AI")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                        lineNumber: 192,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkStyled, {
                                                        href: "#",
                                                        variant: "body1",
                                                        children: t("LANDING.BUSINESS_SOLUTION")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkStyled, {
                                                        href: "#",
                                                        variant: "body1",
                                                        children: t("LANDING.DIGITAL_TRANSFORMATION")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                        lineNumber: 198,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkStyled, {
                                                        href: "#",
                                                        variant: "body1",
                                                        children: t("LANDING.ADTIMA")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                lineNumber: 191,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                        lineNumber: 187,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                        size: 4,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "h6",
                                                fontWeight: 600,
                                                mb: 2,
                                                children: t("LANDING.FOOTER_SUPPORT")
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                lineNumber: 208,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                                spacing: 2,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkStyled, {
                                                        href: "#",
                                                        variant: "body1",
                                                        children: t("LANDING.USER_SUPPORT")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkStyled, {
                                                        href: "#",
                                                        variant: "body1",
                                                        children: t("LANDING.DEVELOPER_SUPPORT")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                        lineNumber: 215,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkStyled, {
                                                        href: "#",
                                                        variant: "body1",
                                                        children: t("LANDING.SECURITY")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                        lineNumber: 218,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkStyled, {
                                                        href: "#",
                                                        variant: "body1",
                                                        children: t("LANDING.REPORT_VIOLATION")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkStyled, {
                                                        href: "#",
                                                        variant: "body1",
                                                        children: t("LANDING.CONTACT")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                        lineNumber: 224,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                lineNumber: 211,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                        lineNumber: 207,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                        size: 4,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "h6",
                                                fontWeight: 600,
                                                mb: 2,
                                                children: t("LANDING.FOOTER_ZALO")
                                            }, void 0, false, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                lineNumber: 231,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                                spacing: 2,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkStyled, {
                                                        href: "#",
                                                        variant: "body1",
                                                        children: t("LANDING.RECRUITMENT")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                        lineNumber: 236,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "h6",
                                                        fontWeight: 600,
                                                        mb: 2,
                                                        mt: 1,
                                                        children: t("LANDING.FOOTER_DOWNLOAD")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                                        spacing: 2,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkStyled, {
                                                                href: "#",
                                                                variant: "body1",
                                                                children: t("LANDING.ZALO_PC")
                                                            }, void 0, false, {
                                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                                lineNumber: 245,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LinkStyled, {
                                                                href: "#",
                                                                variant: "body1",
                                                                children: t("LANDING.ZALO_WEB")
                                                            }, void 0, false, {
                                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                                lineNumber: 248,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                        lineNumber: 244,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                                lineNumber: 235,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                        lineNumber: 230,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                                lineNumber: 186,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                        lineNumber: 173,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                    lineNumber: 172,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
                lineNumber: 171,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Frontend_web/src/app/(page)/landingPage/page.tsx",
        lineNumber: 107,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LandingPage, "k6avwTUC68jQ7OEdFmNEE0IAXcc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$common$2f$utilities$2f$hook$2f$trans$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrans"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c6 = LandingPage;
const __TURBOPACK__default__export__ = LandingPage;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "HeaderLandingStyled");
__turbopack_context__.k.register(_c1, "TabLandingStyled");
__turbopack_context__.k.register(_c2, "BoxIcon");
__turbopack_context__.k.register(_c3, "StackAdress");
__turbopack_context__.k.register(_c4, "LinkStyled");
__turbopack_context__.k.register(_c5, "ContainerLink");
__turbopack_context__.k.register(_c6, "LandingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Frontend_web/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/Frontend_web/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Frontend_web/src/app/(page)/landingPage/page.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Frontend_web$2f$src$2f$app$2f28$page$292f$landingPage$2f$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/Frontend_web/src/app/page.tsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Frontend_web/src/app/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Frontend_web_src_c3b34233._.js.map