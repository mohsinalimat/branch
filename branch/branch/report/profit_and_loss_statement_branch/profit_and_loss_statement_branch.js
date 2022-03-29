frappe.require("assets/branch/js/financial_statements_branch.js", function() {
	frappe.query_reports["Profit and Loss Statement Branch"] = $.extend({},
		branch.financial_statements_branch);

	branch.utils.add_dimensions('Profit and Loss Statement Branch', 10);
});