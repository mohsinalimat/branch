frappe.query_reports["Stock Ledger Branch"] = {
	"filters": [
		{
			"fieldname":"company",
			"label": __("Company"),
			"fieldtype": "Link",
			"options": "Company",
			"default": frappe.defaults.get_user_default("Company"),
			"reqd": 1
		},
		{
			"fieldname":"company_branch",
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
			"reqd": 1
		},
		{
			"fieldname":"to_date",
			"label": __("To Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.get_today(),
			"reqd": 1
		},
		{
			"fieldname":"warehouse",
			"label": __("Warehouse"),
			"fieldtype": "Link",
			"options": "Warehouse",
			get_query: () => {
				let company_branch = frappe.query_report.get_filter_value("company_branch");
				let company = frappe.query_report.get_filter_value("company");

				return {
					filters: {
						...company && {company},
						...company_branch && {company_branch}
					}
				}
			}
		},
		{
			"fieldname":"item_code",
			"label": __("Item"),
			"fieldtype": "Link",
			"options": "Item",
			"get_query": function() {
				return {
					query: "erpnext.controllers.queries.item_query"
				}
			}
		},
		{
			"fieldname":"item_group",
			"label": __("Item Group"),
			"fieldtype": "Link",
			"options": "Item Group"
		},
		{
			"fieldname":"batch_no",
			"label": __("Batch No"),
			"fieldtype": "Link",
			"options": "Batch"
		},
		{
			"fieldname":"brand",
			"label": __("Brand"),
			"fieldtype": "Link",
			"options": "Brand"
		},
		{
			"fieldname":"voucher_no",
			"label": __("Voucher #"),
			"fieldtype": "Data"
		},
		{
			"fieldname":"project",
			"label": __("Project"),
			"fieldtype": "Link",
			"options": "Project"
		},
		{
			"fieldname":"include_uom",
			"label": __("Include UOM"),
			"fieldtype": "Link",
			"options": "UOM"
		}
	],
	onload: function(report) {
		const views_menu = report.page.add_custom_button_group(__('Branch Wise Stock Summary'));
		report.page.add_custom_menu_item(views_menu, __("Stock Balance Branch"), function() {
			var filters = report.get_values();
			frappe.set_route('query-report', 'Stock Balance Branch', {company: filters.company});
		});

		report.page.add_custom_menu_item(views_menu, __("Stock Analytics Branch"), function() {
			var filters = report.get_values();
			frappe.set_route('query-report', 'Stock Analytics Branch', {company: filters.company});
		});

		report.page.add_custom_menu_item(views_menu, __("Total Stock Summary Branch"), function() {
			var filters = report.get_values();
			frappe.set_route('query-report', 'Total Stock Summary Branch', {company: filters.company});
		});
	},
	"formatter": function (value, row, column, data, default_formatter) {
		value = default_formatter(value, row, column, data);
		if (column.fieldname == "out_qty" && data && data.out_qty < 0) {
			value = "<span style='color:red'>" + value + "</span>";
		}
		else if (column.fieldname == "in_qty" && data && data.in_qty > 0) {
			value = "<span style='color:green'>" + value + "</span>";
		}

		return value;
	},
}