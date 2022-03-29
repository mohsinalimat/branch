# import frappe

# @frappe.whitelist()

# def get_mrp():
    # return frappe.db.sql('''select 
    # `tabItem Price`.`price_list_rate`
    # from `tabItem Price` join `tabSales Order Item` join `tabSales Order`
    # where `tabSales Order Item`.`parent` = `tabSales Order`.`name` 
    # and (`tabSales Order`.`transaction_date` BETWEEN `tabItem Price`.`valid_from` AND `tabItem Price`.`valid_upto`) 
    # and `tabItem Price`.`item_code` = `tabSales Order Item`.`item_code` 
    # and `tabItem Price`.`price_list` = `tabSales Order`.`mrp_price_list`
    # ''')[0][0]

    # test = frappe.db.sql('''select 
    # `tabItem Price`.`price_list_rate`
    # from `tabItem Price` join `tabSales Order Item` join `tabSales Order`
    # where `tabSales Order Item`.`parent` = `tabSales Order`.`name` 
    # and (`tabSales Order`.`transaction_date` BETWEEN `tabItem Price`.`valid_from` AND `tabItem Price`.`valid_upto`) 
    # and `tabItem Price`.`item_code` = `tabSales Order Item`.`item_code` 
    # and `tabItem Price`.`price_list` = `tabSales Order`.`mrp_price_list`
    # ''')
    # print ("\n test ::::::::::::::::", test)
    # return test[0][0]


import frappe
from frappe.model.document import Document




# GET CUSTOMER ITEM CODE
@frappe.whitelist()
def get_refcode(item_code,customer):
    test = frappe.db.get_value("Item Customer Info",{'customer': customer,'parent': item_code },'customer_ref_code')

    return test


# GET MRP PRICE ---- CONSOLE WORK BUT CLIENT SIDE SCRIPT NOT WORK
@frappe.whitelist()
def get_mrp(item_code,price_list):
    values = {'item_code': item_code, 'price_list':price_list}
    price_list_rate = frappe.db.sql("""select 
    price_list_rate from `tabItem Price` where item_code = %(item_code)s 
    and price_list = %(price_list)s """,values=values,as_dict=True)
    print ("\n test ::::::::::::::::", item_code, price_list)
    return price_list_rate