(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/buyer-portal-mockup/src/app/invoices/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Invoices
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/buyer-portal-mockup/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buyer-portal-mockup/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buyer-portal-mockup/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$react$2d$dropzone$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/buyer-portal-mockup/node_modules/react-dropzone/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/buyer-portal-mockup/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buyer-portal-mockup/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/buyer-portal-mockup/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/buyer-portal-mockup/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/buyer-portal-mockup/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://udybdvjqensxgsbcydoc.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_-p0mfuUlkcHSRfQkkYSY6A_XWY89Jvu"));
function Invoices() {
    _s();
    const [invoices, setInvoices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredInvoices, setFilteredInvoices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [latestParsed, setLatestParsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchInvoices = async ()=>{
        const { data, error: error_0 } = await supabase.from('invoices').select('*').order('created_at', {
            ascending: false
        });
        if (error_0) setError(error_0.message);
        else {
            setInvoices(data || []);
            setFilteredInvoices(data || []);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Invoices.useEffect": ()=>{
            fetchInvoices();
        }
    }["Invoices.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Invoices.useEffect": ()=>{
            const lower = searchTerm.toLowerCase();
            setFilteredInvoices(invoices.filter({
                "Invoices.useEffect": (inv)=>inv.invoice_number?.toLowerCase().includes(lower) || inv.supplier?.toLowerCase().includes(lower) || inv.amount?.toLowerCase().includes(lower)
            }["Invoices.useEffect"]));
        }
    }["Invoices.useEffect"], [
        searchTerm,
        invoices
    ]);
    const onDrop = async (acceptedFiles)=>{
        if (!acceptedFiles.length) return;
        setLoading(true);
        setError(null);
        setLatestParsed(null);
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch('/api/extract-pdf', {
                method: 'POST',
                body: formData
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || 'Upload misslyckades');
            setLatestParsed(result.parsed);
            await fetchInvoices();
        } catch (err) {
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };
    const deleteInvoice = async (inv_0)=>{
        if (!confirm('Radera fakturan permanent?')) return;
        if (inv_0.pdf_url) {
            const fileName = inv_0.pdf_url.split('/').pop();
            await supabase.storage.from('invoices').remove([
                fileName
            ]);
        }
        const { error: error_1 } = await supabase.from('invoices').delete().eq('id', inv_0.id);
        if (error_1) setError(error_1.message);
        else await fetchInvoices();
    };
    const { getRootProps, getInputProps, isDragActive } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$react$2d$dropzone$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useDropzone"])({
        onDrop,
        accept: {
            'application/pdf': [],
            'image/*': []
        },
        maxFiles: 1
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800",
                children: "Fakturor"
            }, void 0, false, {
                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mb-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-semibold mb-10",
                        children: "Ladda upp ny faktura"
                    }, void 0, false, {
                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ...getRootProps(),
                        className: `bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-3xl p-24 md:p-32 text-center cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isDragActive ? 'ring-8 ring-blue-500' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ...getInputProps()
                            }, void 0, false, {
                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                className: "w-24 h-24 mx-auto mb-8 text-blue-600"
                            }, void 0, false, {
                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-200",
                                children: isDragActive ? 'Släpp filen här' : 'Dra och släpp PDF/bild eller klicka'
                            }, void 0, false, {
                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-10 text-2xl text-blue-600 animate-pulse",
                                children: "Bearbetar fakturan..."
                            }, void 0, false, {
                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                lineNumber: 94,
                                columnNumber: 23
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-10 text-2xl text-red-600",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                lineNumber: 95,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            latestParsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mb-20 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-3xl shadow-2xl p-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-semibold mb-10",
                        children: "Nyuppladdad faktura"
                    }, void 0, false, {
                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-10 text-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600",
                                        children: "Belopp"
                                    }, void 0, false, {
                                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                        lineNumber: 103,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-4xl font-bold text-blue-600",
                                        children: latestParsed.amount
                                    }, void 0, false, {
                                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                        lineNumber: 104,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600",
                                        children: "Förfallodatum"
                                    }, void 0, false, {
                                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-3xl font-bold",
                                        children: latestParsed.dueDate
                                    }, void 0, false, {
                                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600",
                                        children: "Leverantör"
                                    }, void 0, false, {
                                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                        lineNumber: 111,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-bold",
                                        children: latestParsed.supplier
                                    }, void 0, false, {
                                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg col-span-1 md:col-span-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Fakturanummer:"
                                                }, void 0, false, {
                                                    fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 20
                                                }, this),
                                                " ",
                                                latestParsed.invoiceNumber
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                            lineNumber: 116,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "OCR-nummer:"
                                                }, void 0, false, {
                                                    fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 20
                                                }, this),
                                                " ",
                                                latestParsed.ocrNumber
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                            lineNumber: 117,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Bankgiro:"
                                                }, void 0, false, {
                                                    fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 20
                                                }, this),
                                                " ",
                                                latestParsed.bankgiro
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                            lineNumber: 118,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                    lineNumber: 115,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                lineNumber: 114,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                lineNumber: 99,
                columnNumber: 24
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-semibold mb-10",
                        children: "Sparade fakturor"
                    }, void 0, false, {
                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "absolute left-6 top-5 w-8 h-8 text-gray-500"
                            }, void 0, false, {
                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Sök på fakturanummer, leverantör eller belopp...",
                                value: searchTerm,
                                onChange: (e)=>setSearchTerm(e.target.value),
                                className: "w-full pl-20 pr-8 py-6 text-xl border-2 rounded-3xl dark:bg-gray-800 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition"
                            }, void 0, false, {
                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    filteredInvoices.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center text-2xl text-gray-500 py-32",
                        children: "Inga fakturor (eller ingen match)."
                    }, void 0, false, {
                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                        lineNumber: 132,
                        columnNumber: 42
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12",
                        children: filteredInvoices.map((inv_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 hover:scale-105 hover:shadow-3xl transition-all duration-500 relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>deleteInvoice(inv_1),
                                        className: "absolute top-6 right-6 text-red-600 hover:text-red-800",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "w-10 h-10"
                                        }, void 0, false, {
                                            fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                            lineNumber: 135,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                        lineNumber: 134,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800",
                                                children: inv_1.amount || 'Ej hittat'
                                            }, void 0, false, {
                                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                lineNumber: 138,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-5 text-xl",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Förfallodatum:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                                lineNumber: 142,
                                                                columnNumber: 24
                                                            }, this),
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-2xl",
                                                                children: inv_1.due_date || 'Ej hittat'
                                                            }, void 0, false, {
                                                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                                lineNumber: 142,
                                                                columnNumber: 56
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Leverantör:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                                lineNumber: 143,
                                                                columnNumber: 24
                                                            }, this),
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold",
                                                                children: inv_1.supplier || 'Ej hittat'
                                                            }, void 0, false, {
                                                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                                lineNumber: 143,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Fakturanummer:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                                lineNumber: 144,
                                                                columnNumber: 24
                                                            }, this),
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold",
                                                                children: inv_1.invoice_number || 'Ej hittat'
                                                            }, void 0, false, {
                                                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                                lineNumber: 144,
                                                                columnNumber: 56
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "OCR-nummer:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                                lineNumber: 145,
                                                                columnNumber: 24
                                                            }, this),
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold",
                                                                children: inv_1.ocr_number || 'Ej hittat'
                                                            }, void 0, false, {
                                                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                                lineNumber: 145,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Bankgiro:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                                lineNumber: 146,
                                                                columnNumber: 24
                                                            }, this),
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold",
                                                                children: inv_1.bankgiro || 'Ej hittat'
                                                            }, void 0, false, {
                                                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                                lineNumber: 146,
                                                                columnNumber: 51
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                        lineNumber: 146,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                lineNumber: 141,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                        lineNumber: 137,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-10 flex gap-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: inv_1.pdf_url,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "flex-1 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition shadow-xl text-xl font-semibold",
                                                children: "Öppna PDF"
                                            }, void 0, false, {
                                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                lineNumber: 150,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/fortusflex",
                                                className: "flex-1 text-center bg-gradient-to-r from-green-600 to-green-700 text-white py-5 rounded-2xl hover:from-green-700 hover:to-green-800 transition shadow-xl text-xl font-semibold",
                                                children: "FortusFlex-kalkyl"
                                            }, void 0, false, {
                                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                                lineNumber: 153,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, inv_1.id, true, {
                                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                                lineNumber: 133,
                                columnNumber: 44
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                        lineNumber: 132,
                        columnNumber: 139
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/buyer-portal-mockup/src/app/invoices/page.tsx",
        lineNumber: 81,
        columnNumber: 10
    }, this);
}
_s(Invoices, "V53vKQkCvPnDyCHIZXQAT7D27c4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$buyer$2d$portal$2d$mockup$2f$node_modules$2f$react$2d$dropzone$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useDropzone"]
    ];
});
_c = Invoices;
var _c;
__turbopack_context__.k.register(_c, "Invoices");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=buyer-portal-mockup_src_app_invoices_page_tsx_9cdb9820._.js.map