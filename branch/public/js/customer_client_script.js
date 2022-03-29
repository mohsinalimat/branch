/*
frappe.ui.form.on('Customer', {
	refresh(frm) {
		frm.add_custom_button(__("General Ledger"), function() {
				frappe.route_options = {
					"party_type": "Customer",
					"party": frm.doc.name
				};
				frappe.set_route("query-report", "General Ledger");
			}, __("View"));
	}
});
*/
frappe.ui.form.on('Customer', {
	refresh(frm) {
		frm.add_custom_button(__("Trial Balance for Party"), function() {
				frappe.route_options = {
					"party_type": "Customer",
					"party": frm.doc.name
				};
				frappe.set_route("query-report", "Trial Balance for Party");
			}, __("View"));
	}
});

frappe.ui.form.on('Customer', {
	refresh(frm) {
		frm.add_custom_button(__("Item-wise Sales History"), function() {
				frappe.route_options = {
					"customer": frm.doc.name
				};
				frappe.set_route("query-report", "Item-wise Sales History");
			}, __("View"));
	}
});