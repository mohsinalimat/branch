frappe.ui.form.on("Item", {
  onload: function (frm) {
    frm.set_query("company_branch", "item_defaults", function (doc, cdt, cdn) {
      let row = locals[cdt][cdn];
      return {
        "filters": {
          "company": row.company
        },
      };
    });
  },
});

frappe.ui.form.on("Item", {
  onload: function (frm) {
    frm.set_query("default_warehouse", "item_defaults", function (doc, cdt, cdn) {
      let row = locals[cdt][cdn];
      return {
        "filters": {
          "company": row.company,
          "company_branch": row.company_branch,
          "is_group": 0
        },
      };
    });
  },
});


frappe.ui.form.on('Item', {
	refresh(frm) {
		frm.add_custom_button(__("Stock Ledger Branch"), function() {
				frappe.route_options = {
					"item_code": frm.doc.name
				};
				frappe.set_route("query-report", "Stock Ledger Branch");
			}, __("Branch Wise Report"));
	}
});

frappe.ui.form.on('Item', {
	refresh(frm) {
		frm.add_custom_button(__("Stock Balance Branch"), function() {
				frappe.route_options = {
					"item_code": frm.doc.name
				};
				frappe.set_route("query-report", "Stock Balance Branch");
			}, __("Branch Wise Report"));
	}
});