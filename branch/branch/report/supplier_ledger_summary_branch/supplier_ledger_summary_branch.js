frappe.query_reports["Supplier Ledger Summary Branch"] = {
	"filters": [
		{
			"fieldname":"company",
			"label": __("Company"),
			"fieldtype": "Link",
			"options": "Company",
			"default": frappe.defaults.get_user_default("Company")
		},
		{

				"fieldname": "company_branch",
				"label": __("Company Branch"),
				"fieldtype": "Link",
				"options": "Company Branch",
				get_query: () => {
				let company = frappe.query_report.get_filter_value("company");
				return {
					filters: {
						...company && {company},
					}
				}
			}
		},
		{
			"fieldname":"from_date",
			"label": __("From Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.add_months(frappe.datetime.get_today(), -1),
			"reqd": 1,
			"width": "60px"
		},
		{
			"fieldname":"to_date",
			"label": __("To Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.get_today(),
			"reqd": 1,
			"width": "60px"
		},
		{
			"fieldname":"finance_book",
			"label": __("Finance Book"),
			"fieldtype": "Link",
			"options": "Finance Book"
		},
		{
			"fieldname":"party",
			"label": __("Supplier"),
			"fieldtype": "Link",
			"options": "Supplier",
			on_change: () => {
				var party = frappe.query_report.get_filter_value('party');
				if (party) {
					frappe.db.get_value('Supplier', party, ["tax_id", "supplier_name"], function(value) {
						frappe.query_report.set_filter_value('tax_id', value["tax_id"]);
						frappe.query_report.set_filter_value('supplier_name', value["supplier_name"]);
					});
				} else {
					frappe.query_report.set_filter_value('tax_id', "");
					frappe.query_report.set_filter_value('supplier_name', "");
				}
			}
		},
		{
			"fieldname":"supplier_group",
			"label": __("Supplier Group"),
			"fieldtype": "Link",
			"options": "Supplier Group"
		},
		{
			"fieldname":"payment_terms_template",
			"label": __("Payment Terms Template"),
			"fieldtype": "Link",
			"options": "Payment Terms Template"
		},
		{
			"fieldname":"territory",
			"label": __("Territory"),
			"fieldtype": "Link",
			"options": "Territory"
		},
		{
			"fieldname":"sales_partner",
			"label": __("Sales Partner"),
			"fieldtype": "Link",
			"options": "Sales Partner"
		},
		{
			"fieldname":"sales_person",
			"label": __("Sales Person"),
			"fieldtype": "Link",
			"options": "Sales Person"
		},
		{
			"fieldname":"tax_id",
			"label": __("Tax Id"),
			"fieldtype": "Data",
			"hidden": 1
		},
		{
			"fieldname":"supplier_name",
			"label": __("Supplier Name"),
			"fieldtype": "Data",
			"hidden": 1
		}
	],
	onload: function(report) {
		const views_menu = report.page.add_custom_button_group(__('Branch Wise Ledger'));
		report.page.add_custom_menu_item(views_menu, __("General Ledger Branch"), function() {
			var filters = report.get_values();
			frappe.set_route('query-report', 'General Ledger Branch', {company: filters.company});
		});

		report.page.add_custom_menu_item(views_menu, __("Customer Ledger Summary Branch"), function() {
			var filters = report.get_values();
			frappe.set_route('query-report', 'Customer Ledger Summary Branch', {company: filters.company});
		});
	}
};