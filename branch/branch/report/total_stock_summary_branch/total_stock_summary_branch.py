import frappe
from frappe import _


def execute(filters=None):

	if not filters:
		filters = {}
	columns = get_columns()
	stock = get_total_stock(filters)

	return columns, stock

def get_columns():
	columns = [

		_("Company") + ":Link/Company:250",
		_("Warehouse") + ":Link/Warehouse:150",
		_("Company Branch") + ":Link/Company Branch:250",
		_("Item") + ":Link/Item:150",
		_("Description") + "::300",
		_("Current Qty") + ":Float:100"
	]

	return columns

def get_total_stock(filters):
	conditions = ""
	columns = ""

	if filters.get("group_by") == "Warehouse":
		if filters.get("company"):
			conditions += " AND warehouse.company = %s" % frappe.db.escape(filters.get("company"), percent=False)	
		 #warehouse
		conditions += " GROUP BY ledger.warehouse, item.item_code"
		columns += "'' as company, ledger.warehouse"

		# if filters.get("company_branch"):
		# 	conditions += " AND warehouse.company_branch = %s" % frappe.db.escape(filters.get("company_branch"), percent=False)	

	if filters.get("group_by") == "Company":
		conditions += " GROUP BY warehouse.company, item.item_code"
		columns += " warehouse.company, '' as warehouse, '' as company_branch, item.item_code,item.description,sum(ledger.actual_qty)"

	if filters.get("group_by") == "Company Branch":
		conditions += " GROUP BY warehouse.company_branch,item.item_code"
		columns += "'' as company,'' as warehouse,warehouse.company_branch,item.item_code,item.description,sum(ledger.actual_qty)"	


	return frappe.db.sql("""
			SELECT
				%s,
				warehouse.company_branch,
				item.item_code,
				item.description,
				sum(ledger.actual_qty) as actual_qty
				FROM
				`tabBin` AS ledger
			INNER JOIN `tabItem` AS item
				ON ledger.item_code = item.item_code
			INNER JOIN `tabWarehouse` warehouse
				ON warehouse.name = ledger.warehouse
			WHERE
				ledger.actual_qty != 0 %s""" % (columns, conditions))