frappe.require("assets/branch/js/financial_statements_branch.js", function() {
	frappe.query_reports["Balance Sheet Branch"] = $.extend({}, branch.financial_statements_branch);

	branch.utils.add_dimensions('Balance Sheet Branch', 10);

});