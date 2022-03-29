{% include "branch/branch/report/item_wise_sales_register_branch/item_wise_sales_register_branch.js" %}
{% include "erpnext/regional/report/india_gst_common/india_gst_common.js" %}

let filters = frappe.query_reports["Item-wise Sales Register Branch"]["filters"];

// Add GSTIN filter
filters = filters.concat({
    "fieldname":"company_gstin",
    "label": __("Company GSTIN"),
    "fieldtype": "Select",
    "placeholder":"Company GSTIN",
    "options": [""],
    "width": "80"
}, {
    "fieldname":"invoice_type",
    "label": __("Invoice Type"),
    "fieldtype": "Select",
    "placeholder":"Invoice Type",
    "options": ["", "Regular", "SEZ", "Export", "Deemed Export"]
});

// Handle company on change
for (var i = 0; i < filters.length; ++i) {
    if (filters[i].fieldname === 'company') {
        filters[i].on_change = fetch_gstins;
    }
}

frappe.query_reports["GST Itemised Sales Register Branch"] = { "filters": filters, "onload": fetch_gstins };