from branch.branch.report.sales_analytics_branch.sales_analytics_branch import Analytics


def execute(filters=None):
	return Analytics(filters).run()