frappe.query_reports["Total Stock Summary Branch"] = {
	"filters": [
		{
			"fieldname":"group_by",
			"label": __("Group By"),
			"fieldtype": "Select",
			"width": "80",
			"reqd": 1,
			"options": ["Warehouse","Company Branch", "Company"],
			"default": "Warehouse",
		},
		{
			"fieldname": "company",
			"label": __("Company"),
			"fieldtype": "Link",
			"width": "80",
			"options": "Company",
			"reqd": 1,
			"default": frappe.defaults.get_user_default("Company"),
			"depends_on": "eval: doc.group_by != 'Company'",
		},
	],
	onload: function(report) {
		const views_menu = report.page.add_custom_button_group(__('Branch Wise Stock Summary'));
		report.page.add_custom_menu_item(views_menu, __("Stock Balance Branch"), function() {
			var filters = report.get_values();
			frappe.set_route('query-report', 'Stock Balance Branch', {company: filters.company});
		});

		report.page.add_custom_menu_item(views_menu, __("Stock Ledger Branch"), function() {
			var filters = report.get_values();
			frappe.set_route('query-report', 'Stock Ledger Branch', {company: filters.company});
		});

		report.page.add_custom_menu_item(views_menu, __("Stock Analytics Branch"), function() {
			var filters = report.get_values();
			frappe.set_route('query-report', 'Stock Analytics Branch', {company: filters.company});
		});
	}
}