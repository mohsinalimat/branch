import frappe
from frappe import _


def execute(filters=None):
	columns, data = get_columns(), get_data(filters)
	return columns, data

def get_columns():
	columns = [
		{
			"label": _("Item Code"),
			"fieldtype": "Link",
			"fieldname": "item_code",
			"options": "Item",
			"width": 120
		},
		{
			"label": _("Item Name"),
			"fieldtype": "Data",
			"fieldname": "item_name",
			"width": 140
		},
		{
			"label": _("Item Group"),
			"fieldtype": "Link",
			"fieldname": "item_group",
			"options": "Item Group",
			"width": 120
		},
		{
			"label": _("Description"),
			"fieldtype": "Data",
			"fieldname": "description",
			"width": 150
		},
		{
			"label": _("Quantity"),
			"fieldtype": "Float",
			"fieldname": "qty",
			"width": 100
		},
		{
			"label": _("UOM"),
			"fieldtype": "Link",
			"fieldname": "uom",
			"options": "UOM",
			"width": 80
		},
		{
			"label": _("Rate"),
			"fieldname": "base_rate",
			"options": "Currency",
			"width": 100
		},
		{
			"label": _("Amount"),
			"fieldname": "base_amount",
			"options": "Currency",
			"width": 120
		},
		{
			"label": _("Purchase Order"),
			"fieldtype": "Link",
			"fieldname": "name",
			"options": "Purchase Order",
			"width": 180
		},
		{
			"label": _("Company Branch"),
			"fieldtype": "Link",
			"fieldname": "company_branch",
			"options": "Company Branch",
			"width": 100
		},
		{
			"label": _("Transaction Date"),
			"fieldtype": "Date",
			"fieldname": "transaction_date",
			"width": 90
		},
		{
			"label": _("Supplier"),
			"fieldtype": "Link",
			"fieldname": "supplier",
			"options": "Supplier",
			"width": 100
		},
		{
			"label": _("Supplier Name"),
			"fieldtype": "Data",
			"fieldname": "supplier_name",
			"width": 140
		},
		{
			"label": _("Supplier Group"),
			"fieldtype": "Link",
			"fieldname": "supplier_group",
			"options": "Customer Group",
			"width": 120
		},
		{
			"label": _("Project"),
			"fieldtype": "Link",
			"fieldname": "project",
			"options": "Project",
			"width": 100
		},
		{
			"label": _("Received Qty"),
			"fieldtype": "Float",
			"fieldname": "received_qty",
			"width": 150
		},
		{
			"label": _("Billed Amount"),
			"fieldtype": "currency",
			"fieldname": "billed_amt",
			"width": 120
		},
		{
			"label": _("Company"),
			"fieldtype": "Link",
			"fieldname": "company",
			"options": "Company",
			"width": 100
		}

	]
	return columns

def get_data(filters):
	return frappe.db.sql("""
		SELECT
		po_item.item_code,
		po_item.item_name,
	    po_item.item_group,
		po_item.description,
		po_item.qty,
		po_item.uom,
		po_item.base_rate,
		po_item.base_amount,
		po.name,
		po.company_branch,
		po.transaction_date,
		po.supplier,
	    sup.supplier_name,
	    sup.supplier_group,
		po_item.project,
		po_item.received_qty,
		po_item.billed_amt,
		po.company
	FROM
		`tabPurchase Order` po, `tabPurchase Order Item` po_item, `tabSupplier` sup
	WHERE
		po.name = po_item.parent 
		and po.supplier = sup.name 
		and po.docstatus = 1
		and po.company = %(company)s
		and po.transaction_date BETWEEN %(from_date)s AND %(to_date)s
		{conditions}
	ORDER BY po.name desc""".format(conditions=get_conditions(filters)), filters, as_dict=1)

def get_conditions(filters) :
	conditions = []

	if filters.get("company_branch"):
		conditions.append(" and po.company_branch=%(company_branch)s")

	if filters.get("item_group"):
		conditions.append(" and po_item.item_group=%(item_group)s")

	if filters.get("item_code"):
		conditions.append(" and po_item.item_code=%(item_code)s")

	if filters.get("supplier"):
		conditions.append(" and po.supplier=%(supplier)s")


	return " ".join(conditions) if conditions else ""