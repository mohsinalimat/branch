frappe.ui.form.on('Company', {
	refresh(frm) {
		frm.add_custom_button(__("Company Branch"), function() {
				frappe.route_options = {
					"company": frm.doc.name
				};
				frappe.set_route("company-branch", "new-company-branch");
			}, __("Create"));
	}
});