frappe.ui.form.on("Warehouse", "onload", function(frm) {
    frm.set_query("company_branch", function() {
        return {
            "filters": {
                "company": frm.doc.company
                }
            };
    });
});